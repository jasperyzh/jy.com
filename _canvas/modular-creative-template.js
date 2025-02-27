/**
 * Modular Creative Coding Template
 * 
 * A flexible template for creative coding and pen plotting projects with a layered,
 * modular approach that allows for easy mixing and matching of visual elements.
 * 
 * Based on the "250121-gift-revisited.js" sketch.
 */

const canvasSketch = require("canvas-sketch");
const { pathsToSVG, createPath } = require("canvas-sketch-util/penplot");
const random = require("canvas-sketch-util/random");
const { lerp } = require("canvas-sketch-util/math");
const convexHull = require("convex-hull");
const clustering = require("density-clustering");

// ========================================================
// CONFIGURATION
// ========================================================

// Project settings - adjust for your specific needs
const settings = {
  dimensions: [21, 21],        // Canvas dimensions [width, height]
  orientation: "portrait",     // "portrait" or "landscape"
  pixelsPerInch: 300,          // Resolution for export
  scaleToView: true,           // Fit to viewing area
  units: "cm",                 // Units used (cm, mm, in)
};

// Global parameters - adjust these to change the visual output
const CONFIG = {
  // General
  margin: 3,               // Canvas margin in units
  exportWidth: 14.8,       // Export width in units
  exportHeight: 21,        // Export height in units
  strokeWidth: 0.03,       // Line width for pen plotting
  
  // Point generation
  pointCount: 80,         // Number of random points
  
  // Clustering
  clusterCount: 4,         // Number of clusters to create
  convexHullCount: 7,      // Number of convex hulls to generate
  
  // Circle parameters
  circleMinDensity: 0.2,   // Minimum spacing between circles
  circleMaxDensity: 0.2,   // Maximum spacing between circles
  circleMinScale: 0.01,    // Minimum circle radius
  circleMaxScale: 0.4,     // Maximum circle radius
  noiseScale: 0.06,        // Scale factor for noise
}; 

// ========================================================
// LAYER MANAGEMENT
// ========================================================

// Container for all layers
const layers = {
  convexHulls: {
    active: true,          // Toggle layer on/off
    paths: [],             // Will store paths for this layer
    color: "rgba(255, 0, 0, 1)",
    strokeWidth: 0.1,
    fill: false,
    data: []               // Store intermediate data for this layer
  },
  circles: {
    active: true,          // Toggle layer on/off
    paths: [],             // Will store paths for this layer
    color: "rgba(0, 0, 0, 1)",
    strokeWidth: 0.03,
    fill: false,
    data: []               // Store intermediate data for this layer
  }
  // Add more layers as needed
};

// ========================================================
// UTILITY FUNCTIONS
// ========================================================

/**
 * Checks if a point is inside a polygon
 * @param {Array} point - [x, y] coordinates
 * @param {Array} vs - Array of polygon vertices
 * @returns {Boolean} true if point is inside polygon
 */
const pointInPolygon = (point, vs) => {
  let x = point[0], y = point[1];
  let inside = false;
  for (let i = 0, j = vs.length - 1; i < vs.length; j = i++) {
    let xi = vs[i][0], yi = vs[i][1];
    let xj = vs[j][0], yj = vs[j][1];
    let intersect = ((yi > y) !== (yj > y)) &&
      (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
    if (intersect) inside = !inside;
  }
  return inside;
};

/**
 * Converts a circle to a polyline for plotting
 * @param {Number} x - Center x coordinate
 * @param {Number} y - Center y coordinate
 * @param {Number} radius - Circle radius
 * @param {Number} steps - Number of points in the polyline (resolution)
 * @returns {Array} Array of [x, y] points forming circle
 */
const circleToPolyline = (x, y, radius, steps = 100) => {
  const circlePoints = [];
  for (let i = 0; i <= steps; i++) {
    const angle = (i / steps) * Math.PI * 2;
    const pointX = x + Math.cos(angle) * radius;
    const pointY = y + Math.sin(angle) * radius;
    circlePoints.push([pointX, pointY]);
  }
  return circlePoints;
};

// ========================================================
// LAYER GENERATORS
// ========================================================

/**
 * Generate random points within canvas bounds
 * @param {Number} width - Canvas width
 * @param {Number} height - Canvas height
 * @returns {Array} Array of [x, y] points
 */
const generatePoints = (width, height) => {
  return Array.from({ length: CONFIG.pointCount }, () => [
    Math.max(
      random.value() * (width - 2 * CONFIG.margin) + CONFIG.margin,
      0
    ),
    Math.max(
      random.value() * (height - 2 * CONFIG.margin) + CONFIG.margin,
      0
    ),
  ]);
};

/**
 * Generate convex hulls from points using clustering
 * @param {Array} sourcePoints - Array of [x, y] points
 * @returns {Object} Updated points and generated convex hulls
 */
const generateConvexHulls = (sourcePoints) => {
  let points = [...sourcePoints];
  const convexLines = [];
  
  // Generate multiple convex hulls
  for (let i = 0; i < CONFIG.convexHullCount; i++) {
    if (points.length <= CONFIG.clusterCount) break;

    // Use k-means clustering to group points
    const scan = new clustering.KMEANS();
    const clusters = scan.run(points, CONFIG.clusterCount).filter(c => 
      c.length >= 3
    );

    if (clusters.length === 0) continue;

    // Sort clusters by size and take the smallest one
    clusters.sort((a, b) => a.length - b.length);
    const cluster = clusters[0];
    const positions = cluster.map(i => points[i]);

    // Generate convex hull from cluster points
    const edges = convexHull(positions);
    if (edges.length <= 2) continue;

    // Create a closed path from the hull
    let path = edges.map(c => positions[c[0]]);
    path.push(path[0]); // Close the path
    convexLines.push(path);

    // Remove used points from the pool
    points = points.filter(p => !positions.includes(p));
  }
  
  return { 
    remainingPoints: points,
    convexLines: convexLines
  };
};

/**
 * Generate circle paths inside convex hull boundaries
 * @param {Array} path - Boundary path (convex hull) 
 * @returns {Array} Array of circle paths
 */
const generateCirclesInHull = (path) => {
  const circlePaths = [];
  
  // Find bounding box of the path
  const [minX, minY, maxX, maxY] = path.reduce(
    ([minX, minY, maxX, maxY], [x, y]) => [
      Math.min(minX, x),
      Math.min(minY, y),
      Math.max(maxX, x),
      Math.max(maxY, y),
    ],
    [Infinity, Infinity, -Infinity, -Infinity],
  );

  // Generate circles within the convex hull
  for (let x = minX; x <= maxX; x += random.range(CONFIG.circleMinDensity, CONFIG.circleMaxDensity)) {
    for (let y = minY; y <= maxY; y += random.range(CONFIG.circleMinDensity, CONFIG.circleMaxDensity)) {
      // Only place circles inside the hull
      if (pointInPolygon([x, y], path)) {
        // Calculate noise-based rotation and scale
        const noiseValue = random.noise2D(x * CONFIG.noiseScale, y * CONFIG.noiseScale) * Math.PI * 2;
        const offsetX = -1;
        const offsetY = -1;

        // Determine circle size based on noise
        let radius = lerp(CONFIG.circleMinScale, CONFIG.circleMaxScale, Math.abs(noiseValue));

        // Calculate circle position with offset
        const centerX = x + offsetX * 1.618;
        const centerY = y + offsetY * 1.618;

        // Calculate bounding box corner for rotation
        const topLeftX = centerX + radius;
        const topLeftY = centerY + radius;

        // Convert noise to rotation angle
        const rotationAngleDegrees = noiseValue * (180 / Math.PI);
        const rotationAngleRadians = rotationAngleDegrees * (Math.PI / 180);

        // Apply rotation to determine final center position
        const rotatedCenterX =
          Math.cos(rotationAngleRadians) * (centerX - topLeftX) -
          Math.sin(rotationAngleRadians) * (centerY - topLeftY) +
          topLeftX;
        const rotatedCenterY =
          Math.sin(rotationAngleRadians) * (centerX - topLeftX) +
          Math.cos(rotationAngleRadians) * (centerY - topLeftY) +
          topLeftY;

        // Create a circle path
        circlePaths.push(createPath((ctx) => {
          ctx.arc(
            rotatedCenterX,
            rotatedCenterY,
            radius,
            0,
            2 * Math.PI,
            false,
          );
          ctx.closePath();
        }));
      }
    }
  }
  
  return circlePaths;
};

/**
 * Create a path from convex hull lines
 * @param {Array} convexLines - Array of convex hull paths
 * @returns {Path} Path object for rendering
 */
const createConvexHullPath = (convexLines) => {
  return createPath((ctx) => {
    convexLines.forEach((line) => {
      line.forEach(([x, y], index) => {
        if (index === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      });
    });
  });
};

// ========================================================
// MAIN SKETCH FUNCTION
// ========================================================

const sketch = ({ width, height }) => {
  // Generate initial points
  const initialPoints = generatePoints(width, height);
  
  // Generate convex hulls
  const { remainingPoints, convexLines } = generateConvexHulls(initialPoints);
  
  // Store convex hull data
  layers.convexHulls.data = convexLines;
  
  // Generate convex hull path
  if (layers.convexHulls.active) {
    const convexHullPath = createConvexHullPath(convexLines);
    layers.convexHulls.paths = [convexHullPath];
  }
  
  // Generate circles inside convex hulls
  if (layers.circles.active) {
    convexLines.forEach(line => {
      const circlePaths = generateCirclesInHull(line);
      layers.circles.paths.push(...circlePaths);
    });
  }
  
  // Collect all active paths for export
  const allPaths = [];
  Object.values(layers).forEach(layer => {
    if (layer.active) {
      allPaths.push(...layer.paths);
    }
  });

  // Main render function
  return ({ context, width, height, units }) => {
    // Clear canvas
    context.clearRect(0, 0, width, height);
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);
    
    // Render each active layer
    Object.entries(layers).forEach(([layerName, layer]) => {
      if (!layer.active || layer.paths.length === 0) return;
      
      layer.paths.forEach(path => {
        // Convert path to string for SVG compatibility
        const pathString = path.toString();
        const tempPath = new Path2D(pathString);
        
        // Apply layer styles
        context.fillStyle = layer.fill ? layer.color : "rgba(255, 255, 255, 0)";
        context.strokeStyle = layer.color;
        context.lineWidth = layer.strokeWidth;
        
        // Render path
        context.fill(tempPath);
        context.stroke(tempPath);
      });
    });
    
    // Prepare exports (PNG and SVG layers)
    const exports = [
      // Export PNG as first layer
      context.canvas
    ];
    
    // Add separate SVG exports for each active layer
    Object.entries(layers).forEach(([layerName, layer]) => {
      if (!layer.active || layer.paths.length === 0) return;
      
      exports.push({
        data: pathsToSVG(layer.paths, {
          width: CONFIG.exportWidth,
          height: CONFIG.exportHeight,
          units: settings.units,
          lineWidth: layer.strokeWidth,
          fillStyle: layer.fill ? layer.color : "none",
          optimize: true,
        }),
        extension: `.${layerName}.svg`,
      });
    });
    
    // Also export all layers combined
    exports.push({
      data: pathsToSVG(allPaths, {
        width: CONFIG.exportWidth,
        height: CONFIG.exportHeight,
        units: settings.units,
        lineWidth: CONFIG.strokeWidth,
        optimize: true,
      }),
      extension: ".combined.svg",
    });
    
    return exports;
  };
};

// ========================================================
// INITIALIZE SKETCH
// ========================================================

canvasSketch(sketch, settings);
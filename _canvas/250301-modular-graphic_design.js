/**
 * Modular Creative Coding Template with Multiple Shape Layers + Collage
 *
 * This version adds the ability to draw a background image onto the canvas,
 * creating a collage of photo + generative shapes for social media (PNG) and
 * pen plotting (SVG). The SVG exports remain vector-only.
 *
 * HOW IT WORKS:
 * 1) If CONFIG.backgroundImagePath is set, a custom loader creates an HTMLImageElement.
 * 2) The image is drawn first (PNG output), then the generative layers are drawn.
 * 3) SVG exports remain vector-only (raster images are not supported for pen plotting).
 *
 * TIP: For social sharing, use the PNG. For pen plotting, use the SVG exports.
 */

const canvasSketch = require("canvas-sketch");
const { pathsToSVG, createPath } = require("canvas-sketch-util/penplot");
const random = require("canvas-sketch-util/random");
const { lerp } = require("canvas-sketch-util/math");

// ========================================================
// CUSTOM IMAGE LOADER
// ========================================================
const loadImageElement = (url) =>
  new Promise((resolve, reject) => {
    const img = new Image();
    img.crossOrigin = "anonymous"; // in case of cross-origin requests
    img.onload = () => resolve(img);
    img.onerror = (err) => reject(err);
    img.src = url;
  });

// ========================================================
// CONFIGURATION
// ========================================================

// Project settings
const settings = {
  dimensions: [21, 29.7], // A4 dimensions [width, height] in cm
  orientation: "portrait",
  pixelsPerInch: 300,
  scaleToView: true,
  units: "cm",
  // Note: "preload" setting removed – assets are loaded inside the sketch.
};

// Global parameters
const CONFIG = {
  // General
  margin: 2,             // Canvas margin in units
  exportWidth: 21,       // Export width in units
  exportHeight: 29.7,    // Export height in units
  strokeWidth: 0.03,     // Default line width for pen plotting
  
  // Optional background image for the collage (set a valid path or URL)
  backgroundImagePath: null, // e.g., './images/myPhoto.jpg'

  // Grid parameters
  gridColumns: 50,
  gridRows: 70,
  gridNoiseScale: 0.1,
  gridDistortion: 0.3,
  
  // Circles parameters
  circleCount: 40,
  circleMinRadius: 0.2,
  circleMaxRadius: 1.5,
  
  // Lines parameters
  lineCount: 60,
  lineSegments: 5,
  lineMaxLength: 3,
  
  // Hatching parameters
  hatchSpacing: 0.2,
  hatchAngle: 45,
  hatchNoiseScale: 0.05,
  hatchRegions: 3,
}; 

// ========================================================
// LAYER MANAGEMENT
// ========================================================

const layers = {
  grid: {
    active: true,
    paths: [],
    color: "rgba(0, 0, 0, 1)",
    strokeWidth: 0.03,
    fill: false,
  },
  circles: {
    active: true,
    paths: [],
    color: "rgba(0, 0, 0, 1)",
    strokeWidth: 0.05,
    fill: false,
  },
  lines: {
    active: true,
    paths: [],
    color: "rgba(0, 0, 0, 1)",
    strokeWidth: 0.04,
    fill: false,
  },
  hatching: {
    active: true,
    paths: [],
    color: "rgba(0, 0, 0, 1)",
    strokeWidth: 0.02,
    fill: false,
  }
};

// ========================================================
// UTILITY FUNCTIONS
// ========================================================

/**
 * Converts degrees to radians.
 * @param {Number} degrees - Angle in degrees.
 * @returns {Number} Angle in radians.
 */
const degToRad = (degrees) => degrees * Math.PI / 180;

/**
 * Creates an evenly spaced grid of points.
 * @param {Number} width - Canvas width.
 * @param {Number} height - Canvas height.
 * @param {Number} columns - Number of columns.
 * @param {Number} rows - Number of rows.
 * @returns {Array} Array of [x, y, u, v] points.
 */
const createGrid = (width, height, columns, rows) => {
  const margin = CONFIG.margin;
  const points = [];
  
  for (let x = 0; x < columns; x++) {
    for (let y = 0; y < rows; y++) {
      const u = columns <= 1 ? 0.5 : x / (columns - 1);
      const v = rows <= 1 ? 0.5 : y / (rows - 1);
      
      const px = lerp(margin, width - margin, u);
      const py = lerp(margin, height - margin, v);
      
      points.push([px, py, u, v]);
    }
  }
  
  return points;
};

// ========================================================
// LAYER GENERATORS
// ========================================================

/**
 * Generates a distorted grid pattern.
 * @param {Number} width - Canvas width.
 * @param {Number} height - Canvas height.
 * @returns {Array} Array of paths.
 */
const generateGridLayer = (width, height) => {
  const gridPaths = [];
  const points = createGrid(width, height, CONFIG.gridColumns, CONFIG.gridRows);
  
  // Function to distort points using noise
  const distortPoint = (x, y) => {
    const noiseX = random.noise2D(x * CONFIG.gridNoiseScale, y * CONFIG.gridNoiseScale);
    const noiseY = random.noise2D(x * CONFIG.gridNoiseScale + 100, y * CONFIG.gridNoiseScale + 100);
    return [x + noiseX * CONFIG.gridDistortion, y + noiseY * CONFIG.gridDistortion];
  };
  
  // Horizontal grid lines
  for (let row = 0; row < CONFIG.gridRows; row++) {
    if (row % 4 !== 0) continue;
    
    const path = createPath(ctx => {
      for (let col = 0; col < CONFIG.gridColumns; col++) {
        const index = row * CONFIG.gridColumns + col;
        const point = points[index];
        if (!point) continue;
        
        const [x, y] = distortPoint(point[0], point[1]);
        if (col === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
    });
    
    gridPaths.push(path);
  }
  
  // Vertical grid lines
  for (let col = 0; col < CONFIG.gridColumns; col++) {
    if (col % 6 !== 0) continue;
    
    const path = createPath(ctx => {
      for (let row = 0; row < CONFIG.gridRows; row++) {
        const index = row * CONFIG.gridColumns + col;
        const point = points[index];
        if (!point) continue;
        
        const [x, y] = distortPoint(point[0], point[1]);
        if (row === 0) ctx.moveTo(x, y);
        else ctx.lineTo(x, y);
      }
    });
    
    gridPaths.push(path);
  }
  
  return gridPaths;
};

/**
 * Generates random circles with varying sizes.
 * @param {Number} width - Canvas width.
 * @param {Number} height - Canvas height.
 * @returns {Array} Array of circle paths.
 */
const generateCirclesLayer = (width, height) => {
  const circlePaths = [];
  const margin = CONFIG.margin;
  
  for (let i = 0; i < CONFIG.circleCount; i++) {
    const x = random.range(margin, width - margin);
    const y = random.range(margin, height - margin);
    
    const distanceToCenter = Math.hypot(x - width / 2, y - height / 2);
    const maxDist = Math.hypot(width / 2, height / 2);
    const normalizedDist = 1 - (distanceToCenter / maxDist);
    
    const radius = lerp(CONFIG.circleMinRadius, CONFIG.circleMaxRadius, normalizedDist * random.value());
    
    circlePaths.push(createPath(ctx => {
      ctx.arc(x, y, radius, 0, Math.PI * 2);
    }));
  }
  
  return circlePaths;
};

/**
 * Generates random multi-segment lines.
 * @param {Number} width - Canvas width.
 * @param {Number} height - Canvas height.
 * @returns {Array} Array of line paths.
 */
const generateLinesLayer = (width, height) => {
  const linePaths = [];
  const margin = CONFIG.margin;
  
  for (let i = 0; i < CONFIG.lineCount; i++) {
    linePaths.push(createPath(ctx => {
      let x = random.range(margin, width - margin);
      let y = random.range(margin, height - margin);
      ctx.moveTo(x, y);
      
      for (let j = 0; j < CONFIG.lineSegments; j++) {
        const angle = random.value() * Math.PI * 2;
        const length = random.range(0.2, CONFIG.lineMaxLength);
        x += Math.cos(angle) * length;
        y += Math.sin(angle) * length;
        x = Math.max(margin, Math.min(width - margin, x));
        y = Math.max(margin, Math.min(height - margin, y));
        ctx.lineTo(x, y);
      }
    }));
  }
  
  return linePaths;
};

/**
 * Generates hatched regions.
 * @param {Number} width - Canvas width.
 * @param {Number} height - Canvas height.
 * @returns {Array} Array of hatching paths.
 */
const generateHatchingLayer = (width, height) => {
  const hatchPaths = [];
  const margin = CONFIG.margin;
  
  for (let region = 0; region < CONFIG.hatchRegions; region++) {
    const centerX = random.range(margin + 2, width - margin - 2);
    const centerY = random.range(margin + 2, height - margin - 2);
    const regionWidth = random.range(3, 6);
    const regionHeight = random.range(3, 6);
    
    const left = Math.max(margin, centerX - regionWidth / 2);
    const right = Math.min(width - margin, centerX + regionWidth / 2);
    const top = Math.max(margin, centerY - regionHeight / 2);
    const bottom = Math.min(height - margin, centerY + regionHeight / 2);
    
    const spacing = CONFIG.hatchSpacing;
    const angle = CONFIG.hatchAngle + random.range(-15, 15);
    const radians = degToRad(angle);
    const sinAngle = Math.sin(radians);
    const cosAngle = Math.cos(radians);
    
    const diagonal = Math.hypot(right - left, bottom - top);
    
    for (let offset = -diagonal; offset < diagonal; offset += spacing) {
      hatchPaths.push(createPath(ctx => {
        const x0 = left;
        const y0 = top + offset / sinAngle;
        const x1 = right;
        const y1 = y0 + (x1 - x0) * (cosAngle / sinAngle);
        ctx.moveTo(x0, y0);
        ctx.lineTo(x1, y1);
      }));
    }
  }
  
  return hatchPaths;
};

// ========================================================
// MAIN SKETCH FUNCTION
// ========================================================

const sketch = ({ width, height, units }, backgroundImage) => {
  // Generate generative layers if active
  if (layers.grid.active) layers.grid.paths = generateGridLayer(width, height);
  if (layers.circles.active) layers.circles.paths = generateCirclesLayer(width, height);
  if (layers.lines.active) layers.lines.paths = generateLinesLayer(width, height);
  if (layers.hatching.active) layers.hatching.paths = generateHatchingLayer(width, height);
  
  const allPaths = [];
  Object.values(layers).forEach(layer => {
    if (layer.active) allPaths.push(...layer.paths);
  });
  
  return ({ context, width, height }) => {
    // Clear canvas
    context.clearRect(0, 0, width, height);
    
    // 1) Draw background image if available
    if (backgroundImage) {
      context.drawImage(backgroundImage, 0, 0, width, height);
    } else {
      context.fillStyle = "white";
      context.fillRect(0, 0, width, height);
    }
    
    // 2) Draw generative layers on top
    Object.values(layers).forEach(layer => {
      if (!layer.active || !layer.paths.length) return;
      layer.paths.forEach(path => {
        const pathString = path.toString();
        const tempPath = new Path2D(pathString);
        context.fillStyle = layer.fill ? layer.color : "rgba(255, 255, 255, 0)";
        context.strokeStyle = layer.color;
        context.lineWidth = layer.strokeWidth;
        context.fill(tempPath);
        context.stroke(tempPath);
      });
    });
    
    // Prepare exports:
    const exports = [
      // PNG of the complete collage:
      context.canvas
    ];
    
    // SVG exports for each layer (vector-only)
    Object.entries(layers).forEach(([layerName, layer]) => {
      if (!layer.active || !layer.paths.length) return;
      exports.push({
        data: pathsToSVG(layer.paths, {
          width: CONFIG.exportWidth,
          height: CONFIG.exportHeight,
          units: settings.units,
          lineWidth: layer.strokeWidth,
          fillStyle: layer.fill ? layer.color : "none",
          optimize: true
        }),
        extension: `.${layerName}.svg`
      });
    });
    
    // Combined SVG export for pen plotting
    exports.push({
      data: pathsToSVG(allPaths, {
        width: CONFIG.exportWidth,
        height: CONFIG.exportHeight,
        units: settings.units,
        lineWidth: CONFIG.strokeWidth,
        optimize: true,
      }),
      extension: ".combined.svg"
    });
    
    return exports;
  };
};

// ========================================================
// INITIALIZE SKETCH
// ========================================================

module.exports = canvasSketch(async ({ width, height, units }) => {
  let backgroundImage = './images/portrait.png';
  CONFIG.backgroundImagePath = backgroundImage;

  if (CONFIG.backgroundImagePath) {
    try {
      backgroundImage = await loadImageElement(CONFIG.backgroundImagePath);
    } catch (err) {
      console.warn("Could not load background image:", CONFIG.backgroundImagePath, err);
    }
  }
  return sketch({ width, height, units }, backgroundImage);
}, settings);

/*
=================================================================
EXPORT INSTRUCTIONS
=================================================================

1. INSTALL & RUN:
   - Install dependencies: npm install canvas-sketch canvas-sketch-util
   - Run with: canvas-sketch <this-file.js> --open

2. BACKGROUND IMAGE:
   - Set CONFIG.backgroundImagePath to a valid path or URL (or leave null for a white background)

3. EXPORTING OUTPUT:
   - Use Ctrl+S (or Cmd+S) to save the PNG (collage) and separate SVG files (vector-only)

4. CREATIVE OPTIONS:
   - Toggle layers by setting layers.<layerName>.active
   - Adjust CONFIG parameters to explore different designs
*/

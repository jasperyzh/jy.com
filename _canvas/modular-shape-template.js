/**
 * Modular Creative Coding Template with Multiple Shape Layers
 * 
 * A simplified template for creative coding and pen plotting projects 
 * featuring four different shape types as layers that can be mixed and matched.
 */

const canvasSketch = require("canvas-sketch");
const { pathsToSVG, createPath } = require("canvas-sketch-util/penplot");
const random = require("canvas-sketch-util/random");
const { lerp } = require("canvas-sketch-util/math");

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
};

// Global parameters
const CONFIG = {
  // General
  margin: 2,             // Canvas margin in units
  exportWidth: 21,       // Export width in units
  exportHeight: 29.7,    // Export height in units
  strokeWidth: 0.03,     // Line width for pen plotting
  
  // Grid parameters
  gridColumns: 50,       // Number of grid columns
  gridRows: 70,          // Number of grid rows
  gridNoiseScale: 0.1,   // Noise scale for grid distortion
  gridDistortion: 0.3,   // Maximum grid distortion amount
  
  // Circles parameters
  circleCount: 40,       // Number of circles
  circleMinRadius: 0.2,  // Minimum circle radius
  circleMaxRadius: 1.5,  // Maximum circle radius
  
  // Lines parameters
  lineCount: 60,         // Number of lines
  lineSegments: 5,       // Segments per line
  lineMaxLength: 3,      // Maximum line segment length
  
  // Hatching parameters
  hatchSpacing: 0.2,     // Space between hatch lines
  hatchAngle: 45,        // Angle of hatching in degrees
  hatchNoiseScale: 0.05, // Noise scale for hatch distortion
  hatchRegions: 3,       // Number of hatch regions
}; 

// ========================================================
// LAYER MANAGEMENT
// ========================================================

// Container for all layers
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
 * Maps a value from one range to another
 * @param {Number} value - The value to map
 * @param {Number} inMin - Input range minimum
 * @param {Number} inMax - Input range maximum
 * @param {Number} outMin - Output range minimum
 * @param {Number} outMax - Output range maximum
 * @returns {Number} Mapped value
 */
const mapRange = (value, inMin, inMax, outMin, outMax) => {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
};

/**
 * Converts degrees to radians
 * @param {Number} degrees - Angle in degrees
 * @returns {Number} Angle in radians
 */
const degToRad = (degrees) => {
  return degrees * Math.PI / 180;
};

/**
 * Creates an evenly spaced grid of points
 * @param {Number} width - Canvas width
 * @param {Number} height - Canvas height
 * @param {Number} columns - Number of columns
 * @param {Number} rows - Number of rows
 * @returns {Array} Array of [x, y] points
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
 * Generates a distorted grid pattern
 * @param {Number} width - Canvas width
 * @param {Number} height - Canvas height
 * @returns {Array} Array of paths
 */
const generateGridLayer = (width, height) => {
  const gridPaths = [];
  const points = createGrid(
    width, 
    height, 
    CONFIG.gridColumns, 
    CONFIG.gridRows
  );
  
  // Create distorted grid paths
  const distortPoint = (x, y) => {
    const noiseX = random.noise2D(x * CONFIG.gridNoiseScale, y * CONFIG.gridNoiseScale);
    const noiseY = random.noise2D(x * CONFIG.gridNoiseScale + 100, y * CONFIG.gridNoiseScale + 100);
    
    return [
      x + noiseX * CONFIG.gridDistortion,
      y + noiseY * CONFIG.gridDistortion
    ];
  };
  
  // Create horizontal grid lines
  for (let row = 0; row < CONFIG.gridRows; row++) {
    // Skip some rows for a more interesting pattern
    if (row % 4 !== 0) continue;
    
    const path = createPath((ctx) => {
      for (let col = 0; col < CONFIG.gridColumns; col++) {
        const index = row * CONFIG.gridColumns + col;
        const point = points[index];
        
        if (!point) continue;
        
        const [x, y] = distortPoint(point[0], point[1]);
        
        if (col === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
    });
    
    gridPaths.push(path);
  }
  
  // Create vertical grid lines
  for (let col = 0; col < CONFIG.gridColumns; col++) {
    // Skip some columns for a more interesting pattern
    if (col % 6 !== 0) continue;
    
    const path = createPath((ctx) => {
      for (let row = 0; row < CONFIG.gridRows; row++) {
        const index = row * CONFIG.gridColumns + col;
        const point = points[index];
        
        if (!point) continue;
        
        const [x, y] = distortPoint(point[0], point[1]);
        
        if (row === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      }
    });
    
    gridPaths.push(path);
  }
  
  return gridPaths;
};

/**
 * Generates random circles with varying sizes
 * @param {Number} width - Canvas width
 * @param {Number} height - Canvas height
 * @returns {Array} Array of circle paths
 */
const generateCirclesLayer = (width, height) => {
  const circlePaths = [];
  const margin = CONFIG.margin;
  
  for (let i = 0; i < CONFIG.circleCount; i++) {
    // Random position within margins
    const x = random.range(margin, width - margin);
    const y = random.range(margin, height - margin);
    
    // Random radius based on position (larger near center)
    const distanceToCenter = Math.sqrt(
      Math.pow((x - width/2), 2) + 
      Math.pow((y - height/2), 2)
    );
    
    const maxDist = Math.sqrt(Math.pow(width/2, 2) + Math.pow(height/2, 2));
    const normalizedDist = 1 - (distanceToCenter / maxDist);
    
    const radius = lerp(
      CONFIG.circleMinRadius,
      CONFIG.circleMaxRadius,
      normalizedDist * random.value()
    );
    
    // Create circle path
    circlePaths.push(createPath(ctx => {
      ctx.arc(x, y, radius, 0, Math.PI * 2);
    }));
  }
  
  return circlePaths;
};

/**
 * Generates random multi-segment lines
 * @param {Number} width - Canvas width
 * @param {Number} height - Canvas height
 * @returns {Array} Array of line paths
 */
const generateLinesLayer = (width, height) => {
  const linePaths = [];
  const margin = CONFIG.margin;
  
  for (let i = 0; i < CONFIG.lineCount; i++) {
    // Create a multi-segment line
    linePaths.push(createPath(ctx => {
      // Start at a random position
      let x = random.range(margin, width - margin);
      let y = random.range(margin, height - margin);
      
      ctx.moveTo(x, y);
      
      // Add random segments
      for (let j = 0; j < CONFIG.lineSegments; j++) {
        const angle = random.value() * Math.PI * 2;
        const length = random.range(0.2, CONFIG.lineMaxLength);
        
        x += Math.cos(angle) * length;
        y += Math.sin(angle) * length;
        
        // Keep within bounds
        x = Math.max(margin, Math.min(width - margin, x));
        y = Math.max(margin, Math.min(height - margin, y));
        
        ctx.lineTo(x, y);
      }
    }));
  }
  
  return linePaths;
};

/**
 * Generates hatched regions
 * @param {Number} width - Canvas width
 * @param {Number} height - Canvas height
 * @returns {Array} Array of hatching paths
 */
const generateHatchingLayer = (width, height) => {
  const hatchPaths = [];
  const margin = CONFIG.margin;
  
  // Create several hatched regions
  for (let region = 0; region < CONFIG.hatchRegions; region++) {
    // Random region center and size
    const centerX = random.range(margin + 2, width - margin - 2);
    const centerY = random.range(margin + 2, height - margin - 2);
    const regionWidth = random.range(3, 6);
    const regionHeight = random.range(3, 6);
    
    // Ensure region is within canvas bounds
    const left = Math.max(margin, centerX - regionWidth/2);
    const right = Math.min(width - margin, centerX + regionWidth/2);
    const top = Math.max(margin, centerY - regionHeight/2);
    const bottom = Math.min(height - margin, centerY + regionHeight/2);
    
    // Generate hatching lines
    const spacing = CONFIG.hatchSpacing;
    const angle = CONFIG.hatchAngle + random.range(-15, 15); // Add some variation
    const radians = degToRad(angle);
    
    // Calculate parameters for hatching
    const sinAngle = Math.sin(radians);
    const cosAngle = Math.cos(radians);
    
    // Find the projection of the region onto the hatching direction
    const diagonal = Math.sqrt(
      Math.pow(right - left, 2) + 
      Math.pow(bottom - top, 2)
    );
    
    // Create parallel hatch lines
    for (let offset = -diagonal; offset < diagonal; offset += spacing) {
      hatchPaths.push(createPath(ctx => {
        // Create hatching line
        const x0 = left;
        const y0 = top + offset / sinAngle;
        const x1 = right;
        const y1 = y0 + (x1 - x0) * cosAngle / sinAngle;
        
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

const sketch = ({ width, height }) => {
  // Generate each layer if active
  if (layers.grid.active) {
    layers.grid.paths = generateGridLayer(width, height);
  }
  
  if (layers.circles.active) {
    layers.circles.paths = generateCirclesLayer(width, height);
  }
  
  if (layers.lines.active) {
    layers.lines.paths = generateLinesLayer(width, height);
  }
  
  if (layers.hatching.active) {
    layers.hatching.paths = generateHatchingLayer(width, height);
  }
  
  // Collect all active paths for combined export
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
    
    // Export all layers combined
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

/*
=================================================================
EXPORT INSTRUCTIONS FOR PEN PLOTTING
=================================================================

1. RUNNING THE SKETCH:
   - Install dependencies: npm install canvas-sketch canvas-sketch-util
   - Run with: canvas-sketch modular-shape-template.js --open

2. EXPORTING SVG:
   - Press Ctrl+S to save all generated SVG files
   - Files will be saved with naming format: 
     YYYYMMDD-HHMMSS.[layername].svg and YYYYMMDD-HHMMSS.combined.svg

3. PREPARING FOR PEN PLOTTING:
   - Use the individual layer SVGs to plot specific elements
   - Layer recommendations:
     * Grid layer: Use thin pen (0.1-0.2mm)
     * Circles layer: Use medium pen (0.3-0.5mm)
     * Lines layer: Use medium pen (0.3-0.5mm)
     * Hatching layer: Use thin pen (0.1-0.2mm)

4. ADJUSTING THE DESIGN:
   - Modify CONFIG parameters to change the visual outcome
   - Toggle layers on/off by setting 'active' property to true/false
   - Adjust layer colors and stroke widths for preview

5. TIPS FOR PENPLOTTING:
   - For multi-color plots, export each layer separately and plot with different pens
   - Adjust the settings.dimensions to match your plotter's paper size
   - Use CONFIG.strokeWidth to control pen size in the exported SVG
   - For cleaner output, increase CONFIG.pixelsPerInch to 600 or higher
*/
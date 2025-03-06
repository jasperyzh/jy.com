/**
 * Modular Creative Coding Template with Hatchfill for SVG Pen Plotting
 * 
 * A template for creative coding with advanced hatchfill patterns
 * that can be applied to various shapes and exported as SVG for pen plotting.
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
  useGrid: true,         // Arrange shapes in a grid instead of random positions
  gridCols: 4,           // Number of columns in the grid
  gridRows: 4,           // Number of rows in the grid
  
  // Shape parameters
  shapeCount: 3,         // Number of shapes to generate (only used when useGrid is false)
  minShapeSize: 6,       // Minimum shape size
  maxShapeSize: 12,       // Maximum shape size
  drawOutlines: false,    // Draw shape outlines for debugging
  outlineColor: "rgba(255, 0, 0, 0.7)", // Color for shape outlines
  
  // Flow field parameters
  flowFieldRows: 20,     // Number of flow field rows
  flowFieldCols: 30,     // Number of flow field columns
  flowNoiseScale: 0.1,   // Noise scale for flow field
  visualizeFlow: false,  // Visualize the flow field with arrows (for debugging)
  
  // Hatch parameters
  hatchSpacing: 0.12,    // Space between hatch lines
  hatchExtent: null,
  minAmplitude: 0.35,    // Minimum wave amplitude
  maxAmplitude: 0.7,     // Maximum wave amplitude
  minFrequency: 0.05,    // Minimum wave frequency
  maxFrequency: 0.3,     // Maximum wave frequency
  
  // Wave type options: "triangle", "sin", "square", "saw", "exp", "rmp", "random"
  waveType: "sin",
};

// ========================================================
// LAYER MANAGEMENT
// ========================================================

// Container for all layers
const layers = {
  rect: {
    active: false,
    paths: [],
    color: "rgba(0, 0, 0, 1)",
    strokeWidth: 0.03,
    fill: false,
  },
  ellipse: {
    active: false,
    paths: [],
    color: "rgba(0, 0, 0, 1)",
    strokeWidth: 0.03,
    fill: false,
  },
  triangle: {
    active: false,
    paths: [],
    color: "rgba(0, 0, 0, 1)",
    strokeWidth: 0.03,
    fill: false,
  },
  polygon: {
    active: true,
    paths: [],
    color: "rgba(0, 0, 0, 1)",
    strokeWidth: 0.03,
    fill: false,
  },
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
 * Converts radians to degrees
 * @param {Number} radians - Angle in radians
 * @returns {Number} Angle in degrees
 */
const radToDeg = (radians) => {
  let degrees = ((radians * 180) / Math.PI) % 360;
  return degrees < 0 ? degrees + 360 : degrees;
};

/**
 * Creates a flow field using Perlin noise
 * @param {Number} rows - Number of rows
 * @param {Number} cols - Number of columns
 * @param {Number} noiseScale - Scale factor for noise
 * @returns {Array} 2D array of angle vectors
 */
const createFlowField = (rows, cols, noiseScale = 0.1) => {
  const flowField = [];
  
  for (let y = 0; y < rows; y++) {
    flowField[y] = [];
    for (let x = 0; x < cols; x++) {
      const angle = random.noise2D(x * noiseScale, y * noiseScale) * Math.PI * 2;
      
      // Store the angle directly
      flowField[y][x] = angle;
    }
  }
  
  return flowField;
};

/**
 * Gets the flow field angle at a specific position
 * @param {Number} x - X coordinate
 * @param {Number} y - Y coordinate
 * @param {Number} width - Canvas width
 * @param {Number} height - Canvas height
 * @param {Array} flowField - Flow field array
 * @returns {Number} Angle in degrees
 */
const getFlowAngle = (x, y, width, height, flowField) => {
  const rows = flowField.length;
  const cols = flowField[0].length;
  
  // Convert position to flow field indices
  const col = Math.floor(mapRange(x, 0, width, 0, cols - 1));
  const row = Math.floor(mapRange(y, 0, height, 0, rows - 1));
  
  // Ensure indices are within bounds
  const boundedRow = Math.max(0, Math.min(row, rows - 1));
  const boundedCol = Math.max(0, Math.min(col, cols - 1));
  
  // Return the angle in degrees
  return radToDeg(flowField[boundedRow][boundedCol]);
};

// ========================================================
// HATCHFILL CLASS
// ========================================================

class HatchFill {
  constructor(options = {}) {
    this.patternType = options.patternType || "wave";
    this.angle = options.angle || 45;
    this.spacing = options.spacing || 0.2;
    this.strokeWidth = options.strokeWidth || 0.03;
    this.waveType = options.waveType || "sin";
    this.amplitude = options.amplitude || 0.5;
    this.frequency = options.frequency || 0.1;
    this.enableOutline = options.enableOutline || false;
  }

  /**
   * Apply hatching to a rectangle
   * @param {Number} x - Rectangle x position
   * @param {Number} y - Rectangle y position
   * @param {Number} w - Rectangle width
   * @param {Number} h - Rectangle height
   * @returns {Array} Array of paths
   */
  applyToRect(x, y, w, h) {

    console.log('applyToRect', x,y,w,h);
    const isInside = (px, py) => px >= x && px <= x + w && py >= y && py <= y + h;
    const paths = this._generateHatchPaths(isInside, x, y, w, h);
    
    // Add outline if enabled
    if (this.enableOutline) {
      paths.push(createPath(ctx => {
        ctx.rect(x, y, w, h);
      }));
    }
    
    return paths;
  }

  /**
   * Apply hatching to an ellipse
   * @param {Number} cx - Ellipse center x
   * @param {Number} cy - Ellipse center y
   * @param {Number} rx - Ellipse x radius
   * @param {Number} ry - Ellipse y radius
   * @returns {Array} Array of paths
   */
  applyToEllipse(cx, cy, rx, ry) {
    const isInside = (px, py) => {
      const dx = px - cx;
      const dy = py - cy;
      return (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry) <= 1;
    };
    
    const paths = this._generateHatchPaths(isInside, cx - rx, cy - ry, rx * 2, ry * 2);
    
    // Add outline if enabled
    if (this.enableOutline) {
      paths.push(createPath(ctx => {
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
      }));
    }
    
    return paths;
  }

  /**
   * Apply hatching to a triangle
   * @param {Number} x1 - First vertex x
   * @param {Number} y1 - First vertex y
   * @param {Number} x2 - Second vertex x
   * @param {Number} y2 - Second vertex y
   * @param {Number} x3 - Third vertex x
   * @param {Number} y3 - Third vertex y
   * @returns {Array} Array of paths
   */
  applyToTriangle(x1, y1, x2, y2, x3, y3) {
    // Point in triangle test using barycentric coordinates
    const isInside = (px, py) => {
      const a = ((y2 - y3) * (px - x3) + (x3 - x2) * (py - y3)) /
               ((y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3));
      const b = ((y3 - y1) * (px - x3) + (x1 - x3) * (py - y3)) /
               ((y2 - y3) * (x1 - x3) + (x3 - x2) * (y1 - y3));
      const c = 1 - a - b;
      
      return 0 <= a && a <= 1 && 0 <= b && b <= 1 && 0 <= c && c <= 1;
    };
    
    // Find bounding box
    const minX = Math.min(x1, x2, x3);
    const minY = Math.min(y1, y2, y3);
    const maxX = Math.max(x1, x2, x3);
    const maxY = Math.max(y1, y2, y3);
    
    const paths = this._generateHatchPaths(isInside, minX, minY, maxX - minX, maxY - minY);
    
    // Add outline if enabled
    if (this.enableOutline) {
      paths.push(createPath(ctx => {
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.lineTo(x3, y3);
        ctx.closePath();
      }));
    }
    
    return paths;
  }

  /**
   * Apply hatching to a polygon
   * @param {Array} vertices - Array of {x, y} vertices
   * @returns {Array} Array of paths
   */
  applyToPolygon(vertices) {
    // Point in polygon test using ray casting
    const isInside = (px, py) => {
      let inside = false;
      for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
        const xi = vertices[i].x;
        const yi = vertices[i].y;
        const xj = vertices[j].x;
        const yj = vertices[j].y;
        
        const intersect = ((yi > py) !== (yj > py)) &&
                          (px < (xj - xi) * (py - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
      }
      return inside;
    };
    
    // Find bounding box
    const minX = Math.min(...vertices.map(v => v.x));
    const minY = Math.min(...vertices.map(v => v.y));
    const maxX = Math.max(...vertices.map(v => v.x));
    const maxY = Math.max(...vertices.map(v => v.y));
    
    const paths = this._generateHatchPaths(isInside, minX, minY, maxX - minX, maxY - minY);
    
    // Add outline if enabled
    if (this.enableOutline) {
      paths.push(createPath(ctx => {
        ctx.moveTo(vertices[0].x, vertices[0].y);
        for (let i = 1; i < vertices.length; i++) {
          ctx.lineTo(vertices[i].x, vertices[i].y);
        }
        ctx.closePath();
      }));
    }
    
    return paths;
  }

  /**
   * Generate hatch pattern paths
   * @private
   * @param {Function} isInside - Function to test if a point is inside the shape
   * @param {Number} x - Bounding box x
   * @param {Number} y - Bounding box y
   * @param {Number} w - Bounding box width
   * @param {Number} h - Bounding box height
   * @returns {Array} Array of paths
   */
  _generateHatchPaths(isInside, x, y, w, h) {
    const paths = [];
    const angleRad = degToRad(this.angle);
    const diagonal = CONFIG.hatchExtent || Math.sqrt(w * w + h * h);
    const cosAngle = Math.cos(angleRad);
    const sinAngle = Math.sin(angleRad);
    
    // Generate lines along the pattern direction
    for (let offset = -diagonal; offset <= diagonal; offset += this.spacing) {
      const linePoints = [];
      const precision = Math.min(w, h) / 50; // Sampling precision
      
      // Sample points along a line
      for (let t = -diagonal; t <= diagonal; t += precision) {
        // Base coordinates of a point on the line
        const baseX = offset * cosAngle - t * sinAngle;
        const baseY = offset * sinAngle + t * cosAngle;
        
        // Apply wave distortion
        const waveY = this._getWaveOffset(t) * this.amplitude;
        
        // Actual coordinates in the canvas space
        const actualX = baseX + x;  // Properly offset by the shape's x position
        const actualY = baseY + y + waveY;  // Properly offset by the shape's y position
        
        // Check if the point is inside the shape
        if (isInside(actualX, actualY)) {
          linePoints.push({ x: actualX, y: actualY });
        }
      }
      
      // Create path from points
      if (linePoints.length > 1) {
        paths.push(createPath(ctx => {
          ctx.moveTo(linePoints[0].x, linePoints[0].y);
          for (let i = 1; i < linePoints.length; i++) {
            ctx.lineTo(linePoints[i].x, linePoints[i].y);
          }
        }));
      }
    }
    
    return paths;
  }

  /**
   * Get wave offset at position t
   * @private
   * @param {Number} t - Position along the wave
   * @returns {Number} Offset value between -1 and 1
   */
  _getWaveOffset(t) {
    const scaledT = t * this.frequency;
    
    switch (this.waveType) {
      case "triangle":
        return 2 * Math.abs((scaledT % 1) - 0.5) - 0.5;
      case "sin":
        return Math.sin(scaledT * Math.PI * 2);
      case "square":
        return Math.sign(Math.sin(scaledT * Math.PI * 2));
      case "saw":
        return (scaledT % 1) - 0.5;
      case "exp":
        return Math.exp(-(scaledT % 1)) - 1;
      case "rmp":
        return scaledT % 1;
      case "random":
        return random.noise1D(scaledT, 0.5) * 2 - 1;
      default:
        return 0;
    }
  }
}

// ========================================================
// SHAPE GENERATORS
// ========================================================

/**
 * Generates shapes with hatchfill patterns using flow field
 * @param {Number} width - Canvas width
 * @param {Number} height - Canvas height
 * @param {String} shapeType - Type of shape to generate
 * @param {Array} flowField - Flow field for angle guidance
 * @returns {Array} Array of paths
 */
const generateShapeLayer = (width, height, shapeType, flowField) => {
  const paths = [];
  const margin = CONFIG.margin;
  
  // Determine positions based on grid or random layout
  const positions = [];
  
  if (CONFIG.useGrid) {
    // Calculate grid cell size
    const gridWidth = width - 2 * margin;
    const gridHeight = height - 2 * margin;
    const cellWidth = gridWidth / CONFIG.gridCols;
    const cellHeight = gridHeight / CONFIG.gridRows;
    
    // Create a position for each grid cell
    for (let row = 0; row < CONFIG.gridRows; row++) {
      for (let col = 0; col < CONFIG.gridCols; col++) {
        // Calculate cell center position
        const centerX = margin + col * cellWidth + cellWidth / 2;
        const centerY = margin + row * cellHeight + cellHeight / 2;
        
        // Maximum size that fits in the cell (with a small gap)
        const maxSize = Math.min(cellWidth, cellHeight) * 0.8;
        
        positions.push({
          x: centerX - maxSize / 2,  // Adjust to top-left corner for shape placement
          y: centerY - maxSize / 2,
          size: maxSize
        });
      }
    }
  } else {
    // Random positions for non-grid layout
    for (let i = 0; i < CONFIG.shapeCount; i++) {
      // Random position within margins
      const x = random.range(margin, width - margin - CONFIG.maxShapeSize);
      const y = random.range(margin, height - margin - CONFIG.maxShapeSize);
      
      // Size based on position (larger near center)
      const distanceToCenter = Math.sqrt(
        Math.pow((x - width/2), 2) + 
        Math.pow((y - height/2), 2)
      );
      
      const maxDist = Math.sqrt(Math.pow(width/2, 2) + Math.pow(height/2, 2));
      const normalizedDist = 1 - (distanceToCenter / maxDist);
      
      const size = lerp(
        CONFIG.minShapeSize,
        CONFIG.maxShapeSize,
        normalizedDist * random.value()
      );
      
      positions.push({ x, y, size });
    }
  }
  
  // Generate shapes at each position
  for (const pos of positions) {
    const { x, y, size } = pos;
    
    // Get flow field angle at this position
    const flowAngle = getFlowAngle(x, y, width, height, flowField);
    
    // Randomize parameters based on position
    const positionSeed = (x * y) / (width * height);
    const amplitude = lerp(
      CONFIG.minAmplitude, 
      CONFIG.maxAmplitude, 
      random.value()
    );
    const frequency = lerp(
      CONFIG.minFrequency, 
      CONFIG.maxFrequency,
      random.value()
    );
    
    // Create hatchfill for this shape
    const hatchFill = new HatchFill({
      patternType: "wave",
      angle: flowAngle,
      spacing: CONFIG.hatchSpacing,
      strokeWidth: CONFIG.strokeWidth,
      waveType: CONFIG.waveType,
      amplitude: amplitude,
      frequency: frequency,
      enableOutline: CONFIG.drawOutlines // Use the outline option from config
    });
    
    // Generate shape with hatchfill based on shape type
    let shapePaths = [];
    
    // Also create outline path for debugging if needed
    let outlinePath = null;
    
    switch (shapeType) {
      case "rect":
        shapePaths = hatchFill.applyToRect(x, y, size, size);
        
        // Add outline for debugging if enabled
        if (CONFIG.drawOutlines && !hatchFill.enableOutline) {
          outlinePath = createPath(ctx => {
            ctx.rect(x, y, size, size);
          });
        }
        break;
        
      case "ellipse":
        const rx = size / 2;
        const ry = size * random.range(0.8, 1.2) / 2; // Less variation in grid mode
        shapePaths = hatchFill.applyToEllipse(x + rx, y + ry, rx, ry);
        
        // Add outline for debugging if enabled
        if (CONFIG.drawOutlines && !hatchFill.enableOutline) {
          outlinePath = createPath(ctx => {
            ctx.ellipse(x + rx, y + ry, rx, ry, 0, 0, Math.PI * 2);
          });
        }
        break;
        
      case "triangle":
        const tx = x + size / 2;
        const ty = y;
        shapePaths = hatchFill.applyToTriangle(
          tx, ty,
          x, y + size,
          x + size, y + size
        );
        
        // Add outline for debugging if enabled
        if (CONFIG.drawOutlines && !hatchFill.enableOutline) {
          outlinePath = createPath(ctx => {
            ctx.moveTo(tx, ty);
            ctx.lineTo(x, y + size);
            ctx.lineTo(x + size, y + size);
            ctx.closePath();
          });
        }
        break;
        
      case "polygon":
        // Create a polygon with 5-7 vertices
        const vertexCount = Math.floor(random.range(5, 8));
        const vertices = [];
        const cx = x + size / 2;
        const cy = y + size / 2;
        
        for (let j = 0; j < vertexCount; j++) {
          const angle = (j / vertexCount) * Math.PI * 2;
          const radius = size / 2 * random.range(0.8, 1); // Less variation in grid mode
          vertices.push({
            x: cx + Math.cos(angle) * radius,
            y: cy + Math.sin(angle) * radius
          });
        }
        
        shapePaths = hatchFill.applyToPolygon(vertices);
        
        // Add outline for debugging if enabled
        if (CONFIG.drawOutlines && !hatchFill.enableOutline) {
          outlinePath = createPath(ctx => {
            ctx.moveTo(vertices[0].x, vertices[0].y);
            for (let i = 1; i < vertices.length; i++) {
              ctx.lineTo(vertices[i].x, vertices[i].y);
            }
            ctx.closePath();
          });
        }
        break;
    }
    
    // Add generated paths to layer
    paths.push(...shapePaths);
    
    // Add outline path if we created one
    if (outlinePath) {
      paths.push(outlinePath);
    }
  }
  
  // Add flow field visualization if enabled
  if (CONFIG.visualizeFlow) {
    const flowFieldPaths = visualizeFlowField(width, height, flowField);
    paths.push(...flowFieldPaths);
  }
  
  return paths;
};

/**
 * Creates visual representation of the flow field for debugging
 * @param {Number} width - Canvas width
 * @param {Number} height - Canvas height
 * @param {Array} flowField - Flow field array
 * @returns {Array} Array of paths
 */
const visualizeFlowField = (width, height, flowField) => {
  const paths = [];
  const rows = flowField.length;
  const cols = flowField[0].length;
  
  // Spacing between flow field indicators
  const spacingX = width / cols;
  const spacingY = height / rows;
  
  // Create arrow paths for each flow field cell
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      const x = col * spacingX + spacingX / 2;
      const y = row * spacingY + spacingY / 2;
      const angle = flowField[row][col];
      
      // Create arrow path
      paths.push(createPath(ctx => {
        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(angle);
        
        // Arrow line
        const arrowLength = Math.min(spacingX, spacingY) * 0.4;
        ctx.moveTo(0, 0);
        ctx.lineTo(arrowLength, 0);
        
        // Arrow head
        const headSize = arrowLength * 0.3;
        ctx.moveTo(arrowLength, 0);
        ctx.lineTo(arrowLength - headSize, -headSize / 2);
        ctx.moveTo(arrowLength, 0);
        ctx.lineTo(arrowLength - headSize, headSize / 2);
        
        ctx.restore();
      }));
    }
  }
  
  return paths;
};

// ========================================================
// MAIN SKETCH FUNCTION
// ========================================================

const sketch = ({ width, height }) => {

  
  // Create flow field
  const flowField = createFlowField(
    CONFIG.flowFieldRows,
    CONFIG.flowFieldCols,
    CONFIG.flowNoiseScale
  );
  
  // Generate each layer if active
  Object.entries(layers).forEach(([layerName, layer]) => {
    if (layer.active) {
      console.log('Object.entries(layers)', width, height, layerName, flowField)
      layer.paths = generateShapeLayer(width, height, layerName, flowField);
    }
  });
  
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
   - Run with: canvas-sketch modular-hatchfill-template.js --open

2. EXPORTING SVG:
   - Press Ctrl+S to save all generated SVG files
   - Files will be saved with naming format: 
     YYYYMMDD-HHMMSS.[layername].svg and YYYYMMDD-HHMMSS.combined.svg

3. PREPARING FOR PEN PLOTTING:
   - Use the combined.svg file for plotting all shapes together
   - Use individual layer SVGs to plot specific shape types

4. ADJUSTING THE DESIGN:
   - Modify CONFIG parameters to change the visual outcome:
     * shapeCount: Number of shapes to generate
     * minShapeSize/maxShapeSize: Size range of shapes
     * hatchSpacing: Distance between hatch lines
     * waveType: Pattern of waves (try "sin", "triangle", "square", etc.)
     * minAmplitude/maxAmplitude: Range of wave heights
     * minFrequency/maxFrequency: Range of wave frequencies
     * flowFieldRows/flowFieldCols: Resolution of the flow field
     * flowNoiseScale: Controls the smoothness of flow field

   - Toggle layers on/off by setting 'active' property to true/false
   - Adjust stroke widths for different pen thicknesses

5. UNDERSTANDING THE CODE:
   - The HatchFill class handles filling shapes with wave-like patterns
   - Flow field provides organic direction for the hatch lines
   - Each shape type (rect, ellipse, triangle, polygon) has its own layer
   - All layers are combined for the final export
*/
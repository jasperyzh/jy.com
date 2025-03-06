/**
 * 4x4 Grid Animation with Generative Shapes
 * 
 * Creates a grid of cells, each containing a different animated generative shape.
 * Animation loops every 10 seconds by default.
 */

const canvasSketch = require("canvas-sketch");
const { pathsToSVG, createPath } = require("canvas-sketch-util/penplot");
const random = require("canvas-sketch-util/random");
const { lerp } = require("canvas-sketch-util/math");
const math = require("canvas-sketch-util/math");

// ========================================================
// ADJUSTABLE VARIABLES (modify these to experiment!)
// ========================================================
const ANIMATION = {
  loopDuration: 4, // Loop duration in seconds (increased for slower animation)
  fps: 60, // Frames per second
};

const GRID = {
  rows: 4, // Number of rows in the grid
  columns: 4, // Number of columns in the grid
  padding: 0.5, // Padding around each cell in cm
  strokeWidth: 0.03, // Default stroke width for paths
};

const CANVAS = {
  width: 30, // Canvas width in cm
  height: 30, // Canvas height in cm
  margin: 2, // Canvas margin in cm
  backgroundColor: "#ffffff", // Background color
  strokeColor: "#000000", // Default stroke color
};

const SHAPES = {
  baseSize: 0.8, // Base size of shapes relative to cell size
  maxComplexity: 12, // Maximum complexity of shapes (vertices/segments)
  minComplexity: 3, // Minimum complexity of shapes
  variationScale: 0.5, // Scale of random variations (0-1)
};

// ========================================================
// CONFIGURATION
// ========================================================
const settings = {
  dimensions: [CANVAS.width, CANVAS.height], // Canvas dimensions in cm
  orientation: "portrait",
  pixelsPerInch: 300,
  scaleToView: true,
  units: "cm",
  // For animation:
  animate: true,
  duration: ANIMATION.loopDuration,
  fps: ANIMATION.fps,
  playbackRate: 1,
  loop: true,
};

// ========================================================
// LAYER MANAGEMENT
// ========================================================
const layers = {
  grid: {
    active: true,
    paths: [],
    color: CANVAS.strokeColor,
    strokeWidth: GRID.strokeWidth,
    fill: false,
  },
  shapes: {
    active: true,
    paths: [], // Will be generated for each frame
    color: CANVAS.strokeColor,
    strokeWidth: GRID.strokeWidth,
    fill: false,
  },
};

// ========================================================
// LAYER GENERATORS
// ========================================================

/**
 * Generates the grid layer with cell outlines.
 * @param {Number} width - Canvas width in cm.
 * @param {Number} height - Canvas height in cm.
 * @returns {Array} Array of grid line paths.
 */
const generateGridLayer = (width, height) => {
  const gridPaths = [];
  const margin = CANVAS.margin;
  
  // Calculate grid dimensions
  const gridWidth = width - margin * 2;
  const gridHeight = height - margin * 2;
  const cellWidth = gridWidth / GRID.columns;
  const cellHeight = gridHeight / GRID.rows;
  
  // Generate grid cell paths
  for (let row = 0; row < GRID.rows; row++) {
    for (let col = 0; col < GRID.columns; col++) {
      const x = margin + col * cellWidth;
      const y = margin + row * cellHeight;
      
      // Create cell outline
      gridPaths.push(
        createPath((ctx) => {
          ctx.rect(
            x + GRID.padding / 2,
            y + GRID.padding / 2,
            cellWidth - GRID.padding,
            cellHeight - GRID.padding
          );
        })
      );
    }
  }
  
  return gridPaths;
};

/**
 * Generates a circular shape path.
 * @param {Object} params - Shape parameters
 * @returns {Function} Path creation function
 */
const createCircleShape = ({ x, y, size, time, seed }) => {
  return createPath((ctx) => {
    // Animate radius based on time (reduced speed)
    const pulseSpeed = random.range(0.3, 0.6, seed);
    const radiusScale = math.mapRange(
      Math.sin(time * Math.PI * 2 * pulseSpeed),
      -1, 1,
      0.5, 1
    );
    
    // Create the circle
    ctx.arc(x, y, size * radiusScale, 0, Math.PI * 2);
  });
};

/**
 * Generates a polygon shape path.
 * @param {Object} params - Shape parameters
 * @returns {Function} Path creation function
 */
const createPolygonShape = ({ x, y, size, sides, time, seed }) => {
  return createPath((ctx) => {
    // Determine number of sides and rotation (reduced speed)
    const rotationSpeed = random.range(0.2, 0.5, seed);
    const rotation = time * Math.PI * 2 * rotationSpeed;
    
    // Draw the polygon (manually applying translation and rotation)
    const radius = size;
    
    // First point (needs special handling for moveTo)
    let angle = rotation;
    let px = x + Math.cos(angle) * radius;
    let py = y + Math.sin(angle) * radius;
    ctx.moveTo(px, py);
    
    // Remaining points
    for (let i = 1; i < sides; i++) {
      angle = rotation + (i / sides) * Math.PI * 2;
      px = x + Math.cos(angle) * radius;
      py = y + Math.sin(angle) * radius;
      ctx.lineTo(px, py);
    }
    
    // Close the path
    ctx.closePath();
  });
};

/**
 * Generates a star shape path.
 * @param {Object} params - Shape parameters
 * @returns {Function} Path creation function
 */
const createStarShape = ({ x, y, size, points, time, seed }) => {
  return createPath((ctx) => {
    // Animate inner radius based on time (reduced speed)
    const pulseSpeed = random.range(0.3, 0.5, seed);
    const innerRadiusScale = math.mapRange(
      Math.sin(time * Math.PI * 2 * pulseSpeed),
      -1, 1,
      0.2, 0.6
    );
    
    const rotation = time * Math.PI * pulseSpeed * 0.5; // Half speed rotation
    const outerRadius = size;
    const innerRadius = size * innerRadiusScale;
    
    // Draw the star (manually handling rotation and translation)
    // First point
    let angle = rotation;
    let radius = outerRadius;
    let px = x + Math.cos(angle) * radius;
    let py = y + Math.sin(angle) * radius;
    ctx.moveTo(px, py);
    
    // Remaining points
    for (let i = 1; i < points * 2; i++) {
      radius = i % 2 === 0 ? outerRadius : innerRadius;
      angle = rotation + (i / (points * 2)) * Math.PI * 2;
      px = x + Math.cos(angle) * radius;
      py = y + Math.sin(angle) * radius;
      ctx.lineTo(px, py);
    }
    
    // Close the path
    ctx.closePath();
  });
};

/**
 * Generates a spiral shape path.
 * @param {Object} params - Shape parameters
 * @returns {Function} Path creation function
 */
const createSpiralShape = ({ x, y, size, coils, time, seed }) => {
  return createPath((ctx) => {
    // Animate spiral rotation based on time (reduced speed)
    const rotationSpeed = random.range(0.1, 0.3, seed);
    const rotation = time * Math.PI * 2 * rotationSpeed;
    const tightness = random.range(3, 6, seed);
    
    // Create spiral (manually handling translation and rotation)
    const points = 100;
    const radiusStep = size / points;
    
    // First point at center
    let px = x;
    let py = y;
    ctx.moveTo(px, py);
    
    // Draw spiral points
    for (let i = 1; i < points; i++) {
      const t = i / points;
      const angle = coils * Math.PI * 2 * t + rotation;
      const radius = radiusStep * i;
      
      px = x + Math.cos(angle) * radius;
      py = y + Math.sin(angle) * radius;
      
      ctx.lineTo(px, py);
    }
  });
};

/**
 * Generates a lissajous curve shape path.
 * @param {Object} params - Shape parameters
 * @returns {Function} Path creation function
 */
const createLissajousShape = ({ x, y, size, time, seed }) => {
  return createPath((ctx) => {
    // Generate parameters for the lissajous curve
    const a = random.range(1, 3, seed);
    const b = random.range(1, 3, seed + 1);
    const delta = time * Math.PI * 1; // Half speed
    
    // Create lissajous curve (manually handling translation)
    const points = 100;
    
    // First point
    let t = 0;
    let px = x + Math.sin(a * t + delta) * size;
    let py = y + Math.sin(b * t) * size;
    ctx.moveTo(px, py);
    
    // Draw the curve
    for (let i = 1; i < points; i++) {
      t = i / points * Math.PI * 2;
      px = x + Math.sin(a * t + delta) * size;
      py = y + Math.sin(b * t) * size;
      
      ctx.lineTo(px, py);
    }
  });
};

/**
 * Generates a wave shape path.
 * @param {Object} params - Shape parameters
 * @returns {Function} Path creation function
 */
const createWaveShape = ({ x, y, size, time, seed }) => {
  return createPath((ctx) => {
    // Wave parameters (reduced speed)
    const frequency = random.range(1, 3, seed); // Lower frequency for gentler waves
    const amplitude = size * 0.8;
    const phaseShift = time * Math.PI * 0.8; // Slower phase shift
    
    // Draw wave (manually handling translation)
    const points = 50;
    const width = size * 2;
    
    // First point
    let t = 0;
    let px = x + (t - 0.5) * width;
    let py = y + Math.sin(t * frequency * Math.PI + phaseShift) * amplitude;
    ctx.moveTo(px, py);
    
    // Draw wave points
    for (let i = 1; i < points; i++) {
      t = i / (points - 1);
      px = x + (t - 0.5) * width;
      py = y + Math.sin(t * frequency * Math.PI + phaseShift) * amplitude;
      
      ctx.lineTo(px, py);
    }
  });
};

/**
 * Generates a random shape for a specific cell.
 * @param {Number} row - Grid row index
 * @param {Number} col - Grid column index
 * @param {Number} cellX - Cell center X coordinate
 * @param {Number} cellY - Cell center Y coordinate
 * @param {Number} cellSize - Size of the cell
 * @param {Number} playhead - Animation playhead (0-1)
 * @returns {Object} Path object
 */
const generateShapeForCell = (row, col, cellX, cellY, cellSize, playhead) => {
  // Use row and column to generate a stable seed for this cell
  const seed = random.getSeed() + row * 100 + col;
  
  // Scale the shape to fit inside the cell
  const shapeSize = cellSize * SHAPES.baseSize / 2;
  
  // Common parameters for all shapes
  const params = {
    x: cellX,
    y: cellY,
    size: shapeSize,
    time: playhead,
    seed,
  };
  
  // Determine the shape type based on the cell position
  const shapeIndex = (row * GRID.columns + col) % 6;
  
  switch (shapeIndex) {
    case 0:
      return createCircleShape(params);
    case 1:
      const sides = Math.floor(random.range(
        SHAPES.minComplexity,
        SHAPES.maxComplexity,
        seed
      ));
      return createPolygonShape({ ...params, sides });
    case 2:
      const points = Math.floor(random.range(
        SHAPES.minComplexity / 2,
        SHAPES.maxComplexity / 2,
        seed
      ));
      return createStarShape({ ...params, points });
    case 3:
      const coils = random.range(2, 5, seed);
      return createSpiralShape({ ...params, coils });
    case 4:
      return createLissajousShape(params);
    case 5:
      return createWaveShape(params);
    default:
      return createCircleShape(params);
  }
};

// ========================================================
// MAIN SKETCH FUNCTION
// ========================================================
const sketch = () => {
  // Set a random seed for reproducible results
  random.setSeed(42);
  
  // Generate static grid layer
  if (layers.grid.active) {
    layers.grid.paths = generateGridLayer(CANVAS.width, CANVAS.height);
  }
  
  // Calculate grid dimensions once (used for animation)
  const margin = CANVAS.margin;
  const gridWidth = CANVAS.width - margin * 2;
  const gridHeight = CANVAS.height - margin * 2;
  const cellWidth = gridWidth / GRID.columns;
  const cellHeight = gridHeight / GRID.rows;
  
  // Return render function that gets called on each animation frame
  return ({ context, width, height, playhead }) => {
    // Clear canvas and fill background
    context.clearRect(0, 0, width, height);
    context.fillStyle = CANVAS.backgroundColor;
    context.fillRect(0, 0, width, height);
    
    // Render grid layer (background)
    if (layers.grid.active) {
      layers.grid.paths.forEach((path) => {
        const pathString = path.toString();
        const tempPath = new Path2D(pathString);
        context.strokeStyle = layers.grid.color;
        context.lineWidth = layers.grid.strokeWidth;
        context.stroke(tempPath);
      });
    }
    
    // Generate and render animated shapes for this frame
    if (layers.shapes.active) {
      // Clear previous frame's shapes
      layers.shapes.paths = [];
      
      // Generate shapes for each cell
      for (let row = 0; row < GRID.rows; row++) {
        for (let col = 0; col < GRID.columns; col++) {
          // Calculate cell center coordinates
          const cellX = margin + col * cellWidth + cellWidth / 2;
          const cellY = margin + row * cellHeight + cellHeight / 2;
          const cellSize = Math.min(cellWidth, cellHeight);
          
          // Generate shape path for this cell
          const shapePath = generateShapeForCell(
            row,
            col,
            cellX,
            cellY,
            cellSize,
            playhead
          );
          
          // Add path to shapes layer
          layers.shapes.paths.push(shapePath);
        }
      }
      
      // Render all shapes
      layers.shapes.paths.forEach((path) => {
        const pathString = path.toString();
        const tempPath = new Path2D(pathString);
        context.strokeStyle = layers.shapes.color;
        context.lineWidth = layers.shapes.strokeWidth;
        context.stroke(tempPath);
      });
    }
    
    // Prepare exports
    const allPaths = [];
    if (layers.grid.active) {
      allPaths.push(...layers.grid.paths);
    }
    if (layers.shapes.active) {
      allPaths.push(...layers.shapes.paths);
    }
    
    // Export options
    const exports = [
      // PNG export of complete canvas
      context.canvas,
      // SVG export for the combined result
      {
        data: pathsToSVG(allPaths, {
          width: CANVAS.width,
          height: CANVAS.height,
          units: settings.units,
          lineWidth: GRID.strokeWidth,
          optimize: true,
        }),
        extension: ".svg",
      },
    ];
    
    return exports;
  };
};

// ========================================================
// STARTING THE SKETCH
// ========================================================

// Start the sketch (no font loading needed)
canvasSketch(sketch, settings);

/**
 * ================================================
 * ANIMATION CONTROLS
 * ================================================
 * 
 * To adjust the animation:
 * 
 * 1. CANVAS dimensions:
 *    - Modify CANVAS.width and CANVAS.height
 * 
 * 2. Loop Duration:
 *    - Modify ANIMATION.loopDuration (in seconds)
 * 
 * 3. Grid Configuration:
 *    - Change GRID.rows and GRID.columns for different grid layouts
 *    - Adjust GRID.padding for spacing between cells
 * 
 * 4. Shape Variations:
 *    - SHAPES.baseSize controls relative size of shapes in cells
 *    - SHAPES.minComplexity and SHAPES.maxComplexity control detail level
 *    - SHAPES.variationScale affects randomness of animations
 * 
 * Try changing one value at a time to see its effect on the animation.
 */

// End of file



/* 
### 4x4 Grid Animation with Generative Shapes

This sketch creates a 4x4 grid of animated generative shapes that loop every 4 seconds.
Each cell contains a different animated shape including:

1. **Circles** - Pulsating with sine-based radius changes
2. **Polygons** - Rotating with varying numbers of sides
3. **Stars** - With animated inner radius and rotation
4. **Spirals** - With rotating coils that expand outward
5. **Lissajous Curves** - Complex parametric curves with phase shifts
6. **Waves** - Undulating sine waves with frequency variations

The animation and shapes are highly customizable through the variables at the top:

- **ANIMATION**: Controls loop duration (4 seconds) and FPS
- **GRID**: Defines the 4x4 layout, cell padding, and line style
- **CANVAS**: Sets dimensions, margins, and colors
- **SHAPES**: Configures size, complexity, and variation of the shapes

All shapes are rendered using canvas-sketch-util's pen plotting support,
making the output suitable for vector export and pen plotting.

The design prioritizes:
- Clean, readable code structure with logical organization
- Extensive use of functional programming for shape generation
- Consistent animation based on the playhead value (0-1)
- Proper vector path generation for export

This sketch is particularly useful for exploring generative art techniques
with clean, geometric forms in a structured grid layout.
*/
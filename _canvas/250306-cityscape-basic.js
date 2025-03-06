/**
 * Abstract Geometric Cityscape - Creative Coding Sketch
 * 
 * Creates a vibrant, abstract cityscape using bold colors and geometric shapes.
 * Each run generates a unique composition of buildings with varied heights,
 * patterns, and architectural details.
 * 
 * 
 * prompt for claude-code:
 * 
 * Create an abstract geometric cityscape using creative coding. Use bold, contrasting colors (red, yellow, teal, pink, black) and compose the city from simple geometric shapes like squares, triangles, circles, and rectangles. Randomly stack and layer these shapes to form whimsical buildings with different heights and window patterns. Implement structured randomness to ensure variation while maintaining an aesthetically cohesive skyline. Arrange the buildings horizontally, experimenting with parametric constraints and user interactions. Consider adding final touches like circular windows, patterned tiles, and transparency for depth. Optimize the code for dynamic regeneration, allowing each run to generate a new, vibrant cityscape.
 */

const canvasSketch = require("canvas-sketch");
const { createPath } = require("canvas-sketch-util/penplot");
const random = require("canvas-sketch-util/random");
const { lerp } = require("canvas-sketch-util/math");

// ========================================================
// CONFIGURATION
// ========================================================
const settings = {
  dimensions: [1080, 720],
  pixelsPerInch: 300,
  scaleToView: true,
  animate: false,
};

// Color palette (bold, contrasting colors as requested)
const COLORS = {
  background: "#111111",
  buildings: ["#ff3333", "#ffdd00", "#00b3b3", "#ff66cc", "#222222"],
  details: ["#ffffff", "#ffff99", "#99ffff", "#ffccee", "#aaaaaa"],
};

const CONFIG = {
  margin: 50,                     // Canvas margin in pixels
  buildingCount: 20,              // Number of buildings
  minBuildingWidth: 40,           // Minimum building width
  maxBuildingWidth: 120,          // Maximum building width
  minBuildingHeight: 100,         // Minimum building height
  maxBuildingHeight: 500,         // Maximum building height
  windowProbability: 0.7,         // Probability of adding windows to a building
  detailProbability: 0.6,         // Probability of adding architectural details
  transparencyMin: 0.7,           // Minimum opacity for shapes
  transparencyMax: 1.0,           // Maximum opacity for shapes
};

// ========================================================
// SHAPE GENERATORS
// ========================================================

/**
 * Generates a building with windows and optional architectural details
 */
const generateBuilding = (x, y, width, height, context) => {
  // Choose building color
  const colorIndex = Math.floor(random.range(0, COLORS.buildings.length));
  const buildingColor = COLORS.buildings[colorIndex];
  const detailColor = COLORS.details[colorIndex];
  
  // Building transparency for depth effect
  const opacity = random.range(CONFIG.transparencyMin, CONFIG.transparencyMax);
  
  // Draw main building shape
  context.fillStyle = buildingColor;
  context.globalAlpha = opacity;
  
  // Decide building shape (rectangle, trapezoid, or with a top feature)
  const buildingType = Math.floor(random.range(0, 3));
  
  if (buildingType === 0) {
    // Standard rectangular building
    context.fillRect(x, y - height, width, height);
  } else if (buildingType === 1) {
    // Trapezoid building
    const topWidth = width * random.range(0.7, 0.9);
    const offset = (width - topWidth) / 2;
    
    context.beginPath();
    context.moveTo(x, y);
    context.lineTo(x + width, y);
    context.lineTo(x + width - offset, y - height);
    context.lineTo(x + offset, y - height);
    context.closePath();
    context.fill();
  } else {
    // Building with top feature (dome, spire, etc.)
    context.fillRect(x, y - height + 30, width, height - 30);
    
    // Add top feature
    const featureType = Math.floor(random.range(0, 3));
    
    if (featureType === 0) {
      // Dome
      context.beginPath();
      context.arc(x + width/2, y - height + 30, width/2, Math.PI, 0, false);
      context.fill();
    } else if (featureType === 1) {
      // Triangle spire
      context.beginPath();
      context.moveTo(x, y - height + 30);
      context.lineTo(x + width, y - height + 30);
      context.lineTo(x + width/2, y - height - 40);
      context.closePath();
      context.fill();
    } else {
      // Stepped top
      const steps = Math.floor(random.range(2, 5));
      const stepHeight = 30;
      const stepWidth = width / steps;
      
      for (let i = 0; i < steps; i++) {
        const stepX = x + (stepWidth * i);
        const stepY = y - height + 30 - (stepHeight * (steps - i));
        const sw = stepWidth;
        const sh = stepHeight * (steps - i);
        context.fillRect(stepX, stepY, sw, sh);
      }
    }
  }
  
  // Reset opacity for details
  context.globalAlpha = 1;
  
  // Add windows
  if (random.value() < CONFIG.windowProbability) {
    const windowRows = Math.floor(random.range(4, 10));
    const windowCols = Math.floor(random.range(2, 5));
    const windowWidth = width / (windowCols * 2);
    const windowHeight = height / (windowRows * 2);
    const windowMargin = windowWidth / 2;
    
    context.fillStyle = detailColor;
    context.globalAlpha = 0.9;
    
    // Window pattern type
    const patternType = Math.floor(random.range(0, 3));
    
    for (let row = 0; row < windowRows; row++) {
      for (let col = 0; col < windowCols; col++) {
        // Skip some windows randomly for variety
        if (random.value() < 0.2) continue;
        
        const wx = x + windowMargin + (col * windowWidth * 2);
        const wy = (y - height + 40) + windowMargin + (row * windowHeight * 2);
        
        if (patternType === 0) {
          // Rectangle windows
          context.fillRect(wx, wy, windowWidth, windowHeight);
        } else if (patternType === 1) {
          // Circular windows
          context.beginPath();
          context.arc(wx + windowWidth/2, wy + windowHeight/2, windowWidth/2, 0, Math.PI * 2);
          context.fill();
        } else {
          // Cross-shaped windows
          const crossSize = windowWidth * 0.8;
          const centerX = wx + windowWidth/2;
          const centerY = wy + windowHeight/2;
          
          context.fillRect(centerX - crossSize/6, centerY - crossSize/2, crossSize/3, crossSize);
          context.fillRect(centerX - crossSize/2, centerY - crossSize/6, crossSize, crossSize/3);
        }
      }
    }
  }
  
  // Add architectural details
  if (random.value() < CONFIG.detailProbability) {
    context.fillStyle = detailColor;
    context.globalAlpha = 0.85;
    
    const detailType = Math.floor(random.range(0, 3));
    
    if (detailType === 0) {
      // Horizontal bands
      const bandCount = Math.floor(random.range(2, 5));
      const bandHeight = height / (bandCount * 5);
      
      for (let i = 0; i < bandCount; i++) {
        const bandY = y - (height / (bandCount + 1)) * (i + 1);
        context.fillRect(x, bandY, width, bandHeight);
      }
    } else if (detailType === 1) {
      // Side pillars
      const pillarWidth = width * 0.15;
      context.fillRect(x, y - height, pillarWidth, height);
      context.fillRect(x + width - pillarWidth, y - height, pillarWidth, height);
    } else {
      // Patterned tiles
      const tileSize = width / 10;
      const tileRows = Math.floor(height / tileSize);
      const tileCols = Math.floor(width / tileSize);
      
      for (let row = 0; row < tileRows; row++) {
        for (let col = 0; col < tileCols; col++) {
          if ((row + col) % 2 === 0) {
            const tx = x + (col * tileSize);
            const ty = (y - height) + (row * tileSize);
            context.fillRect(tx, ty, tileSize, tileSize);
          }
        }
      }
    }
  }
  
  // Reset alpha
  context.globalAlpha = 1;
};

/**
 * Add ambient elements to cityscape (stars, moon, etc.)
 */
const addAmbientElements = (width, height, context) => {
  // Add a moon or sun
  const celestialType = Math.floor(random.range(0, 2));
  const size = random.range(60, 100);
  const x = random.range(width * 0.1, width * 0.9);
  const y = random.range(height * 0.1, height * 0.3);
  
  if (celestialType === 0) {
    // Moon
    context.fillStyle = '#ffff99';
    context.globalAlpha = 0.9;
    context.beginPath();
    context.arc(x, y, size, 0, Math.PI * 2);
    context.fill();
    
    // Moon crater
    context.fillStyle = '#eeee77';
    for (let i = 0; i < 5; i++) {
      const craterSize = random.range(size * 0.1, size * 0.25);
      const craterX = x + random.range(-size * 0.6, size * 0.6);
      const craterY = y + random.range(-size * 0.6, size * 0.6);
      
      context.beginPath();
      context.arc(craterX, craterY, craterSize, 0, Math.PI * 2);
      context.fill();
    }
  } else {
    // Sun
    context.fillStyle = '#ffdd00';
    context.globalAlpha = 0.9;
    context.beginPath();
    context.arc(x, y, size, 0, Math.PI * 2);
    context.fill();
    
    // Sun rays
    context.strokeStyle = '#ffdd00';
    context.lineWidth = 3;
    context.globalAlpha = 0.7;
    
    for (let i = 0; i < 12; i++) {
      const angle = (Math.PI * 2) * (i / 12);
      const rayLength = random.range(size * 0.5, size);
      
      context.beginPath();
      context.moveTo(
        x + Math.cos(angle) * size,
        y + Math.sin(angle) * size
      );
      context.lineTo(
        x + Math.cos(angle) * (size + rayLength),
        y + Math.sin(angle) * (size + rayLength)
      );
      context.stroke();
    }
  }
  
  // Reset alpha
  context.globalAlpha = 1;
};

// ========================================================
// MAIN SKETCH FUNCTION
// ========================================================
const sketch = () => {
  // Use a deterministic seed for reproducibility (comment out for true randomness)
  // random.setSeed(random.getRandomSeed());
  // console.log('Random seed:', random.getSeed());

  return ({ context, width, height }) => {
    // Clear canvas and fill background
    context.fillStyle = COLORS.background;
    context.fillRect(0, 0, width, height);
    
    // Add ambient elements
    addAmbientElements(width, height, context);
    
    // Generate buildings
    const groundLevel = height * 0.85; // Ground level
    
    // Create an array of buildings (left to right)
    const buildings = [];
    let currentX = CONFIG.margin;
    
    while (currentX < width - CONFIG.margin) {
      const buildingWidth = random.range(CONFIG.minBuildingWidth, CONFIG.maxBuildingWidth);
      
      // Ensure we don't extend past the canvas edge
      if (currentX + buildingWidth > width - CONFIG.margin) break;
      
      const buildingHeight = random.range(CONFIG.minBuildingHeight, CONFIG.maxBuildingHeight);
      
      buildings.push({
        x: currentX,
        y: groundLevel,
        width: buildingWidth,
        height: buildingHeight
      });
      
      // Advance position for next building with some overlap
      currentX += buildingWidth - random.range(5, 20);
    }
    
    // Sort buildings by height to create depth (taller in back)
    buildings.sort((a, b) => b.height - a.height);
    
    // Draw buildings from back to front
    buildings.forEach(building => {
      generateBuilding(building.x, building.y, building.width, building.height, context);
    });
    
    // Draw ground
    context.fillStyle = '#333333';
    context.fillRect(0, groundLevel, width, height - groundLevel);
  };
};

// Start the sketch
canvasSketch(sketch, settings);
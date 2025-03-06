/**
 * Abstract Geometric Cityscape - Creative Coding Sketch
 *
 * Creates a vibrant, abstract cityscape using bold colors and geometric shapes.
 * Each run generates a unique composition of buildings with varied heights,
 * patterns, and architectural details.
 */

const canvasSketch = require("canvas-sketch");
const { createPath } = require("canvas-sketch-util/penplot");
const random = require("canvas-sketch-util/random");
const { lerp } = require("canvas-sketch-util/math");
const palettes = require("nice-color-palettes");

// ========================================================
// CONFIGURATION
// ========================================================
const seed = random.getRandomSeed();


const settings = {
  dimensions: [1080, 720],
  pixelsPerInch: 300,
  scaleToView: true,
  animate: false,
  // suffix: () => `.${random.getSeed()}`, // Add seed to filename for reproducibility
  suffix: `.` + seed, // Add seed to filename for reproducibility
};

// Color palette options
const generateColorPalette = () => {
  // Method 1: Curated vibrant colors as originally requested
  const vibrantPalettes = [
    {
      background: "#111111",
      buildings: ["#ff3333", "#ffdd00", "#00b3b3", "#ff66cc", "#222222"],
      details: ["#ffffff", "#ffff99", "#99ffff", "#ffccee", "#aaaaaa"],
    },
    {
      background: "#0a0b1c", // Dark blue night sky
      buildings: ["#fc5185", "#3fc1c9", "#f5b700", "#364f6b", "#43dde6"],
      details: ["#ffffff", "#ffc8dd", "#a2ffe5", "#f7f7f7", "#bce6eb"],
    },
    {
      background: "#fcf8e8", // Light daytime palette
      buildings: ["#df7861", "#76b39d", "#05445e", "#fc8621", "#a155b9"],
      details: ["#fffdfd", "#ecb390", "#bfdce5", "#fad6a5", "#e5c1f0"],
    },
  ];

  // Method 2: Random palette from nice-color-palettes
  if (random.value() < 0.999) {
  // if (random.value() < 0.3) {
    const randomPalette = random.pick(palettes);
    return {
      background: random.value() < 0.7 ? "#111111" : "#fcf8e8", // Dark or light background
      buildings: randomPalette.slice(0, 5),
      details: randomPalette.map((color) => lightenColor(color, 40)), // Lighter versions for details
    };
  }

  return random.pick(vibrantPalettes);
};

// Helper to lighten a hex color
const lightenColor = (color, amount) => {
  return (
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.floor(parseInt(color, 16) + amount)).toString(16)
        ).slice(-2)
      )
  );
};

// Set active color palette
const COLORS = generateColorPalette();

const CONFIG = {
  margin: 50, // Canvas margin in pixels
  buildingCount: 20, // Number of buildings
  minBuildingWidth: 40, // Minimum building width
  maxBuildingWidth: 120, // Maximum building width
  minBuildingHeight: 100, // Minimum building height
  maxBuildingHeight: 500, // Maximum building height
  windowProbability: 0.8, // Probability of adding windows to a building
  detailProbability: 0.7, // Probability of adding architectural details
  transparencyMin: 0.7, // Minimum opacity for shapes
  transparencyMax: 1.0, // Maximum opacity for shapes
  skylineDepth: 3, // Number of building rows to create depth
  gridProbability: 0.3, // Probability of using a grid layout
  foregroundElements: true, // Add foreground elements
};

// ========================================================
// SHAPE GENERATORS
// ========================================================

/**
 * Generates a custom geometric shape for building parts
 */
const drawGeometricShape = (x, y, width, height, context, type = "rect") => {
  switch (type) {
    case "rect":
      context.fillRect(x, y, width, height);
      break;
    case "triangle":
      context.beginPath();
      context.moveTo(x, y + height);
      context.lineTo(x + width, y + height);
      context.lineTo(x + width / 2, y);
      context.closePath();
      context.fill();
      break;
    case "circle":
      context.beginPath();
      context.arc(
        x + width / 2,
        y + height / 2,
        Math.min(width, height) / 2,
        0,
        Math.PI * 2
      );
      context.closePath();
      context.fill();
      break;
    case "diamond":
      context.beginPath();
      context.moveTo(x + width / 2, y);
      context.lineTo(x + width, y + height / 2);
      context.lineTo(x + width / 2, y + height);
      context.lineTo(x, y + height / 2);
      context.closePath();
      context.fill();
      break;
    case "hexagon":
      const sideLength = Math.min(width, height) / 2;
      context.beginPath();
      for (let i = 0; i < 6; i++) {
        const angle = (Math.PI / 3) * i;
        const xPos = x + width / 2 + sideLength * Math.cos(angle);
        const yPos = y + height / 2 + sideLength * Math.sin(angle);
        if (i === 0) context.moveTo(xPos, yPos);
        else context.lineTo(xPos, yPos);
      }
      context.closePath();
      context.fill();
      break;
    case "semi-circle":
      context.beginPath();
      context.arc(x + width / 2, y + height, width / 2, Math.PI, 0, false);
      context.closePath();
      context.fill();
      break;
  }
};

/**
 * Generate layered geometric building
 */
const generateGeometricBuilding = (x, y, width, height, context) => {
  // Color for this building
  const colorIndex = Math.floor(random.range(0, COLORS.buildings.length));
  const mainColor = COLORS.buildings[colorIndex];
  const accentColor = COLORS.details[colorIndex];
  const opacity = random.range(CONFIG.transparencyMin, CONFIG.transparencyMax);

  const layerCount = Math.floor(random.range(2, 6));
  const baseShapes = [
    "rect",
    "triangle",
    "circle",
    "diamond",
    "hexagon",
    "semi-circle",
  ];

  // Base building height (shared across variants)
  const baseHeight = height * 0.7;
  const baseY = y - baseHeight;

  // Draw base building
  context.fillStyle = mainColor;
  context.globalAlpha = opacity;
  context.fillRect(x, baseY, width, baseHeight);

  // Determine building style
  const buildingStyle = Math.floor(random.range(0, 4));

  if (buildingStyle === 0) {
    // Stacked geometric shapes
    let currentY = baseY;
    for (let i = 0; i < layerCount; i++) {
      const layerWidth = width * random.range(0.4, 1);
      const layerHeight = height * random.range(0.1, 0.25);
      const layerX = x + (width - layerWidth) / 2;

      // Alternate colors
      context.fillStyle = i % 2 === 0 ? accentColor : mainColor;
      context.globalAlpha = opacity - i * 0.1;

      const shapeType = random.pick(baseShapes);
      drawGeometricShape(
        layerX,
        currentY,
        layerWidth,
        layerHeight,
        context,
        shapeType
      );

      currentY -= layerHeight * 0.8; // Slight overlap
    }
  } else if (buildingStyle === 1) {
    // Modular building with side elements
    const moduleCount = Math.floor(random.range(2, 5));
    const moduleHeight = baseHeight / moduleCount;

    for (let i = 0; i < moduleCount; i++) {
      // Main module
      context.fillStyle = i % 2 === 0 ? mainColor : accentColor;
      context.globalAlpha = opacity - i * 0.05;

      const moduleY = baseY + i * moduleHeight;
      context.fillRect(x, moduleY, width, moduleHeight);

      // Side elements (50% chance)
      if (random.value() < 0.5) {
        const sideWidth = width * 0.3;
        const sideHeight = moduleHeight * 0.7;
        const sideY = moduleY + (moduleHeight - sideHeight) / 2;

        context.fillStyle = accentColor;
        context.globalAlpha = opacity;

        // Left or right or both
        const sidePosition = Math.floor(random.range(0, 3));

        if (sidePosition === 0 || sidePosition === 2) {
          // Left side
          drawGeometricShape(
            x - sideWidth * 0.8,
            sideY,
            sideWidth,
            sideHeight,
            context,
            random.pick(baseShapes)
          );
        }

        if (sidePosition === 1 || sidePosition === 2) {
          // Right side
          drawGeometricShape(
            x + width - sideWidth * 0.2,
            sideY,
            sideWidth,
            sideHeight,
            context,
            random.pick(baseShapes)
          );
        }
      }
    }

    // Top feature
    const topHeight = height - baseHeight;
    if (topHeight > 10) {
      context.fillStyle = accentColor;
      context.globalAlpha = opacity;

      const topWidth = width * 0.6;
      const topX = x + (width - topWidth) / 2;
      const topY = baseY - topHeight;

      drawGeometricShape(
        topX,
        topY,
        topWidth,
        topHeight,
        context,
        random.pick(baseShapes)
      );
    }
  } else if (buildingStyle === 2) {
    // Abstract geometric pattern
    const segmentCount = Math.floor(random.range(4, 10));
    const segmentHeight = baseHeight / segmentCount;

    for (let i = 0; i < segmentCount; i++) {
      const segmentY = baseY + i * segmentHeight;

      // Randomly vary segment width and position
      const segmentWidth = width * random.range(0.6, 1);
      const segmentX = x + (width - segmentWidth) * random.range(0, 1);

      context.fillStyle = random.value() < 0.3 ? accentColor : mainColor;
      context.globalAlpha = opacity * random.range(0.7, 1);

      // Randomly choose shape
      const shapeType = random.pick(baseShapes);
      drawGeometricShape(
        segmentX,
        segmentY,
        segmentWidth,
        segmentHeight,
        context,
        shapeType
      );
    }

    // Top element
    const topFeatureHeight = height * 0.2;
    const topFeatureWidth = width * 0.4;
    const topX = x + (width - topFeatureWidth) / 2;

    context.fillStyle = accentColor;
    context.globalAlpha = opacity;
    drawGeometricShape(
      topX,
      baseY - topFeatureHeight,
      topFeatureWidth,
      topFeatureHeight,
      context,
      "triangle"
    );
  } else {
    // Complex geometric building (multiple stacked and offset elements)
    const sliceCount = Math.floor(random.range(3, 7));
    const sliceHeight = baseHeight / sliceCount;

    // Start with full width base
    context.fillRect(x, y - sliceHeight, width, sliceHeight);

    let currentWidth = width;
    let currentX = x;
    let currentY = y - sliceHeight;

    for (let i = 1; i < sliceCount; i++) {
      // Shrink or expand width
      const widthChange = random.range(0.7, 1.2);
      currentWidth *= widthChange;
      currentWidth = Math.min(width * 1.5, currentWidth); // Cap maximum width

      // Center the shape
      currentX = x + (width - currentWidth) / 2;
      currentY -= sliceHeight;

      // Alternate colors
      context.fillStyle = i % 2 === 0 ? mainColor : accentColor;
      context.globalAlpha = opacity - i * 0.05;

      // Choose a shape
      const shapeType = random.pick(baseShapes);
      drawGeometricShape(
        currentX,
        currentY,
        currentWidth,
        sliceHeight,
        context,
        shapeType
      );
    }

    // Add decorative top element
    const topShape = random.pick(["triangle", "circle", "diamond"]);
    const topWidth = currentWidth * 0.5;
    const topHeight = sliceHeight * 1.5;
    const topX = x + (width - topWidth) / 2;

    context.fillStyle = accentColor;
    context.globalAlpha = opacity;
    drawGeometricShape(
      topX,
      currentY - topHeight,
      topWidth,
      topHeight,
      context,
      topShape
    );
  }

  // Reset alpha for details
  context.globalAlpha = 1;
};

/**
 * Adds detailed windows to a building
 */
const addWindowsToBuilding = (x, y, width, height, context, color) => {
  // Skip sometimes to create variety
  if (random.value() > CONFIG.windowProbability) return;

  // Window pattern settings
  const windowRows = Math.floor(random.range(3, 12));
  const windowCols = Math.floor(random.range(2, 7));
  const windowWidth = width / (windowCols * 2);
  const windowHeight = height / (windowRows * 2);
  const windowMargin = windowWidth / 2;

  context.fillStyle = color;
  context.globalAlpha = 0.9;

  // Choose window pattern style
  const patternType = Math.floor(random.range(0, 5));

  // Window layout pattern
  const layoutPattern = Math.floor(random.range(0, 4));
  let skipPattern;

  switch (layoutPattern) {
    case 0: // Regular grid
      skipPattern = () => random.value() < 0.15;
      break;
    case 1: // Alternating pattern
      skipPattern = (row, col) => (row + col) % 2 === 0;
      break;
    case 2: // Vertical bands
      skipPattern = (row, col) => col % 2 === 0;
      break;
    case 3: // Horizontal bands
      skipPattern = (row, col) => row % 2 === 0;
      break;
  }

  for (let row = 0; row < windowRows; row++) {
    for (let col = 0; col < windowCols; col++) {
      // Apply skip pattern
      if (skipPattern(row, col)) continue;

      const wx = x + windowMargin + col * windowWidth * 2;
      const wy = y - height + 40 + windowMargin + row * windowHeight * 2;

      switch (patternType) {
        case 0: // Rectangle windows
          context.fillRect(wx, wy, windowWidth, windowHeight);
          break;
        case 1: // Circular windows
          context.beginPath();
          context.arc(
            wx + windowWidth / 2,
            wy + windowHeight / 2,
            windowWidth / 2,
            0,
            Math.PI * 2
          );
          context.fill();
          break;
        case 2: // Cross-shaped windows
          const crossSize = windowWidth * 0.8;
          const centerX = wx + windowWidth / 2;
          const centerY = wy + windowHeight / 2;

          context.fillRect(
            centerX - crossSize / 6,
            centerY - crossSize / 2,
            crossSize / 3,
            crossSize
          );
          context.fillRect(
            centerX - crossSize / 2,
            centerY - crossSize / 6,
            crossSize,
            crossSize / 3
          );
          break;
        case 3: // Diamond windows
          context.beginPath();
          context.moveTo(wx + windowWidth / 2, wy);
          context.lineTo(wx + windowWidth, wy + windowHeight / 2);
          context.lineTo(wx + windowWidth / 2, wy + windowHeight);
          context.lineTo(wx, wy + windowHeight / 2);
          context.closePath();
          context.fill();
          break;
        case 4: // Triangle windows
          context.beginPath();
          context.moveTo(wx, wy + windowHeight);
          context.lineTo(wx + windowWidth, wy + windowHeight);
          context.lineTo(wx + windowWidth / 2, wy);
          context.closePath();
          context.fill();
          break;
      }
    }
  }

  // Reset alpha
  context.globalAlpha = 1;
};

/**
 * Adds architectural details to a building
 */
const addArchitecturalDetails = (x, y, width, height, context, color) => {
  if (random.value() > CONFIG.detailProbability) return;

  context.fillStyle = color;
  context.globalAlpha = 0.85;

  const detailType = Math.floor(random.range(0, 6));

  switch (detailType) {
    case 0: // Horizontal bands
      const bandCount = Math.floor(random.range(2, 6));
      const bandHeight = height / (bandCount * 5);

      for (let i = 0; i < bandCount; i++) {
        const bandY = y - (height / (bandCount + 1)) * (i + 1);
        context.fillRect(x, bandY, width, bandHeight);
      }
      break;

    case 1: // Side pillars
      const pillarWidth = width * 0.15;
      context.fillRect(x, y - height, pillarWidth, height);
      context.fillRect(
        x + width - pillarWidth,
        y - height,
        pillarWidth,
        height
      );
      break;

    case 2: // Patterned tiles
      const tileSize = width / 10;
      const tileRows = Math.floor(height / tileSize);
      const tileCols = Math.floor(width / tileSize);

      for (let row = 0; row < tileRows; row++) {
        for (let col = 0; col < tileCols; col++) {
          if ((row + col) % 2 === 0) {
            const tx = x + col * tileSize;
            const ty = y - height + row * tileSize;
            context.fillRect(tx, ty, tileSize, tileSize);
          }
        }
      }
      break;

    case 3: // Geometric shapes border
      const borderWidth = width * 0.1;
      const innerWidth = width - borderWidth * 2;
      const innerHeight = height - borderWidth * 2;
      const shapes = ["triangle", "circle", "diamond"];

      // Top border
      for (let i = 0; i < Math.floor(width / borderWidth); i++) {
        const shapeX = x + i * borderWidth;
        const shape = random.pick(shapes);
        drawGeometricShape(
          shapeX,
          y - height,
          borderWidth,
          borderWidth,
          context,
          shape
        );
      }

      // Bottom border
      for (let i = 0; i < Math.floor(width / borderWidth); i++) {
        const shapeX = x + i * borderWidth;
        const shape = random.pick(shapes);
        drawGeometricShape(
          shapeX,
          y - borderWidth,
          borderWidth,
          borderWidth,
          context,
          shape
        );
      }

      // Left border
      for (let i = 1; i < Math.floor(height / borderWidth) - 1; i++) {
        const shapeY = y - height + i * borderWidth;
        const shape = random.pick(shapes);
        drawGeometricShape(x, shapeY, borderWidth, borderWidth, context, shape);
      }

      // Right border
      for (let i = 1; i < Math.floor(height / borderWidth) - 1; i++) {
        const shapeY = y - height + i * borderWidth;
        const shape = random.pick(shapes);
        drawGeometricShape(
          x + width - borderWidth,
          shapeY,
          borderWidth,
          borderWidth,
          context,
          shape
        );
      }
      break;

    case 4: // Diagonal stripe pattern
      context.save();
      context.beginPath();
      context.rect(x, y - height, width, height);
      context.clip();

      const stripeWidth = width / 5;
      const stripeCount = Math.ceil((width + height) / stripeWidth) * 2;

      for (let i = 0; i < stripeCount; i++) {
        const startX = x - height + i * stripeWidth;
        context.beginPath();
        context.moveTo(startX, y);
        context.lineTo(startX + height, y - height);
        context.lineTo(startX + height + stripeWidth / 2, y - height);
        context.lineTo(startX + stripeWidth / 2, y);
        context.closePath();
        context.fill();
      }

      context.restore();
      break;

    case 5: // Dot pattern
      const dotSize = width / 15;
      const dotSpacing = dotSize * 2;
      const dotsX = Math.floor(width / dotSpacing);
      const dotsY = Math.floor(height / dotSpacing);

      for (let dx = 0; dx < dotsX; dx++) {
        for (let dy = 0; dy < dotsY; dy++) {
          const dotX = x + dx * dotSpacing + dotSpacing / 2;
          const dotY = y - height + dy * dotSpacing + dotSpacing / 2;

          context.beginPath();
          context.arc(dotX, dotY, dotSize / 2, 0, Math.PI * 2);
          context.fill();
        }
      }
      break;
  }

  // Reset alpha
  context.globalAlpha = 1;
};

/**
 * Generates a building with windows and optional architectural details
 */
const generateBuilding = (x, y, width, height, context, depthLevel = 0) => {
  // Choose building color
  const colorIndex = Math.floor(random.range(0, COLORS.buildings.length));
  const buildingColor = COLORS.buildings[colorIndex];
  const detailColor = COLORS.details[colorIndex];

  // Building transparency for depth effect
  const opacity = random.range(
    CONFIG.transparencyMin - depthLevel * 0.1,
    CONFIG.transparencyMax - depthLevel * 0.1
  );

  // Decide between standard building or geometric building (20% chance for geometric)
  const useGeometricBuilding = random.value() < 0.2 + depthLevel * 0.1; // More likely in background

  if (useGeometricBuilding) {
    generateGeometricBuilding(x, y, width, height, context);
    return;
  }

  // Draw main building shape
  context.fillStyle = buildingColor;
  context.globalAlpha = opacity;

  // Decide building shape (rectangle, trapezoid, or with a top feature)
  const buildingType = Math.floor(random.range(0, 4)); // Added one more type

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
  } else if (buildingType === 2) {
    // Building with top feature (dome, spire, etc.)
    context.fillRect(x, y - height + 30, width, height - 30);

    // Add top feature
    const featureType = Math.floor(random.range(0, 5)); // Added more feature types

    if (featureType === 0) {
      // Dome
      context.beginPath();
      context.arc(x + width / 2, y - height + 30, width / 2, Math.PI, 0, false);
      context.fill();
    } else if (featureType === 1) {
      // Triangle spire
      context.beginPath();
      context.moveTo(x, y - height + 30);
      context.lineTo(x + width, y - height + 30);
      context.lineTo(x + width / 2, y - height - 40);
      context.closePath();
      context.fill();
    } else if (featureType === 2) {
      // Stepped top
      const steps = Math.floor(random.range(2, 5));
      const stepHeight = 30;
      const stepWidth = width / steps;

      for (let i = 0; i < steps; i++) {
        const stepX = x + stepWidth * i;
        const stepY = y - height + 30 - stepHeight * (steps - i);
        const sw = stepWidth;
        const sh = stepHeight * (steps - i);
        context.fillRect(stepX, stepY, sw, sh);
      }
    } else if (featureType === 3) {
      // Double spire
      const spireWidth = width * 0.3;
      const spireHeight = height * 0.2;
      const spireGap = width * 0.4;

      // Left spire
      context.beginPath();
      context.moveTo(x, y - height + 30);
      context.lineTo(x + spireWidth, y - height + 30);
      context.lineTo(x + spireWidth / 2, y - height - spireHeight);
      context.closePath();
      context.fill();

      // Right spire
      context.beginPath();
      context.moveTo(x + width - spireWidth, y - height + 30);
      context.lineTo(x + width, y - height + 30);
      context.lineTo(x + width - spireWidth / 2, y - height - spireHeight);
      context.closePath();
      context.fill();
    } else if (featureType === 4) {
      // Geometric top
      const shapes = ["triangle", "circle", "diamond", "hexagon"];
      const shapeType = random.pick(shapes);
      const shapeWidth = width * 0.6;
      const shapeHeight = height * 0.2;
      const shapeX = x + (width - shapeWidth) / 2;
      const shapeY = y - height;

      drawGeometricShape(
        shapeX,
        shapeY,
        shapeWidth,
        shapeHeight,
        context,
        shapeType
      );
    }
  } else if (buildingType === 3) {
    // Stacked building (with offset sections)
    const sectionCount = Math.floor(random.range(2, 4));
    let currentHeight = 0;
    let currentWidth = width;
    let currentX = x;

    for (let i = 0; i < sectionCount; i++) {
      const sectionHeight = height / sectionCount;
      currentHeight += sectionHeight;

      // Each section is smaller than the one below
      if (i > 0) {
        const shrinkFactor = random.range(0.7, 0.9);
        currentWidth *= shrinkFactor;
        currentX += (width - currentWidth) / 2; // Center align
      }

      context.fillRect(
        currentX,
        y - currentHeight,
        currentWidth,
        sectionHeight
      );
    }
  }

  // Reset opacity for details
  context.globalAlpha = 1;

  // Add windows and details
  addWindowsToBuilding(x, y, width, height, context, detailColor);
  addArchitecturalDetails(x, y, width, height, context, detailColor);
};

/**
 * Generate foreground elements (decorative shapes, signs, etc.)
 */
const addForegroundElements = (width, height, groundLevel, context) => {
  // Skip sometimes
  if (!CONFIG.foregroundElements || random.value() < 0.3) return;

  const elementCount = Math.floor(random.range(3, 8));
  const shapes = ["triangle", "circle", "diamond", "hexagon", "rect"];

  for (let i = 0; i < elementCount; i++) {
    // Random position along the bottom of the canvas
    const x = random.range(width * 0.05, width * 0.95);
    const size = random.range(15, 40);
    const y = groundLevel - size / 2;

    // Choose colors from the building palette
    const colorIndex = Math.floor(random.range(0, COLORS.buildings.length));
    const color =
      random.value() < 0.5
        ? COLORS.buildings[colorIndex]
        : COLORS.details[colorIndex];

    context.fillStyle = color;
    context.globalAlpha = 0.9;

    // Draw random geometric shape
    const shape = random.pick(shapes);
    drawGeometricShape(x - size / 2, y - size / 2, size, size, context, shape);
  }

  // Add a larger landmark element (25% chance)
  if (random.value() < 0.25) {
    const landmarkX = random.range(width * 0.1, width * 0.9);
    const landmarkSize = random.range(50, 80);
    const landmarkY = groundLevel - landmarkSize;

    const colorIndex = Math.floor(random.range(0, COLORS.buildings.length));
    const mainColor = COLORS.buildings[colorIndex];
    const accentColor = COLORS.details[colorIndex];

    // Draw main shape
    context.fillStyle = mainColor;
    context.globalAlpha = 0.9;
    drawGeometricShape(
      landmarkX - landmarkSize / 2,
      landmarkY,
      landmarkSize,
      landmarkSize,
      context,
      "circle"
    );

    // Draw accent shape
    context.fillStyle = accentColor;
    context.globalAlpha = 0.95;
    const innerSize = landmarkSize * 0.6;
    drawGeometricShape(
      landmarkX - innerSize / 2,
      landmarkY + (landmarkSize - innerSize) / 2,
      innerSize,
      innerSize,
      context,
      "hexagon"
    );
  }

  // Reset alpha
  context.globalAlpha = 1;
};

/**
 * Generate clouds using geometric shapes
 */
const addClouds = (width, height, context) => {
  // Skip for night scenes or randomly
  if (
    COLORS.background.startsWith("#0") ||
    COLORS.background.startsWith("#1") ||
    random.value() < 0.3
  )
    return;

  const cloudCount = Math.floor(random.range(3, 8));

  for (let i = 0; i < cloudCount; i++) {
    // Position clouds in the upper part of the sky
    const x = random.range(0, width);
    const y = random.range(height * 0.05, height * 0.3);
    const cloudWidth = random.range(80, 200);
    const cloudHeight = cloudWidth * random.range(0.5, 0.8);

    // Cloud color (light versions of the background or white with transparency)
    context.fillStyle =
      random.value() < 0.7 ? "#ffffff" : lightenColor(COLORS.background, 50);
    context.globalAlpha = random.range(0.2, 0.5);

    // Draw cloud as a collection of overlapping circles
    const bubbleCount = Math.floor(random.range(3, 8));
    const maxRadius = cloudHeight / 2;

    for (let j = 0; j < bubbleCount; j++) {
      const bubbleX = x + random.range(-cloudWidth / 3, cloudWidth / 3);
      const bubbleY = y + random.range(-cloudHeight / 3, cloudHeight / 3);
      const radius = random.range(maxRadius * 0.5, maxRadius);

      context.beginPath();
      context.arc(bubbleX, bubbleY, radius, 0, Math.PI * 2);
      context.fill();
    }
  }

  // Reset alpha
  context.globalAlpha = 1;
};

/**
 * Add ambient elements to cityscape (stars, moon, etc.)
 */
const addAmbientElements = (width, height, context) => {
  // Determine if it's a night scene based on background color
  const isNightScene =
    COLORS.background.startsWith("#0") || COLORS.background.startsWith("#1");

  // Add stars if it's a night scene
  if (isNightScene) {
    const starCount = Math.floor(random.range(50, 200));

    for (let i = 0; i < starCount; i++) {
      const x = random.range(0, width);
      const y = random.range(0, height * 0.6);
      const size = random.range(1, 3);
      const brightness = random.range(0.5, 1);

      context.fillStyle = "#ffffff";
      context.globalAlpha = brightness;

      // 20% chance for a twinkle star
      if (random.value() < 0.2) {
        // Draw a four-pointed star
        context.beginPath();
        context.moveTo(x, y - size);
        context.lineTo(x, y + size);
        context.moveTo(x - size, y);
        context.lineTo(x + size, y);
        context.lineWidth = size / 2;
        context.strokeStyle = "#ffffff";
        context.stroke();
      } else {
        // Regular dot star
        context.beginPath();
        context.arc(x, y, size / 2, 0, Math.PI * 2);
        context.fill();
      }
    }
  }

  // Add clouds for daytime scenes
  if (!isNightScene) {
    addClouds(width, height, context);
  }

  // Add a moon or sun (50% chance if not already added other elements)
  if (random.value() < 0.8) {
    const celestialType = isNightScene ? 0 : 1; // Moon for night, sun for day
    const size = random.range(60, 100);
    const x = random.range(width * 0.1, width * 0.9);
    const y = random.range(height * 0.1, height * 0.3);

    if (celestialType === 0) {
      // Moon
      context.fillStyle = "#ffff99";
      context.globalAlpha = 0.9;
      context.beginPath();
      context.arc(x, y, size, 0, Math.PI * 2);
      context.fill();

      // Moon crater
      context.fillStyle = "#eeee77";
      for (let i = 0; i < 5; i++) {
        const craterSize = random.range(size * 0.1, size * 0.25);
        const craterX = x + random.range(-size * 0.6, size * 0.6);
        const craterY = y + random.range(-size * 0.6, size * 0.6);

        context.beginPath();
        context.arc(craterX, craterY, craterSize, 0, Math.PI * 2);
        context.fill();
      }

      // Add subtle glow
      const gradient = context.createRadialGradient(x, y, size, x, y, size * 2);
      gradient.addColorStop(0, "rgba(255, 255, 153, 0.3)");
      gradient.addColorStop(1, "rgba(255, 255, 153, 0)");

      context.fillStyle = gradient;
      context.beginPath();
      context.arc(x, y, size * 2, 0, Math.PI * 2);
      context.fill();
    } else {
      // Sun
      // Create gradient for the sun
      const gradient = context.createRadialGradient(
        x,
        y,
        size * 0.2,
        x,
        y,
        size
      );
      gradient.addColorStop(0, "#ffffff");
      gradient.addColorStop(0.5, "#ffee00");
      gradient.addColorStop(1, "#ffcc00");

      context.fillStyle = gradient;
      context.globalAlpha = 0.9;
      context.beginPath();
      context.arc(x, y, size, 0, Math.PI * 2);
      context.fill();

      // Sun rays
      context.strokeStyle = "#ffdd00";
      context.lineWidth = 3;
      context.globalAlpha = 0.7;

      for (let i = 0; i < 12; i++) {
        const angle = Math.PI * 2 * (i / 12);
        const rayLength = random.range(size * 0.5, size);

        context.beginPath();
        context.moveTo(x + Math.cos(angle) * size, y + Math.sin(angle) * size);
        context.lineTo(
          x + Math.cos(angle) * (size + rayLength),
          y + Math.sin(angle) * (size + rayLength)
        );
        context.stroke();
      }

      // Add subtle glow
      const outerGradient = context.createRadialGradient(
        x,
        y,
        size,
        x,
        y,
        size * 3
      );
      outerGradient.addColorStop(0, "rgba(255, 230, 100, 0.2)");
      outerGradient.addColorStop(1, "rgba(255, 230, 100, 0)");

      context.fillStyle = outerGradient;
      context.beginPath();
      context.arc(x, y, size * 3, 0, Math.PI * 2);
      context.fill();
    }
  }

  // Reset alpha
  context.globalAlpha = 1;
};

// ========================================================
// MAIN SKETCH FUNCTION
// ========================================================
const sketch = () => {
  // Use a deterministic seed for reproducibility
  const useSeed = true; // Set to false for true randomness

  if (useSeed) {
    // const seed = random.getRandomSeed();
    random.setSeed(seed);
    console.log("Random seed:", seed);
  }

  return ({ context, width, height }) => {
    // Clear canvas and fill background
    context.fillStyle = COLORS.background;
    context.fillRect(0, 0, width, height);

    // Add ambient elements (sky, stars, sun/moon)
    addAmbientElements(width, height, context);

    // Ground level
    const groundLevel = height * 0.85;

    // Decide if we want a grid-based layout or random layout
    const useGridLayout = random.value() < CONFIG.gridProbability;

    // Create multiple layers of buildings for depth
    const buildingLayers = [];

    for (let layer = 0; layer < CONFIG.skylineDepth; layer++) {
      // Each layer has its own set of buildings
      buildingLayers.push([]);

      // Adjust parameters for this layer (background layers have smaller buildings)
      const layerConfig = {
        minWidth: CONFIG.minBuildingWidth * (1 - layer * 0.15),
        maxWidth: CONFIG.maxBuildingWidth * (1 - layer * 0.15),
        minHeight: CONFIG.minBuildingHeight * (1 - layer * 0.2),
        maxHeight: CONFIG.maxBuildingHeight * (1 - layer * 0.2),
        yOffset: layer * 20, // Raise background layers slightly to create horizon effect
      };

      // Generate buildings for this layer
      if (useGridLayout) {
        // Grid layout (more geometric and organized)
        const gridSize = Math.floor(random.range(8, 15));
        const cellWidth = (width - CONFIG.margin * 2) / gridSize;

        for (let i = 0; i < gridSize; i++) {
          // Skip some grid cells randomly for variety
          if (random.value() < 0.2) continue;

          const x = CONFIG.margin + i * cellWidth;
          const buildingWidth = cellWidth * random.range(0.6, 0.95);
          const buildingHeight = random.range(
            layerConfig.minHeight,
            layerConfig.maxHeight
          );

          buildingLayers[layer].push({
            x: x + (cellWidth - buildingWidth) / 2, // Center in grid cell
            y: groundLevel - layerConfig.yOffset,
            width: buildingWidth,
            height: buildingHeight,
          });
        }
      } else {
        // Random layout (more organic and varied)
        let currentX = CONFIG.margin;

        while (currentX < width - CONFIG.margin) {
          const buildingWidth = random.range(
            layerConfig.minWidth,
            layerConfig.maxWidth
          );

          // Ensure we don't extend past the canvas edge
          if (currentX + buildingWidth > width - CONFIG.margin) break;

          const buildingHeight = random.range(
            layerConfig.minHeight,
            layerConfig.maxHeight
          );

          buildingLayers[layer].push({
            x: currentX,
            y: groundLevel - layerConfig.yOffset,
            width: buildingWidth,
            height: buildingHeight,
          });

          // Adjust spacing between buildings
          const gapFactor = layer === 0 ? 0.3 : 0.1; // More gaps in foreground
          currentX +=
            buildingWidth * random.range(0.8 - gapFactor, 1.0 - gapFactor);
        }
      }

      // Randomize building heights within a layer for more variety
      buildingLayers[layer].forEach((building) => {
        // Add slight height variation
        building.height *= random.range(0.8, 1.2);

        // Cap maximum height to prevent extreme variations
        building.height = Math.min(building.height, CONFIG.maxBuildingHeight);
      });
    }

    // Draw background layers first, then foreground
    for (let layer = CONFIG.skylineDepth - 1; layer >= 0; layer--) {
      // Sort buildings by height within each layer
      buildingLayers[layer].sort((a, b) => b.height - a.height);

      // Draw buildings
      buildingLayers[layer].forEach((building) => {
        generateBuilding(
          building.x,
          building.y,
          building.width,
          building.height,
          context,
          layer
        );
      });
    }

    // Draw ground with gradient
    const groundGradient = context.createLinearGradient(
      0,
      groundLevel - 20,
      0,
      height
    );

    // Determine ground colors based on scene type
    const isNightScene =
      COLORS.background.startsWith("#0") || COLORS.background.startsWith("#1");

    if (isNightScene) {
      // Dark ground for night scenes
      groundGradient.addColorStop(0, "#222222");
      groundGradient.addColorStop(1, "#111111");
    } else {
      // Lighter ground for day scenes
      groundGradient.addColorStop(0, "#555555");
      groundGradient.addColorStop(1, "#333333");
    }

    context.fillStyle = groundGradient;
    context.fillRect(0, groundLevel, width, height - groundLevel);

    // Add foreground elements
    addForegroundElements(width, height, groundLevel, context);

    // Add canvas border effect (optional)
    if (random.value() < 0.3) {
      const borderWidth = 15;
      const borderColor = isNightScene
        ? "rgba(0,0,0,0.5)"
        : "rgba(255,255,255,0.5)";

      context.strokeStyle = borderColor;
      context.lineWidth = borderWidth;
      context.strokeRect(
        borderWidth / 2,
        borderWidth / 2,
        width - borderWidth,
        height - borderWidth
      );
    }

    // Add signature element in corner
    context.fillStyle = "#ffffff";
    context.globalAlpha = 0.7;
    context.font = "14px sans-serif";
    context.fillText("Abstract Geometric Cityscape", 20, height - 20);

    // Reset alpha
    context.globalAlpha = 1;
  };
};

// Start the sketch
canvasSketch(sketch, settings);

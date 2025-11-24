/**
 * Dot Matrix Sketch - Perlin noise on dot matrix display
 * @param {p5} p - p5 instance
 * @param {Object} config - Configuration object
 * @returns {Object} Sketch object with setup, draw, and exportSvg methods
 */
export function createDotMatrixSketch(p, config) {
  // Import dependencies (these use global p5, which is fine since p5 is loaded globally)
  let PixelDisplay, HatchFill;

  // These will be imported dynamically or passed in
  // For now, we'll assume they're available globally or imported separately

  const GR__ = 1.618;
  const MATRIX_SIZES = [64, 32, 16, 8, 4];

  let PIXEL_SCALE;
  let PIXEL_GAP;
  let MATRIX_WIDTH;
  let MATRIX_HEIGHT;
  let display;
  let zOffset = 0;

  const colorThemes = {
    "2a": { off: [13, 13, 13], on: [204, 165, 69], stroke: [13, 13, 13] },
    milk_transparent: { off: "transparent" /* 227, 237, 239] */, on: [13, 13, 13], stroke: [13, 13, 13] },
    green: { off: [13, 13, 13], on: [100, 255, 100], stroke: [150, 255, 150] },
    amber: { off: [40, 20, 0], on: [255, 180, 0], stroke: [255, 200, 100] },
    white: { off: [40, 40, 40], on: [220, 220, 220], stroke: [255, 255, 255] },
    blue: { off: [10, 20, 40], on: [80, 160, 255], stroke: [120, 180, 255] },
  };

  // Initialize config defaults for dot matrix
  if (!config.matrixSize) config.matrixSize = 4;
  if (!config.theme) config.theme = "green";
  if (!config.shadeSteps) config.shadeSteps = 2;
  if (!config.dotScaleFactor) config.dotScaleFactor = 1.0;
  if (!config.dotNoiseInfluence) config.dotNoiseInfluence = 1.0;
  if (!config.useColorThemeShading) config.useColorThemeShading = false;
  if (!config.useHatchFill) config.useHatchFill = false;
  if (!config.hatchDensity) config.hatchDensity = 0.05;
  if (!config.hatchAngle) config.hatchAngle = 45;
  if (!config.hatchCrossHatch) config.hatchCrossHatch = false;
  if (!config.hatchUseGlobalDensity) config.hatchUseGlobalDensity = true;
  if (!config.hatchGlobalSpacing) config.hatchGlobalSpacing = 3;

  function resetSketch() {
    MATRIX_WIDTH = Number(config.matrixSize);
    MATRIX_HEIGHT = Number(config.matrixSize);
    PIXEL_SCALE = config.width / MATRIX_WIDTH;
    PIXEL_GAP = PIXEL_SCALE - PIXEL_SCALE / Math.pow(GR__, 1);

    p.resizeCanvas(MATRIX_WIDTH * PIXEL_SCALE, MATRIX_HEIGHT * PIXEL_SCALE);

    if (typeof PixelDisplay !== 'undefined') {
      display = new PixelDisplay(
        MATRIX_WIDTH,
        MATRIX_HEIGHT,
        PIXEL_SCALE,
        PIXEL_GAP
      );
      updateColorTheme();
    }
  }

  function updateColorTheme() {
    if (!display) return;
    const theme = colorThemes[config.theme];
    // Use global p5 functions for color (they're available globally)
    display.setColors(
      Array.isArray(theme.off) ? color(...theme.off) : theme.off,
      Array.isArray(theme.on) ? color(...theme.on) : theme.on,
      Array.isArray(theme.stroke) ? color(...theme.stroke) : theme.stroke
    );
  }

  function renderHatchFill() {
    if (typeof HatchFill === 'undefined' || !display) return;

    // Create hatch fill instance
    const hatchFill = new HatchFill({
      density: config.hatchDensity,
      angle: config.hatchAngle,
      crossHatch: config.hatchCrossHatch,
      useGlobalDensity: config.hatchUseGlobalDensity,
      globalSpacing: config.hatchGlobalSpacing,
    });

    // Set stroke color and no fill
    p.stroke(display.colorOn);
    p.strokeWeight(1);
    p.noFill();

    // Render each pixel with hatch fill
    for (let x = 0; x < display.matrixWidth; x++) {
      for (let y = 0; y < display.matrixHeight; y++) {
        const noiseVal = display.pixelMatrix[x][y];
        if (noiseVal === 0) continue;

        // Calculate dot position and size (matching display.render logic)
        // Use global p5 functions since PixelDisplay uses global functions
        const baseDotSize = display.pixelScale - display.pixelGap;
        const maxDotSize = baseDotSize * config.dotScaleFactor;
        const minDotSize = lerp(maxDotSize, 0, config.dotNoiseInfluence);
        const scaledDotSize = map(noiseVal, 0, 1, minDotSize, maxDotSize);
        const offset = (display.pixelScale - scaledDotSize) / 2;

        // Calculate center position
        const cx = x * display.pixelScale + offset + scaledDotSize / 2;
        const cy = y * display.pixelScale + offset + scaledDotSize / 2;
        const radius = scaledDotSize / 2;

        // Skip if radius is too small
        if (radius < 0.5) continue;

        // Generate hatch lines for this circle
        const hatchLines = hatchFill.fillCircle(cx, cy, radius);

        // Draw hatch lines
        if (hatchLines && hatchLines.length > 0) {
          for (const lineSeg of hatchLines) {
            if (
              lineSeg &&
              lineSeg.x1 !== undefined &&
              lineSeg.y1 !== undefined &&
              lineSeg.x2 !== undefined &&
              lineSeg.y2 !== undefined
            ) {
              p.line(lineSeg.x1, lineSeg.y1, lineSeg.x2, lineSeg.y2);
            }
          }
        }
      }
    }
  }

  const sketch = {
    setup: () => {
      // Set up dependencies - these should be imported before this sketch is used
      if (typeof window !== 'undefined') {
        // PixelDisplay and HatchFill should be imported in the main file
        // For now, we'll initialize with the canvas size
        MATRIX_WIDTH = Number(config.matrixSize);
        MATRIX_HEIGHT = Number(config.matrixSize);
        PIXEL_SCALE = config.width / MATRIX_WIDTH;
        PIXEL_GAP = PIXEL_SCALE - PIXEL_SCALE / Math.pow(GR__, 0);

        p.createCanvas(MATRIX_WIDTH * PIXEL_SCALE, MATRIX_HEIGHT * PIXEL_SCALE);
      }
    },

    init: (PixelDisplayClass, HatchFillClass) => {
      // Initialize dependencies
      PixelDisplay = PixelDisplayClass;
      HatchFill = HatchFillClass;

      MATRIX_WIDTH = Number(config.matrixSize);
      MATRIX_HEIGHT = Number(config.matrixSize);
      PIXEL_SCALE = config.width / MATRIX_WIDTH;
      PIXEL_GAP = PIXEL_SCALE - PIXEL_SCALE / Math.pow(GR__, 0);

      display = new PixelDisplay(
        MATRIX_WIDTH,
        MATRIX_HEIGHT,
        PIXEL_SCALE,
        PIXEL_GAP
      );
      updateColorTheme();
    },

    draw: () => {
      if (config.isPaused || !display) return;

      clear();
      // Use global p5 color function for theme colors
      // if (colorThemes[config.theme].off !== "transparent") {
      //   p.background(colorThemes[config.theme].off);
      // }

      p.push();
      display.clear();

      for (let y = 0; y < display.matrixHeight; y++) {
        for (let x = 0; x < display.matrixWidth; x++) {
          const noiseVal = p.noise(
            x * config.noiseScale,
            y * config.noiseScale,
            zOffset
          );
          display.setPixel(x, y, noiseVal);
        }
      }

      zOffset += config.animationSpeed || 0.002;

      if (config.useHatchFill) {
        // Render with hatch fill
        renderHatchFill();
      } else {
        // Render with solid fill
        display.render(0, 0, config);
      }
      p.pop();
    },

    resize: (newWidth, newHeight) => {
      config.width = newWidth;
      config.height = newHeight;
      resetSketch();
    },

    exportSvg: (exportSize = "current") => {
      if (!display) return;

      const svgRenderer = (p) => {
        p.setup = () => {
          let w, h;
          if (exportSize === "a4") {
            w = 794;
            h = 1123;
          } else {
            w = MATRIX_WIDTH * PIXEL_SCALE;
            h = MATRIX_HEIGHT * PIXEL_SCALE;
          }

          p.createCanvas(w, h, p.SVG);
          p.noLoop();

          p.background(200, 0);
          // p.background(display.colorOff);
          // if (display.colorOff !== "transparent") {
          //   p.background(display.colorOff);
          // }

          if (config.useHatchFill && typeof HatchFill !== 'undefined') {
            // Export with hatch fill
            const hatchFill = new HatchFill({
              density: config.hatchDensity,
              angle: config.hatchAngle,
              crossHatch: config.hatchCrossHatch,
              useGlobalDensity: config.hatchUseGlobalDensity,
              globalSpacing: config.hatchGlobalSpacing,
            });

            p.stroke(display.colorOn);
            p.strokeWeight(1);
            p.noFill();

            for (let x = 0; x < display.matrixWidth; x++) {
              for (let y = 0; y < display.matrixHeight; y++) {
                const noiseVal = display.pixelMatrix[x][y];
                if (noiseVal === 0) continue;

                // Calculate dot position and size
                const baseDotSize = display.pixelScale - display.pixelGap;
                const maxDotSize = baseDotSize * config.dotScaleFactor;
                const minDotSize = p.lerp(maxDotSize, 0, config.dotNoiseInfluence);
                const scaledDotSize = p.map(noiseVal, 0, 1, minDotSize, maxDotSize);
                const offset = (display.pixelScale - scaledDotSize) / 2;

                const cx = x * display.pixelScale + offset + scaledDotSize / 2;
                const cy = y * display.pixelScale + offset + scaledDotSize / 2;
                const radius = scaledDotSize / 2;

                // Generate hatch lines for this circle
                const hatchLines = hatchFill.fillCircle(cx, cy, radius);

                // Draw hatch lines as SVG
                for (const lineSeg of hatchLines) {
                  if (
                    lineSeg &&
                    lineSeg.x1 !== undefined &&
                    lineSeg.y1 !== undefined &&
                    lineSeg.x2 !== undefined &&
                    lineSeg.y2 !== undefined
                  ) {
                    p.line(lineSeg.x1, lineSeg.y1, lineSeg.x2, lineSeg.y2);
                  }
                }
              }
            }
          } else {
            // Export with solid fill
            p.noStroke();

            for (let x = 0; x < display.matrixWidth; x++) {
              for (let y = 0; y < display.matrixHeight; y++) {
                const noiseVal = display.pixelMatrix[x][y];
                if (noiseVal === 0) continue;

                let pixelColor;
                if (!config.useColorThemeShading) {
                  pixelColor = display.colorOn;
                } else {
                  const shadeValue = p.floor(
                    p.map(noiseVal, 0, 1, 0, config.shadeSteps)
                  );
                  if (shadeValue === 0) continue;
                  const amount = shadeValue / (config.shadeSteps - 1);
                  pixelColor = p.lerpColor(
                    display.colorOff,
                    display.colorOn,
                    amount
                  );
                }

                p.fill(pixelColor);

                const baseDotSize = display.pixelScale - display.pixelGap;
                const maxDotSize = baseDotSize * config.dotScaleFactor;
                const minDotSize = p.lerp(maxDotSize, 0, config.dotNoiseInfluence);
                const scaledDotSize = p.map(noiseVal, 0, 1, minDotSize, maxDotSize);
                const offset = (display.pixelScale - scaledDotSize) / 2;

                p.ellipseMode(p.CORNER);
                p.ellipse(
                  x * display.pixelScale + offset,
                  y * display.pixelScale + offset,
                  scaledDotSize,
                  scaledDotSize
                );
              }
            }
          }
          p.save("dot-matrix-perlin-noise.svg");
        };
      };
      new p5(svgRenderer);
    },

    getDisplay: () => display,

    updateColorTheme: () => updateColorTheme(),
  };

  return sketch;
}


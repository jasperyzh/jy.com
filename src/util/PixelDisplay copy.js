/**
 * @fileoverview PixelDisplay class for simulating a dot matrix display.
 * @author jy
 * @date 2025-11-06
 */

/**
 * Represents a simulated dot matrix display, capable of rendering pixels with grayscale shades.
 * This class is designed to work within a p5.js environment, utilizing p5.js functions
 * like `createGraphics`, `color`, `lerpColor`, `image`, `background`, `noStroke`, `fill`, and `rect`.
 */
export default class PixelDisplay {
  /**
   * Creates an instance of PixelDisplay.
   * @param {number} matrixWidth - The width of the pixel matrix in number of pixels.
   * @param {number} matrixHeight - The height of the pixel matrix in number of pixels.
   * @param {number} pixelScale - The scaling factor for each pixel when rendered on the canvas.
   * @param {number} pixelGap - The gap between pixels when rendered, creating a dot matrix effect.
   * @param {p5} [p] - Optional p5.js instance (for instance mode). If not provided, uses global p5 functions.
   */
  constructor(matrixWidth, matrixHeight, pixelScale, pixelGap, p = null) {
    this.matrixWidth = matrixWidth;
    this.matrixHeight = matrixHeight;
    this.pixelScale = pixelScale;
    this.pixelGap = pixelGap;

    
    // Validate p5 instance if provided
    if (p !== null && p !== undefined) {
      if (typeof p.createGraphics !== 'function' || typeof p.color !== 'function') {
        throw new Error('PixelDisplay: Invalid p5 instance provided. Expected p5 instance with createGraphics and color methods.');
      }
      this.p = p; // Store p5 instance for instance mode
  } else {
      this.p = null;
    // In instance mode, p should always be provided
      // If p is null/undefined, we'll check for global functions as fallback
    }

    // Use p5 instance if provided, otherwise try global functions (for global mode compatibility)
    let createGraphicsFn, colorFn;

    
    if (this.p) {
    console.log('helloworld');
    // Instance mode: use p5 instance methods

      createGraphicsFn = this.p.createGraphics.bind(this.p);
      colorFn = this.p.color.bind(this.p);
    } else {
      // Global mode: try to use global functions
      // Check if we're in a browser environment and if global p5 functions exist on window
      if (typeof window !== 'undefined' && typeof window.createGraphics === 'function' && typeof window.color === 'function') {
        createGraphicsFn = window.createGraphics;
        colorFn = window.color;
      } else {
        throw new Error('PixelDisplay: p5 instance (p) must be provided in instance mode. In global mode, ensure p5.js is loaded globally.');
      }
    }

    this.buffer = createGraphicsFn(
      this.matrixWidth * this.pixelScale,
      this.matrixHeight * this.pixelScale
    );
    // this.buffer.setAttributes("willReadFrequently", true);

    this.pixelMatrix = Array(this.matrixWidth)
      .fill(null)
      .map(() => Array(this.matrixHeight).fill(0));

    this.colorOff = colorFn(50);
    this.colorOn = colorFn(255);
    this.colorStroke = colorFn(255);
  }

  /**
   * Sets the colors used for rendering the display.
   * @param {p5.Color} off - The color for 'off' pixels.
   * @param {p5.Color} on - The color for 'on' pixels (maximum shade).
   * @param {p5.Color} stroke - The stroke color (currently unused, but kept for potential future use).
   */
  setColors(off, on, stroke) {
    this.colorOff = off;
    this.colorOn = on;
    this.colorStroke = stroke;
  }

  /**
   * Clears the pixel matrix, setting all pixels to the 'off' state (shade value 0).
   */
  clear() {
    for (let x = 0; x < this.matrixWidth; x++) {
      for (let y = 0; y < this.matrixHeight; y++) {
        this.pixelMatrix[x][y] = 0;
      }
    }
  }

  /**
   * Sets the shade value of a specific pixel in the matrix.
   * @param {number} x - The x-coordinate of the pixel.
   * @param {number} y - The y-coordinate of the pixel.
   * @param {number} noiseVal - The raw noise value (0-1) for the pixel.
   */
  setPixel(x, y, noiseVal) {
    if (x < 0 || x >= this.matrixWidth || y < 0 || y >= this.matrixHeight) {
      return;
    }
    this.pixelMatrix[x][y] = noiseVal;
  }

  /**
   * Renders the current state of the pixel matrix to the p5.js canvas.
   * @param {number} x - The x-coordinate on the canvas where the display should be rendered.
   * @param {number} y - The y-coordinate on the canvas where the display should be rendered.
   * @param {object} controls - An object containing control parameters, including shadeSteps and dotScaleFactor.
   */
  render(x, y, controls) {
    // Use p5 instance if provided, otherwise try global functions (for global mode compatibility)
    let floorFn, mapFn, lerpFn, lerpColorFn, imageFn, CORNER_MODE;
    
    if (this.p) {
      // Instance mode: use p5 instance methods
      floorFn = this.p.floor.bind(this.p);
      mapFn = this.p.map.bind(this.p);
      lerpFn = this.p.lerp.bind(this.p);
      lerpColorFn = this.p.lerpColor.bind(this.p);
      imageFn = this.p.image.bind(this.p);
      CORNER_MODE = this.p.CORNER;
    } else {
      // Global mode: try to use global functions on window
      if (typeof window !== 'undefined' && typeof window.floor === 'function') {
        floorFn = window.floor;
        mapFn = window.map;
        lerpFn = window.lerp;
        lerpColorFn = window.lerpColor;
        imageFn = window.image;
        CORNER_MODE = window.CORNER;
      } else {
        throw new Error('PixelDisplay.render: p5 instance (p) must be provided in instance mode. In global mode, ensure p5.js is loaded globally.');
      }
    }

    this.buffer.clear();

    if (this.colorOff !== "transparent") {
      this.buffer.background(this.colorOff);
    }
    this.buffer.noStroke();
    this.buffer.ellipseMode(CORNER_MODE);

    for (let px = 0; px < this.matrixWidth; px++) {
      for (let py = 0; py < this.matrixHeight; py++) {
        const noiseVal = this.pixelMatrix[px][py];
        if (noiseVal > 0) {
          let pixelColor;
          if (!controls.useColorThemeShading) {
            // If shading is disabled, use the 'on' color directly
            pixelColor = this.colorOn;
          } else {
            // Otherwise, apply shading based on shadeSteps
            const shadeValue = floorFn(
              mapFn(noiseVal, 0, 1, 0, controls.shadeSteps)
            );
            if (shadeValue === 0) continue; // Skip if no shade
            const amount = shadeValue / (controls.shadeSteps - 1);
            pixelColor = lerpColorFn(this.colorOff, this.colorOn, amount);
          }
          this.buffer.fill(pixelColor);

          const baseDotSize = this.pixelScale - this.pixelGap;
          const maxDotSize = baseDotSize * controls.dotScaleFactor;
          const minDotSize = lerpFn(maxDotSize, 0, controls.dotNoiseInfluence);
          const scaledDotSize = mapFn(noiseVal, 0, 1, minDotSize, maxDotSize);
          const offset = (this.pixelScale - scaledDotSize) / 2;

          this.buffer.ellipse(
            px * this.pixelScale + offset,
            py * this.pixelScale + offset,
            scaledDotSize,
            scaledDotSize
          );
        }
      }
    }
    imageFn(this.buffer, x, y);
  }
}


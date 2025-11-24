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
   */
  constructor(matrixWidth, matrixHeight, pixelScale, pixelGap) {
    this.matrixWidth = matrixWidth;
    this.matrixHeight = matrixHeight;
    this.pixelScale = pixelScale;
    this.pixelGap = pixelGap;

    // p5.js functions are expected to be in the global scope
    this.buffer = createGraphics(
      this.matrixWidth * this.pixelScale,
      this.matrixHeight * this.pixelScale
    );
    // this.buffer.setAttributes("willReadFrequently", true);

    this.pixelMatrix = Array(this.matrixWidth)
      .fill(null)
      .map(() => Array(this.matrixHeight).fill(0));

    this.colorOff = color(50);
    this.colorOn = color(255);
    this.colorStroke = color(255);
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
    this.buffer.clear();

    if (this.colorOff !== "transparent") {
      this.buffer.background(this.colorOff);
    }
    this.buffer.noStroke();
    this.buffer.ellipseMode(CORNER);

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
            const shadeValue = floor(
              map(noiseVal, 0, 1, 0, controls.shadeSteps)
            );
            if (shadeValue === 0) continue; // Skip if no shade
            const amount = shadeValue / (controls.shadeSteps - 1);
            pixelColor = lerpColor(this.colorOff, this.colorOn, amount);
          }
          this.buffer.fill(pixelColor);

          const baseDotSize = this.pixelScale - this.pixelGap;
          const maxDotSize = baseDotSize * controls.dotScaleFactor;
          const minDotSize = lerp(maxDotSize, 0, controls.dotNoiseInfluence);
          const scaledDotSize = map(noiseVal, 0, 1, minDotSize, maxDotSize);
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
    image(this.buffer, x, y);
  }
}


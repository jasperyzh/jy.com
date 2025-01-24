const canvasSketch = require("canvas-sketch");
const load = require("load-asset");

const settings = {
  dimensions: [800, 800],
  animate: false,
};

// Keep your low-res grid
const cols = 80;
const rows = 80;
const scaleFactor = 1;

// Offset range for randomization (in halftone grid units)
const offsetRange = 0.5; // Adjust this value to control randomness

// Convert an RGB pixel [0..255] into CMYK [0..1]
function rgbToCMYK(r, g, b) {
  let c = 1 - r / 255;
  let m = 1 - g / 255;
  let y = 1 - b / 255;
  const k = Math.min(c, m, y);
  c = (c - k) / (1 - k) || 0;
  m = (m - k) / (1 - k) || 0;
  y = (y - k) / (1 - k) || 0;
  return { c, m, y, k };
}

const sketch = async () => {
  // Load the image
  const image = await load("./images/portrait-square.png");

  // Create an offscreen canvas to draw the image
  const offscreenCanvas = document.createElement("canvas");
  const offscreenContext = offscreenCanvas.getContext("2d");

  return ({ context, width, height }) => {
    // Set up the offscreen canvas size
    offscreenCanvas.width = width;
    offscreenCanvas.height = height;
    offscreenContext.drawImage(image, 0, 0, width, height);

    // Fill the visible canvas with white background
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    // Halftone cell sizes
    const cellW = width / cols;
    const cellH = height / rows;
    const maxRadius = Math.min(cellW, cellH) / scaleFactor;

    // Loop through each sample in the grid
    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Compute the original center for the current cell
        const xBase = col * cellW + cellW * 0.5;
        const yBase = row * cellH + cellH * 0.5;

        // Add random offsets to the dot position
        const xOffset = (Math.random() * 2 - 1) * offsetRange * cellW;
        const yOffset = (Math.random() * 2 - 1) * offsetRange * cellH;
        const xCenter = xBase + xOffset;
        const yCenter = yBase + yOffset;

        // Sample the pixel from the offscreen canvas
        const pixel = offscreenContext.getImageData(xBase, yBase, 1, 1).data;
        const [r, g, b] = pixel;

        // Convert RGB to CMYK channels
        const { c, m, y, k } = rgbToCMYK(r, g, b);

        // Draw circles for each CMYK channel with randomized offsets

        context.lineWidth = 5;
        // CYAN channel
        const rC = c * maxRadius;
        if (rC > 0.001) {
          context.beginPath();
          context.arc(xCenter, yCenter, rC, 0, Math.PI * 2);
          //   context.fillStyle = 'rgba(0, 255, 255, 0.2)';
          //   context.fill();
          context.strokeStyle = "rgba(0, 255, 255, 0.2)";
          context.stroke();
        }

        // MAGENTA channel
        const rM = m * maxRadius;
        if (rM > 0.001) {
          context.beginPath();
          context.arc(xCenter, yCenter, rM, 0, Math.PI * 2);
          //   context.fillStyle = 'rgba(255, 0, 255, 0.2)';
          //   context.fill();
          context.strokeStyle = "rgba(255, 0, 255, 0.2)";
          context.stroke();
        }

        // YELLOW channel
        const rY = y * maxRadius;
        if (rY > 0.001) {
          context.beginPath();
          context.arc(xCenter, yCenter, rY, 0, Math.PI * 2);
          //   context.fillStyle = 'rgba(255, 255, 0, 0.2)';
          //   context.fill();
          context.strokeStyle = "rgba(255, 255, 0, 0.2)";
          context.stroke();
        }

        // BLACK (K) channel
        const rK = k * maxRadius;
        if (rK > 0.001) {
          context.beginPath();
          context.arc(xCenter, yCenter, rK, 0, Math.PI * 2);
          //   context.fillStyle = 'rgba(0, 0, 0, 0.2)';
          //   context.fill();
          context.strokeStyle = "rgba(0, 0, 0, 0.2)";
          context.stroke();
        }
      }
    }
  };
};

canvasSketch(sketch, settings);

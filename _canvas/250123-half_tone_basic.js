const canvasSketch = require('canvas-sketch');
const load = require('load-asset');

const settings = {
  dimensions: [800, 800],
  animate: false
};


const cols = 60;
const rows = 60;
const scaleFactor = 1.8;

const sketch = async () => {
  // Load the image
  const image = await load('./images/portrait-square.png');

  // Create an offscreen canvas to draw the image
  const offscreenCanvas = document.createElement('canvas');
  const offscreenContext = offscreenCanvas.getContext('2d');

  return ({ context, width, height }) => {
    // Set up the offscreen canvas size
    offscreenCanvas.width = width;
    offscreenCanvas.height = height;

    // Draw the image on the offscreen canvas
    offscreenContext.drawImage(image, 0, 0, width, height);

    // Fill visible canvas with white background
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    // Halftone effect using the offscreen canvas pixel data
    const cellW = width / cols;
    const cellH = height / rows;
    const maxRadius = Math.min(cellW, cellH) / scaleFactor;

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const xCenter = col * cellW + cellW * 0.5;
        const yCenter = row * cellH + cellH * 0.5;

        // Sample pixel data from the offscreen canvas
        const pixel = offscreenContext.getImageData(xCenter, yCenter, 1, 1).data;
        const [r, g, b] = pixel;
        const avg = (r + g + b) / 3;
        const brightness = avg / 255;

        // Circle radius based on brightness
        const radius = (1 - brightness) * maxRadius;

        // Draw the circle
        context.beginPath();
        context.arc(xCenter, yCenter, radius, 0, Math.PI * 2);
        context.fillStyle = 'black';
        context.fill();
      }
    }
  };
};

canvasSketch(sketch, settings);

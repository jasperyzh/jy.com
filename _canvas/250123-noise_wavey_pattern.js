const canvasSketch = require("canvas-sketch");
const { noise2D } = require("canvas-sketch-util/random");
const { linspace } = require("canvas-sketch-util/math");

// console.log(window.)
// console.log viewport width and height
console.log(window.innerWidth, window.innerHeight, window);

document.addEventListener("DOMContentLoaded", () => {
  document.body.style.background = "#131313";
  // document.querySelector("body > canvas").style.margin = "0";
  // document.querySelector("body > canvas").style.padding = "0";
  document.querySelector("body > canvas").style.width = "100vw";
  document.querySelector("body > canvas").style.height = "100vh";
});


const settings = {
  dimensions: [window.innerWidth, window.innerHeight],
  animate: true
};

// 1) Create an offscreen canvas for drawing the marching squares
const offCanvas = document.createElement('canvas');
const offCtx = offCanvas.getContext('2d');

// Make the offscreen the same size as main (for easy one‐to‐one drawing)
offCanvas.width = settings.dimensions[0];
offCanvas.height = settings.dimensions[1];

// We’ll do a moderate resolution grid
const cols = 22;
const rows = 22;

// We’ll define how many contour lines we want
const isoLevels = linspace(43, true);

// We can animate over “time” if we want drifting lines
let time = 0;

// Let’s also let the mouse control “baseFrequency” by easing
let baseFrequency = 0.03;
let targetFrequency = baseFrequency;
const frequencyEasing = 0.05;

// Track mouse for zoom & parallax
let mouseX = window.innerWidth / 2;
let mouseY = window.innerHeight / 2;

// Update target freq as you move horizontally
window.addEventListener('mousemove', (ev) => {
  // Also track the mouse for zoom & parallax
  mouseX = ev.clientX;
  mouseY = ev.clientY;

  // Example: map mouseX in [0..windowWidth] => [0.001..0.01] freq range
  const fraction = mouseX / window.innerWidth;
  targetFrequency = 0.001 + fraction * 0.03;
});

// Interp helpers for marching squares
function interpX(x1, x2, val1, val2, threshold) {
  return x1 + (x2 - x1) * (threshold - val1) / (val2 - val1);
}
function interpY(y1, y2, val1, val2, threshold) {
  return y1 + (y2 - y1) * (threshold - val1) / (val2 - val1);
}

// A function to draw the marching-squares contours
function drawContours(ctx, width, height, t, freq) {
  // Clear the offscreen
  ctx.clearRect(0, 0, width, height);

  // Fill background
  ctx.fillStyle = '#131313';
  ctx.fillRect(0, 0, width, height);

  // For each iso-level
  isoLevels.forEach((level) => {
    // Remap [0..1] -> [-1..1]
    const threshold = level * 2 - 1;
    ctx.beginPath();

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        // Sample noise at four corners
        const v0 = noise2D(i, j + t, freq, 1);
        const v1 = noise2D(i + 1, j + t, freq, 1);
        const v2 = noise2D(i + 1, j + 1 + t, freq, 1);
        const v3 = noise2D(i, j + 1 + t, freq, 1);

        // Cell corners in pixel space
        const x0 = (i / cols) * width;
        const y0 = (j / rows) * height;
        const x1 = ((i + 1) / cols) * width;
        const y1 = ((j + 1) / rows) * height;

        // Determine corners above/below threshold
        let corners = 0;
        if (v0 > threshold) corners |= 1;
        if (v1 > threshold) corners |= 2;
        if (v2 > threshold) corners |= 4;
        if (v3 > threshold) corners |= 8;

        switch (corners) {
          // Single edges
          case 1:
          case 14: {
            const xA = x0;
            const yA = interpY(y0, y1, v0, v3, threshold);
            const xB = interpX(x0, x1, v0, v1, threshold);
            const yB = y0;
            ctx.moveTo(xA, yA);
            ctx.lineTo(xB, yB);
            break;
          }
          case 2:
          case 13: {
            const xA = interpX(x0, x1, v0, v1, threshold);
            const yA = y0;
            const xB = x1;
            const yB = interpY(y0, y1, v1, v2, threshold);
            ctx.moveTo(xA, yA);
            ctx.lineTo(xB, yB);
            break;
          }
          case 4:
          case 11: {
            const xA = x1;
            const yA = interpY(y0, y1, v1, v2, threshold);
            const xB = interpX(x0, x1, v3, v2, threshold);
            const yB = y1;
            ctx.moveTo(xA, yA);
            ctx.lineTo(xB, yB);
            break;
          }
          case 8:
          case 7: {
            const xA = interpX(x0, x1, v3, v2, threshold);
            const yA = y1;
            const xB = x0;
            const yB = interpY(y0, y1, v0, v3, threshold);
            ctx.moveTo(xA, yA);
            ctx.lineTo(xB, yB);
            break;
          }
          // Diagonal splits
          case 3:
          case 12: {
            const xA = x0;
            const yA = interpY(y0, y1, v0, v3, threshold);
            const xB = x1;
            const yB = interpY(y0, y1, v1, v2, threshold);
            ctx.moveTo(xA, yA);
            ctx.lineTo(xB, yB);
            break;
          }
          case 6:
          case 9: {
            const xA = interpX(x0, x1, v0, v1, threshold);
            const yA = y0;
            const xB = interpX(x0, x1, v3, v2, threshold);
            const yB = y1;
            ctx.moveTo(xA, yA);
            ctx.lineTo(xB, yB);
            break;
          }
          default:
            break;
        }
      }
    }

    ctx.lineWidth = 1;
    ctx.strokeStyle = '#333';
    ctx.stroke();
  });
}

const sketch = () => {
  return ({ context, width, height }) => {
    // Each frame:

    // 1) Ease baseFrequency to the latest target
    baseFrequency += (targetFrequency - baseFrequency) * frequencyEasing;

    // 2) Increment time if we want drifting lines
    time += 0.01;

    // 3) Render the marching squares onto the offscreen
    drawContours(offCtx, offCanvas.width, offCanvas.height, time, baseFrequency);

    // 4) Compute zoom factor from mouseX (center => 0, edges => 1)
    const fractionX = mouseX / window.innerWidth;
    const zoomFactor = 1 * Math.abs(fractionX - 0.1); // 0..1
    // const zoomFactor = 0; // 0..1
    // Let’s define the scale range from [1..2]
    const scale = 1 + zoomFactor;

    // 5) Compute parallax offset from mouse position
    const fractionY = mouseY / window.innerHeight;
    // const maxOffset = 200; // tweak
    const maxOffset = 30; // tweak
    const offsetX = (fractionX - 0.5) * maxOffset;
    const offsetY = (fractionY - 0.5) * maxOffset;

    // 6) Clear the main canvas
    context.clearRect(0, 0, width, height);

    // 7) Draw the offscreen onto the main with a transform
    context.save();
    // Move the canvas by offset
    context.translate(width / 2 + offsetX, height / 2 + offsetY);
    // Then scale around this new center
    context.scale(scale, scale);
    // Draw the offscreen so that it’s centered at our origin
    context.drawImage(offCanvas, -width / 2, -height / 2);
    context.restore();
  };
};

canvasSketch(sketch, settings);

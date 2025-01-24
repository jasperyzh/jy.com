const canvasSketch = require("canvas-sketch");
const { noise2D } = require("canvas-sketch-util/random");
const { linspace } = require("canvas-sketch-util/math");

// console.log(window.)
// console.log viewport width and height
console.log(window.innerWidth, window.innerHeight, window);

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("body > canvas").style.margin = "0";
  document.querySelector("body > canvas").style.padding = "0";
  document.querySelector("body > canvas").style.width = "100vw";
  document.querySelector("body > canvas").style.height = "100vh";
});
const settings = {
  dimensions: [window.innerWidth, window.innerHeight],
  animate: true
};

// Grid resolution
const cols = 80;
const rows = 80;

// We’ll define how many iso-levels (contour lines) we want
const isoLevels = linspace(6, true);

// For a gentle wave effect, we also increment time each frame
let time = 0;

// We’ll let mouse position control frequency, but we’ll store
// both the “live” frequency and “target” frequency for easing:
let baseFrequency = 0.003;
let targetFrequency = baseFrequency;

const frequencyEasing = 0.09;

// Listen for mouse move & update target frequency
window.addEventListener('mousemove', (event) => {
  const fractionX = event.clientX / window.innerWidth; // 0..1
  // Map [0..1] => [0.001..0.01] for example
  targetFrequency = 0.001 + fractionX * 0.015;
});

// Interpolation helpers
function interpX(x1, x2, val1, val2, threshold) {
  return x1 + (x2 - x1) * (threshold - val1) / (val2 - val1);
}
function interpY(y1, y2, val1, val2, threshold) {
  return y1 + (y2 - y1) * (threshold - val1) / (val2 - val1);
}

const sketch = () => {
  // These offsets let us treat the middle of the grid as “(0,0)”
  // so that we effectively anchor in the canvas center.
  const halfCols = cols / 2;
  const halfRows = rows / 2;

  return ({ context, width, height }) => {
    // Ease the frequency toward the mouse-based “target”
    baseFrequency += (targetFrequency - baseFrequency) * frequencyEasing;
    // Increment time for a drifting effect
    time += 0.01;

    // Clear the background
    context.fillStyle = '#131313';
    context.fillRect(0, 0, width, height);

    // Draw each iso-level
    isoLevels.forEach((level) => {
      // Remap iso-level from [0..1] => [–1..1]
      const threshold = level * 2 - 1;

      context.beginPath();

      // March through a cols x rows grid
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          // Shift i, j so that (0, 0) is at the center of the grid
          const shiftedI = i - halfCols;
          const shiftedJ = j - halfRows;

          // Sample noise at each cell corner
          const v0 = noise2D(shiftedI, shiftedJ + time, baseFrequency, 1);
          const v1 = noise2D(shiftedI + 1, shiftedJ + time, baseFrequency, 1);
          const v2 = noise2D(shiftedI + 1, shiftedJ + 1 + time, baseFrequency, 1);
          const v3 = noise2D(shiftedI, shiftedJ + 1 + time, baseFrequency, 1);

          // Now convert these cell corners to actual pixel positions,
          // again offsetting so that (0,0) is canvas center:
          const x0 = (shiftedI / cols) * width + width / 2;
          const y0 = (shiftedJ / rows) * height + height / 2;
          const x1 = ((shiftedI + 1) / cols) * width + width / 2;
          const y1 = ((shiftedJ + 1) / rows) * height + height / 2;

          // Figure out which corners are above/below threshold
          let corners = 0;
          if (v0 > threshold) corners |= 1;  // top-left
          if (v1 > threshold) corners |= 2;  // top-right
          if (v2 > threshold) corners |= 4;  // bottom-right
          if (v3 > threshold) corners |= 8;  // bottom-left

          // Marching squares bitmask
          switch (corners) {
            case 1:
            case 14: {
              const xA = x0;
              const yA = interpY(y0, y1, v0, v3, threshold);
              const xB = interpX(x0, x1, v0, v1, threshold);
              const yB = y0;
              context.moveTo(xA, yA);
              context.lineTo(xB, yB);
              break;
            }
            case 2:
            case 13: {
              const xA = interpX(x0, x1, v0, v1, threshold);
              const yA = y0;
              const xB = x1;
              const yB = interpY(y0, y1, v1, v2, threshold);
              context.moveTo(xA, yA);
              context.lineTo(xB, yB);
              break;
            }
            case 4:
            case 11: {
              const xA = x1;
              const yA = interpY(y0, y1, v1, v2, threshold);
              const xB = interpX(x0, x1, v3, v2, threshold);
              const yB = y1;
              context.moveTo(xA, yA);
              context.lineTo(xB, yB);
              break;
            }
            case 8:
            case 7: {
              const xA = interpX(x0, x1, v3, v2, threshold);
              const yA = y1;
              const xB = x0;
              const yB = interpY(y0, y1, v0, v3, threshold);
              context.moveTo(xA, yA);
              context.lineTo(xB, yB);
              break;
            }
            case 3:
            case 12: {
              const xA = x0;
              const yA = interpY(y0, y1, v0, v3, threshold);
              const xB = x1;
              const yB = interpY(y0, y1, v1, v2, threshold);
              context.moveTo(xA, yA);
              context.lineTo(xB, yB);
              break;
            }
            case 6:
            case 9: {
              const xA = interpX(x0, x1, v0, v1, threshold);
              const yA = y0;
              const xB = interpX(x0, x1, v3, v2, threshold);
              const yB = y1;
              context.moveTo(xA, yA);
              context.lineTo(xB, yB);
              break;
            }
            default:
              break;
          }
        }
      }

      context.lineWidth = 1;
      context.strokeStyle = '#aaa';
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);

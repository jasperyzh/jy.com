const canvasSketch = require("canvas-sketch");
const { noise2D } = require("canvas-sketch-util/random");
const { linspace } = require("canvas-sketch-util/math");

// console.log(window.)
// console.log viewport width and height
console.log(window.innerWidth, window.innerHeight, window);

// body > canvas remove margin and padding
document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("body > canvas").style.margin = "0";
  document.querySelector("body > canvas").style.padding = "0";
  document.querySelector("body > canvas").style.width = "100vw";
  document.querySelector("body > canvas").style.height = "100vh";
});

const settings = {
  dimensions: [window.innerWidth, window.innerHeight],
  animate: false, // set true if you want to see it animate
};

const sketch = () => {
  // Grid resolution
  const cols = window.innerWidth;
  const rows = window.innerHeight;

  // Noise settings
  const frequency = 0.00618;
  const amplitude = 1;

  // Precompute noise values on a grid
  const values = [];
  for (let y = 0; y <= rows; y++) {
    const row = [];
    for (let x = 0; x <= cols; x++) {
      // Range of noise2D is roughly -1..1
      const n = noise2D(x, y, frequency, amplitude);
      row.push(n);
    }
    values.push(row);
  }

  // Define iso-levels (the contour thresholds)
  // linspace(8, true) gives 8 equally spaced steps from 0..1
  // but since our noise is -1..1, we remap accordingly below.
  const isoLevels = linspace(8, true);

  // Helpers for interpolating edges
  function interpX(x1, x2, val1, val2, threshold) {
    // Quick linear interpolation in X
    return x1 + (x2 - x1) * (threshold - val1) / (val2 - val1);
  }
  function interpY(y1, y2, val1, val2, threshold) {
    // Quick linear interpolation in Y
    return y1 + (y2 - y1) * (threshold - val1) / (val2 - val1);
  }

  return ({ context, width, height }) => {
    // Clear background
    context.fillStyle = "#131313";
    context.fillRect(0, 0, width, height);

    // For each iso-level, we walk the grid and connect edges where
    // the noise crosses that threshold
    isoLevels.forEach((level) => {
      // Remap [0..1] -> [-1..1] so we hit the whole noise range
      const threshold = level * 2 - 1;

      // Start drawing a new set of contours
      context.beginPath();

      // Loop through grid cells
      for (let j = 0; j < rows; j++) {
        for (let i = 0; i < cols; i++) {
          const v0 = values[j][i];
          const v1 = values[j][i + 1];
          const v2 = values[j + 1][i + 1];
          const v3 = values[j + 1][i];

          // The corners of this cell in pixel space
          const x0 = (i / cols) * width;
          const y0 = (j / rows) * height;
          const x1 = ((i + 1) / cols) * width;
          const y1 = ((j + 1) / rows) * height;

          // Figure out which corners are above/below threshold
          // We’ll create a bitmask from the four corners
          let corners = 0;
          if (v0 > threshold) corners |= 1; // top-left
          if (v1 > threshold) corners |= 2; // top-right
          if (v2 > threshold) corners |= 4; // bottom-right
          if (v3 > threshold) corners |= 8; // bottom-left

          // A few quick bitmask cases for marching squares
          // (there are 16 total combos but some can be mirrored)
          switch (corners) {
            // Single-edge intersections
            case 1:
            case 14: {
              // Edge between top-left/bottom-left, and top-left/top-right
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
              // Edge between top-left/top-right, and top-right/bottom-right
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
              // Edge between top-right/bottom-right, and bottom-right/bottom-left
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
              // Edge between bottom-right/bottom-left, and top-left/bottom-left
              const xA = interpX(x0, x1, v3, v2, threshold);
              const yA = y1;
              const xB = x0;
              const yB = interpY(y0, y1, v0, v3, threshold);
              context.moveTo(xA, yA);
              context.lineTo(xB, yB);
              break;
            }
            // Cases with diagonals
            case 3:
            case 12: {
              // Diagonal from left edge to right edge
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
              // Diagonal from top edge to bottom edge
              const xA = interpX(x0, x1, v0, v1, threshold);
              const yA = y0;
              const xB = interpX(x0, x1, v3, v2, threshold);
              const yB = y1;
              context.moveTo(xA, yA);
              context.lineTo(xB, yB);
              break;
            }
            // 0 or 15 means fully below or fully above threshold: no line
            default:
              break;
          }
        }
      }

      // Draw the entire contour for this threshold
      context.lineWidth = 0.3;
      context.strokeStyle = "#aaa";
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);

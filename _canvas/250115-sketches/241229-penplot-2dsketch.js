const canvasSketch = require("canvas-sketch");
const { renderPaths, createPath, pathsToPolylines } = require(
  "canvas-sketch-util/penplot",
);
const { clipPolylinesToBox } = require("canvas-sketch-util/geometry");
const Random = require("canvas-sketch-util/random");
const { lerp } = require("canvas-sketch-util/math");

// You can force a specific seed by replacing this with a string value
const defaultSeed = "";

// Set a random seed so we can reproduce this print later
Random.setSeed(defaultSeed || Random.getRandomSeed());

// Print to console so we can see which seed is being used and copy it if desired
console.log("Random Seed:", Random.getSeed());

// custom
function random_lerp(min = 0, max = 1, value = random.value()) {
  return Math.round(lerp(min, max, value) * 100) /
    100;
}

const settings = {
  suffix: Random.getSeed(),
  // dimensions: 'A4',
  dimensions: [120, 120],
  orientation: "portrait",
  pixelsPerInch: 300,
  scaleToView: true,
  units: "mm",
  // units: 'cm'
};

// Change these as desired
const total_random_circles = 0.618; // e.g., 20% of possible points
// const settings = {
//   // A4 size in mm, portrait
//   dimensions: [210, 297],
//   units: 'mm',
// };

// Grid generation function
const createGrid = () => {
  const points = [];
  // You can tweak the min/max for count as desired
  const gridCount = Math.round(lerp(70, 102, Random.value()));

  for (let x = 0; x < gridCount; x++) {
    for (let y = 0; y < gridCount; y++) {
      const u = gridCount <= 1 ? 0.5 : x / (gridCount - 1);
      const v = gridCount <= 1 ? 0.5 : y / (gridCount - 1);

      // const noise = Math.abs(Random.noise2D(u, v));
      // const radius = noise * 0.22 + 0.01;
      const radius = Math.abs(Random.noise2D(u, v)) * 0.85 + 0.01;

      // const rotation = noise * Math.PI * 2;
      // console.log("radius", radius);
      if (radius < 0.005 || radius > 1.818) {
        continue;
      }
      points.push({
        // optional color, rotation
        color: "#131313",
        radius,
        position: [u, v],
        // rotation,
        // rotation: Math.abs(Random.noise2D(u, v)) * Math.PI * 1.618,
        rotation: Math.abs(Random.noise2D(u, v)) * Math.PI * 0.8,
      });
    }
  }
  return points;
};

// Main sketch definition
const sketch = ({ width, height, units }) => {
  // Generate points and filter some out randomly
  const points = createGrid().filter(() =>
    Random.value() > 1 - total_random_circles
  );

  // We'll store all path objects here
  const paths = [];

  // For each point, create a path (e.g., circle)
  points.forEach(({ position, radius, rotation }) => {
    // const [u, v] = position;
    // // Scale from [0..1] (u,v) to [0..width], [0..height]
    // const x = lerp(0, width, u);
    // const y = lerp(0, height, v);

    // // Create a new path
    // const p = createPath();
    // // Draw a circle arc, from 0 to 2π
    // // p.arc(x, y, radius * Math.min(5, 8), 0, Math.PI * 2);
    // const lineGap = radius * 2; // Distance between the two lines
    // const lineLength = radius * Math.min(5, 8); // Length of each line

    // // Top line
    // p.moveTo(x - lineLength / 2, y - lineGap / 2);
    // p.lineTo(x + lineLength / 2, y - lineGap / 2);

    // // Bottom line
    // p.moveTo(x - lineLength / 2, y + lineGap / 2);
    // p.lineTo(x + lineLength / 2, y + lineGap / 2);

    // paths.push(p);

    const [u, v] = position;
    let x = lerp(0, width, u);
    let y = lerp(0, height, v);

    // Sine wave parameters
    const amplitude = 20; // Offset in working units
    const frequency = 3; // Controls how many waves fit across the width

    // Apply sine wave offset to x or y
    const waveOffsetX = Math.sin(v * Math.PI * frequency) * amplitude; // Offset x
    // const waveOffsetY = Math.sin(u * Math.PI * frequency) * amplitude; // Offset y
    const waveOffsetY = 0; // Offset y

    // Add the offsets to x and y
    x += waveOffsetX;
    y += waveOffsetY;

    const lineGap = radius * 4; // Distance between the two lines
    const lineLength = radius * Math.min(5, 8); // Length of each line

    const angle = rotation || Random.noise2D(u, v) * Math.PI * 2; // Rotation angle in radians

    // Function to rotate a point (dx, dy) around (x, y) by angle
    const rotatePoint = (cx, cy, dx, dy, theta) => {
      const cosTheta = Math.cos(theta);
      const sinTheta = Math.sin(theta);

      const rx = cosTheta * dx - sinTheta * dy;
      const ry = sinTheta * dx + cosTheta * dy;

      return [cx + rx, cy + ry];
    };

    const p = createPath();

    // Define the endpoints of the top line (before rotation)
    const topStart = [-lineLength / 2, -lineGap / 2];
    const topEnd = [lineLength / 2, -lineGap / 2];

    // Define the endpoints of the bottom line (before rotation)
    const bottomStart = [-lineLength / 2, lineGap / 2];
    const bottomEnd = [lineLength / 2, lineGap / 2];

    // Rotate each endpoint
    const [topStartX, topStartY] = rotatePoint(
      x,
      y,
      topStart[0],
      topStart[1],
      angle,
    );
    const [topEndX, topEndY] = rotatePoint(x, y, topEnd[0], topEnd[1], angle);
    const [bottomStartX, bottomStartY] = rotatePoint(
      x,
      y,
      bottomStart[0],
      bottomStart[1],
      angle,
    );
    const [bottomEndX, bottomEndY] = rotatePoint(
      x,
      y,
      bottomEnd[0],
      bottomEnd[1],
      angle,
    );

    // Draw the rotated lines
    p.moveTo(topStartX, topStartY);
    p.lineTo(topEndX, topEndY);

    p.moveTo(bottomStartX, bottomStartY);
    p.lineTo(bottomEndX, bottomEndY);

    paths.push(p);
  });

  // Convert all our path commands into polylines
  let lines = pathsToPolylines(paths, { units });

  // Clip lines to the page (with a small margin)
  const margin = 10; // 10mm margin
  const box = [margin, margin, width - margin, height - margin];
  lines = clipPolylinesToBox(lines, box);

  // Return a render function for the canvas-sketch penplot plugin
  return (props) =>
    renderPaths(lines, {
      ...props,
      lineJoin: "round",
      lineCap: "round",
      lineWidth: 0.2, // Adjust for pen thickness
      optimize: true,
    });
};

canvasSketch(sketch, settings);

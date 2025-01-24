const canvasSketch = require("canvas-sketch");
const { polylinesToSVG } = require("canvas-sketch-util/penplot");

const random = require("canvas-sketch-util/random");
const convexHull = require("convex-hull");

const settings = {
  dimensions: [14.8, 21], //"A5",
  orientation: "portrait",
  pixelsPerInch: 300,
  scaleToView: true,
  units: "cm",
};
const lines = [];

const sketch = () => {
  // Generate random points on the canvas, avoiding negative values
  const pointCount = 100;
  const margin = 2;
  const points = Array.from({ length: pointCount }, () => [
    Math.max(
      random.value() * (settings.dimensions[0] - 2 * margin) + margin,
      0,
    ),
    Math.max(
      random.value() * (settings.dimensions[1] - 2 * margin) + margin,
      0,
    ),
  ]);

  console.log(settings.dimensions);

  // Ensure there are enough points for a convex hull
  if (points.length < 3) {
    throw new Error("Not enough points to create a convex hull.");
  }

  // Calculate the convex hull using the points
  let hullEdges;
  try {
    hullEdges = convexHull(points);
  } catch (error) {
    console.error("Error calculating convex hull:", error);
    return;
  }

  // Convert edges to vertices for both canvas drawing and SVG export
  const hull = hullEdges.map((edge) => points[edge[0]]);
  hull.push(hull[0]); // Close the loop
  lines.push(hull);

  return ({ context, width, height, units }) => {
    // Clear canvas before drawing
    context.clearRect(0, 0, width, height);

    // White background
    context.fillStyle = "#eee";
    context.fillRect(0, 0, width, height);

    // Draw all points for visibility
    context.fillStyle = "black";

    console.log(points);
    points.forEach(([x, y]) => {
      context.beginPath();
      context.arc(x, y, 0.1, 0, Math.PI * 2); // Visible dots for debugging
      context.fill();
    });

    // Draw the convex hull on canvas
    context.strokeStyle = "red";
    context.lineWidth = 0.05;
    context.beginPath();
    hull.forEach(([x, y], index) => {
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    });
    context.closePath();
    context.stroke();

    // Return both the canvas and the SVG for export
    return [
      context.canvas,
      {
        data: polylinesToSVG(lines, { width, height, units }),
        extension: ".svg",
      },
    ];
  };
};

canvasSketch(sketch, settings);

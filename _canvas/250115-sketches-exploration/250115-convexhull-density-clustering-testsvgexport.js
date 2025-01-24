const canvasSketch = require("canvas-sketch");
const {
  // pathsToPolylines,
  // renderPolylines,
  pathsToSVG,
  createPath,
  renderPaths,
} = require(
  "canvas-sketch-util/penplot",
);

const random = require("canvas-sketch-util/random");
const { lerp } = require("canvas-sketch-util/math");
const convexHull = require("convex-hull");
const clustering = require("density-clustering");
const { clipPolylinesToBox } = require("canvas-sketch-util/geometry");

const settings = {
  // dimensions: "A5",
  dimensions: [14.8, 21],
  orientation: "portrait",
  pixelsPerInch: 300,
  scaleToView: true,
  units: "cm",
};

const sketch = ({ width, height }) => {
  // List of polylines for our pen plot
  // let lines = [];

  // const margin = 5;

  // Create shapes with path interface
  const shape0 = createPath((ctx) => {
    console.log("ctx:", ctx);

    ctx.rect(1, 1, 3, 5);
    // ctx.closePath()
    // ctx.closePath()
  });
  // And/or with polylines or plain SVGStrings, e.g. from a .svg file
  const shape1 = [[2, 2], [50, 25]];

  // Convert array of points to a Path2D
  const shape1Path = createPath((ctx) => {
    ctx.moveTo(shape1[0][0], shape1[0][1]); // Start at the first point
    for (let i = 1; i < shape1.length; i++) {
      const [x, y] = shape1[i];
      ctx.lineTo(x, y); // Draw lines to each subsequent point
    }
  });

  const shape2 = createPath((ctx) => {
    ctx.arc(width / 2, height / 2, 3, 0, Math.PI * 2);
  });
  // Combine into an array or nested array
  const paths = [shape0, shape1Path, shape2];

  const svgtest = pathsToSVG(paths, {
    width: 14.8,
    height: 21,
    units: "cm",
    lineWidth: 0.03,
    fillStyle: "red",
    // optimize the SVG output for pen plotter use
    optimize: true,
  });

  const pathToString = createPath((context) => {
    // Circle in centre of page

    context.arc(width / 2, height / 2, 25, 0, Math.PI * 2);
  });

  // Get a SVG string of the path
  const svg = pathToString.toString();

  console.log(svg);

  return ({ context, width, height, units }) => {
    // Clear canvas
    context.clearRect(0, 0, width, height);

    // Margin in inches
    const margin = 1 / 4;

    // Off-white background
    context.fillStyle = "hsl(0, 0%, 98%)";
    context.fillRect(0, 0, width, height);

    // Gradient foreground
    const fill = context.createLinearGradient(0, 0, width, height);
    fill.addColorStop(0, "cyan");
    fill.addColorStop(1, "orange");

    // Fill rectangle
    context.fillStyle = fill;
    context.fillRect(margin, margin, width - margin * 2, height - margin * 2);

    // RENDER
    renderPaths(paths, {
      ...{ context, width, height, units },
      lineWidth: 0.03,
      background: "none",
      // foreground: "white",
    });

    // EMULATE SVG EXPORT
    paths.forEach((path) => {
      // Convert the path to a string for SVG compatibility
      const pathString = path.toString();
      const tempPath = new Path2D(pathString);

      // Set the fill style and fill the path
      context.fillStyle = "rgba(255, 0, 0, 1)"; // Red fill color
      context.fill(tempPath);

      // Set the stroke style and stroke the path
      context.strokeStyle = "rgba(0, 0, 0, 1)"; // Black stroke color
      context.lineWidth = 0.1; // Set line width in the same units as paths
      context.stroke(tempPath);
    });

    // EXPORTS
    return [
      // Export PNG as first layer
      context.canvas,
      // Export SVG for pen plotter as second layer
      {
        data: pathsToSVG(paths, {
          width,
          height,
          units,
        }),
        extension: ".svg",
      },
      // Export SVG with fills
      {
        data: svgtest,
        extension: ".svg",
      },
      ,
    ];
  };
};

canvasSketch(sketch, settings);

/**
 * A Canvas2D + SVG Pen Plotter example of "Cubic Disarray"
 * (a recreation of an artwork by Georg Nees in 1968-71).
 *
 * @author Stephane Tombeur (https://github.com/stombeur)
 */

// https://github.com/mattdesl/canvas-sketch/blob/master/examples/pen-plotter-cubic-disarray.js

const canvasSketch = require("canvas-sketch");
const { polylinesToSVG } = require("canvas-sketch-util/penplot");
const random = require("canvas-sketch-util/random");

const triangulate = require("delaunay-triangulate");

// import newArray from "new-array";
// import { randomFloat } from "penplot/util/random";

const lines = [];

const settings = {
  dimensions: "A5",
  orientation: "portrait",
  pixelsPerInch: 300,
  scaleToView: true,
  units: "cm",
};

// function to generate a random number between min and max
const random222 = (min, max) => Math.random() * (max - min) + min;

const sketch = (context) => {
  let marginBetweenElements = 0.05;
  let elementWidth = 0.8;
  let elementHeight = 0.8;
  let columns = 7;
  let rows = 7;

  // position drawing in center of page
  let drawingWidth = columns * (elementWidth + marginBetweenElements) -
    marginBetweenElements;
  let drawingHeight = rows * (elementHeight + marginBetweenElements) -
    marginBetweenElements;
  let marginPageLeft = (context.width - drawingWidth) / 2;
  let marginPageTop = (context.height - drawingHeight) / 2;

  let o = [];

  for (let r = 0; r < rows; r++) {
    o[r] = [];
    for (let i = 0; i < columns; i++) {
      let angle = 0;
      let move = 0;
      if (r >= 2) {
        angle = random222(-r, r); // introduce a random222 rotation
        move = random222(0, r * 0.1); // introduce a random222 movement
      }
      o[r].push({ angle, move });
    }
  }

  const { width, height } = context;

  const pointCount = 1800;
  const positions = Array.from({ length: pointCount }, () => {
    // Margin from print edge in centimeters
    const margin = 5;
    // Return a random 2D point inset by this margin
    return [
      // randomFloat(margin, width - margin),
      // randomFloat(margin, height - margin),

      random.range(margin, width - margin),
      random.range(margin, height - margin),
    ];
  });

  const cells = triangulate(positions);
  console.log(cells);
  const triangle = cells[0].map((i) => positions[i]);

  // log each 2D point in the triangle
  console.log(triangle[0], triangle[1], triangle[2]);

   // Convert Delaunay triangles into polylines for both canvas and SVG
   const lines2 = cells.map((cell) => {
    const triangle = cell.map((i) => positions[i]);
    triangle.push(triangle[0]); // Close the triangle
    lines.push(triangle); // Add to lines for SVG export
    return triangle;
  });

  return ({ context, width, height, units }) => {
    // white background
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    let posX = marginPageLeft;
    let posY = marginPageTop;

    for (let r = 0; r < rows; r++) {
      for (let i = 0; i < columns; i++) {
        drawSquare(
          context,
          posX,
          posY + o[r][i].move,
          elementWidth,
          o[r][i].angle,
        );
        posX = posX + elementWidth + marginBetweenElements;
      }
      posX = marginPageLeft;
      posY = posY + elementHeight + marginBetweenElements;
    }

    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    context.strokeStyle = "black";
    context.lineWidth = 0.02;

    // Draw the Delaunay triangles on canvas
    lines2.forEach(triangle => {
      context.beginPath();
      triangle.forEach(([x, y], index) => {
        if (index === 0) context.moveTo(x, y);
        else context.lineTo(x, y);
      });
      context.closePath();
      context.stroke();
    });


    return [
      context.canvas,
      {
        data: polylinesToSVG(lines, {
          width,
          height,
          units,
        }),
        extension: ".svg",
      },
    ];
  };

  // rotate [x,y] around the center [cx, cy] with angle in degrees
  // and y-axis moving downward
  function rotate(cx, cy, x, y, angle) {
    if (angle === 0) return [x, y];

    var radians = (Math.PI / 180) * angle,
      cos = Math.cos(radians),
      sin = Math.sin(radians),
      nx = cos * (x - cx) - sin * (y - cy) + cx,
      ny = cos * (y - cy) + sin * (x - cx) + cy;
    return [nx, ny];
  }

  // draw a square in a single line
  // and rotate it if needed
  function drawSquare(context, cx, cy, width, angle) {
    // calculate rotated coordinates
    let xy1 = rotate(cx, cy, cx, cy, angle);
    let xy2 = rotate(cx, cy, cx + width, cy, angle);
    let xy3 = rotate(cx, cy, cx + width, cy + width, angle);
    let xy4 = rotate(cx, cy, cx, cy + width, angle);

    context.beginPath();
    context.strokeStyle = "black";
    context.lineWidth = 0.02;
    context.lineCap = "square";
    context.lineJoin = "miter";

    // draw square on context
    context.moveTo(...xy1);
    context.lineTo(...xy2);
    context.lineTo(...xy3);
    context.lineTo(...xy4);
    context.lineTo(...xy1);
    context.stroke();

    // draw square for svg polylines
    lines.push([xy1, xy2]);
    lines.push([xy2, xy3]);
    lines.push([xy3, xy4]);
    lines.push([xy4, xy1]);
  }
};

canvasSketch(sketch, settings);

const canvasSketch = require("canvas-sketch");
const random = require("canvas-sketch-util/random");
const load = require("load-asset");

const settings = {
  dimensions: [12, 12],
  pixelsPerInch: 300,
  units: "cm",
  animate: false,
};

////////////////////////////////////////
// Low-Res Grid
const cols = 44;
const rows = 44;
const scaleFactor = .9;
const offsetRange = 0.4;

// High-Res Grid
const colsHigh = 120;
const rowsHigh = 120;
const scaleFactorHigh = 1.2; // or you can tweak separately
const offsetRangeHigh = 0.3;

// Eye boundary – for example, a polygon
// Coordinates are in [cm], matching [0..12] on the main canvas
/* const eyePolygon = [
  [0, 8],
  [12, 0],
  [6, 6],
  [0, 12],
]; */

const eyePolygon = [
  [0, 0],
  [12, 0],
  [12, 12],
  [0, 12],
];

////////////////////////////////////////
// Point-in-polygon helper
function pointInPolygon(point, vertices) {
  const [x, y] = point;
  let inside = false;
  for (let i = 0, j = vertices.length - 1; i < vertices.length; j = i++) {
    const [xi, yi] = vertices[i];
    const [xj, yj] = vertices[j];
    const intersect = yi > y !== yj > y &&
      x < ((xj - xi) * (y - yi)) / (yj - yi) + xi;
    if (intersect) inside = !inside;
  }
  return inside;
}

// Convert an RGB pixel [0..255] to CMYK [0..1]
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
  const image = await load("./images/portrait-square.png");

  // We'll create multiple offscreen canvases:
  // One for low-res sampling (88x88),
  // Another for high-res sampling (176x176).
  const offscreenLow = document.createElement("canvas");
  const offscreenHigh = document.createElement("canvas");

  const ctxLow = offscreenLow.getContext("2d");
  const ctxHigh = offscreenHigh.getContext("2d");

  return ({ context, width, height }) => {
    //////////////////////////////
    // 1) Prepare offscreen canvases
    // Low-res
    offscreenLow.width = cols;
    offscreenLow.height = rows;
    ctxLow.drawImage(image, 0, 0, cols, rows);

    // High-res
    offscreenHigh.width = colsHigh;
    offscreenHigh.height = rowsHigh;
    ctxHigh.drawImage(image, 0, 0, colsHigh, rowsHigh);

    //////////////////////////////
    // 2) Fill main canvas with white
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    /*
    2. Additive Blending on Screen vs. Subtractive Ink

    When you stroke arcs with rgba(0, 255, 255, 0.5) on a white background, you’re effectively adding color to the pixels. Real CMYK printing is subtractive—each ink layer filters out light. So the result on screen doesn’t replicate the same look as printed.

    Tip: For a closer “preview,” use multiply blending for each channel. That means layering your arcs in a “multiply” compositing mode over white. JavaScript’s default canvas doesn’t have a direct multiply for strokes, but you can do something like:

        Temporarily set context.globalCompositeOperation = "multiply".
        Draw your arcs with their base color.
        Then reset context.globalCompositeOperation = "source-over".

    However, you still won’t get perfect realism, because each channel has alpha.
    */
    // context.globalCompositeOperation = "multiply"

    // 3) Low-res pass: draw arcs everywhere
    drawHalftoneLayer({
      context,
      width,
      height,
      offscreenCtx: ctxLow,
      gridCols: cols,
      gridRows: rows,
      scale: scaleFactor,
      offset: offsetRange,
      polygon: null, // or exclude polygon to draw everywhere
    });

    // 4) High-res pass: ONLY draw arcs in the polygon (eyes)
    drawHalftoneLayer({
      context,
      width,
      height,
      offscreenCtx: ctxHigh,
      gridCols: colsHigh,
      gridRows: rowsHigh,
      scale: scaleFactorHigh,
      offset: offsetRangeHigh, // maybe less offset for finer detail
      polygon: eyePolygon, // highlight the eyes
    });
  };
};

canvasSketch(sketch, settings);

//////////////////////////////////////////////////////////////
// Helper function to draw arcs from an offscreen canvas
//////////////////////////////////////////////////////////////
function drawHalftoneLayer({
  context,
  width,
  height,
  offscreenCtx,
  gridCols,
  gridRows,
  scale,
  offset,
  polygon,
}) {
  const cellW = width / gridCols;
  const cellH = height / gridRows;
  const maxRadius = Math.min(cellW, cellH) / scale;

  // Each color channel stored separately
  const layers = {
    cyan: [],
    magenta: [],
    yellow: [],
    black: [],
  };

  for (let row = 0; row < gridRows; row++) {
    for (let col = 0; col < gridCols; col++) {
      // Where it appears on the main canvas
      const xBase = (col + 0.5) * cellW;
      const yBase = (row + 0.5) * cellH;

      // If a polygon is specified, only draw if inside
      if (polygon) {
        const inside = pointInPolygon([xBase, yBase], polygon);
        if (!inside) continue;
      }

      // Random offset
      const xOffset = (Math.random() * 2 - 1) * offset * cellW;
      const yOffset = (Math.random() * 2 - 1) * offset * cellH;
      const xCenter = xBase + xOffset;
      const yCenter = yBase + yOffset;

      // Sample from offscreen
      const pixel = offscreenCtx.getImageData(col, row, 1, 1).data;
      const { c, m, y, k } = rgbToCMYK(pixel[0], pixel[1], pixel[2]);

      const rC = c * maxRadius;
      const rM = m * maxRadius;
      const rY = y * maxRadius;
      const rK = k * maxRadius;

      if (rC > 0.001) layers.cyan.push({ x: xCenter, y: yCenter, r: rC });
      if (rM > 0.001) layers.magenta.push({ x: xCenter, y: yCenter, r: rM });
      if (rY > 0.001) layers.yellow.push({ x: xCenter, y: yCenter, r: rY });
      if (rK > 0.001) layers.black.push({ x: xCenter, y: yCenter, r: rK });
    }
  }

  // Draw the arcs for each CMYK layer
  drawLayers(context, layers);
}

//////////////////////////////////////////////////////////////
// Helper function to draw each layer
//////////////////////////////////////////////////////////////
function drawLayers(context, layers) {
  context.lineWidth = 0.03;

  // Cyan
  context.strokeStyle = "rgba(0, 255, 255, 0.5)";
  layers.cyan.forEach(({ x, y, r }) => {
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2);
    context.stroke();
  });

  // Magenta
  context.strokeStyle = "rgba(255, 0, 255, 0.5)";
  layers.magenta.forEach(({ x, y, r }) => {
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2);
    context.stroke();
  });

  // Yellow
  context.strokeStyle = "rgba(255, 255, 0, 0.5)";
  layers.yellow.forEach(({ x, y, r }) => {
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2);
    context.stroke();
  });

  // Black
  context.strokeStyle = "rgba(0, 0, 0, 0.5)";
  layers.black.forEach(({ x, y, r }) => {
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2);
    context.stroke();
  });
}

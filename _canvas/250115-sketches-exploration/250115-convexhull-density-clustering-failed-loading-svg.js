const canvasSketch = require('canvas-sketch');
const { polylinesToSVG } = require('canvas-sketch-util/penplot');
const random = require("canvas-sketch-util/random");
const convexHull = require("convex-hull");
const clustering = require('density-clustering');

const settings = {
  dimensions: [14.8, 21], // A5 dimensions in cm
  orientation: "portrait",
  pixelsPerInch: 300,
  scaleToView: true,
  units: "cm",
};
const lines = [];
const clusterCount = 3;

// SVG path directly embedded as a string
const svgData = `<svg width="293" height="292" viewBox="0 0 293 292" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M68.3048 113.022H293V139.033H68.3048V113.022ZM86.5401 74.0064H265.184V178.668H83.1403V153.896H230.258V99.088H86.5401V74.0064ZM151.445 56.0467H186.988V254.223C186.988 272.802 182.97 280.853 170.917 285.807C158.863 290.761 141.246 291.381 115.593 291.381C114.047 282.401 109.411 268.776 104.466 260.106C120.538 260.725 139.082 260.725 144.336 260.416C149.591 260.416 151.445 258.867 151.445 253.913V56.0467Z" fill="black"/>
</svg>`;

const loadPointsFromSVG = (width, height) => {
    const pathMatch = svgData.match(/d="(.*?)"/);
    if (!pathMatch) throw new Error('Invalid SVG path');
    const points = pathMatch[1].split(/[ ,LMHVZ]/).filter(num => !isNaN(num)).map(Number);
    const parsedPoints = [];
    const svgWidth = 293;
    const svgHeight = 292;
    for (let i = 0; i < points.length; i += 2) {
        parsedPoints.push([
            (points[i] / svgWidth) * width,
            (points[i + 1] / svgHeight) * height
        ]);
    }
    return parsedPoints;
};

canvasSketch(async () => {
  const pointsFromSVG = loadPointsFromSVG(settings.dimensions[0], settings.dimensions[1]);

  return ({ context, width, height, units }) => {
    context.clearRect(0, 0, width, height);

    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    // Draw the SVG path properly by closing each path
    context.strokeStyle = "black";
    context.lineWidth = 0.1;
    context.beginPath();
    pointsFromSVG.forEach(([x, y], index) => {
      if (index === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    });
    context.closePath();
    context.stroke();

    return [
      context.canvas,
      {
        data: polylinesToSVG([pointsFromSVG], { width, height, units }),
        extension: ".svg",
      },
    ];
  };
}, settings);

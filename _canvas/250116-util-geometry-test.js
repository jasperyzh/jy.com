const canvasSketch = require("canvas-sketch");
const {
  createHatchLines,
  clipPolylinesToBox,
  getBounds,
  clipLineToCircle,
  clipSegmentToCircle,
  arePointsCollinear,
  removeDuplicatePoints,
} = require("canvas-sketch-util/geometry");

const settings = {
  dimensions: [14.8, 21],
  units: "cm",
  pixelsPerInch: 300,
  scaleToView: true,
};

const sectionA = (context) => {
  // SECTION 1: Create Hatch Lines
  const bounds = [
    [5, 5], // Top-left corner
    [15, 15], // Bottom-right corner
  ];
  const hatchAngle = Math.PI / 4; // 45 degrees
  const spacing = 0.1; // 0.5 cm between lines
  const hatchLines = createHatchLines(bounds, hatchAngle * 1.618, spacing);

  // Draw hatch lines
  context.strokeStyle = "lightgray";
  context.lineWidth = 0.05;
  hatchLines.forEach((line) => {
    context.beginPath();
    line.forEach(([x, y], index) => {
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    });
    context.stroke();
  });

  // SECTION 2: Clip Polylines to Box
  const clippingBox = [6, 6, 14, 14]; // A smaller box inside the original
  const clippedLines = clipPolylinesToBox(hatchLines, clippingBox);

  // Draw clipped lines
  context.strokeStyle = "blue";
  clippedLines.forEach((line) => {
    context.beginPath();
    line.forEach(([x, y], index) => {
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    });
    context.stroke();
  });

  // SECTION 3: Get Bounds of Clipped Lines
  const [minBounds, maxBounds] = getBounds(clippedLines.flat());
  context.strokeStyle = "red";
  context.lineWidth = 0.1;

  // Visualize the bounding box
  context.strokeRect(
    minBounds[0],
    minBounds[1],
    maxBounds[0] - minBounds[0],
    maxBounds[1] - minBounds[1],
  );
};

const sectionB = (context) => {
  // SECTION 4: Clip Line to Circle
  const p0 = [7, 10];
  const p1 = [13, 10];
  const circleCenter = [10, 10];
  const radius = 3;

  const hits = [];
  const collides = clipLineToCircle(p0, p1, circleCenter, radius, hits);

  // Draw the circle
  context.beginPath();
  context.arc(circleCenter[0], circleCenter[1], radius, 0, Math.PI * 2);
  context.strokeStyle = "green";
  context.lineWidth = 0.05;
  context.stroke();

  // Draw clipped line
  if (collides) {
    hits.forEach(([x, y]) => {
      context.beginPath();
      context.arc(x, y, 0.1, 0, Math.PI * 2);
      context.fillStyle = "red";
      context.fill();
    });
  }
};

const sectionC = (context) => {
  // SECTION 5: Remove Duplicate Points
  const polyline = [
    [7, 7],
    [8, 3],
    [8, 3],
    [8, 3],
    [8, 3],
    [8, 3],
    [8, 3], // Duplicate point
    [9, 9],
  ];
  const cleanedPolyline = removeDuplicatePoints(polyline);

  // Draw the cleaned polyline
  context.strokeStyle = "purple";
  context.lineWidth = 0.1;
  context.beginPath();
  cleanedPolyline.forEach(([x, y], index) => {
    if (index === 0) context.moveTo(x, y);
    else context.lineTo(x, y);
  });
  context.stroke();
};

const sectionD = (context) => {
  // SECTION 6: Are Points Collinear
  const collinear = arePointsCollinear([3,3], [6,6], [9, 9]);
  context.fillStyle = collinear ? "cyan" : "magenta";

  // Draw points to visualize collinearity
  [[3,3], [6,6], [9,9]].forEach(([x, y]) => {
    context.beginPath();
    context.arc(x, y, 0.5, 0, Math.PI * 2);
    context.fill();
    context.stroke();
  });
};

const section_clipSegmentToCircle = (context) => {
  // Draw a circle
  const circleCenter = [10, 16];
  const radius = 3;

  context.beginPath();
  context.arc(circleCenter[0], circleCenter[1], radius, 0, Math.PI * 2);
  context.strokeStyle = "green";
  context.lineWidth = 0.05;
  context.stroke();

  // Define a line segment
  const segmentStart = [4, 10];
  const segmentEnd = [21, 23];

  context.strokeStyle = "lightgray";
  context.beginPath();
  context.moveTo(segmentStart[0], segmentStart[1]);
  context.lineTo(segmentEnd[0], segmentEnd[1]);
  context.stroke();

  // Clip the segment to the circle
  const hits = [];
  const collides = clipSegmentToCircle(
    segmentStart,
    segmentEnd,
    circleCenter,
    radius,
    hits,
  );

  if (collides) {
    // Draw clipped segment
    context.strokeStyle = "blue";
    context.beginPath();
    hits.forEach(([x, y], index) => {
      if (index === 0) context.moveTo(x, y);
      else context.lineTo(x, y);
    });
    context.stroke();

    // Highlight intersection points
    context.fillStyle = "red";
    hits.forEach(([x, y]) => {
      context.beginPath();
      context.arc(x, y, 0.1, 0, Math.PI * 2);
      context.fill();
    });
  }
};
const sketch = ({ width, height }) => {
  return ({ context, width, height, units }) => {
    context.clearRect(0, 0, width, height);

    sectionA(context);
    sectionB(context);
    sectionC(context);
    sectionD(context);

    section_clipSegmentToCircle(context);

    return context.canvas;
  };
};

canvasSketch(sketch, settings);

// Import canvas-sketch library
const canvasSketch = require("canvas-sketch");

// Define the sketch settings
const settings = {
  dimensions: [1024, 1024],
  animate: false,
};

// Define the sketch function
const sketch = () => {
  return ({ context, width, height }) => {
    context.fillStyle = "#ffffff";
    context.fillRect(0, 0, width, height);

    const GOLDEN_RATIO = 1.618;

    const intersectionPoints = [];

    for (let i = 1; i <= 10; i++) {
      const scale = Math.pow(GOLDEN_RATIO, i);
      const boxWidth = width / scale;
      const boxHeight = height / scale;
      const x = width - boxWidth;
      const y = height - boxHeight;

      context.fillStyle = "#3498db";
      context.fillRect(x, y, boxWidth, boxHeight);

      context.strokeStyle = "#2c3e50";
      context.lineWidth = 3;
      context.strokeRect(x, y, boxWidth, boxHeight);

      intersectionPoints.push({ x, y });
    }

    context.strokeStyle = "#2c3e50";
    context.lineWidth = 5;
    context.strokeRect(0, 0, width, height);

    function getIntersectionPoints() {
      return intersectionPoints;
    }

    const points = getIntersectionPoints();
    points.forEach((point) => {
      context.fillStyle = "red";
      context.beginPath();
      context.arc(point.x, point.y, 5, 0, Math.PI * 2);
      context.fill();
    });

    console.log(points);
  };
};

canvasSketch(sketch, settings);

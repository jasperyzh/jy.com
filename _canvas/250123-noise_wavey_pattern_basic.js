const canvasSketch = require("canvas-sketch");
const { noise2D } = require("canvas-sketch-util/random");

const settings = {
  dimensions: [1024, 1024],
};

canvasSketch(() => {
  return ({ context, width, height }) => {
    const cols = 50;
    const rows = 50;
    const gridWidth = width * 0.9;
    const gridHeight = height * 0.9;
    const cellWidth = gridWidth / cols;
    const cellHeight = gridHeight / rows;
    const marginX = (width - gridWidth) / 2;
    const marginY = (height - gridHeight) / 2;

    context.fillStyle = "#000";
    context.fillRect(0, 0, width, height);

    context.lineWidth = 2;
    context.strokeStyle = "#fff";

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        const x = marginX + col * cellWidth;
        const y = marginY + row * cellHeight;

        const noise = noise2D(x, y, 0.002); // Perlin noise value
        const angle = noise * Math.PI * 2; // Map noise to an angle

        const length = cellWidth * 0.5;
        const x1 = x + Math.cos(angle) * length;
        const y1 = y + Math.sin(angle) * length;

        const x2 = x - Math.cos(angle) * length;
        const y2 = y - Math.sin(angle) * length;

        context.beginPath();
        context.moveTo(x1, y1);
        context.lineTo(x2, y2);
        context.stroke();
      }
    }
  };
}, settings);

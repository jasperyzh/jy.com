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
    context.strokeStyle = "red";
    context.lineWidth = 5;
    context.fillRect(0, 0, width, height);

    // deno-fmt-ignore
    context.strokeRect(0, 0, width / 1.618, height / 1.618);
    // deno-fmt-ignore
    context.strokeRect(0, 0, width / Math.pow(1.618, 2), height / Math.pow(1.618, 2));
    // deno-fmt-ignore
    context.strokeRect(0, 0, width / Math.pow(1.618, 3), height / Math.pow(1.618, 3));
    // deno-fmt-ignore
    context.strokeRect(0, 0, width / Math.pow(1.618, 4), height / Math.pow(1.618, 4));
    // deno-fmt-ignore
    context.strokeRect(0, 0, width / Math.pow(1.618, 5), height / Math.pow(1.618, 5));
    // deno-fmt-ignore
    context.strokeRect(0, 0, width / Math.pow(1.618, 6), height / Math.pow(1.618, 6));
    // deno-fmt-ignore
    context.strokeRect(0, 0, width / Math.pow(1.618, 7), height / Math.pow(1.618, 7));
    // deno-fmt-ignore
    context.strokeRect(0, 0, width / Math.pow(1.618, 8), height / Math.pow(1.618, 8));
    // deno-fmt-ignore
    context.strokeRect(0, 0, width / Math.pow(1.618, 9), height / Math.pow(1.618, 9));
    // deno-fmt-ignore
    context.strokeRect(0, 0, width / Math.pow(1.618, 10), height / Math.pow(1.618, 10));
    // deno-fmt-ignore
    context.strokeRect(0, 0, width / Math.pow(1.618, 11), height / Math.pow(1.618, 11));
    // deno-fmt-ignore
    context.strokeRect(0, 0, width / Math.pow(1.618, 12), height / Math.pow(1.618, 12));
    // deno-fmt-ignore
    context.strokeRect(0, 0, width / Math.pow(1.618, 13), height / Math.pow(1.618, 13));

    const GOLDEN_RATIO = 1.618;
    const SCALE_FACTOR = GOLDEN_RATIO * GOLDEN_RATIO;

    let boxWidth = width;
    let boxHeight = height;

    const centerX = width / 2;
    const centerY = height / 2;

    // const x = centerX - boxWidth / 2;
    // const y = centerY - boxHeight / 2;

    for (let i = 1; i <= 13; i++) {
      const scale = Math.pow(GOLDEN_RATIO, i);
      const boxWidth = width / scale;
      const boxHeight = height / scale;
      const x = width - boxWidth;
      const y = height - boxHeight;

      // context.fillStyle = "#3498db";
      // context.fillRect(x, y, boxWidth, boxHeight);

      context.strokeStyle = "#2c3e50";
      context.lineWidth = 3;
      context.strokeRect(x, y, boxWidth, boxHeight);
    }
  };
};

canvasSketch(sketch, settings);

const canvasSketch = require("canvas-sketch");

// https://github.com/mattdesl/canvas-sketch-util/blob/master/docs/random.md
const { lerp } = require("canvas-sketch-util/math");
const random = require("canvas-sketch-util/random");

// https://www.npmjs.com/package/nice-color-palettes
const palettes = require("nice-color-palettes");

// my functions
import { DrawCircle } from "./DrawCircle.js";
import { GradientBackground } from "./OffWhiteBackground.js";

const colorCount = random.rangeFloor(2, 5);

// const palette = random.pick(palettes);
// const palette = random.pick(palettes).slice(0, colorCount);
const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);
console.log(palette);

// const settings_a4 = {
//   dimensions: "A4", // 'A3', 'A4', 'A5', 'letter', 'legal', [16,10]//pixels/cm width and height
//   units: "cm",
//   orientation: 'portrait', // 'landscape'
//   pixelsPerInch: 300,
// };

random.setSeed(random.getRandomSeed());
console.log(random.getSeed());


const settings = {
  suffix: random.getSeed(),
  dimensions: [2048, 2048],
  // ...settings_a4
};


const sketch = () => {
  const createGrid = () => {
    const points = [];

    const count = Math.round(108 /4) + 1;
    // const count = 19;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const radius = Math.abs(random.noise2D(u, v)) * 0.095 + 0.01;

        // points.push([u, v]);
        points.push({
          color: random.pick(palette),
          // radius: random.value() * 0.04,
          // radius: Math.abs(random.gaussian() * 0.026),
          radius,
          position: [u, v],
          // rotation: random.value() * Math.PI * 2,
          rotation: Math.abs(random.noise2D(u, v)) * Math.PI * 1,
        });
      }
    }
    return points;
  };

  // random.setSeed(108);
  const points = createGrid().filter(() => random.value() > 1 - 0.99);
  const margin = 240;

  return ({ context, width, height }) => {
    context.fillStyle = "#fafafa";
    // context.fillStyle = random.pick(palette);

    context.fillRect(0, 0, width, height);

    GradientBackground(context, width, height);

    // drawCircle(context, width / 2, height / 2, 99.3);

    points.forEach((data) => {
      const {
        color,
        position,
        rotation,
        radius,
      } = data;

      const [u, v] = position;
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.save();
      context.fillStyle = color;
      context.font = `${radius * width}px "Garamond"`;
      context.translate(x, y);
      context.rotate(rotation);
      context.fillText("x", 0, 0); //»
      // context.rotate(-1.618);
      context.restore();

      /* // draw circles
      // DrawCircle(context, width / 2, height / 2, 10);
      context.beginPath();
      context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      context.fillStyle = color;
      context.fill();
      // context.lineWidth = 5;
      // context.strokeStyle = "white";
      // context.stroke(); */
    });
  };
};

canvasSketch(sketch, settings);

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
// const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);

const palette = ["#131313"];
// console.log(palette);

// const settings_a4 = {
//   dimensions: "A4", // 'A3', 'A4', 'A5', 'letter', 'legal', [16,10]//pixels/cm width and height
//   units: "cm",
//   orientation: 'portrait', // 'landscape'
//   pixelsPerInch: 300,
// };

random.setSeed(random.getRandomSeed());
console.log("seed:", random.getSeed());

function random_lerp(min = 0, max = 1, value = random.value()) {
  return Math.round(lerp(min, max, value) * 100) /
    100;
}
// console.log("random_lerp:", random_lerp());

const total_random_circles = random_lerp(0.95, 0.98);
console.log("total_random_circles:", total_random_circles);

const settings = {
  suffix: random.getSeed(),
  // dimensions: [2048, 2048],
  // ...settings_a4
  dimensions: [110, 110],
  orientation: "portrait",
  pixelsPerInch: 300,
  // scaleToView: true,S
  units: "mm",
};

const sketch = () => {

  
  const createGrid = () => {
    const points = [];

    // const count = Math.round(108 / 4) + 1;
    const count = Math.round(lerp(60, 65, random.value()));
    console.log("count:", count);
    // const count = 19;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1);
        const v = count <= 1 ? 0.5 : y / (count - 1);
        const radius = Math.abs(random.noise2D(u, v)) * 0.12 + 0.01;

        // points.push([u, v]);
        points.push({
          color: random.pick(palette),
          // radius: random.value() * 0.04,
          // radius: Math.abs(random.gaussian() * 0.026),
          radius,
          position: [u, v],
          // rotation: random.value() * Math.PI * 2,
          rotation: Math.abs(random.noise2D(u, v)) * Math.PI * 2,
        });
      }
    }
    return points;
  };

  // random.setSeed(108);
  // how to get a value 0.12312312 to float to 0.01
  // const val = 0.12312312;
  // const rounded = Math.round(random.value() * 100) / 100;
  // const total_circles = 0.5;
  // const total_num = lerp(total_circles, total_circles + rounded, random.value());
  // // console.log(total_num);

  // console.log(Math.round(random.value(), 2))
  const points = createGrid().filter(() =>
    random.value() > 1 - total_random_circles
  );
  const margin = 10;

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
      context.fillText("。", 0, 0); //»
      context.rotate(-1.618);
      context.restore();
    });
  };
};

canvasSketch(sketch, settings);

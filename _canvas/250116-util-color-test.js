const canvasSketch = require("canvas-sketch");
const Color = require("canvas-sketch-util/color");

const settings = {
  dimensions: [14.8, 21],
  units: "cm",
  pixelsPerInch: 300,
  scaleToView: true,
};

// Parse HSL values from a named CSS color
const [h, s, l] = Color.parse("crimson").hsl;
//> [ 348, 83, 47 ]

// Offset the H, S, L components of a color
const newColor = Color.offsetHSL("#f0e68c", 5, 10, -15).hex;
//> '#f2ef40'

// Compare two colors to get the contrast ratio
const ratio = Color.contrastRatio("red", "hsl(200, 0%, 0%)");
//> 5.252

// Blend two colors together with transparency
const background = "white";
const foreground = "rgba(250, 0, 0, 0.5)";
const result = Color.blend(background, foreground);

const sketch = ({ width, height }) => {
  return ({ context, width, height, units }) => {
    context.clearRect(0, 0, width, height);

    // Set font size and style
    const fontSize = 0.01; // Font size in cm
    context.font = `${fontSize}cm sans-serif`;
    context.textBaseline = "top";

    // SECTION 1: Parse Colors
    const parsedColors = [
      Color.parse("crimson"),
      Color.parse("rgba(0, 255, 0, 0.25)"),
      Color.parse("#00ff0040"),
    ];

    // Visualize parsed colors
    parsedColors.forEach((color, i) => {
      const y = 2 + i * 2.5;
      context.fillStyle = Color.style(color.rgba);
      context.fillRect(2, y, 10, 2);
      context.fillStyle = "black";
      context.fillText(`RGBA: ${color.rgba}`, 2, y - fontSize / 2);
    });

    // SECTION 2: Offset HSL
    const baseColor = "#d28879";
    const offsetColors = [
      Color.offsetHSL(baseColor, 0, 0, 0),
      Color.offsetHSL(baseColor, 15, 5, -10),
      Color.offsetHSL(baseColor, 30, 10, -20),
    ];

    offsetColors.forEach((color, i) => {
      const y = 10 + i * 2.5;
      context.fillStyle = Color.style(color.hex);
      context.fillRect(2, y, 10, 2);
      context.fillStyle = "black";
      context.fillText(`HSL: ${color.hsl}`, 2, y - fontSize / 2);
    });

    // SECTION 3: Contrast Ratio
    const colorA = "black";
    const colorB = "white";
    const ratio = Color.contrastRatio(colorA, colorB);

    context.fillStyle = "black";
    context.fillRect(2, 18, 5, 3);
    context.fillStyle = "white";
    context.fillRect(7, 18, 5, 3);
    context.fillStyle = "black";
    context.fillText(`Contrast: ${ratio.toFixed(2)}`, 2, 17.5);

    // SECTION 4: Blend Colors

    const background = "white";
    const foreground = "rgba(250, 0, 0, 0.5)";
    const result = Color.blend(background, foreground);

    const blended = Color.blend("rgba(255, 0, 0, 0.5)", "blue");

    context.fillStyle = Color.style(blended);
    context.fillRect(8, 14, 3, 2);

    context.fillStyle = "black";
    context.fillText("Blended: red over blue", 2, 21.5);

    return context.canvas;
  };
};

canvasSketch(sketch, settings);

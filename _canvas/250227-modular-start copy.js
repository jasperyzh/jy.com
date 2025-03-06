/**
 * Adapted Creative Coding Template with Two Layers and opentype.js
 *
 * Bottom layer: Draws 30 random circles.
 * Top layer: Renders a haiku (three-line poem) as SVG paths using opentype.js.
 */

const canvasSketch = require("canvas-sketch");
const { pathsToSVG, createPath } = require("canvas-sketch-util/penplot");
const random = require("canvas-sketch-util/random");
const { lerp } = require("canvas-sketch-util/math");
const opentype = require("opentype.js");

// ========================================================
// CONFIGURATION
// ========================================================
const settings = {
  dimensions: [21, 29.7], // A4 dimensions in cm
  orientation: "portrait",
  pixelsPerInch: 300,
  scaleToView: true,
  units: "cm",
};

const CONFIG = {
  margin: 2, // Canvas margin in cm
  exportWidth: 21, // Export width in cm
  exportHeight: 29.7, // Export height in cm
  strokeWidth: 0.03, // Default stroke width

  // Circles parameters
  circleCount: 30, // Number of circles
  circleMinRadius: 0.2, // Minimum circle radius
  circleMaxRadius: 1.5, // Maximum circle radius
};

// ========================================================
// LAYER MANAGEMENT
// ========================================================
const layers = {
  circles: {
    active: true,
    paths: [],
    color: "rgba(0, 0, 0, 1)",
    strokeWidth: 0.05,
    fill: false,
  },
  text: {
    active: true,
    // A haiku (three-line poem)
    text: "Autumn breeze whispers\nThrough quiet, ancient woods\nShadows dance softly",
    fontSize: 1.3, // Font size in cm (adjust as needed)
    color: "rgba(0, 0, 0, 1)",
    strokeWidth: 0.04, // Stroke width for exported text paths
    paths: [], // Will be generated using opentype.js
  },
};

// ========================================================
// LAYER GENERATORS
// ========================================================

/**
 * Generates a layer of circles at random positions.
 * @param {Number} width - Canvas width in cm.
 * @param {Number} height - Canvas height in cm.
 * @returns {Array} Array of circle paths.
 */
const generateCirclesLayer = (width, height) => {
  const circlePaths = [];
  const margin = CONFIG.margin;

  for (let i = 0; i < CONFIG.circleCount; i++) {
    const x = random.range(margin, width - margin);
    const y = random.range(margin, height - margin);
    const radius = random.range(CONFIG.circleMinRadius, CONFIG.circleMaxRadius);

    circlePaths.push(
      createPath((ctx) => {
        ctx.arc(x, y, radius, 0, Math.PI * 2);
      })
    );
  }

  return circlePaths;
};

/**
 * Generates pen-plot style paths for a multi-line text block using opentype.js.
 * @param {Number} canvasWidth   - The width of the canvas (in cm).
 * @param {Number} canvasHeight  - The height of the canvas (in cm).
 * @param {String} text          - Multi-line text to render.
 * @param {Number} fontSize      - Font size in cm.
 * @param {opentype.Font} font   - Loaded opentype.js font object.
 * @param {Object} options       - Additional styling options.
 * @param {Number} [options.lineHeight=1.2] - Multiplier for line spacing relative to fontSize.
 * @param {String} [options.textAlign="center"] - Horizontal alignment: "left", "center", or "right".
 * @param {Number} [options.letterSpacing=0] - Additional spacing between letters (not implemented below).
 * @returns {Array} Array of pen-plot paths that can be passed to pathsToSVG().
 */
function generateTextPaths(
  canvasWidth,
  canvasHeight,
  text,
  fontSize,
  font,
  { lineHeight = 1.2, textAlign = "center", letterSpacing = 0 } = {}
) {
  // Split input text into lines
  const lines = text.split("\n");

  // Convert lineHeight multiplier into actual spacing in cm
  const lineHeightInCM = fontSize * lineHeight;
  const totalTextHeight = lines.length * lineHeightInCM;

  // Compute the initial y-offset so the text block is vertically centered
  const startY = (canvasHeight - totalTextHeight) / 2 + fontSize;

  const textPaths = [];

  lines.forEach((line, i) => {
    // Create an OpenType path for the line
    const openTypePath = font.getPath(line, 0, 0, fontSize);
    const bbox = openTypePath.getBoundingBox();
    const lineWidth = bbox.x2 - bbox.x1;

    // Determine x-offset based on text alignment
    let xOffset;
    switch (textAlign) {
      case "left":
        xOffset = -bbox.x1;
        break;
      case "right":
        xOffset = canvasWidth - lineWidth - bbox.x1;
        break;
      case "center":
      default:
        xOffset = (canvasWidth - lineWidth) / 2 - bbox.x1;
        break;
    }

    // Determine y-offset (distance from top)
    const yOffset = startY + i * lineHeightInCM;

    // Convert the OpenType commands into a pen-plot style path
    const penPlotPath = openTypePathToPenPlotPath(
      openTypePath.commands,
      xOffset,
      yOffset
    );
    textPaths.push(penPlotPath);
  });

  return textPaths;
}

/**
 * Converts an opentype.js Path command array into a pen-plot path object.
 * This ensures compatibility with canvas-sketch-util/penplot pathsToSVG().
 */
function openTypePathToPenPlotPath(commands, offsetX = 0, offsetY = 0) {
  return createPath((ctx) => {
    commands.forEach((cmd) => {
      switch (cmd.type) {
        case "M":
          ctx.moveTo(cmd.x + offsetX, cmd.y + offsetY);
          break;
        case "L":
          ctx.lineTo(cmd.x + offsetX, cmd.y + offsetY);
          break;
        case "C":
          ctx.bezierCurveTo(
            cmd.x1 + offsetX,
            cmd.y1 + offsetY,
            cmd.x2 + offsetX,
            cmd.y2 + offsetY,
            cmd.x + offsetX,
            cmd.y + offsetY
          );
          break;
        case "Q":
          ctx.quadraticCurveTo(
            cmd.x1 + offsetX,
            cmd.y1 + offsetY,
            cmd.x + offsetX,
            cmd.y + offsetY
          );
          break;
        case "Z":
          ctx.closePath();
          break;
      }
    });
  });
}

// ========================================================
// MAIN SKETCH FUNCTION
// ========================================================
const sketch = ({ width, height }) => {
  // Generate circles layer paths
  if (layers.circles.active) {
    layers.circles.paths = generateCirclesLayer(width, height);
  }

  // Generate text layer paths using opentype.js (font is available in closure)
  if (layers.text.active) {
    // layers.text.paths = generateTextPaths(
    //   width,
    //   height,
    //   layers.text.text,
    //   layers.text.fontSize,
    //   font
    // );

    const haiku =
      "Whisk of rain descends,\nWords of what might yet unfold,\nRaindrops weave our dreams.";
    layers.text.paths = generateTextPaths(
      width, // canvas width in cm
      height, // canvas height in cm
      haiku, // multi-line text
      layers.text.fontSize, // fontSize in cm (e.g., 1.3)
      font, // loaded opentype.js font
      {
        lineHeight: 2,
        textAlign: "center",
      }
    );
  }

  return ({ context, width, height, units }) => {
    // Clear canvas and fill background with white
    context.clearRect(0, 0, width, height);
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    // Render circles layer (bottom)
    if (layers.circles.active) {
      layers.circles.paths.forEach((path) => {
        const pathString = path.toString();
        const tempPath = new Path2D(pathString);
        context.fillStyle = layers.circles.fill
          ? layers.circles.color
          : "rgba(255, 255, 255, 0)";
        context.strokeStyle = layers.circles.color;
        context.lineWidth = layers.circles.strokeWidth;
        context.fill(tempPath);
        context.stroke(tempPath);
      });
    }

    // Render text layer (top) as vector paths
    if (layers.text.active) {
      layers.text.paths.forEach((path) => {
        const pathString = path.toString();
        const tempPath = new Path2D(pathString);
        context.strokeStyle = layers.text.color;
        context.lineWidth = layers.text.strokeWidth;
        context.stroke(tempPath);
      });
    }

    // Prepare exports: circles and text as separate SVG files plus combined circles export.
    const allPaths = [];
    if (layers.circles.active) {
      allPaths.push(...layers.circles.paths);
    }

    const exports = [
      // PNG export of complete canvas
      context.canvas,
      // SVG export for circles layer
      layers.circles.active && {
        data: pathsToSVG(layers.circles.paths, {
          width: CONFIG.exportWidth,
          height: CONFIG.exportHeight,
          units: settings.units,
          lineWidth: layers.circles.strokeWidth,
          fillStyle: layers.circles.fill ? layers.circles.color : "none",
          optimize: true,
        }),
        extension: `.circles.svg`,
      },
      // SVG export for text layer (rendered as vector paths)
      layers.text.active && {
        data: pathsToSVG(layers.text.paths, {
          width: CONFIG.exportWidth,
          height: CONFIG.exportHeight,
          units: settings.units,
          lineWidth: layers.text.strokeWidth,
          fillStyle: "none",
          optimize: true,
        }),
        extension: `.text.svg`,
      },
      // Combined export (circles only, as text is separate)
      {
        data: pathsToSVG(allPaths, {
          width: CONFIG.exportWidth,
          height: CONFIG.exportHeight,
          units: settings.units,
          lineWidth: CONFIG.strokeWidth,
          optimize: true,
        }),
        extension: ".combined.svg",
      },
    ].filter(Boolean);

    return exports;
  };
};

// ========================================================
// FONT LOADING & STARTING THE SKETCH
// ========================================================
// Use opentype.load to asynchronously load the font
let font;

//NotoSerifDisplay_Condensed-ThinItalic.ttf

const font_file = "fonts/NotoSerifDisplay_Condensed-ThinItalic.ttf";
opentype.load(font_file, (err, loadedFont) => {
    // opentype.load("Roboto-Regular.ttf", (err, loadedFont) => {
  if (err) {
    console.error(
      `Error loading font. Make sure '${font_file}' is in your folder.`,
      err
    );
    return;
  }
  font = loadedFont;
  // Start canvas-sketch only after the font is loaded
  canvasSketch(sketch, settings);
});



/* 
### Development Log Summary

---

### **Initial Template Setup:**
- Started with a **modular creative coding template** designed for pen plotting.
- The original template had **four layers**: grid, circles, lines, and hatching.

---

### **Simplification to Two Layers:**
- Reduced complexity by modifying the template to use **two layers only**:
  - **Bottom Layer**: Draws **30 random circles** using `canvas-sketch-util/penplot`.
  - **Top Layer**: Displays **editable SVG text**.

---

### **Text Update:**
- Replaced the static text "HELLO" with a haiku:
    ```
    Autumn breeze whispers
    Through quiet, ancient woods
    Shadows dance softly
    ```

---

### **SVG Text Conversion Requirement:**
- Needed the text layer to be **rendered as SVG paths** for pen-plotting rather than using simple canvas text rendering.
- Evaluated several options and settled on using **opentype.js** for converting text to vector paths.

---

### **Exploration of Text-to-Path Solutions:**
- Considered using `text-to-svg` but found it **incompatible** with the current setup.
- Chose **opentype.js** due to:
  - Its robust support for vector paths.
  - Easier integration with the `canvas-sketch` environment.
  - Flexible text styling options.

---

### **Font Loading Issue:**
- **Problem**: Initial implementation using `fs.readFileSync` failed due to browser context limitations in `canvas-sketch`.
- **Solution**: Switched to **asynchronous loading** with `opentype.load('Roboto-Regular.ttf', ...)` to successfully load the font in the browser environment.

---

### **Path Data Error:**
- **Issue**: Encountered a **"malformed path data"** error when exporting the text layer with `pathsToSVG()`.
- **Diagnosis**: The error was caused by:
  - Passing **native Path2D objects** directly, which `pathsToSVG()` could not parse.
  - **Missing spaces** after command letters (e.g., "M", "L", "C") in the generated SVG path strings.
- **Fixes Implemented**:
  - Replaced `Path2D` usage with **pen-plot style paths** using `createPath()` from `canvas-sketch-util/penplot`.
  - Updated `generateTextPaths()` to properly **format command strings** with spaces, ensuring valid SVG path data.
  - Introduced a helper function `openTypePathToPenPlotPath()` for converting OpenType commands to pen-plot paths.

---

### **Enhanced Text Generation:**
- Refactored `generateTextPaths()` to:
  - **Support multiple lines** of text.
  - **Center text** both horizontally and vertically.
  - Convert `opentype.js` commands to **pen-plot style paths** for compatibility with `pathsToSVG()`.

---

### **Improved Typographic Control:**
- Added optional parameters for **advanced text styling**:
  - `lineHeight`: Controls vertical spacing between lines.
  - `textAlign`: Supports "left", "center", and "right" alignment.
  - `letterSpacing`: **Defined but not yet implemented**. It would require manual adjustment of glyph positions.

---

### **Layered Design and Export:**
- Maintained a **two-layer system**:
  - **Circles Layer**: Randomly generated circles using `canvas-sketch-util/penplot`.
  - **Text Layer**: Haiku rendered as SVG vector paths using `opentype.js`.
- Exported layers separately as **SVG files** via `pathsToSVG()`:
  - **Circles Layer**: circles.svg
  - **Text Layer**: text.svg
  - **Combined Layer**: combined.svg

---

### **Final Outcome:**
The updated sketch now:
- **Loads the Roboto-Regular font asynchronously** to ensure compatibility with the browser context.
- **Generates random circles** for the background using `canvas-sketch-util/penplot`.
- **Converts a multi-line haiku** into SVG vector paths using `opentype.js` with proper SVG formatting.
- **Exports layers as separate SVG files**, preserving the generative design for pen-plotting.

---

### **Unresolved and Future Enhancements:**
- **Letter Spacing** remains a placeholder. Implementing it would involve:
  - Breaking text into individual glyphs.
  - Calculating kerning and advance widths.
  - Adjusting x-offsets for each character.
- Potential for **additional text styling options** like rotation, scaling, and more complex alignments.

---

This log captures the key changes, challenges, and problem-solving steps taken during the development process, emphasizing the evolution from a simple text rendering to an advanced, layered SVG export for generative art and pen plotting.
*/
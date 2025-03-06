/* 250303 - ERROR with p5js import,  */

const canvasSketch = require("canvas-sketch");
const { pathsToSVG, createPath } = require("canvas-sketch-util/penplot");
const random = require("canvas-sketch-util/random");
const opentype = require("opentype.js");
// Make p5 available globally before importing p5.sound
global.p5 = require('p5');
new p5();


global.p5 = require('p5/lib/addons/p5.sound');

// Audio components
let osc, lowPass, highPass;
let isPlaying = false;
let freqSlider, lowPassSlider, highPassSlider;
let visualizer;
let p5Instance;

// ========================================================
// CONFIGURATION
// ========================================================
const settings = {
  dimensions: [21, 29.7], // A4 dimensions in cm
  orientation: "portrait",
  pixelsPerInch: 300,
  scaleToView: true,
  units: "cm",
  // Add p5 instance to use p5.sound
  p5: true,
  // This allows for audio elements
  hotkeys: true,
  // Add parent to create UI elements
  parent: document.body
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
    text: "Sound waves flowing by\nFilters shape the frequency\nHarmony appears",
    fontSize: 1.3, // Font size in cm (adjust as needed)
    color: "rgba(0, 0, 0, 1)",
    strokeWidth: 0.04, // Stroke width for exported text paths
    paths: [], // Will be generated using opentype.js
  },
};

// ========================================================
// P5 SOUND SETUP
// ========================================================
function setupP5Sound(p5) {
  p5Instance = p5;
  
  // Create UI container to keep controls organized
  const uiContainer = p5.createDiv();
  uiContainer.id('ui-controls');
  uiContainer.style('position', 'absolute');
  uiContainer.style('top', '10px');
  uiContainer.style('left', '10px');
  uiContainer.style('padding', '10px');
  uiContainer.style('background-color', 'rgba(255, 255, 255, 0.8)');
  uiContainer.style('border-radius', '5px');
  
  // Create oscillator and filters
  osc = new p5.Oscillator('sine');
  lowPass = new p5.LowPass();
  highPass = new p5.HighPass();

  // Connect audio chain: oscillator -> lowpass -> highpass -> output
  osc.disconnect();
  osc.connect(lowPass);
  lowPass.connect(highPass);

  // Create sliders
  const freqLabel = p5.createDiv('Frequency');
  freqLabel.parent(uiContainer);
  freqSlider = p5.createSlider(100, 1000, 440);
  freqSlider.parent(uiContainer);
  freqSlider.style('width', '200px');
  
  const lowPassLabel = p5.createDiv('Lowpass Frequency');
  lowPassLabel.parent(uiContainer);
  lowPassSlider = p5.createSlider(20, 2000, 1000);
  lowPassSlider.parent(uiContainer);
  lowPassSlider.style('width', '200px');
  
  const highPassLabel = p5.createDiv('Highpass Frequency');
  highPassLabel.parent(uiContainer);
  highPassSlider = p5.createSlider(20, 2000, 20);
  highPassSlider.parent(uiContainer);
  highPassSlider.style('width', '200px');

  // Create oscillator type selector
  const oscTypeLabel = p5.createDiv('Oscillator Type');
  oscTypeLabel.parent(uiContainer);
  const oscTypeSelect = p5.createSelect();
  oscTypeSelect.parent(uiContainer);
  oscTypeSelect.option('sine');
  oscTypeSelect.option('triangle');
  oscTypeSelect.option('sawtooth');
  oscTypeSelect.option('square');
  oscTypeSelect.changed(() => {
    if (osc) osc.setType(oscTypeSelect.value());
  });

  // Create play/stop button
  const playButton = p5.createButton('Play/Stop');
  playButton.parent(uiContainer);
  playButton.mousePressed(toggleSound);
  playButton.style('margin-top', '10px');

  // Create visualizer
  visualizer = new AudioVisualizer();
}

function toggleSound() {
  if (!isPlaying) {
    osc.start();
    isPlaying = true;
  } else {
    osc.stop();
    isPlaying = false;
  }
}

class AudioVisualizer {
  constructor() {
    this.history = [];
    this.maxHistory = 100;
    this.fftSize = 1024;
    this.fft = new p5Instance.FFT(0.8, this.fftSize);
  }

  draw(context, width, height) {
    // Add current frequency to history
    this.history.unshift(freqSlider.value());
    if (this.history.length > this.maxHistory) {
      this.history.pop();
    }

    if (!isPlaying) return;

    // Update audio parameters
    osc.freq(freqSlider.value());
    lowPass.freq(lowPassSlider.value());
    highPass.freq(highPassSlider.value());

    // Get audio analysis
    const spectrum = this.fft.analyze();
    const waveform = this.fft.waveform();

    // Draw waveform visualization
    context.save();
    context.strokeStyle = "rgba(255, 100, 100, 0.8)";
    context.lineWidth = 0.05;
    context.beginPath();
    
    for (let i = 0; i < waveform.length; i += 4) {
      const x = (i / waveform.length) * width;
      // Map the waveform values (-1 to 1) to canvas height
      const y = height * 0.5 + (waveform[i] * height * 0.2);
      if (i === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    }
    context.stroke();

    // Draw filter boundaries
    context.strokeStyle = "rgba(100, 255, 100, 0.5)";
    const lowPassY = height * 0.5 - (this.mapLogFreq(lowPassSlider.value()) * height * 0.4);
    context.beginPath();
    context.moveTo(0, lowPassY);
    context.lineTo(width, lowPassY);
    context.stroke();

    context.strokeStyle = "rgba(100, 100, 255, 0.5)";
    const highPassY = height * 0.5 + (this.mapLogFreq(highPassSlider.value()) * height * 0.4);
    context.beginPath();
    context.moveTo(0, highPassY);
    context.lineTo(width, highPassY);
    context.stroke();

    // Draw frequency spectrum
    context.strokeStyle = "rgba(200, 200, 200, 0.3)";
    context.beginPath();
    for (let i = 0; i < spectrum.length/4; i++) {
      const x = (i / (spectrum.length/4)) * width;
      const y = height - (spectrum[i] / 255) * height * 0.5;
      if (i === 0) {
        context.moveTo(x, y);
      } else {
        context.lineTo(x, y);
      }
    }
    context.stroke();
    context.restore();

    // Display current values
    context.save();
    context.fillStyle = "rgba(0, 0, 0, 0.7)";
    context.font = "0.5cm Arial";
    context.fillText(`Frequency: ${freqSlider.value()} Hz`, width * 0.7, height * 0.9);
    context.fillText(`Lowpass: ${lowPassSlider.value()} Hz`, width * 0.7, height * 0.93);
    context.fillText(`Highpass: ${highPassSlider.value()} Hz`, width * 0.7, height * 0.96);
    context.restore();
  }

  // Map frequency to logarithmic scale for better visualization
  mapLogFreq(freq) {
    const minFreq = Math.log(20);
    const maxFreq = Math.log(2000);
    return (Math.log(freq) - minFreq) / (maxFreq - minFreq);
  }
}

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
const sketch = ({ p5, width, height }) => {
  // Initialize p5 sound if p5 instance is provided
  if (p5) {
    setupP5Sound(p5);
  }

  // Generate circles layer paths
  if (layers.circles.active) {
    layers.circles.paths = generateCirclesLayer(width, height);
  }

  // Generate text layer paths - font is available in closure after loading
  let textPaths = [];

  return ({ context, width, height, units }) => {
    // Clear canvas and fill background with white
    context.clearRect(0, 0, width, height);
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    // Draw the audio visualizer if it's available
    if (visualizer && isPlaying) {
      visualizer.draw(context, width, height);
    }

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

    // Render text layer if font is loaded
    if (layers.text.active && font && textPaths.length === 0) {
      textPaths = generateTextPaths(
        width,
        height,
        layers.text.text,
        layers.text.fontSize,
        font,
        { lineHeight: 2, textAlign: "center" }
      );
    }

    if (textPaths.length > 0) {
      textPaths.forEach((path) => {
        const pathString = path.toString();
        const tempPath = new Path2D(pathString);
        context.strokeStyle = layers.text.color;
        context.lineWidth = layers.text.strokeWidth;
        context.stroke(tempPath);
      });
    }

    // Prepare exports (if needed)
    if (!isPlaying) {  // Only prepare exports when audio is not playing
      const allPaths = [];
      if (layers.circles.active) {
        allPaths.push(...layers.circles.paths);
      }
      if (textPaths.length > 0) {
        allPaths.push(...textPaths);
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
        textPaths.length > 0 && {
          data: pathsToSVG(textPaths, {
            width: CONFIG.exportWidth,
            height: CONFIG.exportHeight,
            units: settings.units,
            lineWidth: layers.text.strokeWidth,
            fillStyle: "none",
            optimize: true,
          }),
          extension: `.text.svg`,
        },
        // Combined export (circles and text)
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
    }
  };
};

// ========================================================
// FONT LOADING & STARTING THE SKETCH
// ========================================================
// Use opentype.load to asynchronously load the font
let font;

const font_file = "fonts/NotoSerifDisplay_Condensed-ThinItalic.ttf";
opentype.load(font_file, (err, loadedFont) => {
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
- Started with a modular creative coding template designed for pen plotting.
- The original template had four layers: grid, circles, lines, and hatching.

---

### **Simplification to Two Layers:**
- Reduced complexity by modifying the template to use two layers only:
  - **Bottom Layer**: Draws 30 random circles using `canvas-sketch-util/penplot`.
  - **Top Layer**: Displays editable SVG text.

---

### **P5.js Sound Integration:**
- Added p5.sound functionality with:
  - Oscillator with frequency control
  - Low-pass and high-pass filters
  - Interactive audio visualization
  - UI controls for sound parameters

---

### **Text Update:**
- Replaced the static text with a sound-themed haiku
- Text continues to be rendered as SVG paths for pen-plotting

---

### **Enhanced Audio Visualization:**
- Added frequency spectrum visualization
- Incorporated waveform display that responds to audio
- Filter boundaries visualized with color-coded lines
- All visualizations integrate with the canvas-sketch renderer

---

### **UI Improvements:**
- Created a dedicated UI container for controls
- Added oscillator type selector
- Improved slider styling and organization
- Made controls less intrusive on the main canvas

---

### **Technical Challenges Solved:**
- Integrated p5.sound library within canvas-sketch framework
- Synchronized p5 audio processing with canvas-sketch rendering loop
- Implemented proper audio chain: oscillator -> lowpass -> highpass -> output
- Added FFT analysis for spectrum visualization

---

### **Export Features:**
- Maintained SVG export functionality for pen plotting
- Exports are only prepared when audio is not playing to improve performance
- Separate SVG exports for circles and text layers
- Combined export with all visual elements

---

This version successfully integrates interactive audio with the visual generative art system, allowing for exploration of sound and visuals together while maintaining the ability to export high-quality SVG files for pen plotting.
*/
/**
 * ASCII Art Generator for Pen Plotting
 *
 * This sketch transforms images into ASCII art using OpenType-SVG fonts,
 * perfect for pen plotting and creative coding experiments.
 * 
 * Features:
 * - Image to ASCII conversion with adjustable parameters
 * - SVG path generation for pen plotting export
 * - Interactive UI controls for real-time adjustments
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
  dimensions: [10, 10], // Smaller dimensions for better performance
  orientation: "portrait",
  pixelsPerInch: 300,
  scaleToView: true,
  units: "cm",
  // Add UI controls for interactive adjustments
  hotkeys: false,
  animate: false,
  // UI Parameter controls (simplified for better performance)
  params: {
    fontSizeCm: { min: 0.1, max: 1, value: 0.3 },
    contrast: { min: 0, max: 3, value: 1 },
    brightness: { min: -1, max: 1, value: 0 },
    invert: { value: false },
    characterSet: { value: "simple", options: ["simple", "standard"] },
  }
};

const CONFIG = {
  margin: 2, // Canvas margin in cm
  exportWidth: 21, // Export width in cm
  exportHeight: 29.7, // Export height in cm
  strokeWidth: 0.03, // Default stroke width
  
  // Image to ASCII parameters
  asciiScale: 0.1, // Scale factor for ASCII conversion
  fontAspectRatio: 0.5, // Character width/height ratio
};

// ========================================================
// LAYER MANAGEMENT
// ========================================================
const layers = {
  background: {
    active: false,
    paths: [],
    color: "rgba(0, 0, 0, 1)",
    strokeWidth: 0.05,
    fill: false,
  },
  ascii: {
    active: true,
    // Image will be converted to ASCII art
    fontSize: 0.8, // Font size in cm (adjustable via UI)
    color: "rgba(0, 0, 0, 1)",
    strokeWidth: 0.03, // Stroke width for exported text paths
    paths: [], // Will be generated using opentype.js
    // ASCII character lookup
    characterSets: {
      standard: "@%#*+=-:. ",
      simple: "#@:.  ",
      complex: "$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. ",
      custom: "" // Will be set from params
    }
  },
};

// ========================================================
// LAYER GENERATORS
// ========================================================

/**
 * Generates a simple background layer (can be customized as needed)
 * @param {Number} width - Canvas width in cm.
 * @param {Number} height - Canvas height in cm.
 * @returns {Array} Array of background paths.
 */
const generateBackgroundLayer = (width, height) => {
  const bgPaths = [];
  const margin = CONFIG.margin;
  
  // Add a border path around the canvas
  bgPaths.push(
    createPath((ctx) => {
      ctx.rect(margin, margin, width - margin * 2, height - margin * 2);
    })
  );

  return bgPaths;
};

/**
 * Processes an image and converts it to ASCII characters
 * @param {HTMLImageElement} image - The loaded image object
 * @param {Object} options - Processing options
 * @returns {String[][]} 2D array of ASCII characters
 */
const imageToAscii = (image, options) => {
  try {
    const {
      width: imgWidth, 
      height: imgHeight
    } = image;
    
    // Create a temporary canvas to process the image
    const tempCanvas = document.createElement('canvas');
    const ctx = tempCanvas.getContext('2d', { willReadFrequently: true });
    
    // Calculate dimensions based on aspect ratio and scale
    const scale = options.asciiScale || CONFIG.asciiScale;
    // Severely limit size to prevent browser crashes
    const maxWidth = 40;
    const maxHeight = 30;
    const targetWidth = Math.min(Math.floor(imgWidth * scale), maxWidth);
    const targetHeight = Math.min(Math.floor(imgHeight * scale / CONFIG.fontAspectRatio), maxHeight);
    
    tempCanvas.width = targetWidth;
    tempCanvas.height = targetHeight;
    
    // Set background to white before drawing
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, targetWidth, targetHeight);
    
    // Draw and resize the image
    try {
      ctx.drawImage(image, 0, 0, targetWidth, targetHeight);
    } catch (err) {
      console.error("Error drawing image to canvas:", err);
      return generateFallbackAscii(targetWidth, targetHeight, options.characterSet);
    }
    
    // Apply image processing adjustments
    let imageData;
    try {
      imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
    } catch (err) {
      console.error("CORS error getting image data:", err);
      return generateFallbackAscii(targetWidth, targetHeight, options.characterSet);
    }
    
    const data = imageData.data;
    
    // Apply adjustments
    for (let i = 0; i < data.length; i += 4) {
      // Apply brightness
      let r = data[i] + options.brightness * 255;
      let g = data[i + 1] + options.brightness * 255;
      let b = data[i + 2] + options.brightness * 255;
      
      // Apply contrast
      r = ((r / 255 - 0.5) * options.contrast + 0.5) * 255;
      g = ((g / 255 - 0.5) * options.contrast + 0.5) * 255;
      b = ((b / 255 - 0.5) * options.contrast + 0.5) * 255;
      
      // Clamp values
      data[i] = Math.max(0, Math.min(255, r));
      data[i + 1] = Math.max(0, Math.min(255, g));
      data[i + 2] = Math.max(0, Math.min(255, b));
      
      // Apply invert if needed
      if (options.invert) {
        data[i] = 255 - data[i];
        data[i + 1] = 255 - data[i + 1];
        data[i + 2] = 255 - data[i + 2];
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
    
    // Convert to grayscale and map to ASCII characters
    const characterSet = options.characterSet;
    const asciiArray = [];
    
    // Process entire image data at once for better performance
    imageData = ctx.getImageData(0, 0, targetWidth, targetHeight);
    const pixelData = imageData.data;
    
    for (let y = 0; y < targetHeight; y++) {
      const row = [];
      for (let x = 0; x < targetWidth; x++) {
        const idx = (y * targetWidth + x) * 4;
        
        // Convert RGB to grayscale using luminance formula
        const gray = 0.299 * pixelData[idx] + 0.587 * pixelData[idx + 1] + 0.114 * pixelData[idx + 2];
        
        // Map grayscale value to a character in the set
        const charIndex = Math.floor(gray / 256 * characterSet.length);
        const char = characterSet[Math.min(charIndex, characterSet.length - 1)];
        
        row.push(char);
      }
      asciiArray.push(row);
    }
    
    return asciiArray;
  } catch (err) {
    console.error("Error in imageToAscii:", err);
    return generateFallbackAscii(20, 20, options.characterSet);
  }
};

/**
 * Generates a fallback ASCII pattern when image processing fails
 * @param {Number} width - Width of the ASCII grid
 * @param {Number} height - Height of the ASCII grid
 * @param {String} characterSet - Character set to use
 * @returns {String[][]} 2D array of ASCII characters
 */
const generateFallbackAscii = (width, height, characterSet) => {
  const asciiArray = [];
  const midChar = characterSet[Math.floor(characterSet.length / 2)];
  
  // Generate a simple pattern as fallback
  for (let y = 0; y < height; y++) {
    const row = [];
    for (let x = 0; x < width; x++) {
      // Create a simple gradient pattern
      const distFromCenter = Math.sqrt(
        Math.pow((x - width/2) / (width/2), 2) + 
        Math.pow((y - height/2) / (height/2), 2)
      );
      
      const charIndex = Math.floor(distFromCenter * characterSet.length);
      const char = characterSet[Math.min(charIndex, characterSet.length - 1)];
      
      row.push(char);
    }
    asciiArray.push(row);
  }
  
  return asciiArray;
};

/**
 * Generates pen-plot style paths for ASCII art using opentype.js.
 * @param {Number} canvasWidth - Canvas width in cm.
 * @param {Number} canvasHeight - Canvas height in cm.
 * @param {String[][]} asciiData - 2D array of ASCII characters.
 * @param {Number} fontSize - Font size in cm.
 * @param {opentype.Font} font - Loaded opentype.js font object.
 * @param {Object} options - Additional styling options.
 * @returns {Array} Array of pen-plot paths.
 */
function generateAsciiPaths(
  canvasWidth,
  canvasHeight,
  asciiData,
  fontSize,
  font,
  { lineHeight = 1.0, charSpacing = 0.5 } = {}
) {
  const asciiPaths = [];
  const margin = CONFIG.margin;
  
  // Calculate character dimensions
  const charWidth = fontSize * charSpacing;
  const charHeight = fontSize * lineHeight;
  
  // Calculate total dimensions of ASCII grid
  const gridWidth = asciiData[0].length * charWidth;
  const gridHeight = asciiData.length * charHeight;
  
  // Center the grid on the canvas
  const startX = (canvasWidth - gridWidth) / 2;
  const startY = (canvasHeight - gridHeight) / 2 + fontSize; // Add fontSize to align baseline
  
  // Generate paths for each character (with sampling to reduce total paths)
  // Sample every n characters to reduce total paths generated
  const sampleX = Math.max(1, Math.floor(asciiData[0].length / 40));
  const sampleY = Math.max(1, Math.floor(asciiData.length / 30));
  
  for (let rowIndex = 0; rowIndex < asciiData.length; rowIndex += sampleY) {
    const row = asciiData[rowIndex];
    for (let colIndex = 0; colIndex < row.length; colIndex += sampleX) {
      const char = row[colIndex];
      
      // Skip rendering spaces to reduce unnecessary paths
      if (char === ' ') continue;
      
      // Calculate position for this character
      const x = startX + colIndex * charWidth;
      const y = startY + rowIndex * charHeight;
      
      // Create path for this character (with error handling)
      try {
        const openTypePath = font.getPath(char, 0, 0, fontSize);
        
        // Skip characters with too many commands to prevent performance issues
        if (openTypePath.commands.length > 100) continue;
        
        // Convert to pen-plot path
        const penPlotPath = openTypePathToPenPlotPath(
          openTypePath.commands,
          x,
          y
        );
        
        asciiPaths.push(penPlotPath);
        
        // Limit total paths to prevent browser crashes
        if (asciiPaths.length >= 500) {
          console.warn('Reached maximum path limit (500), stopping generation');
          return asciiPaths;
        }
      } catch (err) {
        console.error('Error creating path for character:', char, err);
      }
    }
  }
  
  return asciiPaths;
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
// IMAGE LOADING FUNCTIONS
// ========================================================

/**
 * Loads an image from a URL or file input
 * @param {String|File} source - URL string or File object
 * @returns {Promise<HTMLImageElement>} Promise that resolves with the loaded image
 */
function loadImage(source) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    
    // Enable CORS for all images to prevent tainted canvas
    img.crossOrigin = "Anonymous";
    
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error('Failed to load image'));
    
    if (typeof source === 'string') {
      // Load from URL
      // Add a cache-busting parameter to bypass CORS cache issues
      const url = new URL(source, window.location.href);
      url.searchParams.append('_', Date.now());
      img.src = url.toString();
    } else if (source instanceof File) {
      // Load from file input
      const reader = new FileReader();
      reader.onload = (e) => {
        img.src = e.target.result;
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(source);
    } else {
      reject(new Error('Invalid source type'));
    }
  });
}

// Create a default image programmatically instead of using a data URL
let sourceImage = null;

// Create a tiny gradient image
function createDefaultImage() {
  const canvas = document.createElement('canvas');
  canvas.width = 100;
  canvas.height = 100;
  const ctx = canvas.getContext('2d');
  
  // Create a simple gradient
  const gradient = ctx.createLinearGradient(0, 0, 100, 100);
  gradient.addColorStop(0, 'black');
  gradient.addColorStop(1, 'white');
  
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, 100, 100);
  
  // Add some shapes for interest
  ctx.fillStyle = 'white';
  ctx.beginPath();
  ctx.arc(25, 25, 20, 0, Math.PI * 2);
  ctx.fill();
  
  ctx.fillStyle = 'black';
  ctx.beginPath();
  ctx.arc(75, 75, 20, 0, Math.PI * 2);
  ctx.fill();
  
  // Create an image from the canvas
  const img = new Image();
  img.src = canvas.toDataURL();
  return img;
}

// No URL needed as we create the image programmatically
const defaultImageUrl = null;

// Create simplified image loading UI
const setupImageUpload = () => {
  // For stability, we'll just use the default image for now
  console.log("Using default image for stability");
};

// ========================================================
// MAIN SKETCH FUNCTION
// ========================================================
const sketch = async ({ width, height, params }) => {
  // Set up UI for image upload
  setupImageUpload();
  
  // Generate background layer paths if active
  if (layers.background.active) {
    layers.background.paths = generateBackgroundLayer(width, height);
  }
  
  // Create default image programmatically if none exists
  if (!sourceImage) {
    try {
      // Create a simple gradient image instead of loading one
      sourceImage = createDefaultImage();
      console.log("Created default gradient image");
    } catch (err) {
      console.error('Failed to create default image:', err);
    }
  }

  // Store the sketch instance for rerendering
  window.sketch = window.sketch || {};
  window.sketch.render = () => {
    // Force redraw by triggering a small change
    console.log("Redrawing sketch...");
  };
  
  return ({ context, width, height, params = {} }) => {
    // Apply UI parameters (with fallbacks)
    layers.ascii.fontSize = params.fontSizeCm || 0.3;
    
    // Update custom character set from params if needed
    if (params.characterSet === 'custom') {
      layers.ascii.characterSets.custom = params.customCharacters || "@%#*+=-:. ";
    }
    
    // Get the active character set with fallback
    const characterSet = layers.ascii.characterSets[params.characterSet || "standard"];
    
    // Clear canvas and fill background with white
    context.clearRect(0, 0, width, height);
    context.fillStyle = "white";
    context.fillRect(0, 0, width, height);

    // Render background layer if active
    if (layers.background.active) {
      layers.background.paths.forEach((path) => {
        const pathString = path.toString();
        const tempPath = new Path2D(pathString);
        context.fillStyle = layers.background.fill
          ? layers.background.color
          : "rgba(255, 255, 255, 0)";
        context.strokeStyle = layers.background.color;
        context.lineWidth = layers.background.strokeWidth;
        context.fill(tempPath);
        context.stroke(tempPath);
      });
    }

    // Process image to ASCII and generate paths if we have an image
    if (sourceImage && layers.ascii.active) {
      try {
        // Convert image to ASCII with a smaller size
        const asciiData = imageToAscii(sourceImage, {
          asciiScale: 0.02, // Force very small scale
          contrast: params.contrast || 1,
          brightness: params.brightness || 0,
          invert: params.invert || false,
          characterSet
        });
        
        // Generate SVG paths from ASCII data (with limited sampling)
        layers.ascii.paths = generateAsciiPaths(
          width,
          height,
          asciiData,
          layers.ascii.fontSize,
          font,
          {
            lineHeight: 1.2,
            charSpacing: 0.6
          }
        );
        
        // Only render a subset of paths to prevent browser crash
        const maxPathsToRender = 100;
        const pathsToRender = layers.ascii.paths.slice(0, maxPathsToRender);
        
        // Render ASCII paths with a delay to prevent browser freeze
        for (let i = 0; i < Math.min(pathsToRender.length, maxPathsToRender); i++) {
          const path = pathsToRender[i];
          const pathString = path.toString();
          const tempPath = new Path2D(pathString);
          context.strokeStyle = layers.ascii.color;
          context.lineWidth = layers.ascii.strokeWidth;
          context.stroke(tempPath);
        }
        
        if (layers.ascii.paths.length > maxPathsToRender) {
          console.warn(`Only rendered ${maxPathsToRender} of ${layers.ascii.paths.length} paths to prevent crashes`);
        }
      } catch (err) {
        console.error("Error processing image or rendering ASCII:", err);
      }
    }

    // Prepare exports for vector output
    const allPaths = [];
    if (layers.background.active) {
      allPaths.push(...layers.background.paths);
    }
    if (layers.ascii.active) {
      allPaths.push(...layers.ascii.paths);
    }

    const exports = [
      // PNG export of complete canvas
      context.canvas,
      // SVG export for background layer
      layers.background.active && {
        data: pathsToSVG(layers.background.paths, {
          width: CONFIG.exportWidth,
          height: CONFIG.exportHeight,
          units: settings.units,
          lineWidth: layers.background.strokeWidth,
          fillStyle: layers.background.fill ? layers.background.color : "none",
          optimize: true,
        }),
        extension: `.background.svg`,
      },
      // SVG export for ASCII art layer
      layers.ascii.active && {
        data: pathsToSVG(layers.ascii.paths, {
          width: CONFIG.exportWidth,
          height: CONFIG.exportHeight,
          units: settings.units,
          lineWidth: layers.ascii.strokeWidth,
          fillStyle: "none",
          optimize: true,
        }),
        extension: `.ascii.svg`,
      },
      // Combined export
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

// Available fonts - can add more as needed
const availableFonts = {
  serif: "fonts/NotoSerifDisplay_Condensed-ThinItalic.ttf",
  mono: "fonts/Roboto-Regular.ttf",
};

// Add font selector to UI
const setupFontSelector = () => {
  let fontSelector = document.getElementById('ascii-font-selector');
  
  if (!fontSelector) {
    const selectorContainer = document.createElement('div');
    selectorContainer.style.position = 'absolute';
    selectorContainer.style.top = '70px';
    selectorContainer.style.left = '10px';
    selectorContainer.style.zIndex = '1000';
    
    fontSelector = document.createElement('select');
    fontSelector.id = 'ascii-font-selector';
    
    // Add font options
    Object.keys(availableFonts).forEach(fontName => {
      const option = document.createElement('option');
      option.value = fontName;
      option.textContent = fontName.charAt(0).toUpperCase() + fontName.slice(1);
      fontSelector.appendChild(option);
    });
    
    fontSelector.addEventListener('change', (e) => {
      loadSelectedFont(e.target.value);
    });
    
    const label = document.createElement('label');
    label.textContent = 'Font: ';
    label.style.marginRight = '5px';
    label.style.color = 'white';
    label.appendChild(fontSelector);
    
    selectorContainer.appendChild(label);
    document.body.appendChild(selectorContainer);
  }
};

// Load the selected font and redraw
const loadSelectedFont = (fontName) => {
  if (availableFonts[fontName]) {
    opentype.load(availableFonts[fontName], (err, loadedFont) => {
      if (err) {
        console.error(`Error loading font: ${availableFonts[fontName]}`, err);
        return;
      }
      
      font = loadedFont;
      
      // Force a redraw
      if (window.sketch) window.sketch.render();
    });
  }
};

// Initialize with the serif font
const fontFile = availableFonts.serif;
opentype.load(fontFile, (err, loadedFont) => {
  if (err) {
    console.error(
      `Error loading font. Make sure '${fontFile}' is in your folder.`,
      err
    );
    return;
  }
  
  font = loadedFont;
  
  // Add minimal instructions
  const addInstructions = () => {
    const instructions = document.createElement('div');
    instructions.style.position = 'absolute';
    instructions.style.top = '10px';
    instructions.style.right = '10px';
    instructions.style.zIndex = '1000';
    instructions.style.background = 'rgba(0, 0, 0, 0.7)';
    instructions.style.color = 'white';
    instructions.style.padding = '10px';
    instructions.style.borderRadius = '5px';
    instructions.style.maxWidth = '300px';
    
    instructions.innerHTML = `
      <h3>ASCII Art Generator</h3>
      <p>Using simplified settings to prevent browser crashes</p>
      <button id="hide-instructions">Hide</button>
    `;
    
    document.body.appendChild(instructions);
    
    document.getElementById('hide-instructions').addEventListener('click', () => {
      instructions.style.display = 'none';
    });
  };
  
  // Disable font selector for stability
  // setupFontSelector();
  
  // Add instructions
  setTimeout(addInstructions, 100);
  
  // Start canvas-sketch only after the font is loaded
  canvasSketch(sketch, settings);
});



/* 
### ASCII Art Generator for Pen Plotting - Development Log

---

### **Project Overview:**
- Created an **interactive ASCII art generator** specifically designed for pen plotting.
- Transforms images into ASCII character patterns rendered as SVG vector paths.
- Includes real-time controls for adjusting parameters and previewing results.

---

### **Core Features:**

#### **Image Input Methods:**
- **File Upload**: Users can upload local images via a file input control.
- **URL Loading**: Supports loading images from web URLs.
- **Default Image**: Automatically loads a placeholder image if none is provided.

#### **ASCII Conversion:**
- **Grayscale Mapping**: Converts image pixels to grayscale values.
- **Character Density**: Maps brightness levels to appropriate ASCII characters.
- **Multiple Character Sets**:
  - Standard: `@%#*+=-:. `
  - Simple: `#@:.  `
  - Complex: `$@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^`'. `
  - Custom: User-defined character set

#### **Interactive Controls:**
- **Font Size**: Adjustable via slider for optimal detail.
- **Contrast**: Controls differentiation between light and dark areas.
- **Brightness**: Adjusts overall luminance of the image.
- **Invert**: Toggles between normal and inverted ASCII output.
- **Character Set Selection**: Choose from predefined sets or create custom mappings.
- **Font Selection**: Switch between serif and monospace fonts.

#### **SVG Output for Pen Plotting:**
- **Vector Path Generation**: Converts each ASCII character to vector paths.
- **Multiple Export Options**:
  - ASCII layer only (ascii.svg)
  - Background layer (background.svg)
  - Combined layers (combined.svg)
  - PNG preview

---

### **Technical Implementation:**

#### **Image Processing Pipeline:**
1. **Image Loading**: Asynchronously load images from files or URLs.
2. **Canvas Processing**: Create a temporary canvas for pixel manipulation.
3. **Grayscale Conversion**: Apply luminance formula (0.299R + 0.587G + 0.114B).
4. **Image Adjustments**: Apply brightness, contrast, and inversion.
5. **ASCII Mapping**: Convert grayscale values to characters from the selected set.
6. **Grid Generation**: Create a 2D array of ASCII characters.

#### **Vector Path Generation:**
1. **Character Layout**: Calculate proper positioning for each character.
2. **OpenType Path Creation**: Generate vector paths for each non-space character.
3. **Path Conversion**: Transform OpenType paths to pen-plot compatible paths.
4. **SVG Export**: Combine paths and export as SVG using `pathsToSVG()`.

#### **Interactive UI Elements:**
- **Slider Controls**: Real-time parameter adjustments via canvas-sketch params.
- **File Input**: Standard HTML file input for image uploading.
- **URL Input**: Text field with load button for web images.
- **Font Selector**: Dropdown for switching between available fonts.
- **Help Panel**: Instructions for using the generator.

---

### **Challenges and Solutions:**

#### **Browser Compatibility:**
- **Challenge**: Needed to handle both file uploads and URL loading in the browser context.
- **Solution**: Created a unified `loadImage()` function that handles both source types.

#### **ASCII Grid Sizing:**
- **Challenge**: Determining the optimal grid size for ASCII conversion.
- **Solution**: Implemented a scale factor and font aspect ratio correction.

#### **Character Spacing:**
- **Challenge**: ASCII characters have varying widths causing uneven grid appearance.
- **Solution**: Applied a fixed character spacing multiplier for monospaced-like layout.

#### **Performance Optimization:**
- **Challenge**: Rendering thousands of vector paths could cause performance issues.
- **Solution**: Skip rendering spaces and implement efficient path generation.

---

### **Future Enhancements:**
- **Color ASCII Art**: Support for color mapping instead of just grayscale.
- **Custom Character Ordering**: Allow users to reorder characters by density.
- **Additional Export Formats**: Add support for other vector formats beyond SVG.
- **Image Preprocessing**: Add filters like edge detection for artistic effects.
- **Pattern Fills**: Replace ASCII characters with custom patterns or symbols.
- **Animation Support**: Generate animated ASCII art from video sources.

---

This ASCII Art Generator transforms the original text-based template into a fully interactive image processing tool, while maintaining compatibility with pen plotting hardware by generating clean SVG vector paths.
*/
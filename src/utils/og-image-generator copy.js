import fs from 'fs/promises';
import path from 'path';

/**
 * Generates an OG image for blog posts using generative SVG art
 * @param {Object} options - Configuration options
 * @param {string} options.title - Post title (used for seed generation)
 * @param {string} options.slug - Post slug for filename
 * @param {string} options.collection - Content collection name (e.g., 'blog', 'sketches')
 * @param {string} [options.outputDir] - Root output directory
 * @param {string} [options.format] - Output format (svg, jpg, jpeg, webp, png)
 * @param {number} [options.width] - Image width
 * @param {number} [options.height] - Image height
 * @returns {Promise<string>} Path to the generated image
 */
export async function generateOGImage(options) {
  const {
    title,
    slug,
    collection,
    outputDir = 'public/thumbnails',
    format = 'svg', // Default format
    width = 1200,
    height = 630,
  } = options;

  // Generate a seed based on the title for consistent random patterns
  const seed = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Create a pseudorandom function based on the seed
  const random = (min, max, index = 0) => {
    const x = Math.sin((seed + index) * 9999) * 10000;
    const r = (x - Math.floor(x)) * (max - min) + min;
    return r;
  };

  // Color palette
  const PALETTE = ["#e63946", "#f1faee", "#a8dadc", "#457b9d", "#1d3557"];
  const backgroundColor = PALETTE[1]; // Light background

  // Grid parameters
  const gridColumns = 50;
  const gridRows = 70;
  const margin = width * 0.05;

  // SVG elements container
  let svgElements = '';

  // Generate geometric shapes
  svgElements += generateShapes(width, height, seed, PALETTE);
  
  // Generate circle elements for the background pattern
  svgElements += generateCircles(width, height, seed, PALETTE);
  
  // Generate modular grid elements
  svgElements += generateModularGrid(width, height, seed, PALETTE);
  
  // Generate halftone patterns
  svgElements += generateHalftone(width, height, seed, PALETTE);

  // Create the SVG
  const svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" 
     xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${backgroundColor}" />
  
  <!-- Generative Design Elements -->
  ${svgElements}
</svg>`;

  // Ensure the collection-specific output directory exists
  const collectionOutputDir = path.join(outputDir, collection);
  await fs.mkdir(collectionOutputDir, { recursive: true });
  
  // Save the SVG
  const outputPath = path.join(collectionOutputDir, `${slug}.${format}`);
  await fs.writeFile(outputPath, svg, 'utf-8');
  
  return outputPath;
}

/**
 * Generates circle elements for the design
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 * @param {number} seed - Random seed
 * @param {Array} palette - Color palette
 * @returns {string} SVG circle elements
 */
function generateCircles(width, height, seed, palette) {
  let circles = '';
  const count = 40;
  const minRadius = width * 0.05;
  const maxRadius = width * 0.12;
  
  // Create a pseudorandom function based on the seed
  const random = (min, max, index) => {
    const x = Math.sin((seed + index) * 9999) * 10000;
    const r = (x - Math.floor(x)) * (max - min) + min;
    return r;
  };
  
  for (let i = 0; i < count; i++) {
    const x = random(0, width, i);
    const y = random(0, height, i + 100);
    const size = random(minRadius, maxRadius, i + 200);
    const colorIndex = Math.floor(random(0, palette.length, i + 300));
    const color = palette[colorIndex];
    const opacity = random(0.1, 0.3, i + 400);
    const fill = random(0, 1, i + 500) > 0.7 ? color : 'none';
    const strokeWidth = random(1, 3, i + 600);
    
    circles += `<circle cx="${x}" cy="${y}" r="${size}" fill="${fill}" 
               stroke="${color}" stroke-width="${strokeWidth}" opacity="${opacity}" />`;
  }
  
  return circles;
}

/**
 * Generates geometric shapes for the design
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 * @param {number} seed - Random seed
 * @param {Array} palette - Color palette
 * @returns {string} SVG shape elements
 */
function generateShapes(width, height, seed, palette) {
  let shapes = '';
  const count = 15;
  
  // Create a pseudorandom function based on the seed
  const random = (min, max, index) => {
    const x = Math.sin((seed + index) * 9999) * 10000;
    const r = (x - Math.floor(x)) * (max - min) + min;
    return r;
  };
  
  for (let i = 0; i < count; i++) {
    const x = random(0, width, i + 1000);
    const y = random(0, height, i + 1100);
    const colorIndex = Math.floor(random(0, palette.length, i + 1200));
    const color = palette[colorIndex];
    const opacity = random(0.2, 0.8, i + 1300);
    const shapeType = Math.floor(random(0, 3, i + 1400));
    
    if (shapeType === 0) {
      // Rectangle
      const rectWidth = random(width * 0.05, width * 0.15, i + 1500);
      const rectHeight = random(height * 0.05, height * 0.15, i + 1600);
      const rotate = random(0, 360, i + 1700);
      
      shapes += `<rect x="${x - rectWidth/2}" y="${y - rectHeight/2}" width="${rectWidth}" height="${rectHeight}" 
               fill="${color}" opacity="${opacity}" transform="rotate(${rotate} ${x} ${y})" />`;
    } else if (shapeType === 1) {
      // Triangle
      const size = random(width * 0.05, width * 0.1, i + 1500);
      const x1 = x;
      const y1 = y - size;
      const x2 = x + size * 0.866; // cos(30°) = 0.866
      const y2 = y + size * 0.5;   // sin(30°) = 0.5
      const x3 = x - size * 0.866;
      const y3 = y + size * 0.5;
      
      shapes += `<polygon points="${x1},${y1} ${x2},${y2} ${x3},${y3}" fill="${color}" opacity="${opacity}" />`;
    } else {
      // Circle (different from the main circles)
      const radius = random(width * 0.02, width * 0.06, i + 1500);
      const fill = random(0, 1, i + 1600) > 0.5 ? color : 'none';
      const stroke = fill === 'none' ? color : 'none';
      const strokeWidth = random(1, 3, i + 1700);
      
      shapes += `<circle cx="${x}" cy="${y}" r="${radius}" 
               fill="${fill}" stroke="${stroke}" stroke-width="${strokeWidth}" opacity="${opacity}" />`;
    }
  }
  
  return shapes;
}

/**
 * Generates a modular grid for the design
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 * @param {number} seed - Random seed
 * @param {Array} palette - Color palette
 * @returns {string} SVG grid elements
 */
function generateModularGrid(width, height, seed, palette) {
  let grid = '';
  const cols = 3;
  const rows = 3;
  const margin = width * 0.1;
  const gridWidth = (width - margin * 2) / cols;
  const gridHeight = (height - margin * 2) / rows;
  
  // Create a pseudorandom function based on the seed
  const random = (min, max, index) => {
    const x = Math.sin((seed + index) * 9999) * 10000;
    const r = (x - Math.floor(x)) * (max - min) + min;
    return r;
  };
  
  for (let i = 0; i < cols; i++) {
    for (let j = 0; j < rows; j++) {
      if (random(0, 1, i * 10 + j) > 0.3) { // 70% chance of drawing a module
        const x = margin + i * gridWidth + gridWidth / 2;
        const y = margin + j * gridHeight + gridHeight / 2;
        const colorIndex = Math.floor(random(0, palette.length, i * 100 + j));
        const color = palette[colorIndex];
        const opacity = random(0.3, 0.7, i * 200 + j);
        
        // Draw a module
        const moduleType = Math.floor(random(0, 3, i * 300 + j));
        
        if (moduleType === 0) {
          // Simple rectangle
          const rectWidth = gridWidth * 0.8;
          const rectHeight = gridHeight * 0.8;
          
          grid += `<rect x="${x - rectWidth/2}" y="${y - rectHeight/2}" width="${rectWidth}" height="${rectHeight}" 
                 fill="${color}" opacity="${opacity}" />`;
                 
          // Add a line
          const lineX1 = x - rectWidth * 0.3;
          const lineY1 = y - rectHeight * 0.3;
          const lineX2 = x + rectWidth * 0.3;
          const lineY2 = y + rectHeight * 0.3;
          
          grid += `<line x1="${lineX1}" y1="${lineY1}" x2="${lineX2}" y2="${lineY2}" 
                 stroke="rgba(0,0,0,0.7)" stroke-width="2" />`;
                 
          // Add a small circle
          grid += `<circle cx="${x + rectWidth * 0.25}" cy="${y - rectHeight * 0.25}" r="${gridWidth * 0.05}" 
                 fill="rgba(0,0,0,0.7)" />`;
        } else if (moduleType === 1) {
          // Circle with pattern
          const radius = Math.min(gridWidth, gridHeight) * 0.4;
          
          grid += `<circle cx="${x}" cy="${y}" r="${radius}" fill="${color}" opacity="${opacity}" />`;
          
          // Add cross pattern
          grid += `<line x1="${x - radius * 0.7}" y1="${y}" x2="${x + radius * 0.7}" y2="${y}" 
                 stroke="rgba(0,0,0,0.7)" stroke-width="2" />`;
          grid += `<line x1="${x}" y1="${y - radius * 0.7}" x2="${x}" y2="${y + radius * 0.7}" 
                 stroke="rgba(0,0,0,0.7)" stroke-width="2" />`;
        } else {
          // Triangle with dot
          const size = Math.min(gridWidth, gridHeight) * 0.4;
          const x1 = x;
          const y1 = y - size;
          const x2 = x + size * 0.866;
          const y2 = y + size * 0.5;
          const x3 = x - size * 0.866;
          const y3 = y + size * 0.5;
          
          grid += `<polygon points="${x1},${y1} ${x2},${y2} ${x3},${y3}" 
                 fill="${color}" opacity="${opacity}" />`;
                 
          // Add a dot in the center
          grid += `<circle cx="${x}" cy="${y}" r="${size * 0.15}" 
                 fill="rgba(0,0,0,0.7)" />`;
        }
      }
    }
  }
  
  return grid;
}

/**
 * Generates halftone patterns for the design
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 * @param {number} seed - Random seed
 * @param {Array} palette - Color palette
 * @returns {string} SVG halftone elements
 */
function generateHalftone(width, height, seed, palette) {
  let halftone = '';
  const count = 3; // Number of halftone circles
  
  // Create a pseudorandom function based on the seed
  const random = (min, max, index) => {
    const x = Math.sin((seed + index) * 9999) * 10000;
    const r = (x - Math.floor(x)) * (max - min) + min;
    return r;
  };
  
  for (let i = 0; i < count; i++) {
    const centerX = random(width * 0.2, width * 0.8, i + 5000);
    const centerY = random(height * 0.2, height * 0.8, i + 5100);
    const maxRadius = random(width * 0.1, width * 0.2, i + 5200);
    const dotSize = maxRadius / 8;
    const detail = 6; // Level of detail
    
    // Generate dots in concentric rings
    for (let r = dotSize; r < maxRadius; r += dotSize * 1.5) {
      // Calculate number of dots around the circle
      const circumference = Math.PI * 2 * r;
      const dots = Math.max(6, Math.floor(circumference / (dotSize * 2.5)));
      
      for (let j = 0; j < dots; j++) {
        const angle = (Math.PI * 2 / dots) * j;
        const dotX = centerX + Math.cos(angle) * r;
        const dotY = centerY + Math.sin(angle) * r;
        
        // Use noise for dot size variation
        const noiseVal = random(0, 1, r * 100 + j);
        const size = dotSize * (0.5 + noiseVal * 0.5);
        
        const colorIndex = Math.floor(random(0, palette.length, i * 1000 + j));
        const color = palette[colorIndex];
        
        halftone += `<circle cx="${dotX}" cy="${dotY}" r="${size}" 
                   fill="${color}" opacity="0.7" />`;
      }
    }
  }
  
  return halftone;
}

/**
 * Determines the image format based on the existing thumbnail and format priority
 * @param {string} thumbnail - The existing thumbnail path
 * @returns {string} The format to use
 */
export function determineFormat(thumbnail) {
  if (!thumbnail) return 'svg'; // Default to SVG if no thumbnail
  
  // If a custom thumbnail is provided, use its format
  // This ensures custom images take priority over generated ones
  const extension = path.extname(thumbnail).toLowerCase().substring(1);
  
  // Return the custom image's extension if valid, otherwise default to svg
  return extension && ['svg', 'jpg', 'jpeg', 'webp', 'png'].includes(extension) 
    ? extension 
    : 'svg';
} 
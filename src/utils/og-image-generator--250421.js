import fs from 'fs/promises';
import path from 'path';

/**
 * Generates a minimalist OG image for blog posts using generative SVG art
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

  // Minimalist color palette - soft, muted colors
  const PALETTE = ["#f8f9fa", "#e9ecef", "#dee2e6", "#ced4da", "#adb5bd", "#212529"];
  const backgroundColor = PALETTE[0]; // Light background

  // SVG elements container
  let svgElements = '';

  // Generate minimal geometric elements
  svgElements += generateMinimalElements(width, height, seed, PALETTE);
  
  // Add a few accent lines
  svgElements += generateAccentLines(width, height, seed, PALETTE);

  // Create the SVG
  const svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" 
     xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="${backgroundColor}" />
  
  <!-- Minimalist Design Elements -->
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
 * Generates minimal geometric elements for the design
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 * @param {number} seed - Random seed
 * @param {Array} palette - Color palette
 * @returns {string} SVG elements
 */
function generateMinimalElements(width, height, seed, palette) {
  let elements = '';
  
  // Create a pseudorandom function based on the seed
  const random = (min, max, index) => {
    const x = Math.sin((seed + index) * 9999) * 10000;
    const r = (x - Math.floor(x)) * (max - min) + min;
    return r;
  };
  
  // Determine a focal point for the composition
  const focalX = random(width * 0.3, width * 0.7, 1);
  const focalY = random(height * 0.3, height * 0.7, 2);
  
  // Add a primary shape - choose between circle, rectangle, or thin line
  const primaryElementType = Math.floor(random(0, 3, 3));
  
  if (primaryElementType === 0) {
    // Large circle
    const radius = random(width * 0.1, width * 0.2, 4);
    const colorIndex = Math.floor(random(1, palette.length - 1, 5));
    
    elements += `<circle cx="${focalX}" cy="${focalY}" r="${radius}" 
               fill="${palette[colorIndex]}" opacity="0.7" />`;
               
    // Add a smaller contrasting circle
    const smallRadius = radius * 0.4;
    const smallCircleX = focalX + random(-width * 0.1, width * 0.1, 6);
    const smallCircleY = focalY + random(-height * 0.1, height * 0.1, 7);
    const smallColorIndex = Math.floor(random(2, palette.length, 8));
    
    elements += `<circle cx="${smallCircleX}" cy="${smallCircleY}" r="${smallRadius}" 
               fill="${palette[smallColorIndex]}" opacity="0.8" />`;
  } else if (primaryElementType === 1) {
    // Clean rectangle
    const rectWidth = random(width * 0.2, width * 0.35, 4);
    const rectHeight = random(height * 0.2, height * 0.35, 5);
    const colorIndex = Math.floor(random(1, palette.length - 1, 6));
    
    elements += `<rect x="${focalX - rectWidth/2}" y="${focalY - rectHeight/2}" 
               width="${rectWidth}" height="${rectHeight}" 
               fill="${palette[colorIndex]}" opacity="0.7" />`;
    
    // Add a smaller balancing rectangle
    const smallRectSize = Math.min(rectWidth, rectHeight) * 0.3;
    const smallRectX = random(width * 0.1, width * 0.9, 7);
    const smallRectY = random(height * 0.1, height * 0.9, 8);
    const smallColorIndex = Math.floor(random(2, palette.length, 9));
    
    elements += `<rect x="${smallRectX}" y="${smallRectY}" 
               width="${smallRectSize}" height="${smallRectSize}" 
               fill="${palette[smallColorIndex]}" opacity="0.8" />`;
  } else {
    // Elegant line
    const startX = random(width * 0.1, width * 0.3, 4);
    const startY = random(height * 0.3, height * 0.7, 5);
    const endX = random(width * 0.7, width * 0.9, 6);
    const endY = random(height * 0.3, height * 0.7, 7);
    const strokeWidth = random(width * 0.01, width * 0.03, 8);
    const colorIndex = palette.length - 1; // Use the darkest color
    
    elements += `<line x1="${startX}" y1="${startY}" x2="${endX}" y2="${endY}" 
               stroke="${palette[colorIndex]}" stroke-width="${strokeWidth}" opacity="0.6" />`;
    
    // Add a perpendicular accent line
    const accentLength = random(height * 0.1, height * 0.2, 9);
    const accentX = random(startX, endX, 10);
    const accentY = random(startY, endY, 11);
    const accentColorIndex = Math.floor(random(3, palette.length, 12));
    
    elements += `<line x1="${accentX}" y1="${accentY - accentLength/2}" x2="${accentX}" y2="${accentY + accentLength/2}" 
               stroke="${palette[accentColorIndex]}" stroke-width="${strokeWidth * 0.7}" opacity="0.8" />`;
  }
  
  return elements;
}

/**
 * Generates minimalist accent lines for the design
 * @param {number} width - Canvas width
 * @param {number} height - Canvas height
 * @param {number} seed - Random seed
 * @param {Array} palette - Color palette
 * @returns {string} SVG line elements
 */
function generateAccentLines(width, height, seed, palette) {
  let lines = '';
  const count = 3; // Just a few accent lines
  
  // Create a pseudorandom function based on the seed
  const random = (min, max, index) => {
    const x = Math.sin((seed + index) * 9999) * 10000;
    const r = (x - Math.floor(x)) * (max - min) + min;
    return r;
  };
  
  for (let i = 0; i < count; i++) {
    const isHorizontal = random(0, 1, i + 1000) > 0.5;
    const strokeWidth = random(1, 3, i + 2000);
    const colorIndex = Math.floor(random(3, palette.length, i + 3000));
    const color = palette[colorIndex];
    const opacity = random(0.2, 0.5, i + 4000);
    
    if (isHorizontal) {
      const y = random(height * 0.2, height * 0.8, i + 5000);
      const startX = random(0, width * 0.3, i + 6000);
      const endX = random(width * 0.7, width, i + 7000);
      
      lines += `<line x1="${startX}" y1="${y}" x2="${endX}" y2="${y}" 
               stroke="${color}" stroke-width="${strokeWidth}" opacity="${opacity}" />`;
    } else {
      const x = random(width * 0.2, width * 0.8, i + 5000);
      const startY = random(0, height * 0.3, i + 6000);
      const endY = random(height * 0.7, height, i + 7000);
      
      lines += `<line x1="${x}" y1="${startY}" x2="${x}" y2="${endY}" 
               stroke="${color}" stroke-width="${strokeWidth}" opacity="${opacity}" />`;
    }
  }
  
  return lines;
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
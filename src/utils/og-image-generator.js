import fs from 'fs/promises';
import path from 'path';

/**
 * Generates an OG image for blog posts using SVG
 * @param {Object} options - Configuration options
 * @param {string} options.title - Post title
 * @param {string} options.slug - Post slug for filename
 * @param {string} options.collection - Content collection name (e.g., 'blog', 'sketches')
 * @param {string} [options.category] - Post category
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
    category = 'Blog Post',
    outputDir = 'public/thumbnails',
    format = 'svg', // Default format
    width = 1200,
    height = 630,
  } = options;

  // Generate a seed based on the title for consistent random patterns
  const seed = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Create a pseudorandom function based on the seed
  const random = (min, max) => {
    const x = Math.sin(seed + 1) * 10000;
    const r = (x - Math.floor(x)) * (max - min) + min;
    return r;
  };

  // Generate circle elements for the background pattern
  let circles = '';
  for (let i = 0; i < 50; i++) {
    const x = random(0, width);
    const y = random(0, height);
    const size = random(100, 300);
    const hue = random(0, 360);
    const opacity = 0.2;
    
    circles += `<circle cx="${x}" cy="${y}" r="${size}" fill="none" 
                 stroke="hsla(${hue}, 70%, 90%, ${opacity})" stroke-width="2" />`;
  }

  // Generate gradient lines
  let gradientLines = '';
  for (let y = 0; y < height; y += 8) {
    const hue = 30 + (y / height) * 60;
    gradientLines += `<line x1="0" y1="${y}" x2="${width}" y2="${y}" 
                       stroke="hsla(${hue}, 80%, 90%, 0.1)" stroke-width="4" />`;
  }

  // Handle long titles
  const displayTitle = title.length > 60 
    ? title.substring(0, 57) + '...' 
    : title;

  // Create the SVG
  const svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" 
     xmlns="http://www.w3.org/2000/svg">
  <rect width="${width}" height="${height}" fill="#101820" />
  
  <!-- Background patterns -->
  ${circles}
  
  <!-- Gradient overlay -->
  ${gradientLines}
  
  <!-- Category label -->
  <text x="60" y="60" fill="#F2AA4C" font-size="24" font-weight="bold" font-family="system-ui, sans-serif">
    ${category.toUpperCase()}
  </text>
  
  <!-- Title -->
  <text x="${width/2}" y="${height/2}" fill="white" font-size="60" font-weight="bold" 
        text-anchor="middle" dominant-baseline="middle" font-family="system-ui, sans-serif">
    <tspan x="${width/2}" dy="-40">${displayTitle.length > 30 ? displayTitle.substring(0, 30) : displayTitle}</tspan>
    ${displayTitle.length > 30 ? `<tspan x="${width/2}" dy="70">${displayTitle.substring(30)}</tspan>` : ''}
  </text>
  
  <!-- Collection type -->
  <text x="60" y="${height - 60}" fill="rgba(255,255,255,0.5)" font-size="20" 
        font-family="system-ui, sans-serif">
    /${collection}/
  </text>
  
  <!-- Website URL -->
  <text x="${width - 60}" y="${height - 60}" fill="rgba(255,255,255,0.7)" font-size="24" 
        text-anchor="end" font-family="system-ui, sans-serif">
    jasperyong.com
  </text>
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
// Generate PWA Icons from SVG favicon
// Run with: node scripts/generate-pwa-icons.js

import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

// Get __dirname equivalent in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const SVG_PATH = path.join(__dirname, '../public/favicon.svg');
const OUTPUT_DIR = path.join(__dirname, '../public');

// Create directories if they don't exist
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

async function generatePWAIcons() {
  const svgBuffer = fs.readFileSync(SVG_PATH);
  
  const sizes = [192, 512];
  
  for (const size of sizes) {
    await sharp(svgBuffer)
      .resize(size, size)
      .png()
      .toFile(path.join(OUTPUT_DIR, `pwa-${size}x${size}.png`));
    
    console.log(`Generated: pwa-${size}x${size}.png`);
  }
  
  console.log('PWA icons generation complete!');
}

generatePWAIcons().catch(err => {
  console.error('Error generating PWA icons:', err);
  process.exit(1);
});
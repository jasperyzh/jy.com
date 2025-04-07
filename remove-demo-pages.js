/**
 * Remove Demo Pages Script
 * 
 * This script removes the demo pages directory before production builds.
 * Run it as part of your build process with:
 * node remove-demo-pages.js && astro build
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get the current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if we're in production mode
const isProduction = process.env.NODE_ENV === 'production';

// Only remove demo pages in production
if (isProduction) {
  // Path to the demo pages directory
  const demoDir = path.join(__dirname, 'src', 'pages', 'demo');
  
  console.log(`Checking for demo directory: ${demoDir}`);
  
  // Check if the directory exists before attempting to remove it
  if (fs.existsSync(demoDir)) {
    try {
      // Recursively remove the directory and all its contents
      fs.rmSync(demoDir, { recursive: true, force: true });
      console.log('✅ Demo pages successfully removed for production build');
    } catch (error) {
      console.error('❌ Error removing demo pages:', error);
      process.exit(1);
    }
  } else {
    console.log('ℹ️ Demo directory not found, nothing to remove');
  }
} else {
  console.log('ℹ️ Not in production mode, keeping demo pages');
} 
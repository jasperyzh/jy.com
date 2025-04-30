import { fileURLToPath } from 'url';
import { dirname, join, resolve, extname } from 'path';
import fs from 'fs/promises';
import { stat } from 'fs/promises';

// Import the OG image generator
// import { generateOGImage, determineFormat } from '../src/utils/og-image-generator.js';
import { generateOGImage, determineFormat } from '../src/utils/og-image-generator--250421.js';

// Constants
const CACHE_FILE = 'scripts/.og-image-cache.json';
const CONTENT_DIRS = [
  { path: 'src/content/sketches', collection: 'sketches' },
  { path: 'src/content/blog', collection: 'blog' }
];

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * Simple frontmatter parser for markdown/mdx files
 * @param {string} content - File content
 * @returns {Object} - Parsed frontmatter data
 */
function parseFrontmatter(content) {
  const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
  const match = frontmatterRegex.exec(content);
  
  if (!match) return {};
  
  const frontmatter = match[1];
  const data = {};
  
  // Parse each line of the frontmatter
  frontmatter.split('\n').forEach(line => {
    const parts = line.split(':');
    if (parts.length >= 2) {
      const key = parts[0].trim();
      // Join back parts that might contain colons (like URLs)
      const value = parts.slice(1).join(':').trim();
      
      // Handle string values (remove quotes)
      if (value.startsWith('"') && value.endsWith('"')) {
        data[key] = value.slice(1, -1);
      } 
      // Handle arrays
      else if (value.startsWith('[') && value.endsWith(']')) {
        try {
          data[key] = JSON.parse(value.replace(/'/g, '"'));
        } catch (e) {
          data[key] = value;
        }
      } 
      // Handle booleans
      else if (value === 'true' || value === 'false') {
        data[key] = value === 'true';
      } 
      // Handle numbers
      else if (!isNaN(value)) {
        data[key] = Number(value);
      } 
      // Default to string
      else {
        data[key] = value;
      }
    }
  });
  
  return data;
}

/**
 * Find all markdown and MDX files recursively
 * @param {string} dir - Directory to search
 * @returns {Promise<string[]>} - Array of file paths
 */
async function findContentFiles(dir) {
  const files = [];
  
  async function scanDir(currentDir) {
    const entries = await fs.readdir(currentDir, { withFileTypes: true });
    
    for (const entry of entries) {
      const fullPath = join(currentDir, entry.name);
      
      if (entry.isDirectory()) {
        await scanDir(fullPath);
      } else if (/\.(md|mdx)$/.test(entry.name)) {
        files.push(fullPath);
      }
    }
  }
  
  await scanDir(dir);
  return files;
}

/**
 * Load the cache of previously generated images
 */
async function loadCache() {
  try {
    const cacheData = await fs.readFile(CACHE_FILE, 'utf-8');
    return JSON.parse(cacheData);
  } catch (error) {
    console.log('No existing cache found, creating new cache');
    return {};
  }
}

/**
 * Save the cache of generated images
 */
async function saveCache(cache) {
  await fs.writeFile(CACHE_FILE, JSON.stringify(cache, null, 2), 'utf-8');
}

/**
 * Process files from a specific collection
 * @param {string} contentDir - Directory path
 * @param {string} collectionName - Collection name
 * @param {Object} cache - Cache object
 * @returns {Promise<{newCache: Object, generated: number, skipped: number}>} Results
 */
async function processCollection(contentDir, collectionName, cache) {
  console.log(`Processing ${collectionName} collection...`);
  
  const contentFiles = await findContentFiles(contentDir);
  const newCache = {};
  let generated = 0;
  let skipped = 0;
  
  for (const fullPath of contentFiles) {
    try {
      // Get file stats for modification time checking
      const stats = await stat(fullPath);
      const lastModified = stats.mtimeMs;
      
      // Get relative path for cache key
      const file = fullPath.replace(process.cwd() + '/', '');
      
      // Extract slug from file path
      const slug = file.split('/').pop().replace(/\.(md|mdx)$/, '');
      
      // FORCE REGENERATION: Set this to true to regenerate all thumbnails
      const forceRegeneration = false;
      
      // Check if we need to regenerate this image
      const cacheEntry = cache[file];
      if (!forceRegeneration && cacheEntry && cacheEntry.lastModified === lastModified) {
        // Image is already up to date
        newCache[file] = cacheEntry;
        skipped++;
        console.log(`⏩ Skipped: ${file} (unchanged)`);
        continue;
      }
      
      // Read the file to extract frontmatter
      const content = await fs.readFile(fullPath, 'utf-8');
      const frontmatter = parseFrontmatter(content);
      
      // Skip if this content doesn't need an OG image
      if (frontmatter.skipOgImage === true) {
        console.log(`⏩ Skipped: ${file} (marked to skip)`);
        continue;
      }
      
      // If thumbnail is already specified in frontmatter, extract the expected filename
      let thumbnailSlug = slug;
      let expectedFormat = null;
      
      if (frontmatter.thumbnail) {
        const thumbnailPath = frontmatter.thumbnail;
        // Extract just the filename without extension from the thumbnail path
        const thumbnailFilename = thumbnailPath.split('/').pop();
        if (thumbnailFilename) {
          const parts = thumbnailFilename.split('.');
          if (parts.length > 1) {
            thumbnailSlug = parts[0];
            expectedFormat = parts[1];
          }
        }
      }
      
      // Determine the format based on existing thumbnail (if any)
      const format = expectedFormat || determineFormat(frontmatter.thumbnail);

      // Generate the OG image
      console.log(`🔄 Generating for: ${frontmatter.title || thumbnailSlug}`);
      const outputPath = await generateOGImage({
        title: frontmatter.title || thumbnailSlug,
        slug: thumbnailSlug,
        collection: collectionName,
        category: frontmatter.category || collectionName,
        format
      });
      
      // Update cache
      newCache[file] = {
        lastModified,
        outputPath,
        title: frontmatter.title,
        format
      };
      
      console.log(`✅ Generated: ${outputPath}`);
      generated++;
      
    } catch (error) {
      console.error(`❌ Error generating OG image for ${fullPath}:`, error.message);
    }
  }
  
  return { newCache, generated, skipped };
}

/**
 * Main function to generate OG images
 */
async function generateOGImages() {
  console.log('🖼️ Generating OG images...');
  
  // Load cache of previously generated images
  const cache = await loadCache();
  
  let allNewCache = {};
  let totalGenerated = 0;
  let totalSkipped = 0;
  
  // Process each collection
  for (const { path: dirPath, collection } of CONTENT_DIRS) {
    const contentDir = resolve(process.cwd(), dirPath);
    
    try {
      const { newCache, generated, skipped } = await processCollection(
        contentDir, 
        collection, 
        cache
      );
      
      allNewCache = { ...allNewCache, ...newCache };
      totalGenerated += generated;
      totalSkipped += skipped;
      
    } catch (error) {
      console.error(`❌ Error processing ${collection} collection:`, error.message);
    }
  }
  
  // Save the new cache
  await saveCache(allNewCache);
  
  console.log(`✨ OG image generation complete!`);
  console.log(`   Generated: ${totalGenerated}, Skipped: ${totalSkipped}`);
}

// Run the script
generateOGImages().catch(error => {
  console.error('Error in OG image generation:', error);
  process.exit(1);
}); 
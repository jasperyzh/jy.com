---
title: Generative Thumbnails
description: Documentation of the SVG-based generative thumbnail system
pubDate: 250412
draft: 0
---

# Generative Thumbnails System

## Overview

The generative thumbnails system automatically creates unique, visually appealing OG images for blog posts and sketches during the Astro build process. Instead of manually designing images for each piece of content, the system programmatically generates SVG images based on content metadata.

## Architecture

The implementation follows a pipeline architecture with these main components:

1. **OG Image Generator Utility** (`src/utils/og-image-generator.js`)
   - Core SVG generation logic
   - Handles multiple image formats
   - Creates deterministic patterns based on content title

2. **Build-time Generation Script** (`scripts/generate-og-images.mjs`)
   - Processes content collections (blog, sketches)
   - Implements caching for performance optimization
   - Only regenerates images when content changes

3. **Layout Components** (`src/layouts/BlogLayout.astro`)
   - Uses generated images in meta tags
   - Dynamically references appropriate thumbnail paths

## Implementation Details

### 1. SVG-Based Approach

The system uses SVG for image generation instead of Canvas or other raster-based approaches. Benefits include:

- **No native dependencies**: Avoids problematic modules like `canvas` that require system libraries
- **Smaller file sizes**: Vector graphics are typically smaller than raster images
- **Perfect scaling**: SVGs maintain quality at any resolution
- **Easy debugging**: SVG files are plain text and can be manually edited
- **Zero external packages**: Works with built-in Node.js modules

```javascript
// Core SVG generator function
export async function generateOGImage(options) {
  // Generate a seed based on the title
  const seed = title.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  
  // Create pseudorandom patterns using the seed
  // ...

  // Generate the SVG content
  const svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="${width}" height="${height}" ...>
  <!-- SVG elements -->
</svg>`;

  // Save to file system
  await fs.writeFile(outputPath, svg, 'utf-8');
}
```

### 2. Path Structure and Format Handling

Images follow a content-based path structure:

```
/thumbnails/[collection]/[slug].[format]
```

Examples:
- `/thumbnails/blog/my-blog-post.svg`
- `/thumbnails/sketches/creative-sketch.png`

The system implements a format priority system:
- `svg` (default) < `jpg` < `jpeg` < `webp` < `png`

This means SVG is the default format, but content with a thumbnail in a higher priority format will use that format instead.

### 3. Performance Optimization

Several optimizations were implemented:

1. **Change Detection**: Files are only regenerated when content changes
2. **Caching**: A JSON cache file tracks last modification timestamps
3. **Collection-based Processing**: Processes collections separately for better organization
4. **Skip Option**: Content can include `skipOgImage: true` to opt out

```javascript
// Cache entry example
{
  "src/content/blog/my-post.md": {
    "lastModified": 1681234567890,
    "outputPath": "public/thumbnails/blog/my-post.svg",
    "title": "My Blog Post"
  }
}
```

### 4. Visual Design

Each generated image includes:

- **Background**: Dark base with generative circular patterns
- **Category**: Displayed prominently in the upper left
- **Title**: Centered with handling for long titles
- **Collection Path**: Bottom left corner
- **Website**: Bottom right corner

The image design is consistent yet unique for each piece of content because the patterns are generated deterministically based on the content title.

## Usage

### Content Authors

Content authors don't need to do anything special - thumbnails are generated automatically during build. They can:

1. Let the system generate an SVG thumbnail by default
2. Specify a custom thumbnail in frontmatter to override generation
3. Opt out with `skipOgImage: true` in frontmatter

### Developers

To extend or modify the system:

1. **Add new collections**: Update the `CONTENT_DIRS` array in `generate-og-images.mjs`
2. **Modify image design**: Edit the SVG template in `og-image-generator.js`
3. **Add new formats**: Update the `determineFormat` function and format priority logic

## Example Build Output

When building the site, the script outputs:

```
🖼️ Generating OG images...
Processing sketches collection...
🔄 Generating for: My Sketch Title
✅ Generated: public/thumbnails/sketches/my-sketch.svg
Processing blog collection...
⏩ Skipped: src/content/blog/my-post.md (unchanged)
🔄 Generating for: New Blog Post
✅ Generated: public/thumbnails/blog/new-post.png
✨ OG image generation complete!
   Generated: 2, Skipped: 1
```

## Integration Points

1. **Package.json**: Build script includes the thumbnail generation
   ```json
   "scripts": {
     "build": "npm run generate-og && astro build"
   }
   ```

2. **Layouts**: Templates reference generated thumbnails
   ```astro
   const ogImage = frontmatter.thumbnail || `/thumbnails/${collection}/${slug}.svg`;
   ```

3. **Preview Page**: A demo page at `/generate-og-preview` shows the system in action

## Decision Log

- **SVG over Canvas**: Chose SVG to avoid native dependencies and simplify the build process
- **File-based Caching**: Used a simple JSON file for caching instead of a database for portability
- **Collection-based Organization**: Structured thumbnails by content collection for better organization
- **Format Priority System**: Implemented to allow flexibility while maintaining backwards compatibility

## Future Improvements

Potential enhancements to consider:

1. **Parallel Processing**: Generate thumbnails concurrently for faster builds
2. **Theme Variations**: Create different visual themes based on content categories
3. **Custom Elements**: Allow content to specify custom elements or colors
4. **Raster Conversion**: Optionally convert SVGs to raster formats for platforms that don't support SVG OG images
5. **On-demand Generation**: Add API endpoint for runtime generation in SSR mode



# Generative Thumbnails: How-To Guide

This guide provides practical examples and instructions for using the automatic thumbnail generation system.

## Basic Usage

The thumbnail system automatically generates unique OG images for your content. Here's how it works by default:

1. You create a new blog post or sketch with frontmatter
2. During the build process, an SVG thumbnail is generated based on your content
3. The thumbnail is stored in `/thumbnails/[collection]/[slug].svg`
4. Your layout automatically references this thumbnail for social sharing

## Example Content

Here's an example of a blog post that will automatically get a thumbnail:

```md
---
title: "Getting Started with Astro"
date: "250415"
description: "Learn how to build fast websites with Astro.js"
category: "Web Development"
tags: ["astro", "javascript", "web"]
status: "completed"
---

# Getting Started with Astro

Astro is a modern static site generator...
```

When you build your site, the system will:
1. Generate a thumbnail at `/thumbnails/blog/getting-started-with-astro.svg`
2. Use the "Web Development" category in the thumbnail design
3. Create a unique visual pattern based on the title

## Customizing Thumbnails

### 1. Using a Custom Thumbnail

To override the generated thumbnail, add a `thumbnail` property to your frontmatter:

```md
---
title: "Getting Started with Astro"
description: "Learn how to build fast websites with Astro.js"
category: "Web Development"
tags: ["astro", "javascript", "web"]
thumbnail: "/images/custom-astro-thumbnail.png"
---
```

The custom thumbnail will be used instead of generating one.

### 2. Format Priority

The system supports different image formats with this priority:
- `svg` (default) < `jpg` < `jpeg` < `webp` < `png`

If you specify a thumbnail with a higher priority format, the generation system will use that format:

```md
---
thumbnail: "/images/astro-thumb.png"  # This will generate in PNG format
---
```

### 3. Opting Out

To skip thumbnail generation for a specific piece of content, add `skipOgImage: true` to your frontmatter:

```md
---
title: "Draft Post"
skipOgImage: true
---
```

## Working with Different Collections

The system supports multiple content collections:

### Blog Posts

Blog posts (in `src/content/blog/`) will generate thumbnails at:
```
/thumbnails/blog/[slug].[format]
```

### Sketches

Sketches (in `src/content/sketches/`) will generate thumbnails at:
```
/thumbnails/sketches/[slug].[format]
```

## Customizing the Generation System

### Modifying the Design

To change the thumbnail design, edit the SVG template in `src/utils/og-image-generator.js`:

```javascript
// Find this section:
const svg = `<?xml version="1.0" encoding="UTF-8" standalone="no"?>
<svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" 
     xmlns="http://www.w3.org/2000/svg">
  <!-- Customize the design here -->
  <rect width="${width}" height="${height}" fill="#101820" />
  ...
</svg>`;
```

Common customizations:
- Change the background color (`fill="#101820"`)
- Adjust font sizes, colors, and positions
- Add custom design elements or patterns

### Adding a New Collection

To generate thumbnails for a new content collection:

1. Open `scripts/generate-og-images.mjs`
2. Find the `CONTENT_DIRS` array:
   ```javascript
   const CONTENT_DIRS = [
     { path: 'src/content/sketches', collection: 'sketches' },
     { path: 'src/content/blog', collection: 'blog' }
   ];
   ```
3. Add your new collection:
   ```javascript
   const CONTENT_DIRS = [
     { path: 'src/content/sketches', collection: 'sketches' },
     { path: 'src/content/blog', collection: 'blog' },
     { path: 'src/content/projects', collection: 'projects' }
   ];
   ```

### Testing Your Changes

To test your changes:

1. Run the generation script:
   ```bash
   npm run generate-og
   ```

2. Check the generated thumbnails in `public/thumbnails/`

3. View the preview page at `/generate-og-preview`

## Troubleshooting

### Missing Thumbnails

If thumbnails aren't being generated:

1. Check that the build process includes the generate-og script:
   ```json
   "scripts": {
     "build": "npm run generate-og && astro build"
   }
   ```

2. Verify file permissions on the output directory:
   ```bash
   ls -la public/thumbnails/
   ```

3. Check the cache file at `scripts/.og-image-cache.json`

### Format Issues

If the wrong format is being used:

1. Clear the cache file:
   ```bash
   rm scripts/.og-image-cache.json
   ```

2. Verify the thumbnail path in your frontmatter:
   ```md
   ---
   thumbnail: "/images/my-image.png"  # Make sure extension matches actual file
   ---
   ```

3. Regenerate the thumbnails:
   ```bash
   npm run generate-og
   ```

## Examples

### Default SVG Thumbnail

```md
---
title: "Learning JavaScript"
category: "Web Development"
---
```

Result: `/thumbnails/blog/learning-javascript.svg`

### Custom PNG Thumbnail

```md
---
title: "Learning JavaScript"
category: "Web Development"
thumbnail: "/custom/learning-js.png"
---
```

Result: `/thumbnails/blog/learning-javascript.png`

### Category-Specific Design

The category is prominently displayed in the thumbnail:

```md
---
title: "Advanced React Patterns"
category: "React"
---
```

The thumbnail will show "REACT" in the upper left corner.

## Resources

- [Read the full documentation](/docs/8-memory-bank/07-generative-thumbnails.md)
- [View the preview page](/generate-og-preview)
- [Source code](https://github.com/yourusername/your-repo/blob/main/src/utils/og-image-generator.js) 
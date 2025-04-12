---
title: Generative Thumbnails How-To Guide
description: Practical guide for using and customizing the automatic thumbnail generation system
pubDate: 250413
draft: 0
---

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
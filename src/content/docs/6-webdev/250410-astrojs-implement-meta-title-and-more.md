---
title: Implementing SEO Metadata in Astro.js
description: A guide to properly implementing meta title, description, OG image, and following best practices for SEO in Astro.js projects
pubDate: 250410
draft: 0
---

# Implementing SEO Metadata in Astro.js

Proper metadata implementation is crucial for SEO, social sharing, and overall site discoverability. This guide covers how to effectively implement meta title, description, and Open Graph images in Astro.js projects.

## Creating a Reusable Head Component

The most efficient approach is to create a reusable `Head.astro` component that manages all metadata:

```astro
---
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

interface Props {
  title?: string | undefined;
  description?: string | undefined;
  image?: string | undefined;
}

const {
  title = SITE_TITLE,
  description = SITE_DESCRIPTION,
  image = "/placeholder-post.jpg",
} = Astro.props as Props;

// Construct full title with site name if not already included
const pageTitle = title !== SITE_TITLE && !title?.includes(SITE_TITLE) 
  ? `${title} | ${SITE_TITLE}` 
  : title;

// Ensure image URL is absolute
const imageUrl = new URL(image, Astro.url);
---

<!-- Global Metadata -->
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width,initial-scale=1" />
<link rel="icon" type="image/svg+xml" href="/favicon.svg" />

<!-- Primary Meta Tags -->
<title>{pageTitle}</title>
<meta name="title" content={pageTitle} />
<meta name="description" content={description} />

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website" />
<meta property="og:url" content={Astro.url} />
<meta property="og:title" content={pageTitle} />
<meta property="og:description" content={description} />
<meta property="og:image" content={imageUrl} />

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image" />
<meta property="twitter:url" content={Astro.url} />
<meta property="twitter:title" content={pageTitle} />
<meta property="twitter:description" content={description} />
<meta property="twitter:image" content={imageUrl} />
```

## Key Features of the Implementation

1. **Default Values with Fallbacks**: Import global site title and description to use as defaults.
   ```ts
   // In consts.ts
   export const SITE_TITLE = "Your Site Name";
   export const SITE_DESCRIPTION = "Your site description goes here";
   ```

2. **Smart Title Formatting**: Format titles consistently by appending the site name when appropriate.
   ```ts
   const pageTitle = title !== SITE_TITLE && !title?.includes(SITE_TITLE) 
     ? `${title} | ${SITE_TITLE}` 
     : title;
   ```

3. **Absolute URLs for Images**: Convert relative image paths to absolute URLs.
   ```ts
   const imageUrl = new URL(image, Astro.url);
   ```

## Using the Head Component in Layouts

Integrate the Head component in your layout files:

```astro
---
import Head from "./Head.astro";

interface Props {
  title?: string;
  description?: string;
  image?: string;
}

const { title, description, image } = Astro.props;
---

<html lang="en">
  <head>
    <Head title={title} description={description} image={image} />
    <!-- Additional head elements -->
  </head>
  <body>
    <slot />
  </body>
</html>
```

## Using It in Pages or Content Collections

### In Astro Pages

```astro
---
import Layout from "../layouts/BaseLayout.astro";
---

<Layout 
  title="About Us" 
  description="Learn more about our company and team" 
  image="/about-team.jpg"
>
  <h1>About Us</h1>
  <!-- Page content -->
</Layout>
```

### In Content Collections (like blogs or docs)

For content collections, extract frontmatter metadata:

```astro
---
import { getCollection } from 'astro:content';
import Layout from '../layouts/BaseLayout.astro';

export async function getStaticPaths() {
  const blogEntries = await getCollection('blog');
  return blogEntries.map(entry => ({
    params: { slug: entry.slug },
    props: { entry },
  }));
}

const { entry } = Astro.props;
const { Content } = await entry.render();
---

<Layout
  title={entry.data.title}
  description={entry.data.description}
  image={entry.data.image || "/placeholder-post.jpg"}
>
  <Content />
</Layout>
```

## Best Practices for SEO Metadata

1. **Title Tags (15-70 characters)**
   - Be descriptive but concise
   - Include primary keyword near the beginning
   - Follow a pattern: "Page Title | Site Name"

2. **Meta Descriptions (50-160 characters)**
   - Provide a clear summary of the page content
   - Include relevant keywords naturally
   - Add a call-to-action where appropriate

3. **Open Graph Images**
   - Use high-quality images (recommended 1200×630 pixels)
   - Ensure images are relevant to the content
   - Provide a default image for pages without specific images
   - Optimize image file sizes for performance

4. **URL Structure**
   - Ensure your `<meta property="og:url">` and `<meta property="twitter:url">` use canonical URLs
   - Using `Astro.url` ensures the complete URL is used

5. **Additional Considerations**
   - Add structured data/JSON-LD for rich results
   - Include canonical tags for duplicate content
   - Consider adding additional meta tags for specific platforms (Pinterest, LinkedIn, etc.)
   - Test your implementation with platform validation tools

## Testing Your Implementation

Validate your OG tags using these tools:
- [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [LinkedIn Post Inspector](https://www.linkedin.com/post-inspector/)
- [SEO Meta Tag Analyzer](https://www.seoptimer.com/meta-tag-analyzer)

By implementing these SEO metadata practices in your Astro.js project, you'll improve your site's discoverability in search engines and enhance how your content appears when shared on social media platforms.

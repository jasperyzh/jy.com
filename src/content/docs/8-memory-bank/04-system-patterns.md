---
title: System Patterns
description: Architecture, key technical decisions, design patterns, and components.
pubDate: 250408
draft: 1
---
### **4. `systemPatterns.md` (How We Build)**
```markdown
# SYSTEM PATTERNS
<!-- VERSION CONTROLLED - Update via PR -->

## Architectural Pillars
```pillars
1. JAMstack: 
   - Implementation: Astro.js with static site generation
   - Why Chosen: Performance, SEO, content-focused with minimal JS
   - Alternatives Considered: Next.js, SvelteKit, Remix
2. Component-Based UI:
   - Implementation: Reusable Astro/Vue components (`src/components/`)
   - Why Chosen: Maintainability, code reuse, consistent design
   - Alternatives Considered: Page-based templates, server components
3. Content-Code Separation:
   - Implementation: Markdown/MDX in Astro Content Collections
   - Why Chosen: Simplifies content updates, works with Obsidian sync
   - Alternatives Considered: Headless CMS, database storage
```

## Component Strategy
```component-rules
- Default: `.astro` components for all standard UI elements
- Exception: `.vue` components ONLY for:
  1. Interactive sketches and practice areas
  2. Components requiring complex client-side interactivity
  3. When explicitly requested for specific features
- Library: Use starwind components whenever possible for UI elements
- Reuse: Always check for existing components before creating new ones
- Composition: Prefer composition over inheritance for component relationships
- Props: Design components with reasonable defaults and clear prop interfaces
- Demo: All new component demos should be placed under `src/pages/demo/index.astro` for centralized testing and discovery
```

## Styling Strategy
```styling-rules
- Use Tailwind CSS as the primary styling approach
- Prefer starwind components whenever possible for UI elements
- Base HTML elements (p, a, h1-h6, hr, etc.) should be styled globally via CSS variables
- Components should NOT override base element styling (fonts, sizing, spacing)
- Typography and spacing should derive from global CSS variables
- Keep component styling focused on layout, positioning, and component-specific visuals
- Use Tailwind's theme extension to establish consistent design tokens
- Prefer utility classes over custom CSS when possible
- Custom CSS should only be used for complex patterns that utility classes can't handle efficiently
```

## Design Style Guide
```design-system
1. Layout Structure
   - Vertical sections with clear purpose delineation
   - Full-width content blocks with consistent internal padding
   - Side accent bar (teal) for branding/navigation on mobile/desktop
   - Asymmetric layouts with intentional white space
   - Vertical rhythm maintained through consistent spacing scale

2. Typography
   - Large, bold headlines (2.5rem-4rem) for main headings
   - Generous line-height (1.2-1.3) for improved readability
   - Clear type hierarchy with 3-4 distinct size levels
   - Minimal use of font weights (regular, medium, bold only)
   - Left-aligned text for body, can center align headlines for emphasis
   - Limit line length to 65-75 characters for readability

3. Color Application
   - Maintain existing color scheme but apply using Circora's pattern:
     - Primary background areas use light neutral tone
     - Secondary content areas use dark backgrounds for contrast
     - Accent color (teal) used for UI elements and navigation
     - High contrast text (dark on light, light on dark)
     - Purposeful color blocking to establish visual rhythm

4. UI Components
   - Circular elements for service/feature highlights
   - Clean cards with minimal borders/shadows
   - Buttons with subtle hover effects
   - Images with intentional crop ratios (square, 16:9)
   - Generous padding in all UI components
   - Consistent vertical spacing between sections

5. Navigation
   - Minimal top navigation
   - Mobile: full-screen overlay navigation
   - Use of hamburger menu on mobile
   - Vertical brand accent bar persists across viewport sizes

6. Content Sections
   - Hero: Large headline with concise value proposition
   - About: Team photo with concise company description
   - Services: Circular buttons/elements with short descriptions
   - Call to action: Large text with clear button
   - Footer: Minimal with essential contact information
```

## Component Hierarchy
```component-hierarchy
- Base Components:
  - From UI Library: Button, Badge, Card, etc.
  - Custom Base: Layout, SEO, Navigation

- Generic Components:
  - CardComponent: Base card with customizable content, actions and styling
  - ContentBlock: Container for markdown content

- Specialized Components:
  - BlogPostCard: Extends CardComponent with blog-specific features
  - ProjectCard: Extends CardComponent with project-specific features
  - NavigationMenu: Specialized menu with responsive behavior

- Page-Specific Components:
  - HomepageHero: Only used on home page
  - ContactForm: Only used on contact page
```

## Component Composition Examples
```component-examples
1. BlogPostCard → CardComponent → starwind/card:
   - BlogPostCard adds blog-specific features (thumbnail, category)
   - CardComponent provides consistent layout and behavior
   - starwind/card provides base styling and structure

2. Composition Pattern:
   ```astro
   <CardComponent 
     title={title}
     date={date}
     hasCustomContent={true}
     {...props}
   >
     <!-- Custom content here -->
     <div slot="footer">
       <!-- Custom footer content -->
     </div>
   </CardComponent>
   ```
```

## Anti-Patterns
```caution
- Inline styles → Breaks: Consistent theming and maintenance
  - Exception Cases: One-off demos, temporary prototypes
- Direct DOM manipulation → Breaks: Vue's reactivity system
  - Exception Cases: Canvas/WebGL interactions, performance-critical animations
- Large JS bundles → Breaks: Initial load performance
  - Exception Cases: Interactive demos that require significant client-side code
- Creating new components for minor variations → Breaks: Maintainability
  - Correct Approach: Extend existing components with props
```

## Sketch Utilities Pattern

### Category and Tag Handling

The sketch system uses a set of utility functions to handle categories and tags consistently across the application. These utilities are defined in `src/utils/sketchUtils.ts`.

#### Core Functions:

1. **Category Management**:
   ```typescript
   getAllCategories(sketches: CollectionEntry<'sketches'>[]): string[]
   getCategoryUrl(category: string): string
   ```
   - Gets unique categories from sketches
   - Generates consistent category URLs

2. **Tag Management**:
   ```typescript
   getAllTags(sketches: CollectionEntry<'sketches'>[]): string[]
   getTagUrl(tag: string): string
   ```
   - Extracts unique tags from sketches
   - Generates consistent tag URLs

3. **URL Handling**:
   ```typescript
   slugify(name: string): string
   unslugify(slug: string): string
   ```
   - Converts names to URL-safe slugs
   - Restores original names from slugs

#### Implementation Details:

- Uses `encodeURIComponent/decodeURIComponent` for reliable URL encoding
- Maintains consistent URL structure: `/sketches/category/[category]` and `/sketches/tag/[tag]`
- Handles spaces and special characters in category/tag names
- Sorts categories and tags alphabetically for consistent display

#### Usage Example:

```typescript
import { getAllCategories, getCategoryUrl, getAllTags, getTagUrl } from '@/utils/sketchUtils';

// Get all categories
const categories = getAllCategories(sketches);

// Generate category URL
const categoryUrl = getCategoryUrl("Creative Coding");  // "/sketches/category/Creative%20Coding"

// Get all tags
const tags = getAllTags(sketches);

// Generate tag URL
const tagUrl = getTagUrl("generative");  // "/sketches/tag/generative"
```

This pattern ensures consistent handling of categories and tags throughout the application, making it easier to maintain and extend the sketch organization system.

## Sketch Category and Tag Pages Pattern

### Overview

The sketch system includes dedicated pages for browsing sketches by category and tag. These pages use consistent URL structures and share common components for displaying sketch cards.

### URL Structure

- Categories: `/sketches/category/[category]`
- Tags: `/sketches/tag/[tag]`

### Implementation Details

1. **Static Path Generation**:
   ```typescript
   // For categories
   export async function getStaticPaths() {
     const sketches = await getCollection("sketches");
     const categories = getAllCategories(sketches);
     
     return categories.map(category => ({
       params: { category: encodeURIComponent(category) },
       props: { 
         category,
         sketches: sketches.filter(sketch => sketch.data.category === category)
       }
     }));
   }

   // For tags
   export async function getStaticPaths() {
     const sketches = await getCollection("sketches");
     const tags = getAllTags(sketches);
     
     return tags.map(tag => ({
       params: { tag: encodeURIComponent(tag) },
       props: { 
         tag,
         sketches: sketches.filter(sketch => sketch.data.tags?.includes(tag))
       }
     }));
   }
   ```

2. **Common Components**:
   - Uses `Card` components from Starwind UI
   - Consistent layout with title, description, tags, and date
   - Proper URL encoding for special characters

3. **URL Handling**:
   - Uses `encodeURIComponent` for URL parameters
   - Consistent URL generation with utility functions
   - Proper linking between related content

### Key Features

- Consistent URL structure across category and tag pages
- Proper handling of special characters in URLs
- Reusable components for sketch display
- Type-safe implementation with TypeScript
- Static generation for optimal performance

### Usage Example

```astro
<Card>
  <CardHeader>
    <CardTitle>
      <a href={getSketchFullUrl(sketch)} class="hover:text-primary">
        {sketch.data.title}
      </a>
    </CardTitle>
    <CardDescription>{sketch.data.description}</CardDescription>
  </CardHeader>
  <CardContent>
    <div class="flex flex-wrap gap-2">
      {sketch.data.tags?.map(tag => (
        <Badge variant="secondary">
          <a href={`/sketches/tag/${encodeURIComponent(tag)}`}>
            {tag}
          </a>
        </Badge>
      ))}
    </div>
  </CardContent>
</Card>
```

This pattern ensures consistent handling of sketch categorization and tagging throughout the application.

### URL Formatting

The sketch system uses a consistent URL formatting approach for categories and tags:

1. **URL Format Rules**:
   - Convert to lowercase
   - Replace spaces with dashes
   - Remove special characters
   - Handle multiple consecutive spaces/dashes
   - Ensure URL-safe encoding

2. **Core Functions**:
   ```typescript
   // Format text for URLs (e.g., "Web Development" -> "web-development")
   formatForUrl(text: string): string

   // Slugify with URL encoding (e.g., "Web Development" -> "web-development")
   slugify(name: string): string

   // Un-slugify (e.g., "web-development" -> "Web Development")
   unslugify(slug: string): string
   ```

3. **URL Generation**:
   ```typescript
   // Get category URL
   getCategoryUrl(category: string): string  // "/sketches/category/web-development"

   // Get tag URL
   getTagUrl(tag: string): string  // "/sketches/tag/javascript"
   ```

4. **Implementation Example**:
   ```typescript
   // In [category].astro
   export async function getStaticPaths() {
     const sketches = await getCollection("sketches");
     const categories = getAllCategories(sketches);
     
     return categories.map(category => ({
       params: { category: slugify(category) },  // URL-safe, lowercase with dashes
       props: { category }  // Original category name preserved
     }));
   }
   ```

This ensures consistent URL formatting across the application while maintaining readable original names in the UI.

## Pagination Pattern

The website uses a consistent pagination pattern across different content sections, implemented using Starwind UI components.

### Core Features:

1. **Section-Aware Navigation**:
   ```typescript
   <Pagination
     prevUrl={prevUrl}
     nextUrl={nextUrl}
     currentPage={currentPage}
     totalPages={totalPages}
     baseUrl="/section"
   />
   ```
   - Maintains consistent URLs for different sections (blog, sketches, etc.)
   - Correctly links to section-specific pages

2. **Smart Page Display**:
   - Always shows first and last page numbers
   - Displays current page and adjacent pages for context
   - Adds ellipsis (...) for skipped ranges
   - Highlights current page with active styling
   
3. **Responsive Implementation**:
   - Same component works across all device sizes
   - Prev/Next buttons for sequential navigation
   - Numbered pages for direct access to specific pages

### Usage Pattern:

1. **URL Calculation**:
   ```typescript
   // For first page of section
   const prevUrl = null;
   const nextUrl = totalPages > 1 ? `/section/page/2` : null;
   
   // For subsequent pages
   const prevUrl = currentPage > 1 
     ? currentPage === 2 
       ? "/section" 
       : `/section/page/${currentPage - 1}` 
     : null;
   const nextUrl = currentPage < totalPages 
     ? `/section/page/${currentPage + 1}` 
     : null;
   ```

2. **Component Implementation**:
   - Based on Starwind UI pagination components
   - Extended with section-aware URL generation
   - Configurable baseUrl for different content sections
   - Smart handling of first page URL (no /page/1 in URL)

### Page Structure:

- Root page: `src/pages/section/index.astro`
- Paginated pages: `src/pages/section/page/[page].astro`
- Both use the same Pagination component with appropriate props
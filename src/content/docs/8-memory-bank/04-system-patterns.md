---
title: System Patterns
description: Architecture, key technical decisions, design patterns, and components.
pubDate: 250408
draft: 0
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
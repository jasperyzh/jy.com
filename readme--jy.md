# jy.com

> Personal website and blog built with Astro.js, featuring a portfolio, blog posts (synced from Obsidian), interactive components, and custom documentation. The site serves as both a professional showcase and a platform for sharing technical knowledge.

## Core Philosophy (KISE Framework)

**Keep It Simple, Essential (KISE)** - Actively identify non-essentials and remove them.

### The 5 Non-Negotiable Rules

1. **Vanilla-First:** Strictly **NO** UI frameworks (React, Vue, Svelte) unless impossible to avoid. Use Vanilla JS.
2. **Colocation:** Keep logic, template, and styles inside the single `.astro` file.
3. **Documentation:** Every file must start with a comment block (Purpose, Props, Usage).
4. **CSS:** Default to Semantic CSS with Custom Properties. Use Tailwind *only* for layout utilities (grid, flex).
5. **Type Safety:** Strict TypeScript. Centralize types in `src/types/`.

### Coding Patterns

**Component Structure (.astro)**
```astro
---
/**
 * Component Name
 * Description: Brief description.
 * Usage: <Component prop="val" />
 */
import type { HTMLAttributes } from 'astro/types';

interface Props extends HTMLAttributes<'div'> {
  title: string;
}

const { title, ...rest } = Astro.props;
---

<div class="card--" {...rest}>
  <h2>{title}</h2>
</div>

<style>
  .card-- {
    background: var(--color-surface);
  }
</style>
```

**CSS Data-Variant Pattern (Preferred over .class--mod)**
```css
/* ✅ DO THIS */
.card--[data-variant="red"] {
  --bg: var(--color-red);
}

/* ❌ NOT THIS */
.card--red { ... }
```

**API Route (Hybrid Mode)**
```typescript
import type { APIRoute } from 'astro';

export const prerender = false; // Required for API

export const GET: APIRoute = async ({ request }) => {
  return new Response(JSON.stringify({ success: true }), { status: 200 });
};
```

## Getting Started

**Prerequisites:** Node.js (v18+ recommended), npm

**Installation:**
1. Clone the repository: `git clone [repository-url] && cd jy--`
2. Install dependencies: `npm install`

**Running the Project:**
- **Development:** `npm run dev` (available at `http://localhost:4321`)
- **Production Build:** `npm run build` (output in `dist/` directory)

## Technology Stack

- **Framework:** Astro.js (v5.15.5)
- **Styling:** Classless CSS by default, Tailwind CSS v4.1.17 with `@tailwindcss/vite` for layout utilities, Starwind (similar to shadcn/ui) for unique components
- **Language:** TypeScript
- **Interactivity:** Vanilla JS, Vue.js (v3.5.23) for specific experiments
- **Icons:** Tabler Icons
- **Key Libraries:**
  - `@tailwindcss/forms` (^0.5.10)
  - `tailwind-variants` (^3.1.1)
  - `tailwind-merge` (^3.4.0)
  - `tw-animate-css` (^1.4.0)
- **Host:** Cloudflare Pages
- **CI/CD:** Cloudflare Pages (auto-deploy on push to `main` branch)
- **Custom Domain:** `jasperyong.com`

## Project Structure

```
/
├── public/                    # Static assets
│   └── assets/
│       └── Blog__/            # Blog assets (symlink to Obsidian Journal__/Blog__)
├── src/
│   ├── components/            # UI components
│   │   ├── starwind/          # Starwind UI component library (Badge, Button, Card, Input, Label, Pagination, Select, Switch)
│   │   └── ...                # Project-specific components (VoiceRecorder, blog components, tools, etc.)
│   ├── layouts/               # Base page layouts (Layout.astro, LayoutBase.astro, SiteHeader.astro, SiteFooter.astro)
│   ├── pages/                 # Site pages
│   │   ├── blog/              # Blog pages (index, pagination, tag pages)
│   │   ├── exp--practices/    # Experiment pages and practices
│   │   ├── exp--template/     # Template pages
│   │   └── ...                # Other pages (dailies, resume, toolstack, etc.)
│   ├── styles/                # Global styles
│   │   ├── starwind--.css     # Starwind theme configuration
│   │   ├── tailwind--.css     # Tailwind directives
│   │   └── tailwind--jy.css   # Project-specific Tailwind config
│   ├── types/                 # TypeScript type definitions (blog.ts, components.ts, config.ts, index.ts)
│   └── util/                  # Utility functions (util--blog.ts, util--date.ts, etc.)
├── astro.config.mjs           # Astro configuration
└── package.json               # Dependencies and scripts
```

**Content Management:**
- Blog content synced from Obsidian `Journal__/Blog__` directory (via `JOURNAL_PATH` env variable)
- Blog assets: `public/assets/Blog__` is a symlink to Obsidian `Journal__/Blog__` directory (for future reference)
- Single source of truth for project content from 'Journal__'
- Easy editing within Obsidian.md with automatic sync

## Development Conventions

- **One File, One Feature:** Each distinct piece of functionality or page is encapsulated in its own `.astro` file in the `src/pages` directory
- **Colocation:** Logic, template, and styles are scoped within their respective `.astro` files
- **Directory-Based Organization:** Experiments are grouped into directories within `src/pages`
- **Component Reusability:** Common UI patterns are abstracted into the `starwind` component library
- **Naming Conventions:**
  - Files: `kebab-case` (e.g., `page-header.astro`)
  - Specialized: Double-dash (e.g., `util--blog.ts`, `tailwind--jy.css`)
  - Components: PascalCase imports
- **Path Aliases:** `@/` aliases to `src/`

## Features

- **Obsidian Notes Integration:** Single source of truth for project content, easy editing, automatic sync
- **Component & Template System:** Practice and maintain reusable vanilla components and learning via Starwind
- **Dynamic Indexing:** Automatic discovery and listing of experiments and pages
- **Starwind UI System:** Comprehensive set of UI components providing consistent design language
- **Creative Coding:** Includes sketches, templates, and experiments (voice recording, creative coding, etc.)

## Todos

- [ ] [[251104-astro_js infinite lazyloading vue js sketches]] - want to load sketches dynamically
- [ ] **Social Sharing:** Integrated a simple feature for flexible social sharing on blog articles
- [ ] **Component Showcase:** Create a dedicated page to showcase all Starwind components in action (like a Storybook)
- [ ] **Experiment Details:** Add a metadata schema (e.g., in frontmatter) for experiments to provide descriptions and tags on the index page
- [ ] **CSS Cleanup:** Consolidate `src/styles/starwind--.css` into a clean Tailwind v4 theme configuration
- [ ] **Testing:** Add unit tests for complex logic like `VoiceRecorder.js` or the dynamic routing in `index.astro`
- [ ] **Type Safety:** Consider migrating key components or logic to TypeScript for better maintainability

## Changelog

- [251125] Consolidated READMEs, integrated KISE framework, updated project structure
- [250812] Rework and simplify the objective of this project
- [240413] Added generative thumbnails system with SVG-based OG images
- [240408] Implemented Memory Bank system for better AI context management
- [240405] Switched to Substack for social media posting integration
- [240402] Enhanced CSS structure with variables and semantic classes

---

*Project improves and iterates over time. Only expand with new features when needed. Keep it simple, essential.*

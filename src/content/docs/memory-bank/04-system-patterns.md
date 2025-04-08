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

## Anti-Patterns
```caution
- Inline styles → Breaks: Consistent theming and maintenance
  - Exception Cases: One-off demos, temporary prototypes
- Direct DOM manipulation → Breaks: Vue's reactivity system
  - Exception Cases: Canvas/WebGL interactions, performance-critical animations
- Large JS bundles → Breaks: Initial load performance
  - Exception Cases: Interactive demos that require significant client-side code
```

## Cross-Cutting Concerns
```global-rules
- Error Handling: Graceful degradation with fallback UI components
- Data Flow: Unidirectional where possible, Astro props for static data, Vue state for dynamic
- Accessibility: WCAG AA compliance, keyboard navigation, semantic HTML structure
- Performance: Lazy-loading for images and non-critical components, code splitting
```

## Core Components
```components
- CardComponent: Reusable display card with customizable content, actions, and styling
- ContentBlock: Container for markdown-rendered content with standardized styling
- NavigationMenu: Site navigation with responsive behavior
- Memory Bank: Documentation system for both human and AI reference
```
```

---
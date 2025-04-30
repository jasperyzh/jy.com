---
title: Tech Context
description: Technologies, setup, constraints, dependencies, and development environment.
pubDate: 250408
draft: 1
---

### **5. `techContext.md` (Toolbox)**
```markdown
# TECH CONTEXT
<!-- RUN `./validate_tech_context.sh` AFTER EDITS -->

## Core Stack
```stack
- Frontend: Astro.js only, with Vue3 as exception for component interactivity
- CSS: Barebone TailwindCSS with custom semantic classes and Starwind
- Content: Markdown/MDX with Astro Content Collections
- Analytics: Google Analytics (G-LQ2S4M9E6S)
```

## CSS Architecture
```css-architecture
- Base: TailwindCSS with custom theme extension
- Components: Starwind UI for consistent, accessible UI elements
- Global Variables: CSS custom properties for typography, spacing, colors
- Theme Configuration: Extended theme in tailwind.config.js
- Base Elements: Styled via global.css with CSS variables
- Components: Focus on layout and component-specific styling
- Dark Mode: Class-based strategy with CSS variables
- Utility Class Strategy: Use Tailwind utilities → semantic classes → custom CSS (in that order)
```

## Starwind UI Components
```starwind-components
- Pagination: Implemented with baseUrl parameter for section-aware links
- Button: Used for primary and secondary actions
- Badge: Used for status indicators and tags
- Card: Base for blog post and sketch cards
- Other components to be implemented as needed
```

## Additional Libraries
```libraries
- tone.js: Audio processing for interactive demos (sketches only)
- pixi.js: 2D graphics and visualizations (sketches only)
- three.js: 3D graphics and WebGL effects (sketches only)
- canvas-sketch: Creative coding experiments (sketches only)
```

## Dev Environment
```setup
1. Bootstrap: `npm install && npm run dev` 
2. Development URL: http://localhost:4321
3. Critical ENV Vars:
   - None required for local development
4. Scripts:
   - `scripts/copy-blog-docs-posts.sh`: Syncs Obsidian content
   - `scripts/copy-projects-readme-to-obsidian.sh`: Updates Obsidian with project data
   - `scripts/generate-og-images.mjs`: Generates OG images for content collections
```

## Testing Matrix
```test-rules
- Needed: Link validation for 404 checks
- Accessibility: WCAG AA compliance testing
- Performance: Lighthouse scores minimum 90
```

## Deployment
```deploy
- Host: GitHub Pages
- CI/CD: GitHub Actions (configured in .github/workflows)
- Frequency: Auto-deploy on merge to main branch
- Custom Domain: jasperyong.com
```

## Browser Support
```browser-support
- Modern Evergreen Browsers: Full support
- IE11: Not supported
- Mobile: Responsive design for iOS Safari, Chrome Android
```

## Performance Targets
```performance
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.0s
- Total Bundle Size: < 200KB (excluding images)
- Largest Contentful Paint: < 2.5s
```
```

---

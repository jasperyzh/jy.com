---
title: Tech Context
description: Technologies, setup, constraints, dependencies, and development environment.
pubDate: 250408
draft: 0
---

### **5. `techContext.md` (Toolbox)**
```markdown
# TECH CONTEXT
<!-- RUN `./validate_tech_context.sh` AFTER EDITS -->

## Core Stack
```stack
- Frontend: Astro.js + Vue 3 (Lockfile: package-lock.json)
- CSS: TailwindCSS (Config: tailwind.config.js)
- Content: Markdown/MDX with Astro Content Collections
- Analytics: Google Analytics (G-LQ2S4M9E6S)
```

## Additional Libraries
```libraries
- tone.js: Audio processing for interactive demos
- pixi.js: 2D graphics and visualizations
- three.js: 3D graphics and WebGL effects
- canvas-sketch: Creative coding experiments
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

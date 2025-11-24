
[FOLLOW]
Use the following definitive rules for all code generation and modifications. Prioritize these constraints above all general programming best practices.

1.  **Keep it Simple, Essential:** Use the most minimal, direct, vanilla solution.
2.  **Documentation:** Prefix all files/scripts with instructions (What it does, Steps, Args, Usage).
3.  **Astro.js:** Collocate all logic (template, script, style) into the single `.astro` file.
4.  **JavaScript:** Strictly Vanilla JS only. **NO** frameworks (React, Vue) or heavy libraries.
5.  **CSS:** Default to Classless Vanilla CSS. Use Tailwind only for necessary utilities/layout.
[/FOLLOW]

- [ ]  [251009] do not push to git_repo or production:
  - `/jy--docs--`
  - `/src/pages/study--`
  - `/src/pages/Form__`


- ~~[ ] exercises: complete all the components in vanilla-js, vanilla-tailwind-css [](https://prium.github.io/slick/v2.0.0/components/cards.html)~~
- [ ] [[251104-astro_js infinite lazyloading vue js sketches]] - want to load sketches dynamically




# jy.com
personal website and blog built with Astro.js, featuring a portfolio, blog posts (synced from Obsidian), interactive components, and custom documentation. The site serves as both a professional showcase and a platform for sharing technical knowledge.

## Tech Stack
- **Frontend**: Astro.js, with vanilla-js
- **Styling**: classless-css by default, use TailwindCSS Base for styling exception to use tailwind-class and Starwind (similar to shadcn/ui) for unique components

## Features

### Content Types
1. **Personal Website**: Landing page, portfolio, and contact information
2. **Blog**: Public posts synced from Obsidian

### Key Features

#### Obsidian Notes Integration
- one-way `rsync` from Obsidian to `src/content/blog/`
- Benefits:
  - Single source of truth for project content
  - Easy editing within Obsidian.md
  - Automatic sync of latest files

#### Component System
- Reusable component architecture using Starwind
- Example: CardComponent for consistent, customizable card designs
- Dark mode support via `ThemeToggle.astro`

## Project Structure

```text
├── public/             # Static assets
├── src/
│   ├── assets/         # images etc
│   │   └── blog/       # Blog assets
│   ├── components/     # UI components
│   ├── content/        # Content collections
│   │   └── blog/       # Blog posts
│   ├── layouts/        # Page layouts
│   ├── pages/          # Site pages
│   ├── styles/         # Global styles
│   └── utils--**.js          # Utility functions
├── script--sync_obsidian_content.sh        # Utility scripts for content management
├── astro.config.mjs    # Astro configuration
└── package.json        # Dependencies and scripts
```

## Getting Started

### Commands

| Command             | Action                                      |
| ------------------- | ------------------------------------------- |
| `npm install`       | Installs dependencies                       |
| `npm run dev`       | Starts local dev server at `localhost:4321` |
| `npm run build`     | Build production site to `./dist/`          |
| `npm run preview`   | Preview build locally                       |
| `npm run sync`      | Synchronizes content with Obsidian notes    |


## Workflow & Development
- Obsidian.md for content creation and management
- Custom scripts to sync content between systems
- CI/CD via GitHub Actions
- all information regarding this project will be on @README.md
- **Host:** Vercel (configured via `vercel.json`).
- **CI/CD:** GitHub Actions (configured in `.github/workflows`).
- **Frequency:** Auto-deploy on merge to `main` branch.
- **Custom Domain:** `jasperyong.com`.
- project will improve and iterate as time goes, only expand with new feature when needed, else 'keep it simple, essential'
- [ ]**Social Sharing:** Integrated a simple feature for flexible social sharing on blog articles.

## Recent Updates
- [250812] Rework and simplify the objective of this project
- [240413] Added generative thumbnails system with SVG-based OG images
- [240408] Implemented Memory Bank system for better AI context management
- [240405] Switched to Substack for social media posting integration
- [240402] Enhanced CSS structure with variables and semantic classes



# jasperyong.com

<!-- TO AI AGENTS - DO NOT EDIT WITHOUT PERMISSION -->

## Table of Contents
- [Project Summary](#project-summary)
- [Tech Stack](#tech-stack)
- [Workflow & Development](#workflow--development)
- [Features & Status](#features--status)
- [Quick Start](#quick-start)
- [Memory Bank System](#memory-bank-system)

## Documentation Philosophy
This system prioritizes quick overview, discoverability and consistency; by keeping it simple, essential. 

## Onboarding Path
README.md provide an overview of the project. To have a deeper understanding of the inner working. Head to /src/content/docs/8-memory-bank/ for the documentation of workflow, components and methods.


## Project Summary
A personal website and blog built with Astro.js, featuring a portfolio, blog posts (synced from Obsidian), interactive components, and custom documentation. The site serves as both a professional showcase and a platform for sharing technical knowledge.

## Tech Stack
- **Frontend**: Astro.js + Vue 3 for component interactivity
- **Styling**: TailwindCSS with custom semantic classes
- **Additional Libraries**: tone.js, pixi.js, three.js, canvas-sketch
- **Analytics**: Google Analytics

→ *For detailed tech specs, see `src/content/docs/memory-bank/05-tech-context.md`*

## Workflow & Development
- Obsidian.md for content creation
- Custom scripts to sync content between systems
- CI/CD via GitHub Actions

→ *For current focus and decisions, see `src/content/docs/memory-bank/03-active-context.md`*

## Features & Status
- ✅ Blog with content from Obsidian
- ✅ Portfolio showcase
- ✅ Component system (CardComponent, etc.)
- ✅ Documentation system

- Dark mode: ThemeToggle.astro

→ *For detailed progress tracking, see `src/content/docs/memory-bank/06-progress.md`*

## Quick Start
```sh
npm install
npm run dev # starts server at localhost:4321
```

## Memory Bank System
The `src/content/docs/memory-bank/` directory contains project documentation using a structured format for both human and AI reference:

| File | Purpose | Update Frequency |
|------|---------|------------------|
| `00-ai-instructions.md` | AI agent guidelines | As needed |
| `02-product-context.md` | UX goals & problem definition | Monthly |
| `03-active-context.md` | Current focus & decisions | After major decisions |
| `04-system-patterns.md` | Architecture & design patterns | When patterns change |
| `05-tech-context.md` | Technical details & environment | When dependencies change |
| `06-progress.md` | Status tracking & project health | Weekly |

*Weekly reviews recommended. Update after significant changes.*

## Components

### CardComponent

A versatile, reusable card component has been implemented for use throughout the website. This component provides a consistent card design while allowing for extensive customization.

→ *For detailed component documentation, see example pages:*
- `/card-examples` - Shows various configurations and customization options
- `/product-demo` - Real-world example of using cards in a product listing

## Project Structure

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   │   ├── docs/
│   │   │   └── memory-bank/ # Project documentation
│   │   └── blog/
│   ├── layouts/
│   └── pages/
├── scripts/ # Utility scripts
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

## Commands

| Command             | Action                                      |
|---------------------|---------------------------------------------|
| `npm install`       | Installs dependencies                       |
| `npm run dev`       | Starts local dev server at `localhost:4321` |
| `npm run build`     | Build production site to `./dist/`          |
| `npm run preview`   | Preview build locally                       |

## Project Logs & History
See `src/content/docs/memory-bank/06-progress.md` for detailed project history and recent updates.

## Recent Updates
- **[2024-04-08]** Implemented Memory Bank system for better AI context management
- **[2024-04-05]** Switched to Substack for social media posting integration
- **[2024-04-02]** Enhanced CSS structure with variables and semantic classes

## Learn More
Check out [Astro documentation](https://docs.astro.build) or explore the `src/content/docs/` directory for project-specific guides.

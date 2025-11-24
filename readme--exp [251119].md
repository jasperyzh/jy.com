# exp--: Home of My Experiments

> **A dynamic collection of creative coding experiments, UI components, and web sketches built with Astro and Tailwind CSS.**

---

## Core Philosophy & Approach

This project serves as a playground for web experimentation, adhering to a philosophy of modularity and modern simplicity. It leverages the power of Astro for component-based architecture while keeping the output lightweight and performant.

-   **Exploration First:** A space to prototype ideas, from voice recorders to creative coding sketches.
-   **Component-Driven:** Extensive use of reusable UI components (Starwind) to maintain consistency and speed up development.
-   **Modern Tooling:** Built on the bleeding edge with Tailwind CSS v4 and Astro 5.

## Technology Stack

-   **Framework:** [Astro](https://astro.build/) (v5.15.3)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/) (v4.1.17) with `@tailwindcss/vite`
-   **UI Library:** Starwind (Custom Tailwind-based component library)
-   **Interactivity:** Vanilla JS, [Vue.js](https://vuejs.org/) (v3.5.23)
-   **Icons:** Tabler Icons
-   **Key Libraries:**
    -   `embla-carousel` for carousels
    -   `tw-animate-css` for animations

## Project Structure

```
/
├── public/               # Static assets
├── src/
│   ├── components/       # Reusable components
│   │   ├── starwind/     # Starwind UI component library (Buttons, Cards, Inputs, etc.)
│   │   └── ...           # Other project-specific components (VoiceRecorder, etc.)
│   ├── layouts/          # Base page layouts (Layout.astro, LayoutArticle.astro)
│   ├── pages/            # Project pages and experiments
│   │   ├── index.astro   # Dynamic entry point listing all experiments
│   │   └── ...           # Individual experiment pages
│   └── styles/           # Global styles
│       ├── starwind.css  # Starwind theme configuration
│       └── tailwind--.css # Tailwind directives
├── astro.config.mjs      # Astro configuration
└── package.json          # Dependencies and scripts
```

## Getting Started

### Prerequisites

-   Node.js (v18+ recommended)
-   npm

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [repository-url]
    cd exp--
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```

### Running the Project

-   **Development:**
    ```bash
    npm run dev
    ```
    Visit `http://localhost:4321` to see the dynamic index of experiments.

-   **Production Build:**
    ```bash
    npm run build
    ```

## Key Features

-   **Dynamic Indexing:** The `src/pages/index.astro` automatically discovers and lists all available experiments and pages, organizing them by directory.
-   **Starwind UI System:** A comprehensive set of UI components (Accordion, Alert, Badge, Button, Card, etc.) located in `src/components/starwind`, providing a consistent design language.
-   **Voice Recording:** Includes a `VoiceRecorder.js` and `VoiceRecorderUI.js` demonstrating browser audio capabilities.
-   **Creative Coding:** Includes sketches and templates for creative coding experiments.

## Development Conventions

-   **Directory-Based Organization:** Experiments are grouped into directories within `src/pages`.
-   **Scoped Styling:** Uses Tailwind CSS for utility-first styling, with custom theme variables defined in `src/styles/starwind.css`.
-   **Component Reusability:** Common UI patterns are abstracted into the `starwind` component library.

## Suggestions & Roadmap

### Documentation Improvements
-   [ ] **Component Showcase:** Create a dedicated page to showcase all Starwind components in action (like a Storybook).
-   [ ] **Experiment Details:** Add a metadata schema (e.g., in frontmatter) for experiments to provide descriptions and tags on the index page.

### Project Direction
-   [ ] **CSS Cleanup:** The `src/styles/starwind.css` contains some commented-out legacy code and `@theme inline` blocks. Consolidate these into a clean Tailwind v4 theme configuration.
-   [ ] **Testing:** Add unit tests for complex logic like `VoiceRecorder.js` or the dynamic routing in `index.astro`.
-   [ ] **Type Safety:** Consider migrating key components or logic to TypeScript for better maintainability.
-   [ ] **Asset Organization:** As the number of experiments grows, consider a more structured approach for assets (e.g., `public/experiments/[experiment-name]/`).

---

*Generated on 2025-11-19 based on project analysis.*

# Development Commands

## Build & Run
- `npm run dev` - Start dev server with file reading permissions
- `npm run build` - Build production site to ./dist/ (runs copy-blog-posts.sh first)
- `npm run preview` - Preview built site locally
- `npm run check` - Run type checking with Astro

## Testing
- No automated tests found in the project

## Linting
- No explicit linting commands, but uses prettier-plugin-astro

# Content Management

## Blog Content
- Blog posts are loaded from `/home/matsu/Documents/_note/_note/blog/` in development
- For production builds, posts are copied to `src/content/blog/` via the copy-blog-posts.sh script
- Content config switches paths based on environment using `import.meta.env.DEV`
- Blog posts use YYMMDD format for dates (e.g., 250217 = Feb 17, 2025)
- A custom `formatYymmddDate()` utility function in `src/utils/formatDate.ts` handles date parsing

# Code Style Guidelines

## Imports & Aliases
- Use `@/` for src directory imports via the tsconfig.json path alias
- Group imports by type: standard library, external libraries, internal modules

## Formatting
- Use 2 space indentation
- Follow Astro's conventions for component structure
- Use semicolons for statement termination

## TypeScript
- Project extends "astro/tsconfigs/base" with strictNullChecks
- Use TypeScript types for component props and functions

## Naming Conventions
- Components: PascalCase (.astro, .vue files)
- Utilities/functions: camelCase
- Constants: UPPER_CASE or PascalCase depending on scope

## Component Structure
- Layout components in src/layouts/
- UI components in src/components/
- Pages in src/pages/ (follow Astro routing conventions)
- Content collections in src/content/

## Error Handling
- Use appropriate error handling for async operations
- Provide fallbacks for content that might not load
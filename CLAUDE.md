# CLAUDE.md - Codebase Guidelines

## Build, Lint & Test Commands
- Development: `npm run dev` - Start Astro dev server
- Build: `npm run build` - Build production site to ./dist/
- Preview: `npm run preview` - Preview built site locally
- Type check: `npm run check` - Run Astro type checking
- Test: `npm run test` - Run all Vitest tests
- Test (watch): `npm run test:watch` - Run tests in watch mode
- Single test: `npx vitest run src/utils/__tests__/tags.test.ts`
- Test pattern: `npx vitest run --testNamePattern="slugifyTag"`

## Code Style Guidelines
- **Project Structure**: Follows Astro.js conventions (components/, layouts/, pages/, content/)
- **TypeScript**: Strict null checks enabled; aliases use @/ for ./src/
- **Components**: Vue.js (.vue) for interactive elements, Astro (.astro) for static
- **Naming**: PascalCase for components (Button.astro), camelCase for functions/variables
- **Imports**: Use absolute imports via aliases: `from '@/components/Component'`
- **CSS**: Tailwind CSS with custom configuration including dark mode
- **Testing**: Tests in __tests__ directories using Vitest with Jest-like patterns
- **Content**: Uses Astro content collections for blog/microblog with Markdown/MDX

After making changes, check formatting and run type checks before committing.
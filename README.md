# jasperyong.com

additional documentation at `/docs/01-my-docuemntations`

## blog & substack



## documentation: workflow and more

`/src/pages/docs`
`/src/content/docs` - also sync with obsidian's notes




#### my workflow & frameworks

#### my note-taking methods

###### useful resources & channels
#### my tech stack
- astrojs
- tailwindcss
- vue3
- tone.js
- pixi.js
- three.js
- canvas-sketch

## portfolio / past-work / resume
Build blog to share journey.
Build personal portfolio to showcase projects and skills.

### the scripts
	`scripts/copy-blog-docs-posts.sh`
	`scripts/copy-projects-readme-to-obsidian.sh`

### + long-form articles & guides

- ape posts?


- Use **Astro** for static content like your bio, skills, and contact information.
- Integrate **Vue.js** components for interactive elements like a project gallery or testimonials slider.
- Ensure the site is responsive and accessible.

- [241205] pull all the .md blog post from obsidian into astro content collection
- [241207] try to learn bootstrap holistic; also how to customize bootstrap easily?
- [241207] just build the fucking thing.

- [ ] Blog with CMS capabilities, Rich text editor
- [ ] Comment sections & moderation
- [ ] Tagging and categorization
- [ ] search functionality
- [ ] Interactive, Showcase projects, skills, testimonials
- [ ] Blog with CMS capabilities
- [ ] Contact form with backend email service
- [ ] animated sliders
- [ ] search function for blog posts or pages

## exercises & challenge

- [x] QuizGame
- [x] Flashcards
- [x] SurveyForm



# Testing

### Add Testing to check for broken links & 404-pages

# UX: Interaction / Feedback

## get 5 feedback & comments

# UX: Dark mode

   - **Dark Mode Toggle**: Option for users to switch between light and dark themes.



### 8. **Comments System**

If you want to allow user comments on your blog, consider using third-party commenting systems.

#### Popular Commenting Options:
- **Disqus**: A popular third-party commenting platform that integrates easily but adds external scripts.
- **Staticman**: A static-site-compatible comment system that allows comments via pull requests, making it ideal for static sites like those built with Astro.js.
- **GitHub Issues**: Use GitHub Issues for comments, turning each blog post into an issue discussion.

#### Example: Embedding Disqus in Astro.js:
```astro
<script>
  var disqus_config = function () {
    this.page.url = window.location.href;
    this.page.identifier = 'post-1';
  };

  (function() {
    var d = document, s = d.createElement('script');
    s.src = 'https://your-blog.disqus.com/embed.js';
    s.setAttribute('data-timestamp', +new Date());
    (d.head || d.body).appendChild(s);
  })();
</script>
<noscript>Please enable JavaScript to view the comments.</noscript>
```

---
# UX: Pagination / Search

### 7. **Pagination and Search**

As your blog grows, you'll need to implement **pagination** and a **search feature** to improve navigation and user experience.

#### Pagination:
- Break long lists of blog posts into pages to avoid slow load times and improve readability.
- Implementing pagination in Astro.js can be done manually by creating a paginated list component or using third-party libraries.

#### Search:
- You can implement client-side search using libraries like **Lunr.js** or **Fuse.js** for fast, lightweight search functionality.
- For larger blogs, consider using an external service like **Algolia** for faster and more advanced search capabilities.

---


# Optimization / Maintenance / Additional

# CI/CD Setup

- [241126] completed github actions

# Analysis: Data Analytics

   - **Analytics Integration**: Tools like Google Analytics to track visitor behavior and site performance.
   - [241126] https://jasperyong.com: G-LQ2S4M9E6S
---


# Astro Starter Kit: Blog

```sh
npm create astro@latest -- --template blog
```

[![Open in StackBlitz](https://developer.stackblitz.com/img/open_in_stackblitz.svg)](https://stackblitz.com/github/withastro/astro/tree/latest/examples/blog)
[![Open with CodeSandbox](https://assets.codesandbox.io/github/button-edit-lime.svg)](https://codesandbox.io/p/sandbox/github/withastro/astro/tree/latest/examples/blog)
[![Open in GitHub Codespaces](https://github.com/codespaces/badge.svg)](https://codespaces.new/withastro/astro?devcontainer_path=.devcontainer/blog/devcontainer.json)

> 🧑‍🚀 **Seasoned astronaut?** Delete this file. Have fun!

![blog](https://github.com/withastro/astro/assets/2244813/ff10799f-a816-4703-b967-c78997e8323d)

Features:

- ✅ Minimal styling (make it your own!)
- ✅ 100/100 Lighthouse performance
- ✅ SEO-friendly with canonical URLs and OpenGraph data
- ✅ Sitemap support
- ✅ RSS Feed support
- ✅ Markdown & MDX support

## 🚀 Project Structure

Inside of your Astro project, you'll see the following folders and files:

```text
├── public/
├── src/
│   ├── components/
│   ├── content/
│   ├── layouts/
│   └── pages/
├── astro.config.mjs
├── README.md
├── package.json
└── tsconfig.json
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

The `src/content/` directory contains "collections" of related Markdown and MDX documents. Use `getCollection()` to retrieve posts from `src/content/blog/`, and type-check your frontmatter using an optional schema. See [Astro's Content Collections docs](https://docs.astro.build/en/guides/content-collections/) to learn more.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Check out [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).


## Projects & Sketches

(list down all the projects and sketches under here, link to related obsidian notes)

- [[250403-Undo Stack Implementation]]

## logs


### [250405] discontinue; micro-blogging to social-media

-> [250405] lets cut the fats, will use substack as my main platform for socmed posting

1. post on website
2. share straight from website
3. generate seo stuff
4. How I implement it for my blog?
	1. pulling all the .md files from Obsidian.md
- [x] [241206] manage to pull post from obsidian directory!!
reference: https://chrispennington.blog/blog/

### [250404]

- [[250220-Personal Website & Blog - Organization#Blog]]

### [250402]

 1. Updated global.css to use a more organized structure with:
    - Modern CSS variables for typography, colors, and spacing
    - Component abstractions with semantic class names
    - Properly structured utility classes
    - Direct @tailwind imports instead of @import
  2. Enhanced tailwind.config.js with:
    - Extended theme variables mapped to CSS custom properties
    - Comprehensive typography configuration
    - Disabled unused core plugins for better performance
    - Added future flags for better practices
  3. Updated starwind.config.json to:
    - Connect Starwind UI components to the global CSS variables
    - Ensure consistent theming across components

  You can now use the semantic classes in your components, reducing Tailwind verbosity in templates while maintaining the full power of both systems.

## Components

### CardComponent

A versatile, reusable card component has been implemented for use throughout the website. This component provides a consistent card design while allowing for extensive customization.

#### Basic Usage

```astro
import CardComponent from "@/components/CardComponent.astro";

<CardComponent
  title="Card Title"
  description="Card description text"
  actionLink="/some-page"
  actionText="Read More"
/>
```

#### Props

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| title | string | (required) | Card title |
| description | string | undefined | Card description or subtitle |
| date | Date | undefined | Date to display |
| tags | string[] | [] | Array of tags to display as badges |
| actionLink | string | undefined | URL for the action button |
| actionText | string | "Read" | Text for the action button |
| class | string | "" | Custom CSS class for styling |
| width | string | "w-[400px]" | Width of the card |
| hasCustomContent | boolean | false | Whether to use custom content instead of default layout |
| buttonVariant | string | "default" | Button variant (default, primary, secondary, etc.) |
| showAction | boolean | true | Whether to show the action button |

#### Slots

- Default slot: Used when `hasCustomContent` is true
- `content`: Slot for adding custom content within the default card layout
- `footer`: Slot for custom footer content when `showAction` is false
- `footer-extra`: Slot for additional content in the footer next to the action button

#### Examples

Example pages demonstrating the CardComponent:
- `/card-examples` - Shows various configurations and customization options
- `/product-demo` - Real-world example of using cards in a product listing
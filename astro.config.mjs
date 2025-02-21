// @ts-check
import { defineConfig } from "astro/config";

// import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";
import { resolve } from "path";

/* 
7. Add Markdown Support (Optional) -- prismjs
If you're using Markdown files in Astro, ensure your Markdown parser adds the necessary language classes:

js
Copy
Edit
const markdownOptions = {
  remarkPlugins: [],
  rehypePlugins: [],
  syntaxHighlight: "prism",
};
In your astro.config.mjs, add this to enable syntax highlighting for code blocks. */

// https://astro.build/config
export default defineConfig({
  site: "https://jasperyong.com",
  markdown: {
    syntaxHighlight: 'prism',
    prism: {
      theme: 'twilight'
    }
  },
  // base: '/',

  integrations: [
    // mdx(),
    vue(),
    sitemap(),
  ],
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
        },
      },
    },
    resolve: {
      alias: {
        "@": resolve("./src"),
      },
    },
  },
});

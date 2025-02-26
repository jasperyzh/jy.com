// @ts-check
import { defineConfig } from "astro/config";

// import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";

import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Now you can use __dirname as needed, e.g.:
// const somePath = resolve(__dirname, 'some-folder');


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
        'photoswipe/dist/photoswipe-lightbox.esm.js': resolve(__dirname, 'node_modules/photoswipe/dist/photoswipe-lightbox.esm.js')
      },
    },
  },
});

// @ts-check
import { defineConfig } from "astro/config";

// import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import icon from "astro-icon";
import react from "@astrojs/react";

// Import our custom YouTube markdown plugin
import { remarkYouTubeEmbed } from "./src/utils/youtube-markdown-plugin.js";

import mdx from "@astrojs/mdx";

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
  output: "server",
  site: "https://jasperyong.com",
  markdown: {
    syntaxHighlight: "prism",
    remarkPlugins: [remarkYouTubeEmbed],
  },
  // base: '/',

  integrations: [// mdx(),
  // PWA integration removed
  vue(), sitemap(), icon(), react(), mdx()],
  vite: {
    plugins: [tailwindcss()],
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
        // Simplified aliases for photoswipe - this should work better with build systems
        photoswipe: resolve(__dirname, "node_modules/photoswipe"),
      },
    },
  },
  // experimental: {
  // 	svg: {
  // 		mode: "sprite",
  // 	},
  // },
});
// @ts-check
import { defineConfig } from "astro/config";

// import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
// Remove the Vercel adapter import since we're using static output

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

import icon from "astro-icon";
// import react from "@astrojs/react";

// Import our custom YouTube markdown plugin
import { remarkYouTubeEmbed } from "./src/utils/youtube-markdown-plugin.js";

import mdx from "@astrojs/mdx";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://jasperyong.com",
  markdown: {
    syntaxHighlight: "prism",
    remarkPlugins: [remarkYouTubeEmbed],
  },
  integrations: [vue(), sitemap(), icon(), /* react(), */ mdx()],
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
  }
});

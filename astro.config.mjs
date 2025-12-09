// @ts-check
import { defineConfig } from "astro/config";
import path from "path";
import { fileURLToPath } from "url";

import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
import vue from "@astrojs/vue";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// https://astro.build/config
export default defineConfig({
  output: "server", // Hybrid mode: mostly static with some server endpoints
  adapter: cloudflare(),
  site: "https://jasperyong.com",
  // markdown: {
  //   syntaxHighlight: "prism",
  // },
  integrations: [
    vue(),
    sitemap(),
    icon(),
  ],
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
        "@": path.resolve(__dirname, "./src"),
      },
    },
    
    server: {
      host: true, // Allows the server to bind to network IPs
    },
  },
});

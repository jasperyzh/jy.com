// @ts-check
import { defineConfig } from "astro/config";

// import cloudflare from "@astrojs/cloudflare";

import tailwindcss from "@tailwindcss/vite";

import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";
// import cloudflare from "npm:@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  // output: "server", // Hybrid mode: mostly static with some server endpoints
  // adapter: cloudflare(),
  site: "https://jasperyong.com",
  // markdown: {
  //   syntaxHighlight: "prism",
  // },
  integrations: [
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
        "@": "/src",
      },
    },
    
    server: {
      host: true, // Allows the server to bind to network IPs
    },
  },
});

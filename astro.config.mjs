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
    vue({
      // Vue components are client-side only, reducing server bundle size
      // Components using client:load, client:only, etc. are already optimized
    }),
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
    build: {
      // Optimize build output
      rollupOptions: {
        output: {
          // Manual chunk splitting to reduce worker size
          manualChunks: (id) => {
            // Split large dependencies into separate chunks
            if (id.includes("node_modules")) {
              // Vue runtime - separate chunk
              if (id.includes("vue") && !id.includes("vue-router")) {
                return "vue-runtime";
              }
              // Supabase client - separate chunk
              if (id.includes("supabase")) {
                return "supabase";
              }
              // Iconify packages - separate chunk (can be large)
              if (id.includes("iconify")) {
                return "iconify";
              }
              // Marked (markdown parser) - separate chunk
              if (id.includes("marked")) {
                return "marked";
              }
              // Embla carousel - separate chunk
              if (id.includes("embla")) {
                return "embla";
              }
              // Other node_modules - vendor chunk
              return "vendor";
            }
          },
        },
      },
      // Minify output
      minify: "esbuild",
      // Reduce chunk size warnings threshold
      chunkSizeWarningLimit: 1000,
    },
    server: {
      host: true, // Allows the server to bind to network IPs
    },
    // Optimize dependencies
    optimizeDeps: {
      include: ["vue"],
      exclude: ["@iconify-json/bi", "@iconify-json/devicon", "@iconify-json/logos", "@iconify-json/skill-icons", "@iconify-json/tabler"],
    },
  },
});

// @ts-check
import { defineConfig } from "astro/config";

// import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";
import AstroPWA from '@vite-pwa/astro';

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

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
    syntaxHighlight: "prism",
  },
  // base: '/',

  integrations: [
    // mdx(),
    vue(),
    sitemap(),
    AstroPWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Jasper Yong',
        short_name: 'JY',
        description: 'Jasper Yong\'s personal website and blog',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        icons: [
          {
            src: '/pwa-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
          {
            src: '/pwa-512x512.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          }
        ]
      },
      workbox: {
        navigateFallback: '/offline',
        navigateFallbackAllowlist: [/^(?!\/_image).*$/],
        globPatterns: ['**/*.{css,js,html,svg,png,ico,jpg,jpeg,md,json}'],
        runtimeCaching: [
          {
            urlPattern: ({ url }) => url.pathname.startsWith('/blog/'),
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'blog-content',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
            },
          },
          {
            urlPattern: ({ url }) => url.pathname !== '/offline',
            handler: 'NetworkFirst',
            options: {
              cacheName: 'site-pages',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              },
              networkTimeoutSeconds: 3,
            },
          },
        ],
      },
      devOptions: {
        enabled: true,
        navigateFallbackAllowlist: [/^\/$/],
      }
    }),
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
        // Simplified aliases for photoswipe - this should work better with build systems
        "photoswipe": resolve(__dirname, "node_modules/photoswipe"),
      },
    },
  },
});

// @ts-check
import { defineConfig } from "astro/config";

// Import integrations
import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import mdx from "@astrojs/mdx";
import icon from "astro-icon";

import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

// Import custom plugins
import { remarkYouTubeEmbed } from "./src/utils/youtube-markdown-plugin.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Determine if we're in production mode
const isProduction = process.env.NODE_ENV === 'production';

// https://astro.build/config
export default defineConfig({
  output: "server",
  adapter: vercel({
    // Vercel adapter options (optional)
    webAnalytics: {
      enabled: true
    },
  }),
  site: "https://jasperyong.com",
  markdown: {
    syntaxHighlight: "prism",
    remarkPlugins: [remarkYouTubeEmbed],
  },
  integrations: [vue(), sitemap(), icon(), mdx()],
  
  // Method 3: Configure build to exclude demo pages in production
  // NOTE: This approach depends on your Astro version and deployment platform
  // For Vercel, you can use build.exclude in vercel.json:
  // {
  //   "build": {
  //     "exclude": ["src/pages/demo"]
  //   }
  // }
  // Or use environment variables to control building during CI/CD
  
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
        // Simplified aliases for photoswipe
        photoswipe: resolve(__dirname, "node_modules/photoswipe"),
      },
    },
    // Define environment variables for client-side code
    define: {
      // Make NODE_ENV available in client-side code
      'import.meta.env.NODE_ENV': isProduction ? '"production"' : '"development"',
    }
  },
}); 
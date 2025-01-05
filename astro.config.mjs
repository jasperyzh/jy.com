// @ts-check
import { defineConfig } from "astro/config";

// import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import vue from "@astrojs/vue";
import { resolve } from "path";

// https://astro.build/config
export default defineConfig({
  site: "https://jasperyong.com",
  // base: '/',

  integrations: [
    // mdx(),
    vue(),
    sitemap(),
  ],
  vite: {
    resolve: {
      alias: {
        "@": resolve("./src"), // Define @ as the alias for the src directory
      },
    },
  },
  // content: {
  //   collections: {
  //     blog: {
  //       directory: "/home/gita/Documents/_note/blog", // Absolute path to your blog directory
  //     },
  //   },
  // },
});

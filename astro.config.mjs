// https://astro.build/config
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";
// import partytown from "@astrojs/partytown";
// import tailwind from "@astrojs/tailwind";
// import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  site: "https://jasperyong.com",
  base: '/',
  // experimental: {
  //   assets: true,
  //   viewTransitions: true
  // },
  integrations: [
    sitemap({
      // https://docs.astro.build/en/guides/integrations-guide/sitemap/
      filter: (page) => page !== "https://jasperyong.com/",
    }),
    // partytown(),
    // tailwind(),
    // mdx(),
  ],

  markdown: {
    drafts: true,
    shikiConfig: {
      theme: "css-variables"
    }
  },

  shikiConfig: {
    wrap: true,
    skipInline: false,
    drafts: true
  },
});


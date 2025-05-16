import { defineCollection, z } from "astro:content";

import { file, glob } from "astro/loaders"; // Not available with legacy API

import { formatYymmddDate } from "@/utils/formatDate";

// Helper function to transform Obsidian wiki image links to standard markdown
// This can be used in other parts of the application if needed
function processObsidianLinks(content) {
  if (typeof content !== 'string') return content;
  
  // Replace Obsidian image syntax ![[filename.png]] with markdown ![](/blog/images/filename.png)
  return content.replace(/!\[\[(.*?\.(?:png|jpg|jpeg|gif|svg))\]\]/g, '![](/blog/images/$1)');
}

// Define blog collection
const blog = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base:
      import.meta.env.MODE === "development"
        ? import.meta.env.BASE_OBSIDIAN_BLOG
        : "./src/content/blog",
  }),
  schema: z.object({
    title: z.string(), // The title of the post
    description: z
      .string()
      .max(
        220,
        "For best SEO results, please keep the description under 160 characters."
      ), // The description of the post with SEO-friendly character limit
    // pubDate: z.coerce.date(), // Automatically converts date strings or numbers to Date objects

    pubDate: z.preprocess(
      (arg) => formatYymmddDate(arg as string | number | Date),
      z.date()
    ),
    modDate: z
      .preprocess(
        (arg) => formatYymmddDate(arg as string | number | Date),
        z.date()
      )
      .optional(),
    draft: z
      .union([z.boolean(), z.number()])
      .transform((value) => Boolean(value))
      .default(false), // Supports both boolean and number for `draft`, defaults to false
    tags: z.union([
      z.array(z.string()),
      z.string().transform((value) =>
        value
          .split(" ")
          .filter((tag) => tag.startsWith("#"))
          .map((tag) => tag.substring(1))
      ),
    ]), // Accepts both array of strings or hashtag format
    thumbnail: z.string(), // Required thumbnail image URL or path
    // category: z.enum([
    //   "Web Development",
    //   "Workflow",
    //   "Curiosity",
    //   "Generative Art",
    // ]), // Required category from preset list
  }),
});

// Define docs collection
const docs = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base:
      import.meta.env.MODE === "development"
        ? import.meta.env.BASE_OBSIDIAN_DOCS
        : "./src/content/docs",
  }),
  schema: z.object({
    title: z.string(),
    description: z
      .string()
      .max(
        160,
        "For best SEO results, please keep the description under 160 characters."
      ),
    pubDate: z.preprocess(
      (arg) => formatYymmddDate(arg as string | number | Date),
      z.date()
    ),
    modDate: z
      .preprocess(
        (arg) => formatYymmddDate(arg as string | number | Date),
        z.date()
      )
      .optional(),
    draft: z
      .union([z.boolean(), z.number()])
      .transform((value) => Boolean(value))
      .default(false),
  }),
});

// Define portfolio collection
const portfolio = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/portfolio",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    date: z.string().or(z.date()),
    updatedDate: z.string().or(z.date()).optional(),
    thumbnail: z.string(),
    category: z.string(),
    tags: z.union([
      z.array(z.string()),
      z.string().transform(value => 
        value.split(' ')
          .filter(tag => tag.startsWith('#'))
          .map(tag => tag.substring(1))
      )
    ]), // Accepts both array of strings or hashtag format
    draft: z
      .union([z.boolean(), z.number()])
      .transform((value) => Boolean(value))
      .default(false),
    images: z.array(
      z.object({
        src: z.string(),
        width: z.number().default(1920),
        height: z.number().default(1080),
        caption: z.string().optional(),
      })
    ),
    order: z.number().optional(),
  }),
});

// Define sketches collection
const sketches = defineCollection({
  loader: glob({
    pattern: "**/*.mdx",
    base: "./src/content/sketches",
  }),
  schema: z.object({
    title: z.string(),
    description: z
      .string()
      .max(
        160,
        "For best SEO results, please keep the description under 160 characters."
      ),
    pubDate: z.preprocess(
      (arg) => formatYymmddDate(arg as string | number | Date),
      z.date()
    ),
    modDate: z
      .preprocess(
        (arg) => formatYymmddDate(arg as string | number | Date),
        z.date()
      )
      .optional(),
    category: z.string(),
    tags: z.union([
      z.array(z.string()),
      z.string().transform((value) =>
        value
          .split(" ")
          .filter((tag) => tag.startsWith("#"))
          .map((tag) => tag.substring(1))
      ),
    ]), // Accepts both array of strings or hashtag format
    status: z
      .enum(["idea", "wip", "completed", "archived"])
      .default("completed"),
    thumbnail: z.string(),
    liveUrl: z.string().optional(),
    layout: z.string().optional(),
    sketchType: z.enum(["image", "video", "p5js"]).default("image"),
    aspectRatio: z.enum(["1/1", "4/3"]).default("4/3"),
    p5jsSrc: z.string().optional(),
    videoSrc: z.string().optional(),
    draft: z
      .union([z.boolean(), z.number()])
      .transform((value) => Boolean(value))
      .default(false),
  }),
});

export const collections = { blog, docs, portfolio, sketches };

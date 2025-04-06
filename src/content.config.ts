import { defineCollection, z } from "astro:content";

import { file, glob } from "astro/loaders"; // Not available with legacy API

import { formatYymmddDate } from "@/utils/formatDate";

// Define blog collection
const ob_blog = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/blog",
  }),
  schema: z.object({
    title: z.string(), // The title of the post
    description: z
      .string()
      .max(
        160,
        "For best SEO results, please keep the description under 160 characters."
      ), // The description of the post with SEO-friendly character limit
    // pubDate: z.coerce.date(), // Automatically converts date strings or numbers to Date objects
    
    pubDate: z.preprocess(
      (arg) => formatYymmddDate(arg as string | number | Date),
      z.date()
    ),
    draft: z
      .union([z.boolean(), z.number()])
      .transform((value) => Boolean(value))
      .default(false), // Supports both boolean and number for `draft`, defaults to false
    tags: z.array(z.string()), // Now required
    thumbnail: z.string(), // Required thumbnail image URL or path
    category: z.enum([
      "Web Development", 
      "Workflow", 
      "Curiousity", 
      "Generative Art"
    ]), // Required category from preset list
  }),
});

// Define docs collection
const docs = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/docs",
  }),
  schema: z.object({
    title: z.string(),
    description: z.string().max(
      160,
      "For best SEO results, please keep the description under 160 characters."
    ),
    pubDate: z.preprocess(
      (arg) => formatYymmddDate(arg as string | number | Date),
      z.date()
    ),
    draft: z.union([z.boolean(), z.number()])
      .transform((value) => Boolean(value))
      .default(false)
  }),
});

export const collections = { ob_blog, docs };

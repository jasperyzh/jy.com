import { defineCollection, z } from "astro:content";

import { file, glob } from "astro/loaders"; // Not available with legacy API

// 3. Define your collection(s)
const ob_blog = defineCollection({
  loader: glob({
    pattern: "**/*/*.md",
    base: "/home/matsu/Documents/_note/_note/blog",
  }),
  schema: z.object({
    title: z.string(), // The title of the post
    description: z
      .string()
      .max(
        160,
        "For best SEO results, please keep the description under 160 characters."
      ), // The description of the post with SEO-friendly character limit
    pubDate: z.coerce.date(), // Automatically converts date strings or numbers to Date objects
    draft: z
      .union([z.boolean(), z.number()])
      .transform((value) => Boolean(value))
      .default(false), // Supports both boolean and number for `draft`, defaults to false
    tags: z.array(z.string()).optional(),
  }),
});

export const collections = { ob_blog };

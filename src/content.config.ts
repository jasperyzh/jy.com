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

// Define microblog collection
const microblog = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: "./src/content/microblog",
  }),
  schema: z.object({
    // Optional title since not all microblog posts need a title
    title: z.string().optional(),
    // Content type to help with filtering (text, image, video, mixed)
    contentType: z.enum(['text', 'image', 'video', 'mixed']).default('text'),
    // Media files for the post (URLs or paths to images/videos )
    media: z.array(
      z.object({
        url: z.string(),
        type: z.enum(['image', 'video']),
        alt: z.string().optional(),
        caption: z.string().optional(),
      })
    ).optional(),
    // Publication date with same formatting as blog
    pubDate: z.preprocess(
      (arg) => formatYymmddDate(arg as string | number | Date),
      z.date()
    ),
    // Draft status
    draft: z
      .union([z.boolean(), z.number()])
      .transform((value) => Boolean(value))
      .default(false),
    // Optional tags for categorization
    tags: z.array(z.string()).optional(),
    // Location information if relevant
    location: z.object({
      name: z.string(),
      coordinates: z.tuple([z.number(), z.number()]).optional(), // [latitude, longitude]
    }).optional(),
    // Allow for private posts that won't show in the public feed
    isPrivate: z.boolean().default(false),
  }),
});

export const collections = { ob_blog, microblog };

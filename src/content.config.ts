import { defineCollection, z } from "astro:content";

import { file, glob } from "astro/loaders"; // Not available with legacy API

import { parseDateYYMMDD } from "@/util/util--date";

import { ASSETS_PATH } from "./consts";

// Define blog collection
const blog = defineCollection({
  loader: glob({
    pattern: "**/*.md",
    base: ASSETS_PATH.blog,
  }),
  schema: z.object({
    thumbnail: z.string().optional(), // Required thumbnail image URL or path
    created_date: z
      .preprocess(
        (arg) => parseDateYYMMDD(arg as string | number | Date),
        z.date()
      )
      .optional(),
    title: z.string().optional(), // The title of the post
    description: z
      .string()
      .max(
        220,
        "For best SEO results, please keep the description under 160 characters."
      )
      .optional(),
    draft: z
      .union([z.boolean(), z.number()])
      .transform((value) => Boolean(value))
      .default(false),
    tags: z
      .union([
        z.array(z.string()),
        z.string().transform((value) =>
          value
            .split(" ")
            .filter((tag) => tag.startsWith("#"))
            .map((tag) => tag.substring(1))
        ),
      ])
      .optional(), // Accepts both array of strings or hashtag format
    modDate: z
      .preprocess(
        (arg) => parseDateYYMMDD(arg as string | number | Date),
        z.date()
      )
      .optional(),
  }),
});

// Load toolstack markdown files from external journal directory
const toolstack = defineCollection({
  loader: glob({
    pattern: "*.md",
    base: ASSETS_PATH.toolstack, //JOURNAL_SHARE_PATH=/home/matsu/Documents/Journal__
  }),
  schema: z.object({
    title: z.string().optional(),
    hidden: z.number().default(0),
  }),
});

export const collections = { blog, toolstack };

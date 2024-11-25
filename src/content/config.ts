import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  type: "content",
  // Type-check frontmatter using a schema
  schema: z.object({
    title: z.string(),
    description: z.string(),
    // Transform string to Date object
    pubDate: z.coerce.date(),
    updatedDate: z.coerce.date().optional(),
    heroImage: z.string().optional(),
  }),
});

// export const collections = { blog };

// https://zod.dev/ - TypeScript-first schema validation with static type inference

//   import { z, defineCollection } from "astro:content";
import { numberToDate } from "../global/Utils";

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z
      .string()
      .max(
        160,
        "For best SEO results, please keep the description under 160 characters.",
      ),
    pubDate: z.number().transform((num) => numberToDate(num)),
    // draft: z.boolean().default(false),
    draft: z.union([z.boolean(), z.number()]).default(false),
    author: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    tags: z.union([z.array(z.string()), z.string()]).default(false),
    // tags: z.array(z.string()),
  }),
});

export const collections = {
  blog,
  posts: postsCollection,
};

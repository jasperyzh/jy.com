// 1. Import utilities from `astro:content`
import { defineCollection, z } from "astro:content";

// 2. Import loader(s)
import { file, glob } from "astro/loaders"; // Not available with legacy API
// import { parse as parseToml } from "toml";
// import { parse as parseCsv } from "csv-parse/sync";

// 3. Define your collection(s)
const ob_blog = defineCollection({
  loader: glob({
    pattern: "**/*/*.md",
    base: "/home/gita/Documents/_note/blog",
  }),
  schema: z.object({
    title: z.string(), // The title of the post
    description: z
      .string()
      .max(
        160,
        "For best SEO results, please keep the description under 160 characters.",
      ), // The description of the post with SEO-friendly character limit
    pubDate: z.coerce.date(), // Automatically converts date strings or numbers to Date objects
    draft: z
      .union([z.boolean(), z.number()])
      .transform((value) => Boolean(value))
      .default(false), // Supports both boolean and number for `draft`, defaults to false
    tags: z.array(z.string()).optional(),
  }),
});

// const blog = defineCollection({
//     loader: glob({ pattern: "**/*.md", base: "./src/data/blog" }),

//     // Type-check frontmatter using a schema
//     schema: z.object({
//         // postslug: z.string(),
//         // title: z.string(),
//         // description: z.string(),
//         // // Transform string to Date object
//         // pubDate: z.coerce.date(),
//         // updatedDate: z.coerce.date().optional(),
//         // heroImage: z.string().optional(),
//         // tags

//         title: z.string(),
//         description: z
//             .string()
//             .max(
//                 160,
//                 "For best SEO results, please keep the description under 160 characters.",
//             ),
//         // pubDate: z.number().transform((num) => numberToDate(num)),
//         // pubDate: z.number(),
//         pubDate: z.coerce.date(),
//         // draft: z.boolean().default(false),
//         draft: z.union([z.boolean(), z.number()]).default(false),
//         author: z.string(),
//         image: z.object({
//             url: z.string(),
//             alt: z.string(),
//         }),
//         tags: z.union([z.array(z.string()), z.string()]).default(false),
//     }),
// });

// const dogs = defineCollection({
//     loader: file("src/data/dogs.toml", { parser: (text) => parseToml(text).dogs }),
//     schema: /*   schema: z.object({
//         id: z.string(),
//         breed: z.string(),
//         temperament: z.array(z.string()),
//       }), */
//   })

// const cats = defineCollection({
//     loader: file("src/data/cats.csv", {
//         parser: (text) =>
//             parseCsv(text, { columns: true, skipEmptyLines: true }),
//     }),

//     // Example: A cheatsheet of many common Zod datatypes

//     // ZOD readme: https://github.com/colinhacks/zod
//     schema: z.object({
//         isDraft: z.boolean(),
//         title: z.string(),
//         sortOrder: z.number(),
//         image: z.object({
//             src: z.string(),
//             alt: z.string(),
//         }),
//         author: z.string().default("Anonymous"),
//         language: z.enum(["en", "es"]),
//         tags: z.array(z.string()),
//         footnote: z.string().optional(),

//         // In YAML, dates written without quotes around them are interpreted as Date objects
//         publishDate: z.date(), // e.g. 2024-09-17

//         // Transform a date string (e.g. "2022-07-08") to a Date object
//         updatedDate: z.string().transform((str) => new Date(str)),

//         authorContact: z.string().email(),
//         canonicalURL: z.string().url(),
//     }),
// });

// can seperate these collections by passing a custom parser to the file() loader for each collection:
/* const dogs = defineCollection({
loader: file("src/data/pets.json", { parser: (text) => JSON.parse(text).dogs })
});
const cats = defineCollection({
loader: file("src/data/pets.json", { parser: (text) => JSON.parse(text).cats })
}); */

// Building a custom loader

// Inline loaders
// Loader objects

// const probes = defineCollection({
//     // `loader` can accept an array of multiple patterns as well as string patterns
//     // Load all markdown files in the space-probes directory, except for those that start with "voyager-"
//     loader: glob({
//         pattern: ["*.md", "!voyager-*"],
//         base: "src/data/space-probes",
//     }),
//     schema: z.object({
//         name: z.string(),
//         type: z.enum(["Space Probe", "Mars Rover", "Comet Lander"]),
//         launch_date: z.date(),
//         status: z.enum(["Active", "Inactive", "Decommissioned"]),
//         destination: z.string(),
//         operator: z.string(),
//         notable_discoveries: z.array(z.string()),
//     }),
// });

// Defining collection references // reference authors
/* const blog = defineCollection({
    loader: glob({ pattern: '**\/[^_]*.md', base: "./src/data/blog" }),
    schema: z.object({
      title: z.string(),
      // Reference a single author from the `authors` collection by `id`
      author: reference('authors'),
      // Reference an array of related posts from the `blog` collection by `slug`
      relatedPosts: z.array(reference('blog')),
    })
  });

  const authors = defineCollection({
    loader: glob({ pattern: '**\/[^_]*.json', base: "./src/data/authors" }),
    schema: z.object({
      name: z.string(),
      portfolio: z.string().url(),
    })
  }); */

// 4. Export a single `collections` object to register your collection(s)
// export const collections = { blog/* , dogs, probes */ };
export const collections = { /* blog, */ ob_blog };

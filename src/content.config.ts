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

// Define resume collection
const resume = defineCollection({
  type: 'data',
  schema: z.object({
    contactInfo: z.object({
      name: z.string(),
      title: z.string(),
      email: z.string(),
      website: z.string(),
      github: z.string(),
      linkedin: z.string(),
      location: z.string()
    }),
    summary: z.string(),
    professionalExperience: z.array(
      z.object({
        role: z.string(),
        company: z.string(),
        period: z.string(),
        description: z.string(),
        highlights: z.array(z.string())
      })
    ),
    keyProjects: z.array(
      z.object({
        name: z.string(),
        description: z.string(),
        highlights: z.array(z.string())
      })
    ),
    personalAchievements: z.array(z.string()),
    professionalPhilosophy: z.string(),
    technicalExpertise: z.object({
      languages: z.array(z.string()),
      frontendTechnologies: z.array(z.string()),
      backendTechnologies: z.array(z.string()),
      tools: z.array(z.string()),
      designSoftware: z.array(z.string()),
      databases: z.array(z.string())
    }),
    additionalCompetencies: z.array(z.string()),
    education: z.array(
      z.object({
        degree: z.string(),
        institution: z.string(),
        year: z.string(),
        highlights: z.array(z.string())
      })
    ),
    languages: z.array(
      z.object({
        language: z.string(),
        proficiency: z.string()
      })
    ),
    interests: z.array(z.string())
  })
});

// Define portfolio collection
const portfolio = defineCollection({
  type: 'data',
  schema: z.object({
    items: z.array(
      z.object({
        title: z.string(),
        category: z.string(),
        thumbnail: z.string(),
        images: z.array(
          z.object({
            src: z.string(),
            width: z.number(),
            height: z.number(),
            caption: z.string(),
          })
        ),
        description: z.string(),
        tags: z.array(z.string()),
        year: z.string(),
      })
    ),
    skills: z.array(
      z.object({
        category: z.string(),
        items: z.array(z.string())
      })
    ),
    projects: z.array(
      z.object({
        title: z.string(),
        description: z.string(),
        image: z.string(),
        tags: z.array(z.string()),
        demoUrl: z.string(),
        codeUrl: z.string(),
      })
    ),
  })
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
    date: z.preprocess(
      (arg) => formatYymmddDate(arg as string | number | Date),
      z.date()
    ),
    category: z.string(),
    tags: z.array(z.string()),
    status: z.enum(["idea", "wip", "completed", "archived"]).default("completed"),
    thumbnail: z.string().optional(),
    liveUrl: z.string().optional(),
  }),
});

export const collections = { ob_blog, docs, resume, portfolio, sketches };

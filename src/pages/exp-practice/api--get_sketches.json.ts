// src/pages/api/get-sketches.json.ts

export async function GET({ url }: { url: URL }) {
  // Define all available sketches with their types
  const allSketches = [
    { id: 4, type: 'sketch' },
    // { id: 5, type: 'calculator' },
    { id: 5, type: 'sketch' },
    { id: 6, type: 'sketch' },
    { id: 7, type: 'sketch' },
    // { id: 8, type: 'calculator' },
    { id: 9, type: 'sketch' },
    { id: 10, type: 'sketch' },
    // { id: 11, type: 'calculator' },
    // Add as many as you like...
  ];

  const start = parseInt(url.searchParams.get('start') || '0', 10);
  const count = parseInt(url.searchParams.get('count') || '5', 10);

  const sketchesToReturn = allSketches.slice(start, start + count);

  return new Response(JSON.stringify(sketchesToReturn), {
    status: 200,
    headers: {
      'Content-Type': 'application/json'
    }
  });
}


/* 

> "leverage with content collection or glob to pull in the components?"


Here’s an explanation of the two approaches and the recommended best practice.

  1. Astro Content Collections

   * What it's for: Content Collections are Astro's built-in system for organizing and querying content, like blog posts (.md, .mdx), author bios (.json), or product data (.yaml).
   * How it works: You define a schema (the expected data structure, like title, author, pubDate) for each collection. Astro then gives you a powerful, type-safe API (getCollection()) to fetch and work with this content.
   * Why it's *not* a fit here: Your goal is to discover and load UI components (.vue files), not content. While you could theoretically create a .json file for each sketch and put it in a collection, you would still need a separate
      mechanism to link that data to the actual Vue component file. It adds an unnecessary layer of abstraction.

  Bottom Line: Use Content Collections when you are managing data and text that will be rendered into HTML (like a blog), not for discovering component files.

  2. Vite's import.meta.glob (Best Practice)

   * What it's for: This is a feature from Vite (the build tool Astro uses) designed specifically for importing multiple files based on a directory path or pattern—exactly what you want to do.
   * How it works: You can call import.meta.glob() in your API route with a path pattern. It will scan the filesystem at build time and find all matching files. It returns an object containing references to those files, which you
     can then process and send to the client.

  Recommended Workflow

  Here is the best-practice approach using import.meta.glob:

   1. Organize Your Components: Create a dedicated directory for your dynamically-loaded sketches, for example: src/sketches/.

   2. Establish a Naming Convention: Name your component files in a way that is easy to parse. For example:
       * 01-first-sketch.vue
       * 02-another-sketch.vue
       * 03-golden-calculator.vue

   3. Modify the API Route (`get-sketches.json.ts`):
       * Inside the GET function, use import.meta.glob('/src/sketches/*.vue').
       * This will give you an object like:

   1         {
   2           '/src/sketches/01-first-sketch.vue': () => import('/src/sketches/01-first-sketch.vue'),
   3           '/src/sketches/02-another-sketch.vue': () => import(...)
   4         }
       * You can then loop over the keys of this object, parse the filenames to extract the id and type, and build the JSON array dynamically. This means whenever you add a new .vue file to the /sketches/ directory, it will
         automatically be available through your API without any changes to the API code itself.

  This approach is powerful because it's fully automated. Your file system becomes the single source of truth for which sketches are available.
*/
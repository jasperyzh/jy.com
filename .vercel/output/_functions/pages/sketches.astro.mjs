import { a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, f as addAttribute } from '../chunks/astro/server_JhCfhjtA.mjs';
import 'kleur/colors';
import { g as getCollection } from '../chunks/_astro_content_CcvLsTcQ.mjs';
import { a as $$BaseLayout } from '../chunks/BaseLayout_B3_U6PTh.mjs';
import { f as formatYymmddDate } from '../chunks/formatDate_BXD4vEtI.mjs';
export { renderers } from '../renderers.mjs';

const SKETCHES_PER_PAGE = 12;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const allSketches = await getCollection("sketches");
  const sortedSketches = allSketches.sort((a, b) => {
    const dateA = a.data.date instanceof Date ? a.data.date : new Date(a.data.date);
    const dateB = b.data.date instanceof Date ? b.data.date : new Date(b.data.date);
    return dateB.getTime() - dateA.getTime();
  });
  const totalPages = Math.ceil(sortedSketches.length / SKETCHES_PER_PAGE);
  const currentPage = 1;
  const start = 0;
  const end = start + SKETCHES_PER_PAGE;
  const paginatedSketches = sortedSketches.slice(start, end);
  const categories = [...new Set(sortedSketches.map((sketch) => sketch.data.category))];
  const allTags = sortedSketches.flatMap((sketch) => sketch.data.tags || []);
  const tags = [...new Set(allTags)].sort();
  const categoryCounts = {};
  categories.forEach((category) => {
    categoryCounts[category] = sortedSketches.filter(
      (sketch) => sketch.data.category === category
    ).length;
  });
  const tagCounts = {};
  tags.forEach((tag) => {
    tagCounts[tag] = sortedSketches.filter(
      (sketch) => sketch.data.tags && sketch.data.tags.includes(tag)
    ).length;
  });
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "title": "Sketches - Code & Design Ideas", "description": "A collection of code sketches, design experiments, and interactive demos" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="max-w-7xl mx-auto px-4 py-8"> <header class="mb-12 text-center"> <h1 class="text-4xl font-bold mb-4">Code Sketches</h1> <p class="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
A collection of code snippets, design experiments, interactive demos, and learning resources
</p> </header> <div class="grid grid-cols-1 lg:grid-cols-4 gap-8"> <!-- Filters sidebar --> <aside class="lg:col-span-1"> <div class="sticky top-24 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md border border-slate-200 dark:border-slate-700"> <h2 class="text-xl font-semibold mb-4">Filters</h2> <!-- Categories --> <div class="mb-6"> <h3 class="font-medium mb-2 text-gray-700 dark:text-gray-300">Categories</h3> <ul class="space-y-2"> ${categories.map((category) => renderTemplate`<li> <a${addAttribute(`/sketches/category/${category}`, "href")} class="flex items-center justify-between group hover:text-blue-600 dark:hover:text-blue-400"> <span>${category}</span> <span class="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded-full"> ${categoryCounts[category]} </span> </a> </li>`)} </ul> </div> <!-- Tags --> <div> <h3 class="font-medium mb-2 text-gray-700 dark:text-gray-300">Popular Tags</h3> <div class="flex flex-wrap gap-2"> ${tags.slice(0, 15).map((tag) => renderTemplate`<a${addAttribute(`/sketches/tag/${tag}`, "href")} class="inline-flex items-center text-sm bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 px-3 py-1 rounded-full"> <span>${tag}</span> <span class="ml-1 text-xs text-gray-500 dark:text-gray-400">(${tagCounts[tag]})</span> </a>`)} ${tags.length > 15 && renderTemplate`<a href="/sketches/tags" class="text-sm text-blue-600 dark:text-blue-400 hover:underline">
View all tags...
</a>`} </div> </div> </div> </aside> <!-- Sketches grid --> <div class="lg:col-span-3"> <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"> ${paginatedSketches.map((sketch) => renderTemplate`<a${addAttribute(`/sketches/${sketch.id}`, "href")} class="group bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"> ${sketch.data.thumbnail ? renderTemplate`<div class="relative h-48 overflow-hidden"> <img${addAttribute(sketch.data.thumbnail, "src")}${addAttribute(sketch.data.title, "alt")} class="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"> ${sketch.data.status && renderTemplate`<span${addAttribute(`absolute top-2 right-2 text-xs px-2 py-1 rounded-full ${sketch.data.status === "completed" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : sketch.data.status === "wip" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" : sketch.data.status === "idea" ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" : "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400"}`, "class")}> ${sketch.data.status.charAt(0).toUpperCase() + sketch.data.status.slice(1)} </span>`} </div>` : renderTemplate`<div class="h-48 flex items-center justify-center bg-gradient-to-br from-blue-500/20 to-purple-500/20 dark:from-blue-900/30 dark:to-purple-900/30"> <span class="text-4xl opacity-40">✨</span> ${sketch.data.status && renderTemplate`<span${addAttribute(`absolute top-2 right-2 text-xs px-2 py-1 rounded-full ${sketch.data.status === "completed" ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300" : sketch.data.status === "wip" ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300" : sketch.data.status === "idea" ? "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-300" : "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-400"}`, "class")}> ${sketch.data.status.charAt(0).toUpperCase() + sketch.data.status.slice(1)} </span>`} </div>`} <div class="p-4"> <h3 class="font-bold text-lg mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors"> ${sketch.data.title} </h3> <div class="text-sm text-gray-500 dark:text-gray-400 mb-2 flex items-center"> <i class="bi bi-calendar-event mr-1"></i> <time${addAttribute(sketch.data.date instanceof Date ? sketch.data.date.toISOString() : "", "datetime")}> ${formatYymmddDate(sketch.data.date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })} </time> </div> <p class="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2"> ${sketch.data.description} </p> <div class="flex flex-wrap gap-1 mt-auto"> ${sketch.data.tags && sketch.data.tags.slice(0, 3).map((tag) => renderTemplate`<span class="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-0.5 rounded"> ${tag} </span>`)} ${sketch.data.tags && sketch.data.tags.length > 3 && renderTemplate`<span class="text-xs text-gray-500 dark:text-gray-400">
+${sketch.data.tags.length - 3} more
</span>`} </div> </div> </a>`)} </div>  ${totalPages > 1 && renderTemplate`<div class="mt-12 flex justify-center"> <nav class="inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination"> ${currentPage > 1} ${Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => renderTemplate`<a${addAttribute(i + 1 === 1 ? "/sketches" : `/sketches/page/${i + 1}`, "href")}${addAttribute(`relative inline-flex items-center px-4 py-2 border ${i + 1 === currentPage ? "z-10 bg-blue-50 dark:bg-blue-900/30 border-blue-500 dark:border-blue-500 text-blue-600 dark:text-blue-400" : "bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"} text-sm font-medium`, "class")}> ${i + 1} </a>`)} ${currentPage < totalPages && renderTemplate`<a${addAttribute(`/sketches/page/${currentPage + 1}`, "href")} class="relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-700"> <span class="sr-only">Next</span> <i class="bi bi-chevron-right"></i> </a>`} </nav> </div>`} </div> </div> </main> ` })}`;
}, "/home/matsu/Desktop/jy/src/pages/sketches/index.astro", void 0);

const $$file = "/home/matsu/Desktop/jy/src/pages/sketches/index.astro";
const $$url = "/sketches";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  SKETCHES_PER_PAGE,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

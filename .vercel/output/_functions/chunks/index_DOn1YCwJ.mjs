import { a as createComponent, m as maybeRenderHead, d as addAttribute, b as renderTemplate, r as renderComponent, F as Fragment } from './astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import { a as $$BaseLayout, $ as $$Button } from './BaseLayout_DEWwRiOq.mjs';
import { g as getCollection } from './_astro_content_2pRhye3E.mjs';
import 'clsx';
import { s as slugifyTag } from './tags_DWAWVWDV.mjs';
/* empty css                         */
import { $ as $$Pagination } from './Pagination_Dr-R-E2N.mjs';
import { f as formatYymmddDate } from './formatDate_BXD4vEtI.mjs';
import { $ as $$Card, a as $$CardHeader, b as $$CardTitle, c as $$CardDescription, d as $$CardContent, e as $$CardFooter } from './CardTitle_Dw3GL5XI.mjs';
import { $ as $$Badge } from './Badge_DDprm9Za.mjs';

const $$TagCloud = createComponent(async ($$result, $$props, $$slots) => {
  const obPosts = await getCollection("ob_blog");
  const microPosts = await getCollection("microblog").catch(() => []);
  const allPosts = [...obPosts, ...microPosts];
  const tagCounts = allPosts.flatMap((post) => post.data.tags || []).reduce((acc, tag) => {
    acc[tag] = (acc[tag] || 0) + 1;
    return acc;
  }, {});
  const uniqueTags = Object.keys(tagCounts).sort();
  const minCount = Math.min(...Object.values(tagCounts));
  const maxCount = Math.max(...Object.values(tagCounts));
  const getFontSize = (count) => {
    const minFontSize = 12;
    const maxFontSize = 30;
    if (minCount === maxCount) return `${minFontSize}px`;
    const normalizedSize = (count - minCount) / (maxCount - minCount) * (maxFontSize - minFontSize) + minFontSize;
    return `${normalizedSize}px`;
  };
  return renderTemplate`${maybeRenderHead()}<div class="tag-cloud" data-astro-cid-6pyqhcr2> <h2 data-astro-cid-6pyqhcr2>Tags</h2> <ul data-astro-cid-6pyqhcr2> ${uniqueTags.map((tag) => renderTemplate`<li${addAttribute(tag, "key")} data-astro-cid-6pyqhcr2> <a class="position-relative"${addAttribute(`/tags/${slugifyTag(tag)}`, "href")}${addAttribute(`font-size: ${getFontSize(tagCounts[tag])};`, "style")} data-astro-cid-6pyqhcr2> ${tag}  </a> </li>`)} </ul> </div> `;
}, "/home/matsu/Desktop/jy/src/components/TagCloud.astro", void 0);

const POSTS_PER_PAGE = 6;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const allPosts = await getCollection("ob_blog");
  const sortedPosts = allPosts.sort((a, b) => {
    const dateA = formatYymmddDate(a.data.pubDate || a.data.date || /* @__PURE__ */ new Date());
    const dateB = formatYymmddDate(b.data.pubDate || b.data.date || /* @__PURE__ */ new Date());
    return dateB.getTime() - dateA.getTime();
  });
  const publishedPosts = sortedPosts.filter((post) => !post.data.draft) ;
  const totalPages = Math.ceil(publishedPosts.length / POSTS_PER_PAGE);
  const currentPage = 1;
  const start = 0;
  const end = start + POSTS_PER_PAGE;
  const paginatedPosts = publishedPosts.slice(start, end);
  const prevUrl = null;
  const nextUrl = currentPage < totalPages ? `/blog/page/${currentPage + 1}` : null;
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "title": "Blog - All Posts", "data-astro-cid-5tznm7mj": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-5tznm7mj> <section class="container mx-auto" data-astro-cid-5tznm7mj> <h1 class="mb-4" data-astro-cid-5tznm7mj>All Blog Posts</h1> <div class="container" data-astro-cid-5tznm7mj> ${renderComponent($$result2, "TagCloud", $$TagCloud, { "data-astro-cid-5tznm7mj": true })} <p data-astro-cid-5tznm7mj>
Showing ${paginatedPosts.length} of ${publishedPosts.length} posts
${totalPages > 1 && `(Page ${currentPage} of ${totalPages})`} </p> </div> <div class="container grid grid-cols-4 gap-4" data-astro-cid-5tznm7mj> ${paginatedPosts.map((post) => renderTemplate`${renderComponent($$result2, "Fragment", Fragment, { "data-astro-cid-5tznm7mj": true }, { "default": async ($$result3) => renderTemplate` ${renderComponent($$result3, "Card", $$Card, { "class": "w-[400px]", "data-astro-cid-5tznm7mj": true }, { "default": async ($$result4) => renderTemplate` ${renderComponent($$result4, "CardHeader", $$CardHeader, { "data-astro-cid-5tznm7mj": true }, { "default": async ($$result5) => renderTemplate` ${renderComponent($$result5, "CardTitle", $$CardTitle, { "data-astro-cid-5tznm7mj": true }, { "default": async ($$result6) => renderTemplate`${post.data.title}` })} ${renderComponent($$result5, "CardDescription", $$CardDescription, { "data-astro-cid-5tznm7mj": true }, { "default": async ($$result6) => renderTemplate`${formatYymmddDate(
    post.data.pubDate || post.data.date || /* @__PURE__ */ new Date()
  ).toLocaleString("default", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })}<br data-astro-cid-5tznm7mj> ${post.data.description || "No description available"}` })} ` })} ${renderComponent($$result4, "CardContent", $$CardContent, { "class": "flex flex-col gap-4", "data-astro-cid-5tznm7mj": true }, { "default": async ($$result5) => renderTemplate`<div class="card-tags mb-2" data-astro-cid-5tznm7mj> ${post.data.tags && post.data.tags.map((tag) => renderTemplate`${renderComponent($$result5, "Badge", $$Badge, { "href": `/tags/${tag}`, "data-astro-cid-5tznm7mj": true }, { "default": async ($$result6) => renderTemplate`${tag}` })}`)} </div> ` })} ${renderComponent($$result4, "CardFooter", $$CardFooter, { "class": "flex justify-between", "data-astro-cid-5tznm7mj": true }, { "default": async ($$result5) => renderTemplate` ${renderComponent($$result5, "Button", $$Button, { "href": `/blog/${post.id}`, "data-astro-cid-5tznm7mj": true }, { "default": async ($$result6) => renderTemplate`Read` })} ` })} ` })} ` })}`)} </div> </section>  ${(nextUrl) && renderTemplate`${renderComponent($$result2, "Pagination", $$Pagination, { "prevUrl": prevUrl, "nextUrl": nextUrl, "data-astro-cid-5tznm7mj": true })}`} </main> ` })} `;
}, "/home/matsu/Desktop/jy/src/pages/blog/index.astro", void 0);
const $$file = "/home/matsu/Desktop/jy/src/pages/blog/index.astro";
const $$url = "/blog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POSTS_PER_PAGE,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { $$TagCloud as $, POSTS_PER_PAGE as P, _page as _ };

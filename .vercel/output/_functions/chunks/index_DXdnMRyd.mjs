import { a as createComponent, m as maybeRenderHead, f as addAttribute, b as renderTemplate, c as createAstro, r as renderComponent } from './astro/server_JhCfhjtA.mjs';
import 'kleur/colors';
import { $ as $$Button, a as $$BaseLayout } from './BaseLayout_B3_U6PTh.mjs';
import { g as getCollection } from './_astro_content_CcvLsTcQ.mjs';
import 'clsx';
import { s as slugifyTag } from './tags_DWAWVWDV.mjs';
/* empty css                         */
import { f as formatYymmddDate } from './formatDate_BXD4vEtI.mjs';
import { $ as $$CardComponent } from './CardComponent_Ck5F_Rkp.mjs';

const $$TagCloud = createComponent(async ($$result, $$props, $$slots) => {
  const obPosts = await getCollection("ob_blog");
  const allPosts = [...obPosts];
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
  return renderTemplate`${maybeRenderHead()}<div class="tag-cloud" data-astro-cid-6pyqhcr2> <h2 data-astro-cid-6pyqhcr2>Tags</h2> <ul data-astro-cid-6pyqhcr2> ${uniqueTags.map((tag) => renderTemplate`<li${addAttribute(tag, "key")} data-astro-cid-6pyqhcr2> <a class="position-relative"${addAttribute(`/blog/tag/${slugifyTag(tag)}`, "href")}${addAttribute(`font-size: ${getFontSize(tagCounts[tag])};`, "style")} data-astro-cid-6pyqhcr2> ${tag}  </a> </li>`)} </ul> </div> `;
}, "/home/matsu/Desktop/jy/src/components/TagCloud.astro", void 0);

const $$Astro = createAstro("https://jasperyong.com");
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { prevUrl, nextUrl } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<nav aria-label="pagination"> ${prevUrl && renderTemplate`${renderComponent($$result, "Button", $$Button, { "href": prevUrl, "class": "prev" }, { "default": ($$result2) => renderTemplate`
Newer
` })}`} ${nextUrl && renderTemplate`${renderComponent($$result, "Button", $$Button, { "href": nextUrl, "class": "next" }, { "default": ($$result2) => renderTemplate`
Older
` })}`} </nav>`;
}, "/home/matsu/Desktop/jy/src/components/Pagination.astro", void 0);

const POSTS_PER_PAGE = 6;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const allPosts = await getCollection("ob_blog");
  const sortedPosts = allPosts.sort((a, b) => {
    const dateA = formatYymmddDate(a.data.pubDate || /* @__PURE__ */ new Date());
    const dateB = formatYymmddDate(b.data.pubDate || /* @__PURE__ */ new Date());
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
${totalPages > 1 && `(Page ${currentPage} of ${totalPages})`} </p> </div> <div class="container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" data-astro-cid-5tznm7mj> ${paginatedPosts.map((post) => renderTemplate`${renderComponent($$result2, "CardComponent", $$CardComponent, { "title": post.data.title, "description": post.data.description || "No description available", "date": formatYymmddDate(post.data.pubDate || /* @__PURE__ */ new Date()), "tags": post.data.tags || [], "actionLink": `/blog/${post.id}`, "actionText": "Read", "buttonVariant": "primary", "data-astro-cid-5tznm7mj": true })}`)} </div> </section>  ${(nextUrl) && renderTemplate`${renderComponent($$result2, "Pagination", $$Pagination, { "prevUrl": prevUrl, "nextUrl": nextUrl, "data-astro-cid-5tznm7mj": true })}`} </main> ` })} `;
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

export { $$TagCloud as $, POSTS_PER_PAGE as P, _page as _, $$Pagination as a };

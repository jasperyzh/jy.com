import { a as createComponent, b as renderTemplate, f as renderScript, r as renderComponent, m as maybeRenderHead } from '../chunks/astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import { a as $$BaseLayout } from '../chunks/BaseLayout_DEWwRiOq.mjs';
import { $ as $$MicroblogFeed } from '../chunks/MicroblogFeed_CfoMkwmk.mjs';
import { g as getCollection } from '../chunks/_astro_content_2pRhye3E.mjs';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const POSTS_PER_PAGE = 10;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const allMicroblogPosts = await getCollection("microblog");
  const sortedPosts = allMicroblogPosts.sort((a, b) => {
    const dateA = a.data.pubDate instanceof Date ? a.data.pubDate : /* @__PURE__ */ new Date();
    const dateB = b.data.pubDate instanceof Date ? b.data.pubDate : /* @__PURE__ */ new Date();
    return dateB.getTime() - dateA.getTime();
  });
  const publishedPosts = sortedPosts.filter((post) => !post.data.draft && !post.data.isPrivate) ;
  const totalPages = Math.ceil(publishedPosts.length / POSTS_PER_PAGE);
  const currentPage = 1;
  const start = 0;
  const end = start + POSTS_PER_PAGE;
  const paginatedPosts = publishedPosts.slice(start, end);
  const prevUrl = null;
  const nextUrl = currentPage < totalPages ? `/microblog/page/${currentPage + 1}` : null;
  return renderTemplate(_a || (_a = __template(["", "  ", ` <script>
  // Load PrismJS for syntax highlighting
  document.addEventListener('DOMContentLoaded', function() {
    // Add PrismJS CSS
    if (!document.querySelector('link[href*="prismjs"]')) {
      var prismCSS = document.createElement('link');
      prismCSS.rel = 'stylesheet';
      prismCSS.href = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-tomorrow.min.css';
      document.head.appendChild(prismCSS);
      
      // Add PrismJS script
      var prismScript = document.createElement('script');
      prismScript.src = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/prism.min.js';
      document.head.appendChild(prismScript);
      
      // Add markdown support
      var markdownScript = document.createElement('script');
      markdownScript.src = 'https://cdn.jsdelivr.net/npm/prismjs@1.29.0/components/prism-markdown.min.js';
      document.head.appendChild(markdownScript);
      
      prismScript.onload = function() {
        if (typeof Prism !== 'undefined') {
          Prism.highlightAll();
        }
      };
    }
  });
</script>`])), renderComponent($$result, "Layout", $$BaseLayout, { "title": "Microblog", "description": "Short-form updates and thoughts", "data-astro-cid-7zk3zsf7": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-7zk3zsf7> <div class="twitter-header" data-astro-cid-7zk3zsf7> <div class="header-content" data-astro-cid-7zk3zsf7> <h1 data-astro-cid-7zk3zsf7>Microblog</h1> <p class="bio" data-astro-cid-7zk3zsf7>
Quick thoughts, photos, and updates that don't warrant a full blog post
</p> </div> </div> <div class="twitter-container" data-astro-cid-7zk3zsf7> ${renderComponent($$result2, "MicroblogFeed", $$MicroblogFeed, { "posts": paginatedPosts, "currentPage": currentPage, "totalPages": totalPages, "prevUrl": prevUrl, "nextUrl": nextUrl, "data-astro-cid-7zk3zsf7": true })} </div> </main> ` }), renderScript($$result, "/home/matsu/Desktop/jy/src/pages/microblog/index.astro?astro&type=script&index=0&lang.ts"));
}, "/home/matsu/Desktop/jy/src/pages/microblog/index.astro", void 0);
const $$file = "/home/matsu/Desktop/jy/src/pages/microblog/index.astro";
const $$url = "/microblog";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POSTS_PER_PAGE,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

import { c as createAstro, a as createComponent, r as renderComponent, f as renderScript, b as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import { a as $$BaseLayout } from '../../../chunks/BaseLayout_DEWwRiOq.mjs';
import { $ as $$MicroblogFeed } from '../../../chunks/MicroblogFeed_CfoMkwmk.mjs';
import { g as getCollection } from '../../../chunks/_astro_content_2pRhye3E.mjs';
/* empty css                                        */
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://jasperyong.com");
const POSTS_PER_PAGE = 10;
async function getStaticPaths({ paginate }) {
  const allMicroblogPosts = await getCollection("microblog");
  const sortedPosts = allMicroblogPosts.sort((a, b) => {
    const dateA = a.data.pubDate instanceof Date ? a.data.pubDate : /* @__PURE__ */ new Date();
    const dateB = b.data.pubDate instanceof Date ? b.data.pubDate : /* @__PURE__ */ new Date();
    return dateB.getTime() - dateA.getTime();
  });
  const publishedPosts = sortedPosts.filter((post) => !post.data.draft && !post.data.isPrivate) ;
  return paginate(publishedPosts, { pageSize: POSTS_PER_PAGE });
}
const $$page = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$page;
  const { page } = Astro2.props;
  const { currentPage, data: posts, lastPage, url } = page;
  const prevUrl = currentPage > 1 ? url.prev : null;
  const nextUrl = currentPage < lastPage ? url.next : null;
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "title": `Microblog - Page ${currentPage}`, "description": `Microblog posts - Page ${currentPage} of ${lastPage}`, "data-astro-cid-qzwdwpq2": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container py-4" data-astro-cid-qzwdwpq2> <section data-astro-cid-qzwdwpq2> <h1 class="mb-4" data-astro-cid-qzwdwpq2>Microblog</h1> <p class="lead mb-4" data-astro-cid-qzwdwpq2>
Quick thoughts, photos, and updates - Page ${currentPage} of ${lastPage} </p> ${renderComponent($$result2, "MicroblogFeed", $$MicroblogFeed, { "posts": posts, "currentPage": currentPage, "totalPages": lastPage, "prevUrl": prevUrl, "nextUrl": nextUrl, "data-astro-cid-qzwdwpq2": true })} </section> </main> ` })}  ${renderScript($$result, "/home/matsu/Desktop/jy/src/pages/microblog/page/[page].astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/matsu/Desktop/jy/src/pages/microblog/page/[page].astro", void 0);
const $$file = "/home/matsu/Desktop/jy/src/pages/microblog/page/[page].astro";
const $$url = "/microblog/page/[page]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POSTS_PER_PAGE,
  default: $$page,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

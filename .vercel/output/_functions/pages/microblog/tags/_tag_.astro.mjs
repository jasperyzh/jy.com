import { c as createAstro, a as createComponent, r as renderComponent, f as renderScript, b as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import { a as $$BaseLayout } from '../../../chunks/BaseLayout_DEWwRiOq.mjs';
import { $ as $$MicroblogFeed } from '../../../chunks/MicroblogFeed_CfoMkwmk.mjs';
import { g as getCollection } from '../../../chunks/_astro_content_2pRhye3E.mjs';
/* empty css                                       */
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://jasperyong.com");
async function getStaticPaths() {
  const allPosts = await getCollection("microblog");
  const publishedPosts = allPosts.filter((post) => !post.data.draft && !post.data.isPrivate) ;
  const uniqueTags = [
    ...new Set(
      publishedPosts.flatMap((post) => post.data.tags || [])
    )
  ];
  return uniqueTags.map((tag) => {
    const filteredPosts = publishedPosts.filter(
      (post) => post.data.tags?.includes(tag)
    );
    const sortedPosts = filteredPosts.sort((a, b) => {
      const dateA = a.data.pubDate instanceof Date ? a.data.pubDate : /* @__PURE__ */ new Date();
      const dateB = b.data.pubDate instanceof Date ? b.data.pubDate : /* @__PURE__ */ new Date();
      return dateB.getTime() - dateA.getTime();
    });
    return {
      params: { tag },
      props: {
        posts: sortedPosts,
        tag
      }
    };
  });
}
const $$tag = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$tag;
  const { posts, tag } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "title": `Microblog - #${tag}`, "description": `Microblog posts tagged with #${tag}`, "data-astro-cid-mgrxbetv": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container py-4" data-astro-cid-mgrxbetv> <section data-astro-cid-mgrxbetv> <h1 class="mb-2" data-astro-cid-mgrxbetv>Microblog</h1> <h2 class="tag-title mb-4" data-astro-cid-mgrxbetv>Posts tagged with <span class="tag-highlight" data-astro-cid-mgrxbetv>#${tag}</span></h2> <div class="mb-4" data-astro-cid-mgrxbetv> <a href="/microblog" class="btn btn-outline-primary" data-astro-cid-mgrxbetv> <i class="bi bi-arrow-left me-1" data-astro-cid-mgrxbetv></i> All Posts
</a> </div> ${renderComponent($$result2, "MicroblogFeed", $$MicroblogFeed, { "posts": posts, "showFilters": false, "currentFilter": null, "data-astro-cid-mgrxbetv": true })} </section> </main> ` })}  ${renderScript($$result, "/home/matsu/Desktop/jy/src/pages/microblog/tags/[tag].astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/matsu/Desktop/jy/src/pages/microblog/tags/[tag].astro", void 0);
const $$file = "/home/matsu/Desktop/jy/src/pages/microblog/tags/[tag].astro";
const $$url = "/microblog/tags/[tag]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$tag,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

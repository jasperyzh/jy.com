import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../../chunks/astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import { a as $$BaseLayout } from '../../../chunks/BaseLayout_DEWwRiOq.mjs';
import { g as getCollection } from '../../../chunks/_astro_content_2pRhye3E.mjs';
import { P as POSTS_PER_PAGE, $ as $$TagCloud } from '../../../chunks/index_DOn1YCwJ.mjs';
import { $ as $$Pagination } from '../../../chunks/Pagination_Dr-R-E2N.mjs';
import { f as formatYymmddDate } from '../../../chunks/formatDate_BXD4vEtI.mjs';
/* empty css                                        */
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://jasperyong.com");
async function getStaticPaths() {
  const allPosts = await getCollection("ob_blog");
  const sortedPosts = allPosts.sort((a, b) => {
    const dateA = formatYymmddDate(a.data.pubDate || a.data.date || /* @__PURE__ */ new Date());
    const dateB = formatYymmddDate(b.data.pubDate || b.data.date || /* @__PURE__ */ new Date());
    return dateB.getTime() - dateA.getTime();
  });
  const publishedPosts = sortedPosts.filter((post) => !post.data.draft) ;
  const totalPages = Math.ceil(publishedPosts.length / POSTS_PER_PAGE);
  return Array.from({ length: totalPages }).map((_, i) => {
    const page = i + 1;
    const start = i * POSTS_PER_PAGE;
    const end = start + POSTS_PER_PAGE;
    return {
      params: { page: page.toString() },
      props: {
        posts: publishedPosts.slice(start, end),
        totalPosts: publishedPosts.length,
        currentPage: page,
        totalPages
      }
    };
  });
}
const $$page = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$page;
  const { posts, totalPosts, currentPage, totalPages } = Astro2.props;
  const prevUrl = currentPage > 1 ? `/blog/page/${currentPage - 1}` : currentPage > 2 ? "/blog" : null;
  const nextUrl = currentPage < totalPages ? `/blog/page/${currentPage + 1}` : null;
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "title": `Blog - Page ${currentPage}`, "data-astro-cid-hzrsv7ue": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-hzrsv7ue> <section class="container py-4" data-astro-cid-hzrsv7ue> <h1 class="mb-4" data-astro-cid-hzrsv7ue>All Blog Posts</h1> <div class="row mb-4" data-astro-cid-hzrsv7ue> <div class="col-md-12" data-astro-cid-hzrsv7ue> ${renderComponent($$result2, "TagCloud", $$TagCloud, { "data-astro-cid-hzrsv7ue": true })} </div> </div> <div class="row mb-4" data-astro-cid-hzrsv7ue> <div class="col-md-12" data-astro-cid-hzrsv7ue> <p class="text-muted" data-astro-cid-hzrsv7ue>
Showing ${posts.length} of ${totalPosts} posts
${totalPages > 1 && `(Page ${currentPage} of ${totalPages})`} </p> </div> </div> <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4 mb-4" data-astro-cid-hzrsv7ue> ${posts.map((post) => renderTemplate`<div class="col" data-astro-cid-hzrsv7ue> <div class="card h-100" data-astro-cid-hzrsv7ue> <div class="card-body" data-astro-cid-hzrsv7ue> <h5 class="card-title" data-astro-cid-hzrsv7ue>${post.data.title}</h5> <p class="text-muted small" data-astro-cid-hzrsv7ue> ${formatYymmddDate(post.data.pubDate || post.data.date || /* @__PURE__ */ new Date()).toLocaleDateString()} </p> <p class="card-text" data-astro-cid-hzrsv7ue> ${post.data.description || "No description available"} </p> <div class="card-tags mb-2" data-astro-cid-hzrsv7ue> ${post.data.tags && post.data.tags.map((tag) => renderTemplate`<a${addAttribute(`/tags/${tag}`, "href")} class="tag badge bg-primary me-2 text-decoration-none"${addAttribute(tag, "key")} data-astro-cid-hzrsv7ue> ${tag} </a>`)} </div> <a class="stretched-link"${addAttribute(`/blog/${post.slug}`, "href")}${addAttribute(`Read ${post.data.title}`, "aria-label")} data-astro-cid-hzrsv7ue></a> </div> </div> </div>`)} </div>  <div class="row" data-astro-cid-hzrsv7ue> <div class="col-md-12" data-astro-cid-hzrsv7ue> ${renderComponent($$result2, "Pagination", $$Pagination, { "prevUrl": prevUrl, "nextUrl": nextUrl, "data-astro-cid-hzrsv7ue": true })} </div> </div> </section> </main> ` })} `;
}, "/home/matsu/Desktop/jy/src/pages/blog/page/[page].astro", void 0);
const $$file = "/home/matsu/Desktop/jy/src/pages/blog/page/[page].astro";
const $$url = "/blog/page/[page]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$page,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

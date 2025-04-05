import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import { g as getCollection } from '../../chunks/_astro_content_2pRhye3E.mjs';
import { a as $$BaseLayout } from '../../chunks/BaseLayout_DEWwRiOq.mjs';
import { g as getAllUniqueTags, s as slugifyTag } from '../../chunks/tags_DWAWVWDV.mjs';
import { $ as $$ReturnButton } from '../../chunks/ReturnButton_EbGZ8C8R.mjs';
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://jasperyong.com");
async function getStaticPaths() {
  const blogPosts = await getCollection("ob_blog");
  const microblogPosts = await getCollection("microblog").catch(() => []);
  const allPosts = [...blogPosts, ...microblogPosts];
  const tags = getAllUniqueTags(allPosts);
  console.log("tags test", tags);
  return tags.map((tag) => ({
    params: { tag: slugifyTag(tag) },
    props: {
      tag,
      posts: blogPosts.filter((post) => post.data.tags?.includes(tag)),
      microPosts: microblogPosts.filter((post) => post.data.tags?.includes(tag))
    }
  }));
}
const $$tag = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$tag;
  const { tag, posts, microPosts } = Astro2.props;
  const title = `Content tagged with "${tag}"`;
  const hasBlogPosts = posts.length > 0;
  const hasMicroPosts = microPosts.length > 0;
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "title": title }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container py-4"> <div class="d-flex gap-2 mb-4"> ${renderComponent($$result2, "ReturnButton", $$ReturnButton, { "href": "/blog", "label": "Return to Blog" })} ${renderComponent($$result2, "ReturnButton", $$ReturnButton, { "href": "/microblog", "label": "Return to Microblog" })} </div> <h1 class="mb-4">Content tagged with "${tag}"</h1>  ${hasBlogPosts && renderTemplate`<section class="mb-5"> <h2 class="h3 mb-3">Blog Posts</h2> <div class="row row-cols-1 row-cols-md-2 g-4"> ${posts.map((post) => renderTemplate`<div class="col"> <div class="card h-100"> <div class="card-body"> <h5 class="card-title"> <a${addAttribute(`/blog/${post.id}`, "href")} class="text-decoration-none"> ${post.data.title} </a> </h5> <p class="card-text">${post.data.description}</p> <div class="d-flex gap-2"> ${post.data.tags?.map((postTag) => renderTemplate`<a${addAttribute(`/tags/${slugifyTag(postTag)}`, "href")} class="badge text-bg-secondary text-decoration-none"> ${postTag} </a>`)} </div> </div> </div> </div>`)} </div> </section>`}  ${hasMicroPosts && renderTemplate`<section> <h2 class="h3 mb-3">Microblog Posts</h2> <div class="microblog-posts"> ${microPosts.map((post) => renderTemplate`<div class="card mb-3"> <div class="card-body"> ${post.data.title && renderTemplate`<h5 class="card-title">${post.data.title}</h5>`} <p class="card-text">${post.body}</p> ${post.data.media && post.data.media.length > 0 && renderTemplate`<div class="media-container mb-3"> ${post.data.media.map((media) => renderTemplate`<div class="media-item"> ${media.type === "image" ? renderTemplate`<img${addAttribute(media.url, "src")}${addAttribute(media.alt || "", "alt")} class="img-fluid rounded">` : renderTemplate`<video${addAttribute(media.url, "src")} controls class="img-fluid rounded"></video>`} ${media.caption && renderTemplate`<p class="text-muted small mt-1">${media.caption}</p>`} </div>`)} </div>`} <div class="d-flex gap-2"> ${post.data.tags?.map((postTag) => renderTemplate`<a${addAttribute(`/tags/${slugifyTag(postTag)}`, "href")} class="badge text-bg-secondary text-decoration-none"> ${postTag} </a>`)} </div> <div class="text-muted small mt-2"> <a${addAttribute(`/microblog/${post.id}`, "href")} class="text-decoration-none">
View post
</a> </div> </div> </div>`)} </div> </section>`}  ${!hasBlogPosts && !hasMicroPosts && renderTemplate`<div class="alert alert-info"> <p>No content found with tag "${tag}".</p> </div>`} </main> ` })}`;
}, "/home/matsu/Desktop/jy/src/pages/tags/[tag].astro", void 0);

const $$file = "/home/matsu/Desktop/jy/src/pages/tags/[tag].astro";
const $$url = "/tags/[tag]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$tag,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

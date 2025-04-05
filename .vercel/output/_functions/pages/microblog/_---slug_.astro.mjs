import { c as createAstro, a as createComponent, r as renderComponent, f as renderScript, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../../chunks/astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import { r as renderEntry, g as getCollection } from '../../chunks/_astro_content_2pRhye3E.mjs';
import { a as $$BaseLayout } from '../../chunks/BaseLayout_DEWwRiOq.mjs';
import { $ as $$ReturnButton } from '../../chunks/ReturnButton_EbGZ8C8R.mjs';
import { $ as $$FormattedDate } from '../../chunks/FormattedDate_3hNghKSN.mjs';
/* empty css                                     */
export { renderers } from '../../renderers.mjs';

const $$Astro = createAstro("https://jasperyong.com");
async function getStaticPaths() {
  const allPosts = await getCollection("microblog");
  const publishedPosts = allPosts.filter((post) => !post.data.draft) ;
  return publishedPosts.map((entry) => ({
    params: { slug: entry.id },
    props: { entry }
  }));
}
const $$ = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$;
  const { entry } = Astro2.props;
  const { Content } = await renderEntry(entry);
  entry.data.title || `Microblog post from ${entry.data.pubDate.toLocaleDateString()}`;
  const ogDescription = entry.body.substring(0, 150) + (entry.body.length > 150 ? "..." : "");
  const ogImage = entry.data.media?.[0]?.url || "/placeholder.png";
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "title": entry.data.title || `Microblog - ${entry.data.pubDate.toLocaleString()}`, "description": ogDescription, "ogImage": ogImage, "data-astro-cid-rypffy7d": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container py-4" data-astro-cid-rypffy7d> <article class="microblog-single-post" data-astro-cid-rypffy7d> <header class="mb-4" data-astro-cid-rypffy7d> <!-- Back button --> ${renderComponent($$result2, "ReturnButton", $$ReturnButton, { "label": "Back to Microblog", "href": "/microblog", "data-astro-cid-rypffy7d": true })} <!-- Optional title --> ${entry.data.title && renderTemplate`<h1 class="mb-3" data-astro-cid-rypffy7d>${entry.data.title}</h1>`} <!-- Post metadata --> <div class="post-meta d-flex flex-wrap justify-content-between align-items-center mb-3" data-astro-cid-rypffy7d> <div class="meta-date" data-astro-cid-rypffy7d> <i class="bi bi-calendar me-1" data-astro-cid-rypffy7d></i> ${renderComponent($$result2, "FormattedDate", $$FormattedDate, { "date": entry.data.pubDate, "data-astro-cid-rypffy7d": true })} </div> ${entry.data.tags && entry.data.tags.length > 0 && renderTemplate`<div class="meta-tags" data-astro-cid-rypffy7d> ${entry.data.tags.map((tag) => renderTemplate`<a${addAttribute(`/microblog/tags/${tag}`, "href")} class="badge bg-primary me-1 text-decoration-none" data-astro-cid-rypffy7d>
#${tag} </a>`)} </div>`} </div> <!-- Location if available --> ${entry.data.location && renderTemplate`<div class="meta-location mb-3" data-astro-cid-rypffy7d> <i class="bi bi-geo-alt me-1" data-astro-cid-rypffy7d></i> <span data-astro-cid-rypffy7d>${entry.data.location.name}</span>  ${entry.data.location.coordinates && renderTemplate`<div class="location-map mt-2" data-astro-cid-rypffy7d> <a${addAttribute(`https://www.google.com/maps/search/?api=1&query=${entry.data.location.coordinates[0]},${entry.data.location.coordinates[1]}`, "href")} target="_blank" rel="noopener noreferrer" class="btn btn-sm btn-outline-secondary" data-astro-cid-rypffy7d> <i class="bi bi-map me-1" data-astro-cid-rypffy7d></i>
View on Map
</a> </div>`} </div>`} <hr data-astro-cid-rypffy7d> </header> <div class="post-content mb-4" data-astro-cid-rypffy7d> <!-- Main content --> <div class="content-text mb-4" data-astro-cid-rypffy7d> ${renderComponent($$result2, "Content", Content, { "data-astro-cid-rypffy7d": true })} </div> <!-- Media content --> ${entry.data.media && entry.data.media.length > 0 && renderTemplate`<div class="content-media" data-astro-cid-rypffy7d> ${entry.data.media.map((item) => renderTemplate`<div class="media-item mb-4" data-astro-cid-rypffy7d> ${item.type === "image" ? renderTemplate`<figure class="figure" data-astro-cid-rypffy7d> <img${addAttribute(item.url, "src")}${addAttribute(item.alt || "", "alt")} class="figure-img img-fluid rounded" data-astro-cid-rypffy7d> ${item.caption && renderTemplate`<figcaption class="figure-caption text-center" data-astro-cid-rypffy7d> ${item.caption} </figcaption>`} </figure>` : renderTemplate`<div class="video-container" data-astro-cid-rypffy7d> <div class="ratio ratio-16x9" data-astro-cid-rypffy7d> <video controls preload="metadata" data-astro-cid-rypffy7d> <source${addAttribute(item.url, "src")} type="video/mp4" data-astro-cid-rypffy7d>
Your browser does not support the video tag.
</video> </div> ${item.caption && renderTemplate`<p class="video-caption text-center mt-2" data-astro-cid-rypffy7d> ${item.caption} </p>`} </div>`} </div>`)} </div>`} </div> <!-- Share and action buttons --> <div class="post-actions mb-4" data-astro-cid-rypffy7d> <div class="d-flex gap-2" data-astro-cid-rypffy7d> <button class="btn btn-primary share-post"${addAttribute(entry.id, "data-post-id")} data-astro-cid-rypffy7d> <i class="bi bi-share me-1" data-astro-cid-rypffy7d></i> Share
</button> <a href="/microblog" class="btn btn-outline-secondary" data-astro-cid-rypffy7d> <i class="bi bi-arrow-left me-1" data-astro-cid-rypffy7d></i> Back to All Posts
</a> </div> </div> </article> </main> ` })}  ${renderScript($$result, "/home/matsu/Desktop/jy/src/pages/microblog/[...slug].astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/matsu/Desktop/jy/src/pages/microblog/[...slug].astro", void 0);
const $$file = "/home/matsu/Desktop/jy/src/pages/microblog/[...slug].astro";
const $$url = "/microblog/[...slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

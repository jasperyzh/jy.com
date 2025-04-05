import { c as createAstro, a as createComponent, r as renderComponent, f as renderScript, b as renderTemplate, m as maybeRenderHead } from '../../../chunks/astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import { a as $$BaseLayout } from '../../../chunks/BaseLayout_DEWwRiOq.mjs';
import { $ as $$MicroblogFeed } from '../../../chunks/MicroblogFeed_CfoMkwmk.mjs';
import { g as getCollection } from '../../../chunks/_astro_content_2pRhye3E.mjs';
/* empty css                                        */
export { renderers } from '../../../renderers.mjs';

const $$Astro = createAstro("https://jasperyong.com");
async function getStaticPaths() {
  const VALID_TYPES = ["text", "image", "video", "mixed"];
  return VALID_TYPES.map((type) => ({
    params: { type },
    // This creates the route parameter
    props: { type }
    // This passes the parameter as a prop
  }));
}
const $$type = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$type;
  const { type } = Astro2.props;
  const urlType = Astro2.params.type;
  const currentPath = Astro2.url.pathname;
  const typeFromPath = currentPath.split("/").pop();
  console.log("Type from props:", type);
  console.log("Type from params:", urlType);
  console.log("Type from path:", typeFromPath);
  const allPosts = await getCollection("microblog");
  const filteredPosts = allPosts.filter((post) => {
    const isPublished = !post.data.draft && !post.data.isPrivate;
    const postType = post.data.contentType || "text";
    const postTypeLower = typeof postType === "string" ? postType.toLowerCase() : "text";
    const typeLower = typeof typeFromPath === "string" ? typeFromPath.toLowerCase() : "";
    const matchesType = postTypeLower === typeLower;
    console.log("Matches type:", postTypeLower, typeLower);
    return isPublished && matchesType;
  });
  const sortedPosts = filteredPosts.sort((a, b) => {
    const dateA = a.data.pubDate instanceof Date ? a.data.pubDate : /* @__PURE__ */ new Date();
    const dateB = b.data.pubDate instanceof Date ? b.data.pubDate : /* @__PURE__ */ new Date();
    return dateB.getTime() - dateA.getTime();
  });
  const getTypeDisplayName = (type2) => {
    switch (type2) {
      case "text":
        return "Text Posts";
      case "image":
        return "Image Posts";
      case "video":
        return "Video Posts";
      case "mixed":
        return "Mixed Content";
      default:
        return "Posts";
    }
  };
  const typeDisplayName = getTypeDisplayName(type);
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "title": `Microblog - ${typeDisplayName}`, "description": `Microblog posts with ${type} content`, "data-astro-cid-7zjrmzuh": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main data-astro-cid-7zjrmzuh> <div class="twitter-header" data-astro-cid-7zjrmzuh> <div class="header-content" data-astro-cid-7zjrmzuh> <h1 data-astro-cid-7zjrmzuh>Microblog</h1> <h2 class="filter-title" data-astro-cid-7zjrmzuh> ${type === "text" && renderTemplate`<i class="bi bi-file-text me-1" data-astro-cid-7zjrmzuh></i>`} ${type === "image" && renderTemplate`<i class="bi bi-image me-1" data-astro-cid-7zjrmzuh></i>`} ${type === "video" && renderTemplate`<i class="bi bi-film me-1" data-astro-cid-7zjrmzuh></i>`} ${type === "mixed" && renderTemplate`<i class="bi bi-collection me-1" data-astro-cid-7zjrmzuh></i>`} ${typeDisplayName} </h2> </div> </div> <div class="twitter-container" data-astro-cid-7zjrmzuh> ${renderComponent($$result2, "MicroblogFeed", $$MicroblogFeed, { "posts": sortedPosts, "showFilters": true, "currentFilter": type, "data-astro-cid-7zjrmzuh": true })} </div> </main> ` })}  ${renderScript($$result, "/home/matsu/Desktop/jy/src/pages/microblog/type/[type].astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/matsu/Desktop/jy/src/pages/microblog/type/[type].astro", void 0);
const $$file = "/home/matsu/Desktop/jy/src/pages/microblog/type/[type].astro";
const $$url = "/microblog/type/[type]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$type,
  file: $$file,
  getStaticPaths,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

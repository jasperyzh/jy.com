import { c as createAstro, a as createComponent, m as maybeRenderHead, d as addAttribute, f as renderScript, b as renderTemplate, r as renderComponent } from './astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import { r as renderEntry } from './_astro_content_2pRhye3E.mjs';
import { $ as $$FormattedDate } from './FormattedDate_3hNghKSN.mjs';
import 'clsx';
/* empty css                         */
import { $ as $$Pagination } from './Pagination_Dr-R-E2N.mjs';

const $$Astro$2 = createAstro("https://jasperyong.com");
const $$ShareButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$ShareButton;
  const { postId, title = "Check out this post!" } = Astro2.props;
  const baseUrl = "https://jasperyong.com";
  const postUrl = `${baseUrl}/microblog/${postId}`;
  const encodedUrl = encodeURIComponent(postUrl);
  const encodedTitle = encodeURIComponent(title);
  return renderTemplate`${maybeRenderHead()}<div class="share-container" data-astro-cid-oeuythnl> <div class="a2a_kit a2a_kit_size_32 a2a_default_style d-flex align-items-center gap-2" data-astro-cid-oeuythnl> <!-- Facebook --> <a class="a2a_button_facebook btn btn-sm btn-outline-primary" title="Share to Facebook" data-astro-cid-oeuythnl> <i class="bi bi-facebook" data-astro-cid-oeuythnl></i> </a> <!-- Twitter --> <a class="a2a_button_twitter btn btn-sm btn-outline-info" title="Share to Twitter" data-astro-cid-oeuythnl> <i class="bi bi-twitter-x" data-astro-cid-oeuythnl></i> </a> <!-- LinkedIn --> <a class="a2a_button_linkedin btn btn-sm btn-outline-primary" title="Share to LinkedIn" data-astro-cid-oeuythnl> <i class="bi bi-linkedin" data-astro-cid-oeuythnl></i> </a> <!-- WhatsApp --> <a class="a2a_button_whatsapp btn btn-sm btn-outline-success" title="Share to WhatsApp" data-astro-cid-oeuythnl> <i class="bi bi-whatsapp" data-astro-cid-oeuythnl></i> </a> <!-- Show all options --> <a class="a2a_dd btn btn-sm btn-outline-secondary"${addAttribute(`https://www.addtoany.com/share#url=${encodedUrl}&title=${encodedTitle}`, "href")} title="More sharing options" data-astro-cid-oeuythnl> <i class="bi bi-three-dots" data-astro-cid-oeuythnl></i> </a> </div> </div> ${renderScript($$result, "/home/matsu/Desktop/jy/src/components/microblog/ShareButton.astro?astro&type=script&index=0&lang.ts")} `;
}, "/home/matsu/Desktop/jy/src/components/microblog/ShareButton.astro", void 0);

const $$Astro$1 = createAstro("https://jasperyong.com");
const $$MicroblogPost = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$MicroblogPost;
  const { post } = Astro2.props;
  const { Content } = await renderEntry(post);
  const getPostId = (slug) => {
    return slug.split("/").pop() || slug;
  };
  const postId = getPostId(post.id);
  const getYoutubeVideoId = (url) => {
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return match && match[7].length === 11 ? match[7] : null;
  };
  const isYoutubeUrl = (url) => {
    return url.includes("youtube.com") || url.includes("youtu.be");
  };
  return renderTemplate`${maybeRenderHead()}<article class="tweet"${addAttribute(`post-${postId}`, "id")} data-astro-cid-rzc43ij3> <div class="tweet-container" data-astro-cid-rzc43ij3> <!-- Avatar and header row --> <div class="tweet-header" data-astro-cid-rzc43ij3> <div class="tweet-avatar" data-astro-cid-rzc43ij3> <i class="bi bi-person-circle" data-astro-cid-rzc43ij3></i> </div> <div class="tweet-header-content" data-astro-cid-rzc43ij3> <div class="tweet-name-container" data-astro-cid-rzc43ij3> <span class="tweet-name" data-astro-cid-rzc43ij3>JY</span> <span class="tweet-handle" data-astro-cid-rzc43ij3>@jy</span> <span class="tweet-dot" data-astro-cid-rzc43ij3>·</span> <time class="tweet-time"${addAttribute(post.data.pubDate.toISOString(), "datetime")} data-astro-cid-rzc43ij3> ${renderComponent($$result, "FormattedDate", $$FormattedDate, { "date": post.data.pubDate, "data-astro-cid-rzc43ij3": true })} </time> </div> ${post.data.title && renderTemplate`<div class="tweet-title" data-astro-cid-rzc43ij3>${post.data.title}</div>`} </div> </div> <!-- Post content --> <div class="tweet-content" data-astro-cid-rzc43ij3> ${renderComponent($$result, "Content", Content, { "data-astro-cid-rzc43ij3": true })} </div> <!-- Media content (images/videos) --> ${post.data.media && post.data.media.length > 0 && renderTemplate`<div${addAttribute(`tweet-media media-count-${Math.min(post.data.media.length, 4)}`, "class")} data-astro-cid-rzc43ij3> ${post.data.media.slice(0, 4).map((item) => renderTemplate`<div class="tweet-media-item" data-astro-cid-rzc43ij3> ${item.type === "image" ? renderTemplate`<a${addAttribute(item.url, "href")} class="media-link" target="_blank" rel="noopener" data-astro-cid-rzc43ij3> <img${addAttribute(item.url, "src")}${addAttribute(item.alt || "", "alt")} loading="lazy" data-astro-cid-rzc43ij3> ${item.caption && renderTemplate`<div class="media-caption" data-astro-cid-rzc43ij3>${item.caption}</div>`} </a>` : item.type === "video" && isYoutubeUrl(item.url) ? renderTemplate`<div class="youtube-embed" data-astro-cid-rzc43ij3> <iframe${addAttribute(`https://www.youtube.com/embed/${getYoutubeVideoId(item.url)}`, "src")} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen data-astro-cid-rzc43ij3></iframe> ${item.caption && renderTemplate`<div class="media-caption" data-astro-cid-rzc43ij3>${item.caption}</div>`} </div>` : renderTemplate`<div class="video-container" data-astro-cid-rzc43ij3> <video controls preload="none"${addAttribute(item.alt && `/img/placeholder.png`, "poster")} data-astro-cid-rzc43ij3> <source${addAttribute(item.url, "src")} type="video/mp4" data-astro-cid-rzc43ij3>
Your browser does not support the video tag.
</video> ${item.caption && renderTemplate`<div class="media-caption" data-astro-cid-rzc43ij3>${item.caption}</div>`} </div>`} </div>`)} </div>`} <!-- Location info if available --> ${post.data.location && renderTemplate`<div class="tweet-location" data-astro-cid-rzc43ij3> <i class="bi bi-geo-alt" data-astro-cid-rzc43ij3></i> ${post.data.location.name} </div>`} <!-- Tags --> ${post.data.tags && post.data.tags.length > 0 && renderTemplate`<div class="tweet-tags" data-astro-cid-rzc43ij3> ${post.data.tags.map((tag) => renderTemplate`<a${addAttribute(`/microblog/tags/${tag}`, "href")} class="tweet-tag" data-astro-cid-rzc43ij3>
#${tag} </a>`)} </div>`} <!-- Post actions --> <div class="tweet-actions" data-astro-cid-rzc43ij3> <a${addAttribute(`/microblog/${postId}`, "href")} class="tweet-action" title="View replies" data-astro-cid-rzc43ij3> <i class="bi bi-chat" data-astro-cid-rzc43ij3></i> <span class="action-count" data-astro-cid-rzc43ij3>0</span> </a> <a href="#" class="tweet-action" title="Repost" data-astro-cid-rzc43ij3> <i class="bi bi-repeat" data-astro-cid-rzc43ij3></i> <span class="action-count" data-astro-cid-rzc43ij3>0</span> </a> <a href="#" class="tweet-action" title="Like" data-astro-cid-rzc43ij3> <i class="bi bi-heart" data-astro-cid-rzc43ij3></i> <span class="action-count" data-astro-cid-rzc43ij3>0</span> </a> ${renderComponent($$result, "ShareButton", $$ShareButton, { "postId": postId, "title": post.data.title || `Post from ${new Date(post.data.pubDate).toLocaleDateString()}`, "data-astro-cid-rzc43ij3": true })} </div> </div> </article> `;
}, "/home/matsu/Desktop/jy/src/components/microblog/MicroblogPost.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://jasperyong.com");
const $$MicroblogFeed = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$MicroblogFeed;
  const {
    posts,
    currentPage = 1,
    totalPages = 1,
    prevUrl = null,
    nextUrl = null,
    showFilters = true,
    currentFilter = null
  } = Astro2.props;
  const contentTypes = [
    { value: "all", label: "All Posts" },
    { value: "text", label: "Text Only" },
    { value: "image", label: "Images" },
    { value: "video", label: "Videos" },
    { value: "mixed", label: "Mixed Content" }
  ];
  return renderTemplate(_a || (_a = __template(["", '<div class="microblog-feed" data-astro-cid-bj62zorp>  ', '  <div class="posts-info" data-astro-cid-bj62zorp> <p data-astro-cid-bj62zorp> ', " post", " ", ' </p> </div>  <div class="posts-container" data-astro-cid-bj62zorp> ', " </div>  ", " </div>  ", " <script>\n  // Immediate script to ensure posts are visible even if DOMContentLoaded has already fired\n  window.addEventListener('load', function() {\n    document.querySelectorAll('.tweet').forEach(post => {\n      post.classList.add('post-visible');\n    });\n  });\n<\/script> "])), maybeRenderHead(), showFilters && renderTemplate`<div class="filter-container" data-astro-cid-bj62zorp> <div class="filter-types" data-astro-cid-bj62zorp> ${contentTypes.map((type) => renderTemplate`<a${addAttribute(type.value === "all" ? "/microblog" : `/microblog/type/${type.value}`, "href")}${addAttribute(`filter-tab ${currentFilter === type.value ? "active" : ""}`, "class")} data-astro-cid-bj62zorp> ${type.value === "text" && renderTemplate`<i class="bi bi-file-text" data-astro-cid-bj62zorp></i>`} ${type.value === "image" && renderTemplate`<i class="bi bi-image" data-astro-cid-bj62zorp></i>`} ${type.value === "video" && renderTemplate`<i class="bi bi-film" data-astro-cid-bj62zorp></i>`} ${type.value === "mixed" && renderTemplate`<i class="bi bi-collection" data-astro-cid-bj62zorp></i>`} ${type.value === "all" && renderTemplate`<i class="bi bi-grid-3x3" data-astro-cid-bj62zorp></i>`} <span data-astro-cid-bj62zorp>${type.label}</span> </a>`)} </div> </div>`, posts.length, posts.length !== 1 ? "s" : "", totalPages > 1 && ` \xB7 Page ${currentPage} of ${totalPages}`, posts.length > 0 ? posts.map((post) => renderTemplate`${renderComponent($$result, "MicroblogPost", $$MicroblogPost, { "post": post, "data-astro-cid-bj62zorp": true })}`) : renderTemplate`<div class="no-posts" data-astro-cid-bj62zorp> <i class="bi bi-info-circle" data-astro-cid-bj62zorp></i> <p data-astro-cid-bj62zorp>No posts found with this filter.</p> <a href="/microblog" class="return-link" data-astro-cid-bj62zorp>View all posts</a> </div>`, (prevUrl || nextUrl) && renderTemplate`<div class="pagination-container" data-astro-cid-bj62zorp> ${renderComponent($$result, "Pagination", $$Pagination, { "prevUrl": prevUrl, "nextUrl": nextUrl, "data-astro-cid-bj62zorp": true })} </div>`, renderScript($$result, "/home/matsu/Desktop/jy/src/components/microblog/MicroblogFeed.astro?astro&type=script&index=0&lang.ts"));
}, "/home/matsu/Desktop/jy/src/components/microblog/MicroblogFeed.astro", void 0);

export { $$MicroblogFeed as $ };

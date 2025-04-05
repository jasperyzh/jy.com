import { a as createComponent, m as maybeRenderHead, b as renderTemplate, r as renderComponent } from '../chunks/astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import { a as $$BaseLayout, b as SITE_DESCRIPTION } from '../chunks/BaseLayout_DEWwRiOq.mjs';
import 'clsx';
/* empty css                                 */
export { renderers } from '../renderers.mjs';

const $$HelloGreeting = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<p class="hello_world" data-astro-cid-dybotv62> <span class="japanese-text" data-astro-cid-dybotv62>(。・∀・)ノ*:･ﾟ</span>hello_world
<span class="stars" data-astro-cid-dybotv62> <span class="star animate--moveUpDown" style="--animation-delay: 0s" data-astro-cid-dybotv62>🌟</span> <span class="star animate--moveUpDown" style="--animation-delay: 0.314s" data-astro-cid-dybotv62>🌟</span> <span class="star animate--moveUpDown" style="--animation-delay: 0.628s" data-astro-cid-dybotv62>🌟</span> </span> </p> `;
}, "/home/matsu/Desktop/jy/src/components/HelloGreeting.astro", void 0);

const $$Index = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "title": "Homepage", "description": SITE_DESCRIPTION }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <div class="grid align-items self-center text-center py-16"> <div> ${renderComponent($$result2, "HelloGreeting", $$HelloGreeting, {})} <!-- <IconifyComponent /> --> <!-- <TeamSection /> --> <!-- hero section --> </div> </div> </main> ` })}`;
}, "/home/matsu/Desktop/jy/src/pages/index.astro", void 0);

const $$file = "/home/matsu/Desktop/jy/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

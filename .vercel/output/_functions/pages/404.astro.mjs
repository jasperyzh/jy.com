import { a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import { a as $$BaseLayout } from '../chunks/BaseLayout_DEWwRiOq.mjs';
/* empty css                               */
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "title": "404 Page Not Found", "data-astro-cid-zetdm5md": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="d-flex flex-column align-items-center justify-content-center" data-astro-cid-zetdm5md> <h1 data-astro-cid-zetdm5md>(╯°□°）╯ ︵ <span data-astro-cid-zetdm5md>404: not_found</span></h1> <a href="/" class="back" data-astro-cid-zetdm5md>go_home</a> </main> ` })} `;
}, "/home/matsu/Desktop/jy/src/pages/404.astro", void 0);

const $$file = "/home/matsu/Desktop/jy/src/pages/404.astro";
const $$url = "/404";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$404,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

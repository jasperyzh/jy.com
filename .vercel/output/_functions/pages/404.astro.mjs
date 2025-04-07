import { a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_JhCfhjtA.mjs';
import 'kleur/colors';
import { a as $$BaseLayout } from '../chunks/BaseLayout_B3_U6PTh.mjs';
export { renderers } from '../renderers.mjs';

const $$404 = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "title": "404 Page Not Found" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="d-flex flex-column align-items-center justify-content-center"> <h1>(╯°□°）╯ ︵ <span>404: not_found</span></h1> <a href="/" class="back">go_home</a> </main> ` })} <style>
  span {
    display: inline-block;
    rotate: 180deg;
    font-family: monospace;
  }
</style>`;
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

import { a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_JhCfhjtA.mjs';
import 'kleur/colors';
import { a as $$BaseLayout, $ as $$Button, S as SITE_TITLE } from '../chunks/BaseLayout_B3_U6PTh.mjs';
export { renderers } from '../renderers.mjs';

const $$Contact = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "title": `Contact - ${SITE_TITLE}` }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container-fluid py-5 px-4 bg-gray-100 dark:bg-gray-900"> <div class="container mx-auto"> <h1 class="text-4xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-white">Contact</h1> <p class="text-xl text-gray-600 dark:text-gray-300">Get in touch with me.</p> <pre>        - Display your email address clearly (contact form replaced with email).
        - Highlight why someone should contact you (services offered).
        - Include Social Media/GitHub icons for additional ways to connect.
      </pre> ${renderComponent($$result2, "Button", $$Button, { "href": "/resume", "class": "bg-transparent text-gray-800 hover:text-gray-200 dark:text-gray-200 dark:hover:text-gray-800", "size": "sm" }, { "default": ($$result3) => renderTemplate`Resume` })} </div> </main> ` })}`;
}, "/home/matsu/Desktop/jy/src/pages/contact.astro", void 0);

const $$file = "/home/matsu/Desktop/jy/src/pages/contact.astro";
const $$url = "/contact";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Contact,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

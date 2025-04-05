import { c as createAstro, a as createComponent, m as maybeRenderHead, r as renderComponent, b as renderTemplate } from './astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import { $ as $$Button } from './BaseLayout_DEWwRiOq.mjs';

const $$Astro = createAstro("https://jasperyong.com");
const $$Pagination = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Pagination;
  const { prevUrl, nextUrl } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<nav aria-label="pagination"> ${prevUrl && renderTemplate`${renderComponent($$result, "Button", $$Button, { "href": prevUrl, "class": "prev" }, { "default": ($$result2) => renderTemplate`
Newer
` })}`} ${nextUrl && renderTemplate`${renderComponent($$result, "Button", $$Button, { "href": nextUrl, "class": "next" }, { "default": ($$result2) => renderTemplate`
Older
` })}`} </nav>`;
}, "/home/matsu/Desktop/jy/src/components/Pagination.astro", void 0);

export { $$Pagination as $ };

import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, d as renderSlot } from './astro/server_JhCfhjtA.mjs';
import 'kleur/colors';
import { $ as $$Card, a as $$CardHeader, b as $$CardTitle, c as $$CardDescription, d as $$CardContent, e as $$CardFooter } from './CardTitle_CzRtK_xc.mjs';
import { $ as $$Button } from './BaseLayout_B3_U6PTh.mjs';
import { $ as $$Badge } from './Badge_B2yX5Z6i.mjs';
/* empty css                         */

const $$Astro = createAstro("https://jasperyong.com");
const $$CardComponent = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CardComponent;
  const {
    title,
    description,
    date,
    tags = [],
    actionLink,
    actionText = "Read",
    class: className = "",
    width = "w-[400px]",
    hasCustomContent = false,
    buttonVariant = "default",
    showAction = true
  } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Card", $$Card, { "class": `${width} ${className}`, "data-astro-cid-w47biavh": true }, { "default": ($$result2) => renderTemplate` ${renderComponent($$result2, "CardHeader", $$CardHeader, { "data-astro-cid-w47biavh": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "CardTitle", $$CardTitle, { "data-astro-cid-w47biavh": true }, { "default": ($$result4) => renderTemplate`${title}` })} ${(description || date) && renderTemplate`${renderComponent($$result3, "CardDescription", $$CardDescription, { "data-astro-cid-w47biavh": true }, { "default": ($$result4) => renderTemplate`${date && renderTemplate`${maybeRenderHead()}<span class="block text-sm" data-astro-cid-w47biavh> ${date.toLocaleString("default", {
    year: "numeric",
    month: "short",
    day: "numeric"
  })} </span>`}${description && renderTemplate`<span class="block mt-1" data-astro-cid-w47biavh>${description}</span>`}` })}`}` })} ${hasCustomContent ? renderTemplate`${renderSlot($$result2, $$slots["default"])}` : renderTemplate`${renderComponent($$result2, "CardContent", $$CardContent, { "class": "flex flex-col gap-4", "data-astro-cid-w47biavh": true }, { "default": ($$result3) => renderTemplate`${tags.length > 0 && renderTemplate`<div class="card-tags mb-2" data-astro-cid-w47biavh> ${tags.map((tag) => renderTemplate`${renderComponent($$result3, "Badge", $$Badge, { "class": "mr-1 mb-1", "href": `/tag/${tag}`, "data-astro-cid-w47biavh": true }, { "default": ($$result4) => renderTemplate`${tag}` })}`)} </div>`}${renderSlot($$result3, $$slots["content"])} ` })}`}${showAction && actionLink && renderTemplate`${renderComponent($$result2, "CardFooter", $$CardFooter, { "class": "flex justify-between", "data-astro-cid-w47biavh": true }, { "default": ($$result3) => renderTemplate` ${renderComponent($$result3, "Button", $$Button, { "href": actionLink, "variant": buttonVariant, "data-astro-cid-w47biavh": true }, { "default": ($$result4) => renderTemplate`${actionText}` })} ${renderSlot($$result3, $$slots["footer-extra"])} ` })}`}${!showAction && renderTemplate`${renderComponent($$result2, "CardFooter", $$CardFooter, { "data-astro-cid-w47biavh": true }, { "default": ($$result3) => renderTemplate` ${renderSlot($$result3, $$slots["footer"])} ` })}`}` })} `;
}, "/home/matsu/Desktop/jy/src/components/CardComponent.astro", void 0);

export { $$CardComponent as $ };

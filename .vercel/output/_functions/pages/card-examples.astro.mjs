import { a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_JhCfhjtA.mjs';
import 'kleur/colors';
import { a as $$BaseLayout, $ as $$Button } from '../chunks/BaseLayout_B3_U6PTh.mjs';
import { $ as $$CardComponent } from '../chunks/CardComponent_Ck5F_Rkp.mjs';
import { $ as $$Badge } from '../chunks/Badge_B2yX5Z6i.mjs';
import { e as $$CardFooter } from '../chunks/CardTitle_CzRtK_xc.mjs';
export { renderers } from '../renderers.mjs';

const $$CardExamples = createComponent(($$result, $$props, $$slots) => {
  const demoTags = ["astro", "design", "components", "tailwind"];
  const exampleData = [
    {
      title: "Basic Card Example",
      description: "A simple card with title and description"
    },
    {
      title: "Card with Date",
      description: "This card includes a formatted date",
      date: /* @__PURE__ */ new Date()
    },
    {
      title: "Card with Tags",
      description: "This card displays category tags",
      tags: ["web", "design"]
    },
    {
      title: "Card with Button",
      description: "Card with customized action button",
      actionLink: "/examples",
      actionText: "View Examples",
      buttonVariant: "secondary"
    }
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "title": "Card Component Examples" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container mx-auto py-8"> <h1 class="text-3xl font-bold mb-8">Card Component Examples</h1> <section class="mb-12"> <h2 class="text-2xl font-bold mb-4">Standard Cards</h2> <p class="mb-4">Basic examples of the CardComponent with different configurations.</p> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"> ${exampleData.map((example, index) => renderTemplate`${renderComponent($$result2, "CardComponent", $$CardComponent, { "title": example.title, "description": example.description, "date": example.date, "tags": example.tags, "actionLink": example.actionLink || "#", "actionText": example.actionText, "buttonVariant": example.buttonVariant })}`)} </div> </section> <section class="mb-12"> <h2 class="text-2xl font-bold mb-4">Custom Styling</h2> <p class="mb-4">Cards with custom styling and different widths.</p> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> ${renderComponent($$result2, "CardComponent", $$CardComponent, { "title": "Full Width Card", "description": "This card takes up the full width of its container", "tags": demoTags.slice(0, 2), "actionLink": "#", "width": "w-full", "buttonVariant": "primary" })} ${renderComponent($$result2, "CardComponent", $$CardComponent, { "title": "Narrow Card", "description": "A narrower card with custom styling", "tags": demoTags.slice(2, 4), "actionLink": "#", "width": "w-[300px]", "class": "bg-primary/5", "buttonVariant": "outline" })} </div> </section> <section class="mb-12"> <h2 class="text-2xl font-bold mb-4">Cards with Custom Content</h2> <p class="mb-4">Using named slots to customize card content.</p> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> ${renderComponent($$result2, "CardComponent", $$CardComponent, { "title": "Custom Content Slot", "description": "This card uses the content slot for custom content", "actionLink": "#" }, { "content": ($$result3) => renderTemplate`<div class="p-4 bg-secondary/10 rounded-lg"> <p>This is custom content inside the card.</p> <ul class="list-disc list-inside mt-2"> <li>You can add any HTML</li> <li>Fully customize the content area</li> <li>While maintaining consistent card styling</li> </ul> </div>` })} ${renderComponent($$result2, "CardComponent", $$CardComponent, { "title": "Custom Footer Slot", "description": "This card has a customized footer", "actionLink": "#", "actionText": "Primary Action" }, { "footer-extra": ($$result3) => renderTemplate`<div> ${renderComponent($$result3, "Button", $$Button, { "variant": "ghost", "size": "sm" }, { "default": ($$result4) => renderTemplate`Secondary` })} </div>` })} </div> </section> <section class="mb-12"> <h2 class="text-2xl font-bold mb-4">Fully Custom Card</h2> <p class="mb-4">Using hasCustomContent to completely override the card content.</p> <div class="grid grid-cols-1 md:grid-cols-2 gap-6"> ${renderComponent($$result2, "CardComponent", $$CardComponent, { "title": "Complete Custom Override", "description": "The entire content area is custom", "hasCustomContent": true, "showAction": false }, { "default": ($$result3) => renderTemplate` <div class="px-8 py-6"> <div class="flex justify-center mb-4"> <div class="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center"> <span class="text-3xl">🚀</span> </div> </div> <p class="text-center mb-4">This card's content is completely custom.</p> <div class="flex justify-center gap-2"> ${demoTags.map((tag) => renderTemplate`${renderComponent($$result3, "Badge", $$Badge, { "variant": "outline" }, { "default": ($$result4) => renderTemplate`${tag}` })}`)} </div> </div>  `, "footer": ($$result3) => renderTemplate`<div class="flex justify-between w-full"> ${renderComponent($$result3, "Button", $$Button, { "variant": "ghost" }, { "default": ($$result4) => renderTemplate`Cancel` })} ${renderComponent($$result3, "Button", $$Button, { "variant": "primary" }, { "default": ($$result4) => renderTemplate`Submit` })} </div>` })} ${renderComponent($$result2, "CardComponent", $$CardComponent, { "title": "Product Card Example", "description": "How a card might look for a product", "hasCustomContent": true }, { "default": ($$result3) => renderTemplate` <div class="px-8 py-4"> <div class="aspect-video bg-secondary/10 rounded-lg mb-4 flex items-center justify-center"> <span class="text-4xl">📱</span> </div> <div class="flex justify-between items-center"> <span class="font-bold text-lg">$99.99</span> ${renderComponent($$result3, "Badge", $$Badge, { "variant": "success" }, { "default": ($$result4) => renderTemplate`In Stock` })} </div> <p class="mt-2 text-sm">Free shipping on orders over $50</p> </div> ${renderComponent($$result3, "CardFooter", $$CardFooter, { "class": "flex justify-between" }, { "default": ($$result4) => renderTemplate` ${renderComponent($$result4, "Button", $$Button, { "variant": "outline" }, { "default": ($$result5) => renderTemplate`Add to Cart` })} ${renderComponent($$result4, "Button", $$Button, { "variant": "primary" }, { "default": ($$result5) => renderTemplate`Buy Now` })} ` })} ` })} </div> </section> </main> ` })}`;
}, "/home/matsu/Desktop/jy/src/pages/card-examples.astro", void 0);

const $$file = "/home/matsu/Desktop/jy/src/pages/card-examples.astro";
const $$url = "/card-examples";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$CardExamples,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

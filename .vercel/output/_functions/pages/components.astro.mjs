import { a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, f as addAttribute } from '../chunks/astro/server_JhCfhjtA.mjs';
import 'kleur/colors';
import { a as $$BaseLayout } from '../chunks/BaseLayout_B3_U6PTh.mjs';
import { $ as $$CardComponent } from '../chunks/CardComponent_Ck5F_Rkp.mjs';
export { renderers } from '../renderers.mjs';

const $$Components = createComponent(($$result, $$props, $$slots) => {
  const components = [
    {
      title: "Card Component",
      description: "A versatile card component for displaying various types of content",
      links: [
        { title: "Card Examples", url: "/card-examples" },
        { title: "Product Demo", url: "/product-demo" }
      ],
      tags: ["UI", "Layout", "Content"]
    }
    // Add more components as they are implemented
  ];
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "title": "Component Library" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container mx-auto py-8"> <section class="mb-12"> <h1 class="text-4xl font-bold mb-4">Component Library</h1> <p class="text-lg mb-8">
Explore the reusable components that power this website. These components are designed
        to be consistent, accessible, and highly customizable.
</p> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"> ${components.map((component) => renderTemplate`${renderComponent($$result2, "CardComponent", $$CardComponent, { "title": component.title, "description": component.description, "tags": component.tags, "hasCustomContent": true, "width": "w-full" }, { "default": ($$result3) => renderTemplate` <div class="px-8 py-4"> <p class="mb-4">${component.description}</p> <h3 class="text-lg font-semibold mb-2">Examples:</h3> <ul class="list-disc list-inside space-y-1"> ${component.links.map((link) => renderTemplate`<li> <a${addAttribute(link.url, "href")} class="text-primary hover:underline"> ${link.title} </a> </li>`)} </ul> </div>  `, "footer": ($$result3) => renderTemplate`<div class="flex justify-between w-full px-8 pb-6"> <a href="/card-examples" class="inline-flex items-center justify-center h-11 px-4 py-2 text-base rounded-md font-medium bg-primary text-primary-foreground hover:bg-primary/90">
View Examples
</a> <a href="https://github.com/username/repo/src/components/CardComponent.astro" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center h-11 px-4 py-2 text-base rounded-md font-medium border border-border hover:bg-border hover:text-foreground">
View Source
</a> </div>` })}`)} </div> </section> <section class="mb-12"> <h2 class="text-2xl font-bold mb-4">Design Principles</h2> <div class="bg-card border rounded-xl p-8"> <ul class="space-y-4"> <li> <h3 class="text-xl font-semibold">Consistency</h3> <p>Components maintain a consistent look and feel throughout the website.</p> </li> <li> <h3 class="text-xl font-semibold">Reusability</h3> <p>Components are designed to be reused in various contexts and configurations.</p> </li> <li> <h3 class="text-xl font-semibold">Accessibility</h3> <p>Components follow accessibility best practices to ensure usability for all users.</p> </li> <li> <h3 class="text-xl font-semibold">Customization</h3> <p>Components provide options for customization while maintaining design consistency.</p> </li> </ul> </div> </section> <section> <h2 class="text-2xl font-bold mb-4">Contributing</h2> <p class="mb-4">
Want to contribute to our component library? Check out the source code on GitHub
        and follow our contribution guidelines.
</p> <a href="https://github.com/username/repo" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center h-11 px-4 py-2 text-base rounded-md font-medium bg-primary text-primary-foreground hover:bg-primary/90">
View on GitHub
</a> </section> </main> ` })}`;
}, "/home/matsu/Desktop/jy/src/pages/components.astro", void 0);

const $$file = "/home/matsu/Desktop/jy/src/pages/components.astro";
const $$url = "/components";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Components,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

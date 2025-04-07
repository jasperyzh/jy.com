import { a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, f as addAttribute } from '../chunks/astro/server_JhCfhjtA.mjs';
import 'kleur/colors';
import { a as $$BaseLayout, $ as $$Button } from '../chunks/BaseLayout_B3_U6PTh.mjs';
import { $ as $$CardComponent } from '../chunks/CardComponent_Ck5F_Rkp.mjs';
import { $ as $$Badge } from '../chunks/Badge_B2yX5Z6i.mjs';
/* empty css                                        */
export { renderers } from '../renderers.mjs';

const $$ProductDemo = createComponent(($$result, $$props, $$slots) => {
  const products = [
    {
      id: 1,
      name: "Wireless Headphones",
      description: "Premium noise-cancelling wireless headphones",
      price: 199.99,
      image: "\u{1F3A7}",
      category: "Audio",
      tags: ["wireless", "audio", "premium"],
      inStock: true
    },
    {
      id: 2,
      name: "Smart Watch",
      description: "Fitness and health tracking smart watch",
      price: 249.99,
      image: "\u231A",
      category: "Wearables",
      tags: ["fitness", "health", "wearable"],
      inStock: true
    },
    {
      id: 3,
      name: "Smartphone",
      description: "Latest generation smartphone with advanced camera",
      price: 799.99,
      image: "\u{1F4F1}",
      category: "Phones",
      tags: ["mobile", "camera", "premium"],
      inStock: false
    },
    {
      id: 4,
      name: "Laptop",
      description: "Ultralight laptop with all-day battery life",
      price: 1299.99,
      image: "\u{1F4BB}",
      category: "Computers",
      tags: ["computer", "portable", "premium"],
      inStock: true
    },
    {
      id: 5,
      name: "Wireless Earbuds",
      description: "Compact wireless earbuds with charging case",
      price: 129.99,
      image: "\u{1F3A7}",
      category: "Audio",
      tags: ["wireless", "audio", "portable"],
      inStock: true
    },
    {
      id: 6,
      name: "Tablet",
      description: "High-resolution tablet with stylus support",
      price: 549.99,
      image: "\u{1F4F1}",
      category: "Computers",
      tags: ["portable", "touchscreen", "premium"],
      inStock: true
    }
  ];
  const categories = [...new Set(products.map((product) => product.category))];
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "title": "Product Listing Demo", "data-astro-cid-5apuwlij": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container mx-auto py-8" data-astro-cid-5apuwlij> <h1 class="text-3xl font-bold mb-2" data-astro-cid-5apuwlij>Product Catalog</h1> <p class="text-gray-600 mb-8" data-astro-cid-5apuwlij>Demonstrating the CardComponent in a product listing scenario</p> <div class="flex flex-col md:flex-row gap-8" data-astro-cid-5apuwlij> <!-- Sidebar filters --> <aside class="w-full md:w-64 shrink-0" data-astro-cid-5apuwlij> <div class="bg-card rounded-xl border p-6 sticky top-4" data-astro-cid-5apuwlij> <h2 class="text-xl font-bold mb-4" data-astro-cid-5apuwlij>Filters</h2> <div class="mb-6" data-astro-cid-5apuwlij> <h3 class="font-semibold mb-2" data-astro-cid-5apuwlij>Categories</h3> <div class="flex flex-col gap-2" data-astro-cid-5apuwlij> ${categories.map((category) => renderTemplate`<label class="flex items-center gap-2" data-astro-cid-5apuwlij> <input type="checkbox" name="category"${addAttribute(category, "value")} data-astro-cid-5apuwlij> <span data-astro-cid-5apuwlij>${category}</span> </label>`)} </div> </div> <div class="mb-6" data-astro-cid-5apuwlij> <h3 class="font-semibold mb-2" data-astro-cid-5apuwlij>Price Range</h3> <div class="flex flex-col gap-2" data-astro-cid-5apuwlij> <label class="flex items-center gap-2" data-astro-cid-5apuwlij> <input type="checkbox" name="price" value="0-100" data-astro-cid-5apuwlij> <span data-astro-cid-5apuwlij>$0 - $100</span> </label> <label class="flex items-center gap-2" data-astro-cid-5apuwlij> <input type="checkbox" name="price" value="100-500" data-astro-cid-5apuwlij> <span data-astro-cid-5apuwlij>$100 - $500</span> </label> <label class="flex items-center gap-2" data-astro-cid-5apuwlij> <input type="checkbox" name="price" value="500+" data-astro-cid-5apuwlij> <span data-astro-cid-5apuwlij>$500+</span> </label> </div> </div> <div data-astro-cid-5apuwlij> <h3 class="font-semibold mb-2" data-astro-cid-5apuwlij>Availability</h3> <label class="flex items-center gap-2" data-astro-cid-5apuwlij> <input type="checkbox" name="inStock" value="true" checked data-astro-cid-5apuwlij> <span data-astro-cid-5apuwlij>In Stock Only</span> </label> </div> ${renderComponent($$result2, "Button", $$Button, { "class": "w-full mt-6", "data-astro-cid-5apuwlij": true }, { "default": ($$result3) => renderTemplate`Apply Filters` })} </div> </aside> <!-- Product grid --> <div class="flex-1" data-astro-cid-5apuwlij> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" data-astro-cid-5apuwlij> ${products.map((product) => renderTemplate`${renderComponent($$result2, "CardComponent", $$CardComponent, { "title": product.name, "description": product.description, "hasCustomContent": true, "width": "w-full", "data-astro-cid-5apuwlij": true }, { "default": ($$result3) => renderTemplate` <div class="px-8 py-4" data-astro-cid-5apuwlij> <div class="aspect-video bg-secondary/10 rounded-lg mb-4 flex items-center justify-center" data-astro-cid-5apuwlij> <span class="text-5xl" data-astro-cid-5apuwlij>${product.image}</span> </div> <div class="flex justify-between items-center" data-astro-cid-5apuwlij> <span class="font-bold text-lg" data-astro-cid-5apuwlij>$${product.price.toFixed(2)}</span> ${product.inStock ? renderTemplate`${renderComponent($$result3, "Badge", $$Badge, { "variant": "success", "data-astro-cid-5apuwlij": true }, { "default": ($$result4) => renderTemplate`In Stock` })}` : renderTemplate`${renderComponent($$result3, "Badge", $$Badge, { "variant": "error", "data-astro-cid-5apuwlij": true }, { "default": ($$result4) => renderTemplate`Out of Stock` })}`} </div> <div class="mt-3 flex flex-wrap gap-1" data-astro-cid-5apuwlij> ${product.tags.map((tag) => renderTemplate`${renderComponent($$result3, "Badge", $$Badge, { "variant": "outline", "class": "text-xs", "data-astro-cid-5apuwlij": true }, { "default": ($$result4) => renderTemplate`${tag}` })}`)} </div> </div>  `, "footer": ($$result3) => renderTemplate`<div class="flex justify-between w-full px-8 pb-6" data-astro-cid-5apuwlij> ${renderComponent($$result3, "Button", $$Button, { "variant": "outline", "disabled": !product.inStock, "data-astro-cid-5apuwlij": true }, { "default": ($$result4) => renderTemplate`Add to Cart` })} ${renderComponent($$result3, "Button", $$Button, { "variant": "primary", "disabled": !product.inStock, "data-astro-cid-5apuwlij": true }, { "default": ($$result4) => renderTemplate`Buy Now` })} </div>` })}`)} </div> </div> </div> </main> ` })} `;
}, "/home/matsu/Desktop/jy/src/pages/product-demo.astro", void 0);

const $$file = "/home/matsu/Desktop/jy/src/pages/product-demo.astro";
const $$url = "/product-demo";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$ProductDemo,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

import { a as createComponent, r as renderComponent, f as renderScript, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from './astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import { a as $$BaseLayout } from './BaseLayout_DEWwRiOq.mjs';
import { $ as $$Image } from './_astro_assets_Dyr0I2ei.mjs';
/* empty css                                     */

const $$250318Photoswipe = createComponent(async ($$result, $$props, $$slots) => {
  const portfolioItems = [
    {
      title: "Serene Landscapes",
      thumbnail: "https://picsum.photos/800/600?random=1",
      fullImage: "https://picsum.photos/1920/1080?random=1",
      description: "Capturing the beauty of nature"
    },
    {
      title: "Urban Exploration",
      thumbnail: "https://picsum.photos/800/600?random=2",
      fullImage: "https://picsum.photos/1920/1080?random=2",
      description: "Discovering hidden city gems"
    },
    {
      title: "Portrait Series",
      thumbnail: "https://picsum.photos/800/600?random=3",
      fullImage: "https://picsum.photos/1920/1080?random=3",
      description: "Revealing the human spirit"
    },
    {
      title: "Wildlife Wonders",
      thumbnail: "https://picsum.photos/800/600?random=4",
      fullImage: "https://picsum.photos/1920/1080?random=4",
      description: "Capturing nature's untamed beauty"
    },
    {
      title: "Abstract Visions",
      thumbnail: "https://picsum.photos/800/600?random=5",
      fullImage: "https://picsum.photos/1920/1080?random=5",
      description: "Exploring form and color"
    },
    {
      title: "Street Photography",
      thumbnail: "https://picsum.photos/800/600?random=6",
      fullImage: "https://picsum.photos/1920/1080?random=6",
      description: "Life unfolding in public spaces"
    },
    {
      title: "Architectural Marvels",
      thumbnail: "https://picsum.photos/800/600?random=7",
      fullImage: "https://picsum.photos/1920/1080?random=7",
      description: "Celebrating human-made structures"
    },
    {
      title: "Macro Worlds",
      thumbnail: "https://picsum.photos/800/600?random=8",
      fullImage: "https://picsum.photos/1920/1080?random=8",
      description: "Revealing the unseen details"
    }
  ];
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Photography Portfolio", "data-astro-cid-fj4h53dp": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container mx-auto px-4 py-8" data-astro-cid-fj4h53dp> <h1 class="text-4xl font-bold mb-8" data-astro-cid-fj4h53dp>Photography Portfolio</h1> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 masonry" data-astro-cid-fj4h53dp> ${portfolioItems.map((item) => renderTemplate`<a${addAttribute(item.fullImage, "href")} data-pswp-width="1920" data-pswp-height="1080" target="_blank" class="relative overflow-hidden rounded-lg shadow-lg cursor-pointer gallery-item" data-astro-cid-fj4h53dp> ${renderComponent($$result2, "Image", $$Image, { "src": item.thumbnail, "alt": item.title, "width": 800, "height": 600, "class": "w-full h-auto transition-transform duration-300 transform hover:scale-110", "data-astro-cid-fj4h53dp": true })} <div class="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300 bg-black bg-opacity-50" data-astro-cid-fj4h53dp> <div class="text-white text-center" data-astro-cid-fj4h53dp> <h3 class="text-xl font-semibold" data-astro-cid-fj4h53dp>${item.title}</h3> <p class="mt-2" data-astro-cid-fj4h53dp>${item.description}</p> </div> </div> </a>`)} </div> </main> ` })} ${renderScript($$result, "/home/matsu/Desktop/jy/src/pages/sketches/2025/250318-photoswipe.astro?astro&type=script&index=0&lang.ts")} `;
}, "/home/matsu/Desktop/jy/src/pages/sketches/2025/250318-photoswipe.astro", void 0);

const $$file = "/home/matsu/Desktop/jy/src/pages/sketches/2025/250318-photoswipe.astro";
const $$url = "/sketches/2025/250318-photoswipe";

const __vite_glob_0_6 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$250318Photoswipe,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { __vite_glob_0_6 as _ };

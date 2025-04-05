import { c as createAstro, a as createComponent, r as renderComponent, f as renderScript, b as renderTemplate, m as maybeRenderHead, d as addAttribute } from '../chunks/astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import { a as $$BaseLayout, S as SITE_TITLE } from '../chunks/BaseLayout_DEWwRiOq.mjs';
/* empty css                                     */
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro("https://jasperyong.com");
const $$Portfolio = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Portfolio;
  const portfolioItems = [
    {
      title: "Paramount Property",
      category: "Web Development",
      thumbnail: "https://picsum.photos/id/237/1920/1080",
      images: [
        {
          src: "https://picsum.photos/id/237/1920/1080",
          width: 1920,
          height: 1080,
          caption: "Homepage design showcasing property listings"
        },
        {
          src: "https://picsum.photos/id/238/800/600",
          width: 800,
          height: 600,
          caption: "Interactive property search interface"
        },
        {
          src: "https://picsum.photos/id/239/800/600",
          width: 800,
          height: 600,
          caption: "Mobile responsive design"
        }
      ],
      description: "Corporate website development for Malaysia's leading property developer",
      tags: ["WordPress", "Custom Theme", "Property Portal"],
      year: "2023"
    },
    {
      title: "E-commerce Platform",
      category: "Full Stack Development",
      thumbnail: "https://picsum.photos/id/240/1920/1080",
      images: [
        {
          src: "https://picsum.photos/id/240/1920/1080",
          width: 1920,
          height: 1080,
          caption: "Product catalog with advanced filtering"
        },
        {
          src: "https://picsum.photos/id/242/800/600",
          width: 800,
          height: 600,
          caption: "Shopping cart and checkout process"
        },
        {
          src: "https://picsum.photos/id/243/800/600",
          width: 800,
          height: 600,
          caption: "Admin dashboard for inventory management"
        }
      ],
      description: "Modern e-commerce platform with real-time inventory management",
      tags: ["React", "Node.js", "MongoDB"],
      year: "2023"
    },
    {
      title: "Travel Blog Platform",
      category: "Web Design",
      thumbnail: "https://picsum.photos/id/244/1920/1080",
      images: [
        {
          src: "https://picsum.photos/id/244/1920/1080",
          width: 1920,
          height: 1080,
          caption: "Homepage with featured destinations"
        },
        {
          src: "https://picsum.photos/id/216/800/600",
          width: 800,
          height: 600,
          caption: "Blog post layout with rich media"
        },
        {
          src: "https://picsum.photos/id/217/800/600",
          width: 800,
          height: 600,
          caption: "Interactive map integration"
        }
      ],
      description: "Custom blog platform for travel enthusiasts with dynamic content management",
      tags: ["Astro", "TailwindCSS", "Markdown"],
      year: "2024"
    },
    {
      title: "Healthcare Dashboard",
      category: "UI/UX Design",
      thumbnail: "https://picsum.photos/id/248/1920/1080",
      images: [
        {
          src: "https://picsum.photos/id/248/1920/1080",
          width: 1920,
          height: 1080,
          caption: "Patient monitoring dashboard"
        },
        {
          src: "https://picsum.photos/id/250/800/600",
          width: 800,
          height: 600,
          caption: "Medical records interface"
        },
        {
          src: "https://picsum.photos/id/251/800/600",
          width: 800,
          height: 600,
          caption: "Analytics and reporting tools"
        }
      ],
      description: "Interactive dashboard for healthcare professionals with real-time patient monitoring",
      tags: ["Vue.js", "D3.js", "Firebase"],
      year: "2023"
    },
    {
      title: "Mobile Banking App",
      category: "Mobile Development",
      thumbnail: "https://picsum.photos/id/252/1920/1080",
      images: [
        {
          src: "https://picsum.photos/id/252/1920/1080",
          width: 1920,
          height: 1080,
          caption: "Mobile banking home screen"
        },
        {
          src: "https://picsum.photos/id/254/800/600",
          width: 800,
          height: 600,
          caption: "Transaction history and analytics"
        },
        {
          src: "https://picsum.photos/id/255/800/600",
          width: 800,
          height: 600,
          caption: "Secure payment interface"
        }
      ],
      description: "Secure and user-friendly mobile banking application",
      tags: ["React Native", "TypeScript", "AWS"],
      year: "2024"
    },
    {
      title: "AI Content Platform",
      category: "Machine Learning",
      thumbnail: "https://picsum.photos/id/256/1920/1080",
      images: [
        {
          src: "https://picsum.photos/id/256/1920/1080",
          width: 1920,
          height: 1080,
          caption: "AI content generation interface"
        },
        {
          src: "https://picsum.photos/id/258/800/600",
          width: 800,
          height: 600,
          caption: "Content optimization dashboard"
        },
        {
          src: "https://picsum.photos/id/259/800/600",
          width: 800,
          height: 600,
          caption: "Analytics and performance metrics"
        }
      ],
      description: "AI-powered content generation and optimization platform",
      tags: ["Python", "TensorFlow", "FastAPI"],
      year: "2024"
    }
  ];
  const projectsByYear = portfolioItems.reduce((acc, project) => {
    acc[project.year] = [...acc[project.year] || [], project];
    return acc;
  }, {});
  const { exposedPortfolioItems } = Astro2.props;
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, { "title": `Portfolio - ${SITE_TITLE}`, "data-astro-cid-hcjuqwdu": true }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container-fluid py-5 px-4 bg-gray-100 dark:bg-gray-900" data-astro-cid-hcjuqwdu> <div class="container mx-auto gallery-parent" data-astro-cid-hcjuqwdu> <div class="text-center mb-12" data-astro-cid-hcjuqwdu> <p class="text-sm uppercase tracking-widest text-gray-500 dark:text-gray-400 mb-2" data-astro-cid-hcjuqwdu>Elements</p> <h1 class="text-4xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-white" data-astro-cid-hcjuqwdu>See the highlights</h1> <p class="text-xl text-gray-600 dark:text-gray-300" data-astro-cid-hcjuqwdu>
of this website.
</p> </div> ${Object.entries(projectsByYear).reverse().map(([year, projects]) => renderTemplate`<div class="mb-12" data-astro-cid-hcjuqwdu> <h2 class="text-2xl font-semibold mb-6 text-gray-800 dark:text-gray-200" data-astro-cid-hcjuqwdu>${year}</h2> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6" data-astro-cid-hcjuqwdu> ${projects.map((item, index) => renderTemplate`<div class="group"${addAttribute(index, "data-index")} data-astro-cid-hcjuqwdu> <div class="bg-gray-800 rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl" data-astro-cid-hcjuqwdu> <div class="relative" data-astro-cid-hcjuqwdu> <a${addAttribute(item.images[0].src, "href")} data-pswp-width="1920" data-pswp-height="1080" target="_blank" class="gallery-link block" data-astro-cid-hcjuqwdu> <div class="relative p-4 pt-6 pb-5" data-astro-cid-hcjuqwdu> <div class="absolute top-0 left-0 right-0 flex items-center px-4 py-2 space-x-1" data-astro-cid-hcjuqwdu> <div class="w-3 h-3 bg-red-400 rounded-full" data-astro-cid-hcjuqwdu></div> <div class="w-3 h-3 bg-yellow-400 rounded-full" data-astro-cid-hcjuqwdu></div> <div class="w-3 h-3 bg-green-400 rounded-full" data-astro-cid-hcjuqwdu></div> </div> <div class="border border-gray-600 rounded-md overflow-hidden" data-astro-cid-hcjuqwdu> <img${addAttribute(item.thumbnail, "src")} class="w-full object-cover aspect-video"${addAttribute(item.title, "alt")} loading="lazy" data-astro-cid-hcjuqwdu> </div> </div> </a> ${item.images.map(
    (image, imgIndex) => imgIndex > 0 ? renderTemplate`<a${addAttribute(imgIndex, "key")}${addAttribute(image.src, "href")}${addAttribute(image.width, "data-pswp-width")}${addAttribute(image.height, "data-pswp-height")} target="_blank" class="gallery-link hidden" data-astro-cid-hcjuqwdu></a>` : null
  )} ${item.images.length > 1 && renderTemplate`<span class="absolute top-2 right-2 text-xs bg-black bg-opacity-70 text-white px-2 py-1 rounded-full" data-astro-cid-hcjuqwdu> <i class="bi bi-images" data-astro-cid-hcjuqwdu></i> ${item.images.length} </span>`} </div> <div class="p-5 pt-0" data-astro-cid-hcjuqwdu> <div class="flex justify-between items-start mb-3" data-astro-cid-hcjuqwdu> <h3 class="text-lg font-medium text-white" data-astro-cid-hcjuqwdu>${item.title}</h3> <span class="text-xs text-teal-400 font-medium px-2 py-1 rounded bg-teal-400 bg-opacity-10" data-astro-cid-hcjuqwdu> ${item.category} </span> </div> <p class="text-gray-400 text-sm mb-4" data-astro-cid-hcjuqwdu>${item.description}</p> <div class="flex flex-wrap gap-2 mb-4" data-astro-cid-hcjuqwdu> ${item.tags.map((tag) => renderTemplate`<span class="text-xs font-medium text-gray-300 bg-gray-700 px-2 py-1 rounded" data-astro-cid-hcjuqwdu> ${tag} </span>`)} </div> <div class="flex justify-between items-center pt-2 border-t border-gray-700" data-astro-cid-hcjuqwdu> <span class="text-xs text-gray-400" data-astro-cid-hcjuqwdu>${item.year}</span> <button class="text-sm text-white hover:text-teal-400 transition-colors duration-200 flex items-center gap-1" data-astro-cid-hcjuqwdu>
View Project <i class="bi bi-arrow-right" data-astro-cid-hcjuqwdu></i> </button> </div> </div> </div> </div>`)} </div> </div>`)} </div> </main> ` })} ${renderScript($$result, "/home/matsu/Desktop/jy/src/pages/portfolio.astro?astro&type=script&index=0&lang.ts")}  `;
}, "/home/matsu/Desktop/jy/src/pages/portfolio.astro", void 0);

const $$file = "/home/matsu/Desktop/jy/src/pages/portfolio.astro";
const $$url = "/portfolio";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Portfolio,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

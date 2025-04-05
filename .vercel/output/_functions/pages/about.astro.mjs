import { a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import { a as $$BaseLayout, R as RESUME_LINK } from '../chunks/BaseLayout_DEWwRiOq.mjs';
export { renderers } from '../renderers.mjs';

const $$About = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$BaseLayout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="d-flex flex-column align-items-center justify-content-center"> <section class="container py-3"> <div class="row"> <div class="col col-md-7"> <h2>Welcome to My Website!</h2> <p>
Welcome to my website! I'm Jasper, a dedicated full-stack web
            developer with a passion for crafting seamless web solutions. With
            over 8 years of experience, I thrive on bringing user-friendly,
            engaging digital experiences to life. This website is not just a
            showcase of my work—it's a glimpse into my journey of continuous
            learning and my pursuit of simplicity and function in every project.
</p> <p><strong>What I'm up to Now</strong></p> <p>
Currently, I'm on the lookout for new opportunities to expand my
            skills and knowledge. When I’m not developing or learning, I'm
            spending time with my family, exploring new hobbies, and indulging
            in creative pursuits.
</p> ${RESUME_LINK} </div> </div> </section> </main> ` })}`;
}, "/home/matsu/Desktop/jy/src/pages/about.astro", void 0);

const $$file = "/home/matsu/Desktop/jy/src/pages/about.astro";
const $$url = "/about";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$About,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };

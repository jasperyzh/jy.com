import { c as createAstro, a as createComponent, m as maybeRenderHead, d as addAttribute, b as renderTemplate } from './astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import 'clsx';

const $$Astro = createAstro("https://jasperyong.com");
const $$ReturnButton = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$ReturnButton;
  const { href, label, onClick } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<a${addAttribute(href, "href")} class="btn btn-secondary my-3"${addAttribute(onClick, "onclick")}> <i class="bi bi-arrow-left"></i> ${label} </a> <!-- <style>
    .btn {
        margin-top: 1rem;
        text-decoration: none;
        padding: 0.5rem 1rem;
        background-color: #007bff;
        color: white;
        border: none;
        border-radius: 0.25rem;
        transition: background-color 0.3s;
    }

    .btn:hover {
        background-color: #0056b3;
    }
</style> -->`;
}, "/home/matsu/Desktop/jy/src/components/ReturnButton.astro", void 0);

export { $$ReturnButton as $ };

import { renderers } from './renderers.mjs';
import { a as actions } from './chunks/_noop-actions_CfKMStZn.mjs';
import { c as createExports } from './chunks/entrypoint_CgK5L9Ie.mjs';
import { manifest } from './manifest_BA8xnTrl.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/about.astro.mjs');
const _page3 = () => import('./pages/blog/page/_page_.astro.mjs');
const _page4 = () => import('./pages/blog.astro.mjs');
const _page5 = () => import('./pages/blog/_---slug_.astro.mjs');
const _page6 = () => import('./pages/contact.astro.mjs');
const _page7 = () => import('./pages/microblog/page/_page_.astro.mjs');
const _page8 = () => import('./pages/microblog/tags/_tag_.astro.mjs');
const _page9 = () => import('./pages/microblog/type/_type_.astro.mjs');
const _page10 = () => import('./pages/microblog.astro.mjs');
const _page11 = () => import('./pages/microblog/_---slug_.astro.mjs');
const _page12 = () => import('./pages/portfolio.astro.mjs');
const _page13 = () => import('./pages/resume.astro.mjs');
const _page14 = () => import('./pages/sketches/2025/250314-pixijs-filter.astro.mjs');
const _page15 = () => import('./pages/sketches/2025/250314-pixijs-videofilter.astro.mjs');
const _page16 = () => import('./pages/sketches/2025/250316-quizgame.astro.mjs');
const _page17 = () => import('./pages/sketches/2025/250316-survey_form.astro.mjs');
const _page18 = () => import('./pages/sketches/2025/250316-the-malaysian-clock.astro.mjs');
const _page19 = () => import('./pages/sketches/2025/250316-wheeloffortune.astro.mjs');
const _page20 = () => import('./pages/sketches/2025/250318-photoswipe.astro.mjs');
const _page21 = () => import('./pages/sketches/2025/250319-portfolio-tailwindtheme.astro.mjs');
const _page22 = () => import('./pages/sketches/2025/250322-carouselsliders.astro.mjs');
const _page23 = () => import('./pages/sketches/2025/250322-fullpageslides.astro.mjs');
const _page24 = () => import('./pages/sketches/2025/250322-gsapanimation.astro.mjs');
const _page25 = () => import('./pages/sketches/2025/250322-invoicegenerator.astro.mjs');
const _page26 = () => import('./pages/sketches/2025/250322-viewtransition.astro.mjs');
const _page27 = () => import('./pages/sketches/2025/250322-vuejs-todolist.astro.mjs');
const _page28 = () => import('./pages/sketches/2025/250323-canvas_generate_art.astro.mjs');
const _page29 = () => import('./pages/sketches/2025/250323-habittracker.astro.mjs');
const _page30 = () => import('./pages/sketches/2025/250326-bento_grid_processing.astro.mjs');
const _page31 = () => import('./pages/sketches/2025/250326-perlin_noise_deepseek.astro.mjs');
const _page32 = () => import('./pages/sketches/2025/250326-perlin_noise_worldmap.astro.mjs');
const _page33 = () => import('./pages/sketches/2025/250326-phaser_dino.astro.mjs');
const _page34 = () => import('./pages/sketches/2025/250327-cloud_works_bento.astro.mjs');
const _page35 = () => import('./pages/sketches/2025/250327-cloud_works_bento2_5.astro.mjs');
const _page36 = () => import('./pages/sketches/2025/250327-gemini_8bitsfx.astro.mjs');
const _page37 = () => import('./pages/sketches/250401-again.astro.mjs');
const _page38 = () => import('./pages/sketches/250401-flowarrow.astro.mjs');
const _page39 = () => import('./pages/sketches/250404-yantra.astro.mjs');
const _page40 = () => import('./pages/sketches/webdev/250323-sirsandwichmenu1.astro.mjs');
const _page41 = () => import('./pages/sketches/webdev/250323-sirsandwichmenu2.astro.mjs');
const _page42 = () => import('./pages/sketches/webdev/250402-goldenratiocssgrid.astro.mjs');
const _page43 = () => import('./pages/sketches/webdev/250402-undo_technique.astro.mjs');
const _page44 = () => import('./pages/sketches.astro.mjs');
const _page45 = () => import('./pages/tags/_tag_.astro.mjs');
const _page46 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/about.astro", _page2],
    ["src/pages/blog/page/[page].astro", _page3],
    ["src/pages/blog/index.astro", _page4],
    ["src/pages/blog/[...slug].astro", _page5],
    ["src/pages/contact.astro", _page6],
    ["src/pages/microblog/page/[page].astro", _page7],
    ["src/pages/microblog/tags/[tag].astro", _page8],
    ["src/pages/microblog/type/[type].astro", _page9],
    ["src/pages/microblog/index.astro", _page10],
    ["src/pages/microblog/[...slug].astro", _page11],
    ["src/pages/portfolio.astro", _page12],
    ["src/pages/resume.astro", _page13],
    ["src/pages/sketches/2025/250314-pixijs-filter.astro", _page14],
    ["src/pages/sketches/2025/250314-pixijs-videofilter.astro", _page15],
    ["src/pages/sketches/2025/250316-quizgame.astro", _page16],
    ["src/pages/sketches/2025/250316-survey_form.astro", _page17],
    ["src/pages/sketches/2025/250316-the-malaysian-clock.astro", _page18],
    ["src/pages/sketches/2025/250316-wheeloffortune.astro", _page19],
    ["src/pages/sketches/2025/250318-photoswipe.astro", _page20],
    ["src/pages/sketches/2025/250319-portfolio-tailwindtheme.astro", _page21],
    ["src/pages/sketches/2025/250322-carouselsliders.astro", _page22],
    ["src/pages/sketches/2025/250322-fullpageslides.astro", _page23],
    ["src/pages/sketches/2025/250322-gsapanimation.astro", _page24],
    ["src/pages/sketches/2025/250322-invoicegenerator.astro", _page25],
    ["src/pages/sketches/2025/250322-viewtransition.astro", _page26],
    ["src/pages/sketches/2025/250322-vuejs-todolist.astro", _page27],
    ["src/pages/sketches/2025/250323-canvas_generate_art.astro", _page28],
    ["src/pages/sketches/2025/250323-habittracker.astro", _page29],
    ["src/pages/sketches/2025/250326-bento_grid_processing.astro", _page30],
    ["src/pages/sketches/2025/250326-perlin_noise_deepseek.astro", _page31],
    ["src/pages/sketches/2025/250326-perlin_noise_worldmap.astro", _page32],
    ["src/pages/sketches/2025/250326-phaser_dino.astro", _page33],
    ["src/pages/sketches/2025/250327-cloud_works_bento.astro", _page34],
    ["src/pages/sketches/2025/250327-cloud_works_bento2_5.astro", _page35],
    ["src/pages/sketches/2025/250327-gemini_8bitsfx.astro", _page36],
    ["src/pages/sketches/250401-again.astro", _page37],
    ["src/pages/sketches/250401-flowarrow.astro", _page38],
    ["src/pages/sketches/250404-yantra.astro", _page39],
    ["src/pages/sketches/webdev/250323-sirsandwichmenu1.astro", _page40],
    ["src/pages/sketches/webdev/250323-sirsandwichmenu2.astro", _page41],
    ["src/pages/sketches/webdev/250402-goldenratiocssgrid.astro", _page42],
    ["src/pages/sketches/webdev/250402-undo_technique.astro", _page43],
    ["src/pages/sketches/index.astro", _page44],
    ["src/pages/tags/[tag].astro", _page45],
    ["src/pages/index.astro", _page46]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "5be745aa-a04d-4d39-8ade-73f4507f4b39",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };

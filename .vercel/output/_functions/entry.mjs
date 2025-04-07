import { renderers } from './renderers.mjs';
import { a as actions } from './chunks/_noop-actions_CfKMStZn.mjs';
import { c as createExports } from './chunks/entrypoint_CoktgCae.mjs';
import { manifest } from './manifest_utGB9hUC.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/404.astro.mjs');
const _page2 = () => import('./pages/blog/page/_page_.astro.mjs');
const _page3 = () => import('./pages/blog/tag/_tag_.astro.mjs');
const _page4 = () => import('./pages/blog.astro.mjs');
const _page5 = () => import('./pages/blog/_---slug_.astro.mjs');
const _page6 = () => import('./pages/card-examples.astro.mjs');
const _page7 = () => import('./pages/components.astro.mjs');
const _page8 = () => import('./pages/contact.astro.mjs');
const _page9 = () => import('./pages/docs.astro.mjs');
const _page10 = () => import('./pages/docs/_---slug_.astro.mjs');
const _page11 = () => import('./pages/portfolio.astro.mjs');
const _page12 = () => import('./pages/product-demo.astro.mjs');
const _page13 = () => import('./pages/resume.astro.mjs');
const _page14 = () => import('./pages/sketches/category/_category_.astro.mjs');
const _page15 = () => import('./pages/sketches/tag/_tag_.astro.mjs');
const _page16 = () => import('./pages/sketches.astro.mjs');
const _page17 = () => import('./pages/sketches/_---slug_.astro.mjs');
const _page18 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/404.astro", _page1],
    ["src/pages/blog/page/[page].astro", _page2],
    ["src/pages/blog/tag/[tag].astro", _page3],
    ["src/pages/blog/index.astro", _page4],
    ["src/pages/blog/[...slug].astro", _page5],
    ["src/pages/card-examples.astro", _page6],
    ["src/pages/components.astro", _page7],
    ["src/pages/contact.astro", _page8],
    ["src/pages/docs/index.astro", _page9],
    ["src/pages/docs/[...slug].astro", _page10],
    ["src/pages/portfolio.astro", _page11],
    ["src/pages/product-demo.astro", _page12],
    ["src/pages/resume.astro", _page13],
    ["src/pages/sketches/category/[category].astro", _page14],
    ["src/pages/sketches/tag/[tag].astro", _page15],
    ["src/pages/sketches/index.astro", _page16],
    ["src/pages/sketches/[...slug].astro", _page17],
    ["src/pages/index.astro", _page18]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions,
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "90f6a47b-a2c4-4bb4-af2b-38336cb48970",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;

export { __astrojsSsrVirtualEntry as default, pageMap };

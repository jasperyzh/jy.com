import { a as createComponent, r as renderComponent, f as renderScript, b as renderTemplate, m as maybeRenderHead } from './astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import { a as $$BaseLayout } from './BaseLayout_DEWwRiOq.mjs';
/* empty css                                              */

const $$250323CanvasGenerateArt = createComponent(($$result, $$props, $$slots) => {
  const sketch_title = "View Transition";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": sketch_title, "data-astro-cid-gu6azwpr": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="container" data-astro-cid-gu6azwpr> <div class="toolbar" data-astro-cid-gu6azwpr> <div class="tool-group" data-astro-cid-gu6azwpr> <label for="colorPicker" data-astro-cid-gu6azwpr>Color:</label> <input type="color" id="colorPicker" value="#000000" data-astro-cid-gu6azwpr> </div> <div class="tool-group" data-astro-cid-gu6azwpr> <label for="brushSize" data-astro-cid-gu6azwpr>Brush Size:</label> <input type="range" id="brushSize" min="1" max="50" value="5" data-astro-cid-gu6azwpr> </div> <button id="generateBtn" data-astro-cid-gu6azwpr>Generate Art</button> <button id="eraserBtn" data-astro-cid-gu6azwpr>Eraser</button> <button id="penBtn" data-astro-cid-gu6azwpr>Pen</button> <button id="clearBtn" data-astro-cid-gu6azwpr>Clear Canvas</button> <button id="saveBtn" data-astro-cid-gu6azwpr>Save Artwork</button> </div> <canvas id="canvas" data-astro-cid-gu6azwpr></canvas> </div> ` })} ${renderScript($$result, "/home/matsu/Desktop/jy/src/pages/sketches/2025/250323-canvas_generate_art.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/matsu/Desktop/jy/src/pages/sketches/2025/250323-canvas_generate_art.astro", void 0);

const $$file = "/home/matsu/Desktop/jy/src/pages/sketches/2025/250323-canvas_generate_art.astro";
const $$url = "/sketches/2025/250323-canvas_generate_art";

const __vite_glob_0_14 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$250323CanvasGenerateArt,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { __vite_glob_0_14 as _ };

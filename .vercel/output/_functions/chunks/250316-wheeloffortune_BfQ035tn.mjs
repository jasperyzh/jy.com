import { a as createComponent, r as renderComponent, f as renderScript, b as renderTemplate, m as maybeRenderHead } from './astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import { a as $$BaseLayout } from './BaseLayout_DEWwRiOq.mjs';
/* empty css                                         */

const $$250316Wheeloffortune = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Wheel of Fortune" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container mx-auto"> <h1>Wheel of Fortune</h1> <div class="wheel-fortune"> <div id="app"></div> <div id="confetti-container"></div> <!-- Volume Control UI --> <div class="audio-controls"> <label for="volume-slider">Volume:</label> <input type="range" id="volume-slider" min="0" max="100" value="40"> <button id="mute-toggle">🔊</button> </div> </div> </main> ` })}  ${renderScript($$result, "/home/matsu/Desktop/jy/src/pages/sketches/2025/250316-wheeloffortune.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/matsu/Desktop/jy/src/pages/sketches/2025/250316-wheeloffortune.astro", void 0);

const $$file = "/home/matsu/Desktop/jy/src/pages/sketches/2025/250316-wheeloffortune.astro";
const $$url = "/sketches/2025/250316-wheeloffortune";

const __vite_glob_0_5 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$250316Wheeloffortune,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { __vite_glob_0_5 as _ };

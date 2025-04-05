import { a as createComponent, r as renderComponent, f as renderScript, b as renderTemplate, m as maybeRenderHead } from './astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import { a as $$BaseLayout } from './BaseLayout_DEWwRiOq.mjs';
/* empty css                                   */

const $$250316Quizgame = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Quiz Game" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main id="quiz-game-container"> <h1>Exercise Page - Quiz Game</h1> <p>
[241205-quizgame] This page contains an interactive Quiz Game component.
</p> <div id="quiz-app"></div> <div id="confetti-container"></div> <!-- Volume Control UI --> <div class="audio-controls"> <label for="volume-slider">Volume:</label> <input type="range" id="volume-slider" min="0" max="100" value="40"> <button id="mute-toggle">🔊</button> </div> </main> ` })} ${renderScript($$result, "/home/matsu/Desktop/jy/src/pages/sketches/2025/250316-quizgame.astro?astro&type=script&index=0&lang.ts")} `;
}, "/home/matsu/Desktop/jy/src/pages/sketches/2025/250316-quizgame.astro", void 0);

const $$file = "/home/matsu/Desktop/jy/src/pages/sketches/2025/250316-quizgame.astro";
const $$url = "/sketches/2025/250316-quizgame";

const __vite_glob_0_2 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$250316Quizgame,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { __vite_glob_0_2 as _ };

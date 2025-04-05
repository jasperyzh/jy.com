import { a as createComponent, r as renderComponent, b as renderTemplate, m as maybeRenderHead, f as renderScript } from './astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import { a as $$BaseLayout } from './BaseLayout_DEWwRiOq.mjs';
/* empty css                                                */

const $$250326PerlinNoiseWorldmap = createComponent(($$result, $$props, $$slots) => {
  const title = "Procedural World Generator";
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": title, "data-astro-cid-jl4223tv": true }, { "default": ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="container mx-auto" data-astro-cid-jl4223tv> <h1 data-astro-cid-jl4223tv>Procedural World Generator</h1> <div class="controls" data-astro-cid-jl4223tv> <div class="control-group" data-astro-cid-jl4223tv> <label for="seed" data-astro-cid-jl4223tv>Seed</label> <input type="number" id="seed" value="42" data-astro-cid-jl4223tv> <label for="octaves" data-astro-cid-jl4223tv>Octaves: <span class="value-display" id="octaves-value" data-astro-cid-jl4223tv>4</span></label> <input type="range" id="octaves" min="1" max="8" step="1" value="4" data-astro-cid-jl4223tv> <label for="scale" data-astro-cid-jl4223tv>Scale: <span class="value-display" id="scale-value" data-astro-cid-jl4223tv>50</span></label> <input type="range" id="scale" min="10" max="200" value="50" data-astro-cid-jl4223tv> <label for="persistence" data-astro-cid-jl4223tv>Persistence: <span class="value-display" id="persistence-value" data-astro-cid-jl4223tv>0.5</span></label> <input type="range" id="persistence" min="0.1" max="1" step="0.1" value="0.5" data-astro-cid-jl4223tv> <button id="generate" data-astro-cid-jl4223tv>Generate World</button> </div> <div class="control-group" data-astro-cid-jl4223tv> <h3 data-astro-cid-jl4223tv>Biome Thresholds</h3> <label for="water" data-astro-cid-jl4223tv>Water: <span class="value-display" id="water-value" data-astro-cid-jl4223tv>-0.2</span></label> <input type="range" id="water" min="-1" max="1" step="0.05" value="-0.2" data-astro-cid-jl4223tv> <label for="sand" data-astro-cid-jl4223tv>Sand: <span class="value-display" id="sand-value" data-astro-cid-jl4223tv>-0.1</span></label> <input type="range" id="sand" min="-1" max="1" step="0.05" value="-0.1" data-astro-cid-jl4223tv> <label for="grass" data-astro-cid-jl4223tv>Grass: <span class="value-display" id="grass-value" data-astro-cid-jl4223tv>0.2</span></label> <input type="range" id="grass" min="-1" max="1" step="0.05" value="0.2" data-astro-cid-jl4223tv> <label for="forest" data-astro-cid-jl4223tv>Forest: <span class="value-display" id="forest-value" data-astro-cid-jl4223tv>0.4</span></label> <input type="range" id="forest" min="-1" max="1" step="0.05" value="0.4" data-astro-cid-jl4223tv> <label for="mountain" data-astro-cid-jl4223tv>Mountain: <span class="value-display" id="mountain-value" data-astro-cid-jl4223tv>0.6</span></label> <input type="range" id="mountain" min="-1" max="1" step="0.05" value="0.6" data-astro-cid-jl4223tv> </div> </div> <div class="legend" data-astro-cid-jl4223tv> <div class="legend-item" data-astro-cid-jl4223tv> <div class="legend-color" style="background:#1a1aff;" data-astro-cid-jl4223tv></div>Deep Water
</div> <div class="legend-item" data-astro-cid-jl4223tv> <div class="legend-color" style="background:#4d4dff;" data-astro-cid-jl4223tv></div>Shallow
        Water
</div> <div class="legend-item" data-astro-cid-jl4223tv> <div class="legend-color" style="background:#f2e68a;" data-astro-cid-jl4223tv></div>Sand
</div> <div class="legend-item" data-astro-cid-jl4223tv> <div class="legend-color" style="background:#7cfc00;" data-astro-cid-jl4223tv></div>Grass
</div> <div class="legend-item" data-astro-cid-jl4223tv> <div class="legend-color" style="background:#228b22;" data-astro-cid-jl4223tv></div>Forest
</div> <div class="legend-item" data-astro-cid-jl4223tv> <div class="legend-color" style="background:#8b4513;" data-astro-cid-jl4223tv></div>Mountain
</div> <div class="legend-item" data-astro-cid-jl4223tv> <div class="legend-color" style="background:#ffffff;" data-astro-cid-jl4223tv></div>Snow
</div> </div> <canvas id="world" width="800" height="600" data-astro-cid-jl4223tv></canvas> </div> ${renderScript($$result2, "/home/matsu/Desktop/jy/src/pages/sketches/2025/250326-perlin_noise_worldmap.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "/home/matsu/Desktop/jy/src/pages/sketches/2025/250326-perlin_noise_worldmap.astro", void 0);

const $$file = "/home/matsu/Desktop/jy/src/pages/sketches/2025/250326-perlin_noise_worldmap.astro";
const $$url = "/sketches/2025/250326-perlin_noise_worldmap";

const __vite_glob_0_18 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$250326PerlinNoiseWorldmap,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { __vite_glob_0_18 as _ };

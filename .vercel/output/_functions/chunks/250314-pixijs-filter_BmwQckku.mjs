import { c as createAstro, a as createComponent, m as maybeRenderHead, d as addAttribute, s as spreadAttributes, e as renderSlot, b as renderTemplate, r as renderComponent, f as renderScript } from './astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import { tv } from 'tailwind-variants';
import 'clsx';
import { a as $$BaseLayout } from './BaseLayout_DEWwRiOq.mjs';

const $$Astro$2 = createAstro("https://jasperyong.com");
const $$Label = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Label;
  const label = tv({
    base: [
      "text-foreground leading-none font-medium",
      "peer-disabled:cursor-not-allowed peer-disabled:opacity-70 has-[+:disabled]:cursor-not-allowed has-[+:disabled]:opacity-70"
    ],
    variants: { size: { sm: "text-sm", md: "text-base", lg: "text-lg" } },
    defaultVariants: { size: "md" }
  });
  const { size = "md", class: className = "", ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<label${addAttribute(label({ size, class: className }), "class")}${spreadAttributes(rest)}> ${renderSlot($$result, $$slots["default"])} </label>`;
}, "/home/matsu/Desktop/jy/src/components/starwind/label/Label.astro", void 0);

const $$Astro$1 = createAstro("https://jasperyong.com");
const $$Input = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Input;
  const input = tv({
    base: [
      "border-input bg-background text-foreground w-full rounded-md border",
      "focus:outline-outline focus:ring-0 focus:outline-2 focus:outline-offset-2",
      "file:text-foreground file:my-auto file:mr-4 file:h-full file:border-0 file:bg-transparent file:text-sm file:font-medium",
      "disabled:cursor-not-allowed disabled:opacity-50",
      "peer placeholder:text-muted-foreground"
    ],
    variants: {
      size: { sm: "h-9 px-2 text-sm", md: "h-11 px-3 text-base", lg: "h-12 px-4 text-lg" }
    },
    defaultVariants: { size: "md" }
  });
  const { size = "md", class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<input${addAttribute(input({ size, class: className }), "class")}${spreadAttributes(rest)}>`;
}, "/home/matsu/Desktop/jy/src/components/starwind/input/Input.astro", void 0);

const $$Astro = createAstro("https://jasperyong.com");
const $$250314PixijsFilter = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$250314PixijsFilter;
  const sketch_title = "PixiJS Filters Showcase";
  Astro2.url.pathname.split("/").pop().replace(".astro", "");
  const display_title = sketch_title ;
  return renderTemplate`${renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": sketch_title }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<main class="container mx-auto pixi-sketch"> <div class="my-4"> <div class="filter-container"> <!-- <Select id="filter-select" class="filter-select">
          <SelectTrigger class="w-[180px]">
            <SelectValue placeholder="Select Filter" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>PixiJS Filters</SelectLabel>
              <SelectItem value="None">None</SelectItem>
              <SelectItem value="Adjustment">Adjustment</SelectItem>
              <SelectItem value="ASCII">ASCII</SelectItem>
              <SelectItem value="Bloom">Bloom</SelectItem>
              <SelectItem value="Blur">Blur</SelectItem>
              <SelectItem value="Bulge Pinch">Bulge Pinch</SelectItem>
              <SelectItem value="Color Matrix - Sepia"
                >Color Matrix - Sepia</SelectItem
              >
              <SelectItem value="Color Matrix - Negative"
                >Color Matrix - Negative</SelectItem
              >
              <SelectItem value="Dot">Dot</SelectItem>
              <SelectItem value="Drop Shadow">Drop Shadow</SelectItem>
              <SelectItem value="Emboss">Emboss</SelectItem>
              <SelectItem value="Glitch">Glitch</SelectItem>
              <SelectItem value="Glow">Glow</SelectItem>
              <SelectItem value="Kawase Blur">Kawase Blur</SelectItem>
              <SelectItem value="Motion Blur">Motion Blur</SelectItem>
              <SelectItem value="Old Film">Old Film</SelectItem>
              <SelectItem value="Pixelate">Pixelate</SelectItem>
              <SelectItem value="RGB Split">RGB Split</SelectItem>
              <SelectItem value="Shockwave">Shockwave</SelectItem>
              <SelectItem value="Tilt Shift">Tilt Shift</SelectItem>
              <SelectItem value="Twist">Twist</SelectItem>
              <SelectItem value="Zoom Blur">Zoom Blur</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select> --> <!-- Fallback filter buttons in case the Select component has issues --> <div class="filter-buttons" style="margin-top: 10px;"> <p>Manual Filter Selection:</p> <div class="button-grid" style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 5px; margin-top: 5px;"> <button class="filter-button" data-filter="None">None</button> <button class="filter-button" data-filter="ASCII">ASCII</button> <button class="filter-button" data-filter="Bloom">Bloom</button> <button class="filter-button" data-filter="Glitch">Glitch</button> <button class="filter-button" data-filter="Blur">Blur</button> <button class="filter-button" data-filter="Glow">Glow</button> </div> </div> </div> <h3 id="current-filter" class="my-4">Current Filter: None</h3> </div> <div class="upload-controls"> <div class="mb-3"> ${renderComponent($$result2, "Label", $$Label, { "size": "md", "for": "background-upload" }, { "default": async ($$result3) => renderTemplate`Change Background: ` })} ${renderComponent($$result2, "Input", $$Input, { "type": "file", "id": "background-upload", "accept": "image/*", "placeholder": "Background input" })} </div> <div class="mb-3"> ${renderComponent($$result2, "Label", $$Label, { "size": "md", "for": "sprite-upload" }, { "default": async ($$result3) => renderTemplate`Change Sprite: ` })} ${renderComponent($$result2, "Input", $$Input, { "type": "file", "id": "sprite-upload", "accept": "image/*", "placeholder": "Sprite input" })} </div> </div> <div id="pixi-container"></div> <div class="filter-info"></div> <aside> ${display_title} </aside> </main> ` })} ${renderScript($$result, "/home/matsu/Desktop/jy/src/pages/sketches/2025/250314-pixijs-filter.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/matsu/Desktop/jy/src/pages/sketches/2025/250314-pixijs-filter.astro", void 0);

const $$file = "/home/matsu/Desktop/jy/src/pages/sketches/2025/250314-pixijs-filter.astro";
const $$url = "/sketches/2025/250314-pixijs-filter";

const __vite_glob_0_0 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$250314PixijsFilter,
	file: $$file,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { __vite_glob_0_0 as _ };

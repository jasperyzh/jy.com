import { c as createAstro, a as createComponent, m as maybeRenderHead, f as addAttribute, s as spreadAttributes, d as renderSlot, b as renderTemplate } from './astro/server_JhCfhjtA.mjs';
import { tv } from 'tailwind-variants';
import 'clsx';

const $$Astro$5 = createAstro("https://jasperyong.com");
const $$Card = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$5, $$props, $$slots);
  Astro2.self = $$Card;
  const card = tv({ base: "bg-card text-card-foreground rounded-2xl border shadow-sm" });
  const { class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(card({ class: className }), "class")}${spreadAttributes(rest)}> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/home/matsu/Desktop/jy/src/components/starwind/card/Card.astro", void 0);

const $$Astro$4 = createAstro("https://jasperyong.com");
const $$CardContent = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$4, $$props, $$slots);
  Astro2.self = $$CardContent;
  const cardContent = tv({ base: "p-8 pt-0" });
  const { class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(cardContent({ class: className }), "class")}${spreadAttributes(rest)}> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/home/matsu/Desktop/jy/src/components/starwind/card/CardContent.astro", void 0);

const $$Astro$3 = createAstro("https://jasperyong.com");
const $$CardDescription = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$CardDescription;
  const cardDescription = tv({ base: "text-muted-foreground text-base" });
  const { class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(cardDescription({ class: className }), "class")}${spreadAttributes(rest)}> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/home/matsu/Desktop/jy/src/components/starwind/card/CardDescription.astro", void 0);

const $$Astro$2 = createAstro("https://jasperyong.com");
const $$CardFooter = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$CardFooter;
  const cardFooter = tv({ base: "flex items-center p-8 pt-0" });
  const { class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(cardFooter({ class: className }), "class")}${spreadAttributes(rest)}> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/home/matsu/Desktop/jy/src/components/starwind/card/CardFooter.astro", void 0);

const $$Astro$1 = createAstro("https://jasperyong.com");
const $$CardHeader = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$CardHeader;
  const cardHeader = tv({ base: "flex flex-col space-y-2 p-8" });
  const { class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(cardHeader({ class: className }), "class")}${spreadAttributes(rest)}> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/home/matsu/Desktop/jy/src/components/starwind/card/CardHeader.astro", void 0);

const $$Astro = createAstro("https://jasperyong.com");
const $$CardTitle = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$CardTitle;
  const cardTitle = tv({ base: "text-3xl leading-none font-semibold tracking-tight" });
  const { class: className, ...rest } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div${addAttribute(cardTitle({ class: className }), "class")}${spreadAttributes(rest)}> ${renderSlot($$result, $$slots["default"])} </div>`;
}, "/home/matsu/Desktop/jy/src/components/starwind/card/CardTitle.astro", void 0);

export { $$Card as $, $$CardHeader as a, $$CardTitle as b, $$CardDescription as c, $$CardContent as d, $$CardFooter as e };

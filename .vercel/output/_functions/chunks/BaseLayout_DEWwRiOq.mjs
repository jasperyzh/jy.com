import { c as createAstro, a as createComponent, b as renderTemplate, d as addAttribute, r as renderComponent, e as renderSlot, m as maybeRenderHead, s as spreadAttributes, f as renderScript, g as renderHead } from './astro/server_BuftSjIy.mjs';
import 'kleur/colors';
/* empty css                         */
import 'clsx';
import { tv } from 'tailwind-variants';

var __freeze$1 = Object.freeze;
var __defProp$1 = Object.defineProperty;
var __template$1 = (cooked, raw) => __freeze$1(__defProp$1(cooked, "raw", { value: __freeze$1(cooked.slice()) }));
var _a$1;
const $$Astro$3 = createAstro("https://jasperyong.com");
const $$Head = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$3, $$props, $$slots);
  Astro2.self = $$Head;
  const {
    title = "Jeanine White: Personal Site",
    description = "The personal site of Jeanine White",
    image = "/placeholder-post.jpg"
  } = Astro2.props;
  return renderTemplate(_a$1 || (_a$1 = __template$1(['<!-- Global Metadata --><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"', "><title>", '</title><meta name="description" property="og:description"', '><!-- Open Graph / Facebook --><meta property="og:type" content="website"><meta property="og:url"', '><meta property="og:title"', '><meta property="og:image"', '><!-- Twitter --><meta property="twitter:card" content="summary_large_image"><meta property="twitter:url"', '><meta property="twitter:title"', '><meta property="twitter:description"', '><meta property="twitter:image"', '><!-- Google tag (gtag.js) --><script async src="https://www.googletagmanager.com/gtag/js?id=G-LQ2S4M9E6S"><\/script><script>\n  window.dataLayer = window.dataLayer || [];\n  function gtag() {\n    dataLayer.push(arguments);\n  }\n  gtag("js", new Date());\n\n  gtag("config", "G-LQ2S4M9E6S");\n<\/script><!-- PWA integration removed --><!-- Google fonts --><link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link href="https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"><!-- Bootstrap Icons for microblog --><link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.11.1/font/bootstrap-icons.css"><script>\n  // This code is inlined in the head to make dark mode instant & blocking.\n  // This prevents theme flicker on page load\n  const getThemePreference = () => {\n    if (typeof localStorage !== "undefined" && localStorage.getItem("theme")) {\n      return localStorage.getItem("theme");\n    }\n    return window.matchMedia("(prefers-color-scheme: dark)").matches\n      ? "dark"\n      : "light";\n  };\n\n  // Apply theme immediately before page render\n  const theme = getThemePreference();\n  \n  // Apply dark class to html element if needed\n  if (theme === "dark") {\n    document.documentElement.classList.add("dark");\n  } else {\n    document.documentElement.classList.remove("dark");\n  }\n\n  if (typeof localStorage !== "undefined") {\n    // Watch the document element and persist user preference when it changes.\n    const observer = new MutationObserver(() => {\n      const isDark = document.documentElement.classList.contains("dark");\n      localStorage.setItem("theme", isDark ? "dark" : "light");\n    });\n    \n    observer.observe(document.documentElement, {\n      attributes: true,\n      attributeFilter: ["class"],\n    });\n  }\n<\/script>'])), addAttribute(Astro2.generator, "content"), title, addAttribute(description, "content"), addAttribute(Astro2.url, "content"), addAttribute(title, "content"), addAttribute(new URL(image, Astro2.url), "content"), addAttribute(Astro2.url, "content"), addAttribute(title, "content"), addAttribute(description, "content"), addAttribute(new URL(image, Astro2.url), "content"));
}, "/home/matsu/Desktop/jy/src/layouts/Head.astro", void 0);

const $$Astro$2 = createAstro("https://jasperyong.com");
const $$Button = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$2, $$props, $$slots);
  Astro2.self = $$Button;
  const { variant = "default", size = "md", class: className, ...rest } = Astro2.props;
  const button = tv({
    base: [
      "inline-flex items-center justify-center gap-1.5 rounded-md font-medium whitespace-nowrap",
      "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      "starwind-transition-colors",
      "focus-visible:outline-2 focus-visible:outline-offset-2",
      "disabled:pointer-events-none disabled:opacity-50"
    ],
    variants: {
      variant: {
        default: "bg-foreground text-background hover:bg-foreground/90 focus-visible:outline-outline",
        primary: "bg-primary text-primary-foreground hover:bg-primary/90 focus-visible:outline-primary",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/90 focus-visible:outline-secondary",
        outline: "border-border hover:bg-border hover:text-foreground focus-visible:outline-outline border",
        ghost: "hover:bg-foreground/10 hover:text-foreground focus-visible:outline-outline bg-transparent",
        info: "bg-info text-info-foreground hover:bg-info/90 focus-visible:outline-info",
        success: "bg-success text-success-foreground hover:bg-success/90 focus-visible:outline-success",
        warning: "bg-warning text-warning-foreground hover:bg-warning/90 focus-visible:outline-warning",
        error: "bg-error text-error-foreground hover:bg-error/90 focus-visible:outline-error"
      },
      size: {
        sm: "h-9 px-3 py-2 text-sm",
        md: "h-11 px-4 py-2 text-base",
        lg: "h-12 px-8 py-2 text-lg",
        icon: "h-11 w-11"
      }
    },
    defaultVariants: { variant: "default", size: "md" }
  });
  const Tag = Astro2.props.href ? "a" : "button";
  return renderTemplate`${renderComponent($$result, "Tag", Tag, { "class": button({ variant, size, class: className }), ...rest }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })}`;
}, "/home/matsu/Desktop/jy/src/components/starwind/button/Button.astro", void 0);

(/* @__PURE__ */ new Date()).getFullYear();
const SITE_TITLE = "jasperyong.com";
const SITE_DESCRIPTION = "Welcome to my website!";
const RESUME_LINK = "";

const $$Astro$1 = createAstro("https://jasperyong.com");
const $$Switch = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Switch;
  const {
    id,
    label,
    checked = false,
    padding,
    size = "md",
    variant = "default",
    class: className,
    ...rest
  } = Astro2.props;
  let newPadding = padding;
  if (!padding) {
    newPadding = size === "sm" ? 2.5 : size === "lg" ? 4 : 3;
  }
  const sizeMultiplier = size === "sm" ? 4 : size === "lg" ? 6 : 5;
  let ariaLabel;
  if (rest["aria-label"]) {
    ariaLabel = rest["aria-label"];
    delete rest["aria-label"];
  } else if (label) {
    ariaLabel = label;
  } else {
    ariaLabel = "switch";
  }
  const switchButton = tv({
    base: [
      "starwind-transition-colors border-input bg-muted inline-flex h-(--height) w-(--width) items-center rounded-full border",
      "group peer ring-offset-background focus-visible:outline-2 focus-visible:outline-offset-2",
      "not-disabled:cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
    ],
    variants: {
      variant: {
        primary: "aria-checked:border-primary focus:outline-primary",
        secondary: "aria-checked:border-secondary focus:outline-secondary",
        default: "aria-checked:border-foreground focus:outline-outline",
        info: "aria-checked:border-info focus:outline-info",
        success: "aria-checked:border-success focus:outline-success",
        warning: "aria-checked:border-warning focus:outline-warning",
        error: "aria-checked:border-error focus:outline-error"
      }
    },
    defaultVariants: { variant: "default" }
  });
  const switchToggle = tv({
    base: [
      "bg-foreground inline-block transform rounded-full transition-transform",
      "group-aria-checked:translate-x-(--translation) group-aria-[checked=false]:translate-x-[calc(var(--padding)-var(--border-offset))]"
    ],
    variants: { size: { sm: "size-4", md: "size-5", lg: "size-6" } },
    defaultVariants: { size: "md" }
  });
  const switchLabel = tv({
    base: "text-foreground ml-2 font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
    variants: { size: { sm: "text-sm", md: "text-base", lg: "text-lg" } },
    defaultVariants: { size: "md" }
  });
  return renderTemplate`${maybeRenderHead()}<div class="starwind-switch flex items-center"> <button type="button"${addAttribute(id, "id")} role="switch"${addAttribute(checked ? "true" : "false", "aria-checked")}${addAttribute(ariaLabel, "aria-label")}${addAttribute(switchButton({ variant, class: className }), "class")}${addAttribute({
    "--padding": `${newPadding}px`,
    "--height": `calc((var(--spacing) * ${sizeMultiplier}) + (var(--padding) * 2))`,
    "--width": `calc((var(--spacing) * ${sizeMultiplier} * 2) + (var(--padding) * 3))`,
    "--border-offset": "1px"
  }, "style")}${spreadAttributes(rest)}> <span${addAttribute(switchToggle({ size }), "class")}${addAttribute({
    "--translation": `calc((var(--spacing) * ${sizeMultiplier}) + (var(--padding) * 2) - var(--border-offset))`
  }, "style")}></span> </button> ${label && renderTemplate`<label${addAttribute(id, "for")}${addAttribute(switchLabel({ size }), "class")}> ${label} </label>`} </div> ${renderScript($$result, "/home/matsu/Desktop/jy/src/components/starwind/switch/Switch.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/matsu/Desktop/jy/src/components/starwind/switch/Switch.astro", void 0);

const $$ThemeToggle = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Switch", $$Switch, { "id": "theme-switch", "variant": "secondary", "label": "\u2600\uFE0F\u{1F312}" })} ${renderScript($$result, "/home/matsu/Desktop/jy/src/components/ThemeToggle.astro?astro&type=script&index=0&lang.ts")}`;
}, "/home/matsu/Desktop/jy/src/components/ThemeToggle.astro", void 0);

const $$Navbar = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<nav class="flex items-center justify-between h-16"> <div class="flex items-center justify-between w-full"> <!-- Mobile menu button--> <div class="md:hidden"> <button type="button" class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white" aria-controls="mobile-menu" aria-expanded="false" id="mobile-menu-button"> <span class="sr-only">Open main menu</span> <!-- Menu icon --> <svg class="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"> <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path> </svg> </button> </div> <!-- Logo/Brand --> <a href="/" class="flex-shrink-0 flex items-center"> <div class="text-xl font-bold">${SITE_TITLE}</div> </a> <!-- Desktop Navigation --> <div class="hidden md:block"> <div class="ml-10 flex items-center space-x-4"> ${renderComponent($$result, "Button", $$Button, { "href": "/portfolio", "class": "bg-transparent text-gray-800 hover:text-gray-200 dark:text-gray-200 dark:hover:text-gray-800", "size": "sm" }, { "default": ($$result2) => renderTemplate`Portfolio` })} ${renderComponent($$result, "Button", $$Button, { "href": "/resume", "class": "bg-transparent text-gray-800 hover:text-gray-200 dark:text-gray-200 dark:hover:text-gray-800", "size": "sm" }, { "default": ($$result2) => renderTemplate`Resume` })} ${renderComponent($$result, "Button", $$Button, { "href": "/sketches", "class": "bg-transparent text-gray-800 hover:text-gray-200 dark:text-gray-200 dark:hover:text-gray-800", "size": "sm" }, { "default": ($$result2) => renderTemplate`Sketches` })} ${renderComponent($$result, "Button", $$Button, { "href": "/blog", "class": "bg-transparent text-gray-800 hover:text-gray-200 dark:text-gray-200 dark:hover:text-gray-800", "size": "sm" }, { "default": ($$result2) => renderTemplate`blog` })} ${renderComponent($$result, "Button", $$Button, { "href": "/microblog", "class": "bg-transparent text-gray-800 hover:text-gray-200 dark:text-gray-200 dark:hover:text-gray-800", "size": "sm" }, { "default": ($$result2) => renderTemplate`microblog` })} ${renderComponent($$result, "Button", $$Button, { "href": "/contact", "class": "bg-transparent text-gray-800 hover:text-gray-200 dark:text-gray-200 dark:hover:text-gray-800", "size": "sm" }, { "default": ($$result2) => renderTemplate`Contact` })} <div class="flex items-center justify-center"> ${renderComponent($$result, "ThemeToggleButton", $$ThemeToggle, {})} </div> </div> </div> </div> </nav> <!-- Mobile menu, show/hide based on menu state --> <div class="md:hidden hidden" id="mobile-menu"> <div class="flex flex-col"> ${renderComponent($$result, "Button", $$Button, { "href": "/portfolio", "class": "bg-transparent text-gray-800 hover:text-gray-200", "size": "sm" }, { "default": ($$result2) => renderTemplate`Portfolio` })} ${renderComponent($$result, "Button", $$Button, { "href": "/resume", "class": "bg-transparent text-gray-800 hover:text-gray-200", "size": "sm" }, { "default": ($$result2) => renderTemplate`Resume` })} ${renderComponent($$result, "Button", $$Button, { "href": "/sketches", "class": "bg-transparent text-gray-800 hover:text-gray-200", "size": "sm" }, { "default": ($$result2) => renderTemplate`Sketches` })} ${renderComponent($$result, "Button", $$Button, { "href": "/blog", "class": "bg-transparent text-gray-800 hover:text-gray-200", "size": "sm" }, { "default": ($$result2) => renderTemplate`blog` })} ${renderComponent($$result, "Button", $$Button, { "href": "/microblog", "class": "bg-transparent text-gray-800 hover:text-gray-200", "size": "sm" }, { "default": ($$result2) => renderTemplate`microblog` })} </div> </div>`;
}, "/home/matsu/Desktop/jy/src/components/Navbar.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const currentYear = (/* @__PURE__ */ new Date()).getFullYear();
  const footerLinks = [
    {
      title: "Solutions",
      items: [
        { text: "Marketing", href: "#" },
        { text: "Analytics", href: "#" },
        { text: "Automation", href: "#" },
        { text: "Commerce", href: "#" },
        { text: "Insights", href: "#" }
      ]
    },
    {
      title: "Support",
      items: [
        { text: "Submit ticket", href: "#" },
        { text: "Documentation", href: "#" },
        { text: "Guides", href: "#" }
      ]
    },
    {
      title: "Company",
      items: [
        { text: "About", href: "#" },
        { text: "Blog", href: "/blog" },
        { text: "Jobs", href: "#" },
        { text: "Press", href: "#" }
      ]
    }
  ];
  const socialLinks = [
    { platform: "facebook", href: "https://facebook.com", icon: "mdi:facebook" },
    {
      platform: "instagram",
      href: "https://www.instagram.com/jasperyzh/",
      icon: "mdi:instagram"
    },
    { platform: "twitter", href: "https://twitter.com", icon: "mdi:twitter" },
    {
      platform: "github",
      href: "https://github.com/jasperyzh/",
      icon: "mdi:github"
    },
    { platform: "youtube", href: "https://youtube.com", icon: "mdi:youtube" }
  ];
  (/* @__PURE__ */ new Date()).getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="bg-white border-t border-gray-200 py-12 mt-24"> <div class="container mx-auto px-4"> <div class="grid grid-cols-1 md:grid-cols-5 gap-8"> <div class="md:col-span-2"> <div class="flex items-center mb-4"> <svg class="h-8 w-auto text-indigo-600" viewBox="0 0 40 40" fill="currentColor"> <path d="M20 6.5C14.5 6.5 9.5 9 9.5 15.5C9.5 19.5 11.5 22 14.5 24L12 33.5L20 29L28 33.5L25.5 24C28.5 22 30.5 19.5 30.5 15.5C30.5 9 25.5 6.5 20 6.5Z"></path> </svg> <span class="ml-2 text-xl font-bold text-gray-900">JasperYong</span> </div> <p> <strong>Learner, web developer, and blogger.</strong> </p> <p class="text-gray-600 max-w-md">
Thank you for visiting my website! This blog is a collection of my
          learnings, experiments, and personal projects. I hope you find
          something that inspires or resonates with you. Enjoy exploring, and
          come back soon!
</p> <div class="mt-4 flex space-x-4"> ${socialLinks.map((link) => renderTemplate`<a${addAttribute(link.href, "href")} target="_blank" rel="noopener noreferrer" target="_blank"${addAttribute(`${link.platform} link`, "aria-label")} class="text-gray-800 hover:text-gray-500"> <i${addAttribute(`bi bi-${link.platform}`, "class")}></i> </a>`)} </div> </div> ${footerLinks.map((section) => renderTemplate`<div> <h3 class="text-sm font-semibold text-gray-900 tracking-wider uppercase"> ${section.title} </h3> <ul class="mt-4 space-y-2"> ${section.items.map((link) => renderTemplate`<li> <a${addAttribute(link.href, "href")} class="text-base text-gray-600 hover:text-gray-900"${spreadAttributes(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}> ${link.text} </a> </li>`)} </ul> </div>`)} </div> <div class="mt-12 pt-8 border-t border-gray-200"> <p class="text-sm text-gray-500">
&copy; ${currentYear} JasperYong.com.
</p> </div> </div> </footer>`;
}, "/home/matsu/Desktop/jy/src/components/Footer.astro", void 0);

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$Astro = createAstro("https://jasperyong.com");
const $$BaseLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$BaseLayout;
  const { title, description } = Astro2.props;
  return renderTemplate(_a || (_a = __template(['<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0">', "", '</head> <body> <div class="wrapper"> <header class="mb-4"> <div class="container mx-auto"> ', ' <hr class="mt-2 border-gray-200"> </div> </header> ', " ", " <!-- new footer component  --> ", ' </div> <!-- Site-wide initialization script --> <script>\n      // Initialize microblog animations\n      document.addEventListener("DOMContentLoaded", function () {\n        setTimeout(function () {\n          document.querySelectorAll(".microblog-post").forEach(function (post) {\n            post.classList.add("post-visible");\n          });\n        }, 200);\n      });\n    <\/script> </body> </html>'])), renderComponent($$result, "Head", $$Head, { "title": title, "description": description }), renderHead(), renderComponent($$result, "Navbar", $$Navbar, {}), renderScript($$result, "/home/matsu/Desktop/jy/src/layouts/BaseLayout.astro?astro&type=script&index=0&lang.ts"), renderSlot($$result, $$slots["default"]), renderComponent($$result, "Footer", $$Footer, {}));
}, "/home/matsu/Desktop/jy/src/layouts/BaseLayout.astro", void 0);

export { $$Button as $, RESUME_LINK as R, SITE_TITLE as S, $$BaseLayout as a, SITE_DESCRIPTION as b };

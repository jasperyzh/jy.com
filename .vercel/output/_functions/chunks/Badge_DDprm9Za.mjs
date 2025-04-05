import { c as createAstro, a as createComponent, r as renderComponent, b as renderTemplate, e as renderSlot } from './astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import { tv } from 'tailwind-variants';

const $$Astro = createAstro("https://jasperyong.com");
const $$Badge = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Badge;
  const badgeVariants = tv({
    base: "starwind-badge starwind-transition-colors inline-flex items-center rounded-full font-semibold focus-visible:outline-2 focus-visible:outline-offset-2",
    variants: {
      variant: {
        default: "bg-foreground text-background",
        primary: "bg-primary text-primary-foreground focus-visible:outline-primary",
        secondary: "bg-secondary text-secondary-foreground focus-visible:outline-secondary",
        outline: "border-border focus-visible:outline-outline border",
        ghost: "bg-foreground/10 text-foreground focus-visible:outline-outline",
        info: "bg-info text-info-foreground focus-visible:outline-info",
        success: "bg-success text-success-foreground focus-visible:outline-success",
        warning: "bg-warning text-warning-foreground focus-visible:outline-warning",
        error: "bg-error text-error-foreground focus-visible:outline-error"
      },
      size: { sm: "px-2.5 py-0.5 text-xs", md: "px-3 py-0.5 text-sm", lg: "px-4 py-1 text-base" },
      isLink: { true: "cursor-pointer", false: "" }
    },
    compoundVariants: [
      { isLink: true, variant: "default", className: "hover:bg-foreground/80" },
      { isLink: true, variant: "primary", className: "hover:bg-primary/80" },
      { isLink: true, variant: "secondary", className: "hover:bg-secondary/80" },
      { isLink: true, variant: "outline", className: "hover:border-border/80" },
      { isLink: true, variant: "ghost", className: "hover:bg-foreground/7" },
      { isLink: true, variant: "info", className: "hover:bg-info/80" },
      { isLink: true, variant: "success", className: "hover:bg-success/80" },
      { isLink: true, variant: "warning", className: "hover:bg-warning/80" },
      { isLink: true, variant: "error", className: "hover:bg-error/80" }
    ],
    defaultVariants: { variant: "default", size: "md", isLink: false }
  });
  const { variant = "default", size = "md", class: className, href, ...rest } = Astro2.props;
  const isLink = !!href;
  const Tag = isLink ? "a" : "div";
  return renderTemplate`${renderComponent($$result, "Tag", Tag, { "class": badgeVariants({ variant, size, isLink, class: className }), "href": href, ...rest }, { "default": ($$result2) => renderTemplate` ${renderSlot($$result2, $$slots["default"])} ` })}`;
}, "/home/matsu/Desktop/jy/src/components/starwind/badge/Badge.astro", void 0);

export { $$Badge as $ };

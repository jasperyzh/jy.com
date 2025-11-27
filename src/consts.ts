/**
 * Site Configuration
 * Place all global site data in this file.
 * Import throughout the site: import { SITE_CONFIG } from '@/consts';
 *
 * Usage:
 * const siteTitle = SITE_CONFIG.site.title;
 * const githubUrl = SITE_CONFIG.social.github;
 */

import type { SiteConfig } from "@/types";

const JOURNAL_BASE_PATH = import.meta.env.JOURNAL_BASE_PATH;

// Asset URL paths (for browser/client-side)
// Note: These map to symlinked directories in public/assets
export const ASSETS_PATH = {
  // basePath: "/assets",
  blog: JOURNAL_BASE_PATH + "/blog--", // Symlinked from JOURNAL_SHARE_PATH
  toolstack: JOURNAL_BASE_PATH + "/toolstack--",
  images: "/assets/assets--",
  // logos: "/assets",
  // fonts: "/assets/fonts",
} as const;

// Optional: Helper to get full asset URL
/* export function getAssetUrl(
  category: keyof typeof ASSETS_CONFIG,
  filename: string
): string {
  const base = ASSETS_CONFIG[category] || ASSETS_CONFIG.basePath;
  return `${base}/${filename}`;
} */

export const SITE_CONFIG: SiteConfig = {
  site: {
    year: new Date().getFullYear(),
    title: "JasperYong.com",
    description:
      "A portfolio site of Jasper's work. Based in KL, Malaysia. Currently Freelancing around town.",
    resumeLink: "", // "/241009-resume.pdf"
  },
  landing: {
    title: "Learning\\\\NonStop",
    description:
      "A portfolio site of Jasper's work. Based in KL, Malaysia. Currently Freelancing around town.",
  },
  social: {
    facebook: "https://www.facebook.com/jasp.yzh",
    instagram: "https://www.instagram.com/jasperyzh/",
    linkedin: "https://www.linkedin.com/in/jaspery/",
    github: "https://github.com/jasperyzh",
  },
  blog: {
    posts_per_page: 10,
  },
};

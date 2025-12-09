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



/**
 * Extract filename from import.meta.url and remove extension
 * Handles URL encoding (e.g., %20 for spaces)
 * @param {string|URL} [urlOrString] - Optional URL or URL string to extract filename from. If not provided, uses import.meta.url from the calling context.
 * @returns {string} Filename without extension, URL-decoded
 */
export function getFilename(urlOrString?: string | URL) {
  // Use provided URL or fall back to import.meta.url
  // Note: If no parameter is provided, this will use import.meta.url from consts.ts
  // To get the filename of the calling file, pass import.meta.url as parameter
  const urlToUse = urlOrString || import.meta.url;
  
  if (!urlToUse) return "";
  const url = typeof urlToUse === "string" ? new URL(urlToUse) : urlToUse;
  const filename = url.pathname.split("/").pop() || "";
  // Remove .astro extension if present
  const withoutExt = filename.replace(/\.astro$/, "");
  // Decode URL-encoded characters (e.g., %20 -> space)
  try {
    return decodeURIComponent(withoutExt);
  } catch (e) {
    // If decoding fails, return as-is (might already be decoded)
    return withoutExt;
  }
}
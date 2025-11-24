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

export const SITE_CONFIG: SiteConfig = {
  site: {
    year: new Date().getFullYear(),
    title: "JasperYong.com",
    description: "A portfolio site of Jasper's work. Based in KL, Malaysia. Currently Freelancing around town.",
    resumeLink: "", // "/241009-resume.pdf"
  },
  landing: {
    title: "Learning\\\\NonStop",
    description: "A portfolio site of Jasper's work. Based in KL, Malaysia. Currently Freelancing around town.",
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

/**
 * Site configuration type definitions
 * Defines the structure for site-wide configuration
 */

export interface SiteConfig {
  site: {
    year: number;
    title: string;
    description: string;
    resumeLink: string;
  };
  landing: {
    title: string;
    description: string;
  };
  social: {
    facebook: string;
    instagram: string;
    linkedin: string;
    github: string;
  };
  blog: {
    posts_per_page: number;
  };
}

export interface SEOConfig {
  title: string;
  description: string;
  image?: string;
  url?: string;
}





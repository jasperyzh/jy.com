/**
 * Central type exports
 * Import types from here throughout the project
 * 
 * Usage:
 * import type { BlogPost, SiteConfig, CardProps } from '@/types';
 */

export type {
  BlogPost,
  BlogPostMeta,
  Category,
  Tag,
  BlogStats,
} from "./blog";

export type {
  SiteConfig,
  SEOConfig,
} from "./config";

export type {
  CardProps,
  CardVariant,
  CardStyleProps,
  PaginationProps,
} from "./components";





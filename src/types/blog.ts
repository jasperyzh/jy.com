/**
 * Blog-related type definitions
 * Centralizes all blog post, category, and tag types
 */

export interface BlogPost {
  title: string;
  description?: string;
  pubDate: Date;
  modDate?: Date;
  tags?: string[];
  category?: string;
  thumbnail?: string;
  draft?: boolean;
}

export interface BlogPostMeta {
  id: string;
  slug: string;
  url: string;
}

export interface Category {
  name: string;
  slug: string;
  count: number;
}

export interface Tag {
  name: string;
  slug: string;
  count: number;
}

export interface BlogStats {
  totalPosts: number;
  totalCategories: number;
  totalTags: number;
  lastUpdated: Date;
}





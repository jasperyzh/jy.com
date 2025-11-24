/**
 * Shared component type definitions
 * Used across multiple components for consistency
 */

import type { HTMLAttributes } from "astro/types";

export interface CardProps extends HTMLAttributes<"div"> {
  title: string;
  description?: string;
  date: Date;
  tags?: string[];
  category?: string;
  url: string;
  thumbnail?: string;
  thumbnailAlt?: string;
  maxVisibleTags?: number;
  showThumbnail?: boolean;
  categoryUrlPrefix?: string;
  tagUrlPrefix?: string;
  type?: "blog" | "sketch" | "portfolio";
}

export type CardVariant = 
  | "default"
  | "red" 
  | "blue" 
  | "yellow" 
  | "green"
  | "2a"
  | "milk";

export interface CardStyleProps {
  variant?: CardVariant;
  texture?: boolean;
}

export interface PaginationProps {
  currentPage: number;
  totalPages: number;
  baseUrl: string;
}





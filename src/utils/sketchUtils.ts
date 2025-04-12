import type { CollectionEntry } from 'astro:content';

/**
 * Gets the filename from a sketch entry
 * @param entry The sketch collection entry
 * @returns The filename (e.g., "250410-things-to-consider-web-design")
 */
export function getSketchFilename(entry: CollectionEntry<'sketches'>): string {
  const parts = entry.id.split('/');
  return parts[parts.length - 1]; // Last part is the filename
}

/**
 * Generates the full URL for a sketch
 * @param entry The sketch collection entry
 * @returns The full URL path (e.g., "/sketches/250410-things-to-consider-web-design")
 */
export function getSketchFullUrl(entry: CollectionEntry<'sketches'>): string {
  return `/sketches/${getSketchFilename(entry)}`;
}

/**
 * Parses a sketch URL to get the filename
 * @param url The sketch URL
 * @returns The filename
 */
export function parseSketchUrl(url: string): string {
  const parts = url.split('/');
  return parts[parts.length - 1];
}

/**
 * Gets all unique categories from sketch entries
 * @param sketches Array of sketch entries
 * @returns Array of unique categories
 */
export function getAllCategories(sketches: CollectionEntry<'sketches'>[]): string[] {
  const categories = sketches.map(sketch => sketch.data.category);
  return [...new Set(categories)].sort();
}

/**
 * Gets all unique tags from sketch entries
 * @param sketches Array of sketch entries
 * @returns Array of unique tags
 */
export function getAllTags(sketches: CollectionEntry<'sketches'>[]): string[] {
  const tags = sketches.flatMap(sketch => sketch.data.tags || []);
  return [...new Set(tags)].sort();
}

/**
 * Formats a string for use in URLs:
 * - Converts to lowercase
 * - Replaces spaces with dashes
 * - Removes special characters
 * - Handles multiple consecutive spaces/dashes
 * 
 * @param text The text to format
 * @returns URL-friendly string
 */
export function formatForUrl(text: string): string {
  return text
    .toLowerCase() // Convert to lowercase
    .trim() // Remove leading/trailing spaces
    .replace(/[\s_]+/g, '-') // Replace spaces and underscores with single dash
    .replace(/[^\w\-]+/g, '') // Remove all non-word chars except dashes
    .replace(/\-\-+/g, '-') // Replace multiple dashes with single dash
    .replace(/^-+/, '') // Remove leading dashes
    .replace(/-+$/, ''); // Remove trailing dashes
}

/**
 * Slugifies a category or tag name for URLs
 * @param name The category or tag name
 * @returns URL-safe slug
 */
export function slugify(name: string): string {
  return encodeURIComponent(formatForUrl(name));
}

/**
 * Un-slugifies a category or tag name from URL
 * @param slug The URL slug
 * @returns Original name
 */
export function unslugify(slug: string): string {
  return decodeURIComponent(slug)
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

/**
 * Gets the category URL
 * @param category The category name
 * @returns The category URL path
 */
export function getCategoryUrl(category: string): string {
  return `/sketches/category/${slugify(category)}`;
}

/**
 * Gets the tag URL
 * @param tag The tag name
 * @returns The tag URL path
 */
export function getTagUrl(tag: string): string {
  return `/sketches/tag/${slugify(tag)}`;
} 
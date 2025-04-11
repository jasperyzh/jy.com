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
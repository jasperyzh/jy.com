import { getCollection } from "astro:content";
import { parseDateYYMMDD } from "./util--date";

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
export function slugify(text: string): string {
  return text
    // .toLowerCase() // Convert to lowercase
    // .trim() // Remove leading/trailing spaces
    // .replace(/[\s_]+/g, "-") // Replace spaces and underscores with single dash
    // .replace(/[^\w\-]+/g, "") // Remove all non-word chars except dashes

    // .replace(/\-\-+/g, "-") // Replace multiple dashes with single dash
    // .replace(/^-+/, "") // Remove leading dashes
    // .replace(/-+$/, ""); // Remove trailing dashes

    // slugify
    .toLowerCase()
    .trim()
    // Remove all characters except word chars, spaces, and hyphens (i.e., remove punctuation and symbols)
    .replace(/[^\w\s-]/g, "")
    // Replace one or more spaces, underscores, or hyphens with a single hyphen
    .replace(/[\s_-]+/g, "-")
    // Remove leading and trailing hyphens
    .replace(/^-+|-+$/g, "");
}

/**
 * Fetches all blog posts, sorts them by date, and filters out drafts.
 */
export async function getAllPosts() {
  const allPosts = await getCollection("blog");

  const sortedPosts = allPosts.sort((a, b) => {
    const dateA = parseDateYYMMDD(a.data.pubDate || new Date());
    const dateB = parseDateYYMMDD(b.data.pubDate || new Date());
    return dateB.getTime() - dateA.getTime();
  });

  const publishedPosts = sortedPosts.filter((post) => !post.data.draft);
  return publishedPosts;
}

/**
 * Gets all posts with a specific tag.
 * @param {string} tag - The tag to filter by.
 */
export async function getPostsByTag(tag: string) {
  const allPosts = await getAllPosts();
  const lowercaseTag = tag.toLowerCase();
  return allPosts.filter(
    (post) =>
      post.data.tags &&
      post.data.tags.some((t) => t.toLowerCase() === lowercaseTag)
  );
}

/**
 * Generates a sorted list of unique tags with their counts.
 */
export async function getAllTags() {
  const allPosts = await getAllPosts();
  const allTags = allPosts.flatMap((post) => post.data.tags || []);

  const tagCounts: Record<string, number> = {};
  allTags.forEach((tag) => {
    tagCounts[tag] = (tagCounts[tag] || 0) + 1;
  });

  return Object.entries(tagCounts)
    .sort(([a], [b]) => a.localeCompare(b))
    .reduce((acc, [tag, count]) => ({ ...acc, [tag]: count }), {});
}

import type { CollectionEntry } from "astro:content";

/**
 * Gets the filename from a blog entry
 * @param entry The blog collection entry
 * @returns The filename (e.g., "250410-things-to-consider-web-design")
 */
export function getBlogFilename(entry: CollectionEntry<"blog">): string {
  const parts = entry.id.split("/");
  return parts[parts.length - 1]; // Last part is the filename
}

/**
 * Generates the full URL for a blog post
 * @param entry The blog collection entry
 * @returns The full URL path (e.g., "/blog/250410-things-to-consider-web-design")
 */
export function getBlogFullUrl(entry: CollectionEntry<"blog">): string {
  return `/blog/${getBlogFilename(entry)}`;
}

/**
 * Parses a blog URL to get the filename
 * @param url The blog URL
 * @returns The filename
 */
export function parseBlogUrl(url: string): string {
  const parts = url.split("/");
  return parts[parts.length - 1];
}

/**
 * Gets all unique categories from blog entries
 * @param posts Array of blog entries
 * @returns Array of unique categories
 */
export function getAllCategories(posts: CollectionEntry<"blog">[]): string[] {
  const categories = posts.map((post) => post.data.category);
  return [...new Set(categories)].sort();
}

/**
 * Gets all unique tags from blog entries
 * @param posts Array of blog entries
 * @returns Array of unique tags
 */
/* export function getAllTags(posts: CollectionEntry<"blog">[]): string[] {
  const tags = posts.flatMap((post) => post.data.tags || []);
  return [...new Set(tags)].sort();
} */

/**
 * Gets the category URL
 * @param category The category name
 * @returns The category URL path
 */
export function getCategoryUrl(category: string): string {
  return `/blog/category/${slugify(category)}`;
}

/**
 * Gets the tag URL
 * @param tag The tag name
 * @returns The tag URL path
 */
export function getTagUrl(tag: string): string {
  return `/blog/tag/${slugify(tag)}`;
}

export function slugifyTag(tag: string): string {
    return tag
        .toLowerCase()
        .replace(/\s+/g, '-')        // Replace spaces with -
        .replace(/[^\w\-]+/g, '')    // Remove all non-word chars
        .replace(/\-\-+/g, '-')      // Replace multiple - with single -
        .replace(/^-+/, '')          // Trim - from start of text
        .replace(/-+$/, '');         // Trim - from end of text
}

export function unslugifyTag(slug: string): string {
    return slug
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

export function getAllUniqueTags(posts: any[]): string[] {
    const tags = posts.flatMap(post => post.data.tags || []);
    return [...new Set(tags)].sort();
}

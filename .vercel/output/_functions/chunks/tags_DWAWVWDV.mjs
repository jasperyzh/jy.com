function slugifyTag(tag) {
  return tag.toLowerCase().replace(/\s+/g, "-").replace(/[^\w\-]+/g, "").replace(/\-\-+/g, "-").replace(/^-+/, "").replace(/-+$/, "");
}
function getAllUniqueTags(posts) {
  const tags = posts.flatMap((post) => post.data.tags || []);
  return [...new Set(tags)].sort();
}

export { getAllUniqueTags as g, slugifyTag as s };

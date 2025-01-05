/**
 * convert string into slug
 * @param {*} text
 * @returns
 */
export default function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-/, "")
        .replace(/-$/, "");
}

/**
 * Date utilities
 */

// Convert a JavaScript date to a number in the format yymmdd
export function dateToNumber(date) {
    const d = new Date(date);
    const year = d.getFullYear().toString().slice(-2);
    const month = (d.getMonth() + 1).toString().padStart(2, "0");
    const day = d.getDate().toString().padStart(2, "0");
    return `${year}${month}${day}`;
}

// Convert a number in the format yymmdd to a JavaScript date
export function numberToDate(num) {
    const str = num.toString();
    const year = parseInt(str.substring(0, 2)) + 2000;
    const month = parseInt(str.substring(2, 4)) - 1;
    const day = parseInt(str.substring(4, 6));
    return new Date(year, month, day);
}

/**
 * Clipboard utilities
 */

// Copy a string to the clipboard
export async function copyToClipboard(string) {
    try {
        await navigator.clipboard.writeText(string);
    } catch (err) {
        console.error("Failed to copy to clipboard:", err);
    }
}

/**
 * String utilities
 */

// Convert a string to a URL-friendly slug
export function slugify(text) {
    return text
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]+/g, "-")
        .replace(/^-/, "")
        .replace(/-$/, "");
}

// Add zero padding to a number
export function addZeroPadding(number, padding) {
    return number.toString().padStart(padding, "0");
}
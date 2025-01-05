/**
 * copy to clipboard
 */
export default async function copyToClipboard(string) {
    try {
        await navigator.clipboard.writeText(string);
        // console.log("copied to clipboard:", string);
    } catch (err) {
        console.error("Failed to copy to clipboard:", err);
    }
}

// src/util/util--copy_clipboard.js
document.addEventListener("DOMContentLoaded", () => {
  document.body.addEventListener("click", async (event) => {
    const button = event.target.closest(".copy--");
    if (!button) return;

    const textToCopy = button.getAttribute("data-copy-text");
    if (!textToCopy) return;

    const copyTextSpan = button.querySelector("span");
    const originalText = copyTextSpan ? copyTextSpan.textContent : "Copy";

    try {
      await navigator.clipboard.writeText(textToCopy);

      button.classList.add("copied");
      if (copyTextSpan) {
        copyTextSpan.textContent = "Copied!";
      }

      setTimeout(() => {
        button.classList.remove("copied");
        if (copyTextSpan) {
          copyTextSpan.textContent = originalText;
        }
      }, 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  });
});

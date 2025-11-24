// Import Prism core
import Prism from 'prismjs';

// Import language components
import 'prismjs/components/prism-markup';
import 'prismjs/components/prism-css';
import 'prismjs/components/prism-javascript';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';
import 'prismjs/components/prism-bash';
import 'prismjs/components/prism-json';
import 'prismjs/components/prism-yaml';
import 'prismjs/components/prism-markdown';
// import 'prismjs/components/prism-astro';  // Import Astro language if available

// Initialize Prism
export function initPrism() {
  // Check if we're in the browser
  if (typeof window !== 'undefined') {
    // Add language labels to code blocks
    document.querySelectorAll('pre[class*="language-"]').forEach(pre => {
      const classes = Array.from(pre.classList);
      const languageClass = classes.find(c => c.startsWith('language-'));
      
      if (languageClass) {
        const language = languageClass.replace('language-', '');
        pre.setAttribute('data-language', language);
      }
    });
    
    // Manually trigger highlighting for any existing code blocks
    Prism.highlightAll();
  }
}

// Export Prism for use elsewhere if needed
export default Prism; 
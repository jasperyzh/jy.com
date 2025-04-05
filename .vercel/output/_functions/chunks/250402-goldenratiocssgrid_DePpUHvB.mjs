import { a as createComponent, b as renderTemplate, r as renderComponent, m as maybeRenderHead } from './astro/server_BuftSjIy.mjs';
import 'kleur/colors';
import { a as $$BaseLayout } from './BaseLayout_DEWwRiOq.mjs';

var __freeze = Object.freeze;
var __defProp = Object.defineProperty;
var __template = (cooked, raw) => __freeze(__defProp(cooked, "raw", { value: __freeze(cooked.slice()) }));
var _a;
const $$250402Goldenratiocssgrid = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate(_a || (_a = __template(["", ` <!-- Include Masonry.js Library (use a CDN) - Place before closing </body> tag --> <script src="https://unpkg.com/masonry-layout@4/dist/masonry.pkgd.min.js"><\/script> <!-- Optional: ImagesLoaded library helps if your cards contain images --> <!-- <script src="https://unpkg.com/imagesloaded@5/imagesloaded.pkgd.min.js"><\/script> --> <script>
  // Initialize Masonry after the content has loaded
  document.addEventListener('DOMContentLoaded', () => {
    const grid = document.querySelector('.grid-items'); // Select the container

    if (grid) { // Check if the container exists
      const msnry = new Masonry(grid, {
        // options
        itemSelector: '.grid-item', // Select the grid items
        columnWidth: '.grid-item', // Use item width for column calculation (or set a number/selector)
        percentPosition: true,     // Helps prevent pixel rounding issues with % widths
        gutter: 10 // Matches the --grid-gap value (1rem = 16px by default)
      });

      // Optional: If using images, recalculate layout after images load
      // imagesLoaded(grid).on('progress', function() {
      //   msnry.layout();
      // });
    } else {
      console.warn("Masonry container '.grid-items' not found.");
    }
  });
<\/script> <style>
  /* style.css */
:root {
    /* Base settings */
    --base-font-size: 100%; /* Typically 16px */
    --base-line-height: 1.5;
    --font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;

    /* Colors (Minimal Palette) */
    --text-color: #333;
    --background-color: #f8f8f8; /* Slightly softer off-white */
    --card-background: #ffffff;
    --border-color: #e0e0e0;
    --accent-color: #007bff; /* Optional accent */

    /* Layout & Sizing */
    --golden-ratio: 1.618;
    --grid-gap: 1rem; /* Consistent gap */

    /* Row settings for grid */
    --row-min-height: 10rem; /* Base height for auto rows */

    /* Breakpoints */
    --breakpoint-md: 768px;
    --breakpoint-lg: 1024px;
}

/* Basic Reset & Body Styles */
/* *,
*::before,
*::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

body {
    font-family: var(--font-family);
    font-size: var(--base-font-size);
    line-height: var(--base-line-height);
    color: var(--text-color);
    background-color: var(--background-color);
    padding: var(--grid-gap); 
} */

h1, p {
    margin-bottom: 1rem;
    max-width: 80ch; /* Improve readability for intro text */
    margin-left: auto;
    margin-right: auto;
}
h1 { text-align: center; color: var(--accent-color); margin-bottom: 1.5rem;}
ul { margin-left: 2rem; margin-bottom: 1.5rem;}

/* Grid Container Setup */
.grid-container {
    display: grid;
    gap: var(--grid-gap);
    max-width: 1400px; /* Optional: Limit max width */
    margin: 0 auto; /* Center the grid */

    /* Default: Mobile - 1 column */
    grid-template-columns: 1fr;

    /* Let grid auto-place items, filling gaps where possible due to spans */
    grid-auto-flow: dense;

    /* Define a minimum size for rows created implicitly, but allow them to grow.
       Crucial for working well with aspect-ratio */
    grid-auto-rows: minmax(var(--row-min-height), auto);
}

/* Card Styling (Minimal) */
.card {
    background-color: var(--card-background);
    border: 1px solid var(--border-color);
    border-radius: 4px; /* Subtle rounding */
    overflow: hidden; /* Important for aspect-ratio and content clipping */
    display: flex;
    flex-direction: column;
    /* Align content to the start (top) */
    justify-content: flex-start;

    /* Default spans (mobile) - occupies one implicit row/column */
    grid-column: span 1;
    grid-row: span 1; /* Start with row span 1 */
}

.card-content {
    padding: 1rem;
    flex-grow: 1; /* Allow content area to grow if card is taller than content */
}

.card h3 {
    font-size: 1.1em;
    font-weight: 600;
    margin-bottom: 0.5em;
    color: var(--accent-color); /* Use accent for titles */
}

.card p {
    font-size: 0.9em;
    color: #555; /* Slightly darker muted text */
    line-height: 1.4;
}

/* --- Aspect Ratio Classes --- */
.aspect-ratio-1-1 { aspect-ratio: 1 / 1; }
.aspect-ratio-4-3 { aspect-ratio: 4 / 3; }
.aspect-ratio-golden { aspect-ratio: var(--golden-ratio) / 1; }
/* Portrait Golden Ratio example: */
/* .aspect-ratio-golden-portrait { aspect-ratio: 1 / var(--golden-ratio); } */


/*
 * --- Size Classes & Responsive Grid Spans ---
 * Define how many grid tracks items span at different breakpoints.
 * This creates the visual hierarchy.
 */

/* No specific spans needed for mobile (1 column layout) */

/* Medium screens (e.g., tablets) - Try a 3-column layout */
@media (min-width: 768px) {
    .grid-container {
        /* 3 equal columns */
        grid-template-columns: repeat(3, 1fr);
    }

    /* Size 1 (Featured): Takes up significant space */
    .size-1 {
        grid-column: span 2; /* Span 2 of 3 columns */
        grid-row: span 2;    /* Span 2 rows for more height dominance */
    }

    /* Size 2 (Secondary): Takes up one standard block, potentially taller */
    .size-2 {
        grid-column: span 1;
        /* grid-row: span 2; /* Optional: Make secondary items taller */
    }

    /* Size 3 (Tertiary): Smallest unit */
    .size-3 {
        grid-column: span 1;
        grid-row: span 1;
    }
}

/* Large screens (e.g., desktops) - Try a 5-column layout (Fibonacci!) */
@media (min-width: 1024px) {
    .grid-container {
        /* 5 equal columns */
        grid-template-columns: repeat(5, 1fr);
         /* Adjust row height maybe? */
        /* --row-min-height: 12rem; */
        /* grid-auto-rows: minmax(var(--row-min-height), auto); */
    }

    /* Size 1 (Featured): Spans a large area (3x2) */
    .size-1 {
        grid-column: span 3;
        grid-row: span 2;
    }

    /* Size 2 (Secondary): Spans 2 columns */
    .size-2 {
        grid-column: span 2;
        grid-row: span 1; /* Keep row span 1 or adjust if needed */
    }
     /* We can make some size-2 elements taller if desired */
    .size-2.aspect-ratio-golden {
         grid-row: span 2; /* Example: make golden ratio secondary items taller */
    }


    /* Size 3 (Tertiary): Smallest unit (1x1) */
    .size-3 {
        grid-column: span 1;
        grid-row: span 1;
    }
}


/* --- Optional: CSS Columns Fallback for Masonry-like look (No JS) --- */
.masonry-container-css-columns {
    column-count: 2; // Start with 2 columns
    column-gap: var(--grid-gap);
    max-width: 1000px;
    margin: 2rem auto;
}

.masonry-container-css-columns .card {
    display: inline-block; // Needed for columns
    width: 100%; // Take full width of the column
    margin-bottom: var(--grid-gap); // Space between items vertically
    break-inside: avoid; // Try to prevent items from breaking across columns
}

@media (min-width: 768px) {
    .masonry-container-css-columns {
        column-count: 3;
    }
}

@media (min-width: 1024px) {
    .masonry-container-css-columns {
        column-count: 4;
    }
}


/* ========== Optional Masonry Styles ========== */

/* --- Style resets for the section headings --- */
h2, h3 {
    text-align: center;
    margin-top: 2rem;
    margin-bottom: 1rem;
    color: var(--text-color);
}
h3 + p { /* Paragraph immediately after H3 */
    text-align: center;
    max-width: 60ch;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 1.5rem;
    font-style: italic;
    color: #666;
}

/* --- 1. CSS Grid (Limited Approximation) --- */
.masonry-container-grid-approx {
    display: grid;
    gap: var(--grid-gap);
    /* Define columns */
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    /* KEY: Very small base row height */
    grid-auto-rows: 10px; /* Or even smaller, like 1px or 5px */
    max-width: 1200px; /* Example max width */
    margin: 0 auto;
}

/* Individual cards NEED grid-row span styles (added inline in HTML example) */
.masonry-container-grid-approx .card {
    /* Reset aspect ratio if you are forcing height via grid-row-span */
    /* aspect-ratio: auto; */
    /* Make sure card content doesn't define the height explicitly */
    height: auto;
}


/* --- 2. CSS Columns --- */
.masonry-container-css-columns {
    /* Adjust column count based on screen size */
    column-count: 2;
    column-gap: var(--grid-gap);
    max-width: 1200px; /* Example max width */
    margin: 0 auto;
    padding: var(--grid-gap); /* Add padding if desired */
}

.masonry-container-css-columns .card {
    display: inline-block; /* Essential for column flow */
    width: 100%;          /* Make card fill the column width */
    margin-bottom: var(--grid-gap); /* Vertical space between cards in a column */
    break-inside: avoid;  /* Try to prevent cards breaking across columns */
    /* Aspect ratio might not be strictly maintained if height varies */
}

/* Responsive column counts */
@media (min-width: 768px) {
    .masonry-container-css-columns {
        column-count: 3;
    }
}

@media (min-width: 1024px) {
    .masonry-container-css-columns {
        column-count: 4;
    }
}


/* --- 3. JavaScript Library (Masonry.js) --- */
.masonry-container-js {
    max-width: 1200px; /* Example max width */
    margin: 0 auto;
    /* IMPORTANT: The container often needs position: relative
       if the JS library uses position: absolute for items,
       although Masonry.js often handles this well. */
     position: relative;
     padding: var(--grid-gap); /* Add padding if desired */
}

.masonry-container-js .grid-item {
    /* Define the width of items - Masonry.js calculates position */
    /* Example: 3 columns with gap */
    width: calc((100% / 3) - var(--grid-gap) * 2 / 3);
    /* We can use % width, but Masonry needs help knowing columnWidth */
    /* Using a fixed selector for columnWidth in JS is often better */
    margin-bottom: var(--grid-gap); /* Vertical spacing */
    /* Ensure items don't have extra margins affecting layout */
    margin-left: 0;
    margin-right: 0;
    /* Aspect ratio is fine here, JS will handle height differences */
}

/* --- Alternative Width approach for JS Masonry --- */
/* Make items have a base width, let JS calculate columns based on that */
/*
.masonry-container-js .grid-item {
    width: 250px; // Example fixed width
    margin-bottom: var(--grid-gap);
}
*/

/* Ensure cards within the JS container have basic styling */
.masonry-container-js .card {
    /* Inherit styles or redefine if needed */
    /* You might not want aspect-ratio if content dictates height */
}

/* Responsive adjustments for JS Masonry (often handled by JS recalculating on resize) */
/* CSS might primarily adjust the container width or base item widths */
@media (max-width: 768px) {
    .masonry-container-js .grid-item {
       /* Example: 2 columns on smaller screens */
       width: calc((100% / 2) - var(--grid-gap) * 1 / 2);
    }
}
@media (max-width: 500px) {
    .masonry-container-js .grid-item {
       /* Example: 1 column on very small screens */
       width: 100%;
    }
}

/* Styles for card content remain the same as defined previously */

</style> <!-- 

# HTML/CSS layout with GoldenRatio
Okay, here's a prompt designed to generate an HTML/CSS layout based on your specifications, along with suggestions for improvement and a rationale behind some of the choices:

**Prompt:**

"Generate a simple HTML and CSS layout for a grid-based content display, adhering to the golden ratio principles.

**Specific Requirements:**

- **Golden Ratio Layout:** Design the layout using the golden ratio (approximately 1.618) for proportional scaling. Specifically:
    
    - The first content card (a featured card) should be the largest.
        
    - Subsequent content cards should decrease in size according to the golden ratio relative to the previous card. For example, if the featured card's width is x, the next card's width should be approximately x / 1.618.
        
- **CSS Variables:** Use CSS variables to define key values like:
    
    - Base font size (--base-font-size)
        
    - Primary color (--primary-color)
        
    - Golden ratio value (--golden-ratio: 1.618;)
        
    - Gap/margin size (--grid-gap)
        
    - Breakpoint for different viewport sizes (--breakpoint-md, --breakpoint-lg, --breakpoint-xl)
        
- **Responsive Design:** The layout must be mobile-responsive. On smaller screens (mobile), the cards should stack vertically (one card per row). On larger screens (md, lg, xl), implement a multi-column grid.
    
- **Content Cards:** Each piece of content should be contained within a <div> element acting as a "card."
    
- **Aspect Ratios:**
    
    - Standardize aspect ratios using CSS's aspect-ratio property.
        
    - Include these aspect ratio options: 1/1 (square), 4/3, and a golden ratio-based aspect ratio (e.g., 1.618/1 or a close approximation that looks visually pleasing -- you can slightly adjust this for aesthetics). Provide CSS classes that let you apply each of these easily.
        
- **Grid and/or Flexbox:** Utilize CSS Grid and/or Flexbox for layout. Consider using CSS Grid for the overall grid structure and Flexbox for any finer control within the cards (if needed).
    
- **Masonry Option:** While the default is a regular grid, provide an optional class or approach that allows for a masonry-style stacking of cards. (This might require JavaScript or advanced CSS).
    
- **Custom Resize Classes:** Create CSS classes (e.g., .size-1, .size-2, .size-3) that apply the golden ratio scaling. The .size-1 should be the largest size, .size-2 smaller (divided by the golden ratio), and so on. The first, featured card should have a class of featured-card to distinguish it.
    
- **Vanilla CSS:** Keep the CSS as simple and vanilla as possible. The goal is to be easily adaptable to Tailwind CSS or other frameworks. Avoid complex animations or styling beyond the basic layout and sizing.
    
- **Column Structure:**
    
    - **Mobile (Default):** 1 column
        
    - **md (Medium):** 2 columns
        
    - **lg (Large):** 3 columns
        
    - **xl (Extra Large):** 4 columns
        

**Output:**

Provide the complete HTML and CSS code. Comment the CSS extensively to explain the purpose of each section and class."

**Suggestions and Improvements:**

1. **JavaScript for Masonry (Optional):** A true masonry layout can be tricky with pure CSS, especially with varying card heights. Suggest using a simple JavaScript library like Masonry.js or Isotope.js if the user really wants a masonry effect. The CSS can provide the basic structure, and the JS library handles the intelligent stacking.
    
2. **Content Placeholder:** Use placeholder text within the generated HTML, such as "Content Card 1", "Content Card 2", etc. and Lorem Ipsum to indicate where actual content will go.
    
3. **minmax() for Grid Columns:** In the CSS Grid definition, use the minmax() function to set a minimum and maximum size for the grid columns. This will help with responsiveness and prevent content from overflowing. Something like grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); would be a good starting point.
    
4. **object-fit: cover; for Images:** If the cards are likely to contain images, include object-fit: cover; in the CSS for the <img> tags. This will ensure that images fill the card's space without distortion and maintain their aspect ratio.
    
5. **Semantic HTML:** Use semantic HTML elements where appropriate (e.g., <article> for content cards, <header>, <footer>, <main>). This improves accessibility and SEO.
    
6. **Accessibility:** Add some basic accessibility features like aria-label attributes to buttons or links, and ensure sufficient color contrast.
    
7. **Golden Ratio Fine-Tuning:** The prompt allows for slight adjustments to the golden ratio aspect ratio for aesthetic reasons. Emphasize this point, as the mathematically perfect ratio might not always be the most visually pleasing in practice.
    
8. **Card Height Management:** Consider how card height will be managed, especially in the grid layout. If card content varies significantly, the grid layout might look uneven. You could explore using grid-auto-rows: minmax(150px, auto); or similar to set a minimum height. Another way is to create a parent wrapper with fixed height
    
9. **Simplified sizing** Using scale instead of dividing will allow cleaner implementation. size-1 is scale(1), size-2 is scale (1/1.618), size-3 is scale(1/1.618/1.618)
    

**Why these suggestions?**

- **Practicality:** The suggestions address real-world challenges you'll encounter when implementing a golden ratio-based layout, such as responsiveness, image handling, and content variations.
    
- **Maintainability:** The emphasis on CSS variables and vanilla CSS promotes a clean, well-organized, and easily maintainable codebase.
    
- **Flexibility:** The optional masonry layout and the ability to adjust the golden ratio provide flexibility to adapt the layout to different content types and design preferences.
    
- **Accessibility:** Accessibility is crucial for creating inclusive web experiences.
    

By incorporating these suggestions, you'll get a more robust and user-friendly layout that's easier to customize and maintain.
-->`])), renderComponent($$result, "BaseLayout", $$BaseLayout, { "title": "Essential Golden Ratio Inspired Grid" }, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<main> <h1>Golden Ratio Inspired Grid Layout</h1> <p>This layout uses CSS Grid. The Golden Ratio (approx 1.618) is applied in two main ways:</p> <ul> <li>Directly via \`aspect-ratio\` on certain cards (\`aspect-ratio-golden\`).</li> <li>Conceptually, through visual hierarchy using different size classes (\`size-1\`, \`size-2\`, \`size-3\`) which occupy different amounts of grid space, creating dominant and subordinate elements.</li> </ul> <main class="grid-container"> <!-- size-1: Largest, featured item --> <article class="card size-1 aspect-ratio-golden"> <div class="card-content"> <h3>Featured Item (Size 1)</h3> <p>Dominant content card, establishing the primary scale. Uses golden ratio aspect ratio.</p> </div> </article> <!-- size-2: Medium importance --> <article class="card size-2 aspect-ratio-1-1"> <div class="card-content"> <h3>Item 2 (Size 2)</h3> <p>Secondary content, square.</p> </div> </article> <article class="card size-2 aspect-ratio-4-3"> <div class="card-content"> <h3>Item 3 (Size 2)</h3> <p>More secondary content, 4:3 ratio.</p> </div> </article> <!-- size-3: Smallest grid units --> <article class="card size-3 aspect-ratio-1-1"> <div class="card-content"> <h3>Item 4 (Size 3)</h3> <p>Tertiary content block, square.</p> </div> </article> <article class="card size-3 aspect-ratio-golden"> <div class="card-content"> <h3>Item 5 (Size 3)</h3> <p>Another tertiary item, golden ratio aspect.</p> </div> </article> <article class="card size-3 aspect-ratio-4-3"> <div class="card-content"> <h3>Item 6 (Size 3)</h3> <p>Further details here.</p> </div> </article> <!-- size-2 again --> <article class="card size-2 aspect-ratio-golden"> <div class="card-content"> <h3>Item 7 (Size 2)</h3> <p>Back to secondary size, golden ratio aspect.</p> </div> </article> <article class="card size-3 aspect-ratio-1-1"> <div class="card-content"> <h3>Item 8 (Size 3)</h3> <p>Another small item.</p> </div> </article> </main> <!--
   
--> <pre>    Optional: Alternative Layout Technique - Masonry

    True Masonry (where items pack tightly based on varying heights)
    usually requires JavaScript (like Masonry.js or Isotope) for precise positioning.
    CSS Columns can provide a basic approximation but lack grid's control.
</pre> <div class="masonry-container-css-columns"> <div class="card aspect-ratio-1-1">Card A</div> <div class="card aspect-ratio-4-3" style="height: 250px;">Card B (Taller)</div> <div class="card aspect-ratio-golden">Card C</div> <div class="card aspect-ratio-1-1" style="height: 180px;">Card D (Shorter)</div> <div class="card aspect-ratio-4-3">Card E</div> </div> <!-- ========== Optional Masonry Examples ========== --> <hr style="margin: 3rem 0; border: 0; border-top: 1px solid #ccc;"> <h2>Optional: Masonry Layout Examples</h2> <!-- --- 1. CSS Grid (Limited Approximation) --- --> <h3>1. Masonry using CSS Grid (Limited Approximation)</h3> <p>This requires manually setting <code>grid-row: span X;</code> based on estimated content height relative to a tiny <code>grid-auto-rows</code> value. Generally impractical for dynamic content.</p> <div class="masonry-container-grid-approx"> <!-- Add 'style="grid-row: span X;"' to each card based on its expected height --> <article class="card aspect-ratio-1-1" style="grid-row: span 15;"> <!-- Approx 15 * 10px = 150px high --> <div class="card-content"><h3>Grid Approx 1</h3><p>Square card.</p></div> </article> <article class="card aspect-ratio-4-3" style="grid-row: span 25;"> <!-- Approx 25 * 10px = 250px high --> <div class="card-content"><h3>Grid Approx 2</h3><p>Taller 4:3 card.</p></div> </article> <article class="card aspect-ratio-golden" style="grid-row: span 18;"> <!-- Approx 18 * 10px = 180px high --> <div class="card-content"><h3>Grid Approx 3</h3><p>Golden ratio card.</p></div> </article> <article class="card aspect-ratio-1-1" style="grid-row: span 12;"> <!-- Approx 12 * 10px = 120px high --> <div class="card-content"><h3>Grid Approx 4</h3><p>Short square card.</p></div> </article> <article class="card aspect-ratio-golden" style="grid-row: span 22;"> <!-- Approx 22 * 10px = 220px high --> <div class="card-content"><h3>Grid Approx 5</h3><p>Another golden ratio.</p></div> </article> </div> <hr style="margin: 3rem 0; border: 0; border-top: 1px solid #ccc;"> <!-- --- 2. CSS Columns --- --> <h3>2. Masonry using CSS Columns</h3> <p>Simpler CSS-only approach. Items flow down columns. Less control over precise placement and potential for items breaking across columns (<code>break-inside: avoid;</code> helps).</p> <div class="masonry-container-css-columns"> <!-- Content heights will naturally vary or use inline styles --> <article class="card aspect-ratio-1-1"> <div class="card-content"><h3>Columns 1</h3><p>Square card. Might appear in any column.</p></div> </article> <article class="card aspect-ratio-4-3" style="height: 250px;"> <!-- Example explicit height --> <div class="card-content"><h3>Columns 2</h3><p>Taller 4:3 card. Height affects flow.</p></div> </article> <article class="card aspect-ratio-golden"> <div class="card-content"><h3>Columns 3</h3><p>Golden ratio card. Standard content.</p></div> </article> <article class="card aspect-ratio-1-1" style="height: 180px;"> <!-- Example explicit height --> <div class="card-content"><h3>Columns 4</h3><p>Shorter square card.</p></div> </article> <article class="card aspect-ratio-golden"> <div class="card-content"><h3>Columns 5</h3><p>Another golden ratio card, maybe more text here to make it naturally taller than others.</p></div> </article> <article class="card aspect-ratio-1-1"> <div class="card-content"><h3>Columns 6</h3><p>Square card.</p></div> </article> </div> <hr style="margin: 3rem 0; border: 0; border-top: 1px solid #ccc;"> <!-- --- 3. JavaScript Library (Masonry.js) --- --> <h3>3. Masonry using JavaScript Library (Masonry.js)</h3> <p>The standard, robust approach. Requires including the library and initializing it.</p> <div class="masonry-container-js grid-items" style="padding: 0;"> <!-- Added 'grid-items' class for JS selector --> <!-- Class 'grid-item' will be targeted by the JS --> <article class="card grid-item aspect-ratio-1-1"> <div class="card-content"><h3>JS Masonry 1</h3><p>Square card.</p></div> </article> <article class="card grid-item aspect-ratio-4-3" style="height: 250px;"> <div class="card-content"><h3>JS Masonry 2</h3><p>Taller 4:3 card.</p></div> </article> <article class="card grid-item aspect-ratio-golden"> <div class="card-content"><h3>JS Masonry 3</h3><p>Golden ratio card.</p></div> </article> <article class="card grid-item aspect-ratio-1-1" style="height: 180px;"> <div class="card-content"><h3>JS Masonry 4</h3><p>Shorter square card.</p></div> </article> <article class="card grid-item aspect-ratio-golden"> <div class="card-content"><h3>JS Masonry 5</h3><p>Another golden ratio. This one has quite a bit more text content to naturally make it taller than some of the others, demonstrating how Masonry adapts.</p></div> </article> <article class="card grid-item aspect-ratio-1-1"> <div class="card-content"><h3>JS Masonry 6</h3><p>Square card.</p></div> </article> <article class="card grid-item aspect-ratio-4-3"> <div class="card-content"><h3>JS Masonry 7</h3><p>Standard 4:3.</p></div> </article> </div> </main> ` }));
}, "/home/matsu/Desktop/jy/src/pages/sketches/webdev/250402-goldenratiocssgrid.astro", void 0);

const $$file = "/home/matsu/Desktop/jy/src/pages/sketches/webdev/250402-goldenratiocssgrid.astro";
const $$url = "/sketches/webdev/250402-goldenratiocssgrid";

const __vite_glob_0_28 = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$250402Goldenratiocssgrid,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

export { __vite_glob_0_28 as _ };

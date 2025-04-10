---
title: How to use LocalStorage for UI State Persistence
description: Learn how to implement collapsible sections with localStorage to remember user preferences
pubDate: 250410
draft: 0
---

# Creating Collapsible Sections with LocalStorage Persistence

In this guide, we'll learn how to implement collapsible sections (accordion) with state persistence using localStorage. This allows your website to remember which sections users have expanded or collapsed, creating a better user experience when they return to your site.

## Step 1: Setting Up the HTML Structure

First, we need to create our HTML structure for collapsible sections:

```html
<div class="section-container" data-section="introduction">
  <button 
    class="section-toggle" 
    aria-expanded="true"
    aria-controls="section-introduction"
  >
    <span>Introduction</span>
    <svg class="icon"><!-- Arrow icon --></svg>
  </button>
  <div 
    id="section-introduction" 
    class="section-content"
  >
    <!-- Section content here -->
  </div>
</div>
```

Key HTML attributes:
- `data-section`: A unique identifier for each section
- `aria-expanded`: Indicates whether the section is expanded (accessibility)
- `aria-controls`: References the ID of the controlled content (accessibility)

## Step 2: Adding Basic CSS

Add CSS to handle the transition effects and initial states:

```css
.section-content {
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.icon {
  transform: rotate(0deg);
  transition: transform 0.3s ease;
}

.icon.rotate-180 {
  transform: rotate(180deg);
}
```

## Step 3: Implementing JavaScript for Toggle Functionality

Now, let's implement the JavaScript to handle toggling sections:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const sectionContainers = document.querySelectorAll('.section-container');
  
  sectionContainers.forEach(container => {
    const section = container.dataset.section;
    const toggle = container.querySelector('.section-toggle');
    const content = container.querySelector('.section-content');
    const icon = toggle.querySelector('.icon');
    
    // Set initial state
    let isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    
    if (isExpanded) {
      content.style.maxHeight = content.scrollHeight + 'px';
      icon.classList.add('rotate-180');
    } else {
      content.style.maxHeight = '0px';
    }
    
    // Toggle functionality
    toggle.addEventListener('click', () => {
      isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      const newState = !isExpanded;
      
      toggle.setAttribute('aria-expanded', newState.toString());
      
      if (newState) {
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.classList.add('rotate-180');
      } else {
        content.style.maxHeight = '0px';
        icon.classList.remove('rotate-180');
      }
    });
  });
});
```

## Step 4: Adding LocalStorage Persistence

Now for the key part - adding localStorage to remember user preferences:

```javascript
document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'sectionStates';
  const sectionContainers = document.querySelectorAll('.section-container');
  
  // Get stored section states from localStorage
  let storedStates = {};
  try {
    const savedStates = localStorage.getItem(STORAGE_KEY);
    if (savedStates) {
      storedStates = JSON.parse(savedStates);
    }
  } catch (e) {
    console.error('Error loading section states from localStorage:', e);
  }
  
  // Setup each section
  sectionContainers.forEach(container => {
    const section = container.dataset.section;
    const toggle = container.querySelector('.section-toggle');
    const content = container.querySelector('.section-content');
    const icon = toggle.querySelector('.icon');
    
    // Set initial state based on localStorage or default
    let isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    
    // If we have a stored state for this section, override default
    if (section in storedStates) {
      isExpanded = storedStates[section];
      toggle.setAttribute('aria-expanded', isExpanded.toString());
    }
    
    // Apply initial state
    if (isExpanded) {
      content.style.maxHeight = content.scrollHeight + 'px';
      icon.classList.add('rotate-180');
    } else {
      content.style.maxHeight = '0px';
    }
    
    // Toggle functionality
    toggle.addEventListener('click', () => {
      isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      const newState = !isExpanded;
      
      toggle.setAttribute('aria-expanded', newState.toString());
      
      if (newState) {
        content.style.maxHeight = content.scrollHeight + 'px';
        icon.classList.add('rotate-180');
      } else {
        content.style.maxHeight = '0px';
        icon.classList.remove('rotate-180');
      }
      
      // Save to localStorage
      try {
        storedStates[section] = newState;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storedStates));
      } catch (e) {
        console.error('Error saving section states to localStorage:', e);
      }
    });
  });
});
```

## Step 5: TypeScript Considerations

If you're using TypeScript, make sure to add proper type assertions and null checks:

```typescript
document.addEventListener('DOMContentLoaded', () => {
  const STORAGE_KEY = 'sectionStates';
  const sectionContainers = document.querySelectorAll('.section-container');
  
  // Get stored section states from localStorage
  let storedStates: Record<string, boolean> = {};
  try {
    const savedStates = localStorage.getItem(STORAGE_KEY);
    if (savedStates) {
      storedStates = JSON.parse(savedStates);
    }
  } catch (e) {
    console.error('Error loading section states from localStorage:', e);
  }
  
  // Setup each section
  sectionContainers.forEach(container => {
    const section = (container as HTMLElement).dataset.section;
    const toggle = container.querySelector('.section-toggle');
    const content = container.querySelector('.section-content');
    const icon = toggle?.querySelector('.icon');
    
    if (!toggle || !content || !icon || !section) return;
    
    // Set initial state based on localStorage or default
    let isExpanded = toggle.getAttribute('aria-expanded') === 'true';
    
    // If we have a stored state for this section, override default
    if (section in storedStates) {
      isExpanded = storedStates[section];
      toggle.setAttribute('aria-expanded', isExpanded.toString());
    }
    
    // Apply initial state
    if (isExpanded) {
      (content as HTMLElement).style.maxHeight = `${content.scrollHeight}px`;
      icon.classList.add('rotate-180');
    } else {
      (content as HTMLElement).style.maxHeight = '0px';
    }
    
    // Toggle functionality
    toggle.addEventListener('click', () => {
      isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      const newState = !isExpanded;
      
      toggle.setAttribute('aria-expanded', newState.toString());
      
      if (newState) {
        (content as HTMLElement).style.maxHeight = `${content.scrollHeight}px`;
        icon.classList.add('rotate-180');
      } else {
        (content as HTMLElement).style.maxHeight = '0px';
        icon.classList.remove('rotate-180');
      }
      
      // Save to localStorage
      try {
        storedStates[section] = newState;
        localStorage.setItem(STORAGE_KEY, JSON.stringify(storedStates));
      } catch (e) {
        console.error('Error saving section states to localStorage:', e);
      }
    });
  });
});
```

## Understanding LocalStorage

LocalStorage is a web API that allows you to store key-value pairs in the browser. The data persists even when the browser is closed and reopened. Key features:

- Data is stored as strings (use `JSON.stringify()` and `JSON.parse()` for objects)
- ~5MB storage limit per domain
- Synchronous API (doesn't block the main thread for small operations)
- Data never expires unless manually cleared

## Best Practices

1. **Error Handling**: Always use try-catch blocks when working with localStorage, as it can throw exceptions if:
   - Storage is full
   - User has disabled localStorage in their browser settings
   - User is in private/incognito mode in some browsers

2. **Keep Storage Small**: Only store what's necessary, as localStorage has limited space.

3. **Use a Namespace**: Prefix your storage keys to avoid conflicts with other scripts.

4. **Clear Outdated Data**: Implement a cleanup mechanism if your app evolves and storage format changes.

5. **Accessibility**: Always maintain proper ARIA attributes for screen readers.

## Complete Example

Here's a complete, self-contained example of collapsible sections with localStorage persistence:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Collapsible Sections with LocalStorage</title>
  <style>
    .section-container {
      margin-bottom: 1rem;
      border: 1px solid #ddd;
      border-radius: 4px;
    }
    
    .section-toggle {
      display: flex;
      justify-content: space-between;
      width: 100%;
      padding: 0.75rem 1rem;
      background: #f5f5f5;
      border: none;
      text-align: left;
      cursor: pointer;
    }
    
    .section-content {
      overflow: hidden;
      transition: max-height 0.3s ease-out;
      padding: 0 1rem;
    }
    
    .icon {
      transition: transform 0.3s ease;
    }
    
    .rotate-180 {
      transform: rotate(180deg);
    }
  </style>
</head>
<body>
  <h1>Collapsible Sections Demo</h1>
  
  <div class="section-container" data-section="section1">
    <button class="section-toggle" aria-expanded="true" aria-controls="content1">
      <span>Section 1</span>
      <svg class="icon" width="20" height="20" viewBox="0 0 24 24">
        <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
      </svg>
    </button>
    <div id="content1" class="section-content">
      <p>This is the content for section 1.</p>
    </div>
  </div>
  
  <div class="section-container" data-section="section2">
    <button class="section-toggle" aria-expanded="false" aria-controls="content2">
      <span>Section 2</span>
      <svg class="icon" width="20" height="20" viewBox="0 0 24 24">
        <path d="M7 10l5 5 5-5H7z" fill="currentColor" />
      </svg>
    </button>
    <div id="content2" class="section-content">
      <p>This is the content for section 2.</p>
    </div>
  </div>
  
  <script>
    document.addEventListener('DOMContentLoaded', () => {
      const STORAGE_KEY = 'sectionStates';
      const sectionContainers = document.querySelectorAll('.section-container');
      
      // Get stored section states from localStorage
      let storedStates = {};
      try {
        const savedStates = localStorage.getItem(STORAGE_KEY);
        if (savedStates) {
          storedStates = JSON.parse(savedStates);
        }
      } catch (e) {
        console.error('Error loading section states from localStorage:', e);
      }
      
      // Setup each section
      sectionContainers.forEach(container => {
        const section = container.dataset.section;
        const toggle = container.querySelector('.section-toggle');
        const content = container.querySelector('.section-content');
        const icon = toggle.querySelector('.icon');
        
        // Set initial state based on localStorage or default
        let isExpanded = toggle.getAttribute('aria-expanded') === 'true';
        
        // If we have a stored state for this section, use it
        if (section in storedStates) {
          isExpanded = storedStates[section];
          toggle.setAttribute('aria-expanded', isExpanded.toString());
        }
        
        // Apply initial state
        if (isExpanded) {
          content.style.maxHeight = content.scrollHeight + 'px';
          icon.classList.add('rotate-180');
        } else {
          content.style.maxHeight = '0px';
        }
        
        // Toggle functionality
        toggle.addEventListener('click', () => {
          isExpanded = toggle.getAttribute('aria-expanded') === 'true';
          const newState = !isExpanded;
          
          toggle.setAttribute('aria-expanded', newState.toString());
          
          if (newState) {
            content.style.maxHeight = content.scrollHeight + 'px';
            icon.classList.add('rotate-180');
          } else {
            content.style.maxHeight = '0px';
            icon.classList.remove('rotate-180');
          }
          
          // Save to localStorage
          try {
            storedStates[section] = newState;
            localStorage.setItem(STORAGE_KEY, JSON.stringify(storedStates));
          } catch (e) {
            console.error('Error saving section states to localStorage:', e);
          }
        });
      });
    });
  </script>
</body>
</html>
```

By following this guide, you've implemented collapsible sections that remember user preferences across visits, creating a more personalized and user-friendly experience.
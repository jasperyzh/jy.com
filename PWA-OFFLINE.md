# PWA Implementation with Offline Support

This document outlines the implementation of Progressive Web App (PWA) features with offline capabilities for this Astro website.

## Features Implemented

1. **Basic PWA Setup**
   - Service worker registration with auto-update
   - Web app manifest with icons
   - Install prompt for supported devices

2. **Enhanced Offline Support**
   - Homepage caching for offline access
   - Automatic caching of blog posts when viewed
   - Custom offline page showing cached content
   - Visual indicator when offline

## Implementation Details

### 1. PWA Configuration

The PWA is configured in `astro.config.mjs` using the `@vite-pwa/astro` plugin:

```js
AstroPWA({
  registerType: 'autoUpdate',
  manifest: {
    name: 'Jasper Yong',
    short_name: 'JY',
    description: 'Jasper Yong\'s personal website and blog',
    // Other manifest settings...
  },
  workbox: {
    navigateFallback: '/offline',
    navigateFallbackAllowlist: [/^(?!\/_image).*$/],
    globPatterns: ['**/*.{css,js,html,svg,png,ico,jpg,jpeg,md,json}'],
    runtimeCaching: [
      {
        urlPattern: /^https:\/\/jasperyong\.com\/blog\/.*/,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: 'blog-content',
          expiration: {
            maxEntries: 50,
            maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
          },
        },
      },
      {
        urlPattern: /^https:\/\/jasperyong\.com\/.*/,
        handler: 'NetworkFirst',
        options: {
          cacheName: 'site-pages',
          expiration: {
            maxEntries: 20,
            maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
          },
          networkTimeoutSeconds: 3,
        },
      },
    ],
  },
})
```

### 2. Caching Strategies

Two primary caching strategies are used:

1. **NetworkFirst** for general site pages:
   - Tries to fetch the latest content from the network
   - Falls back to cached content if network request fails
   - Includes a 3-second timeout for a faster offline experience

2. **StaleWhileRevalidate** for blog content:
   - Immediately serves cached content if available
   - Updates the cache in the background for future visits
   - Provides a seamless reading experience even with poor connectivity

### 3. Offline Page

A custom offline page (`/offline.astro`) is used as the fallback when a user is offline and attempts to navigate to an uncached page:

- Shows a friendly message explaining the offline state
- Dynamically lists all currently cached pages the user can still access
- Makes offline navigation intuitive by showing what content is available

### 4. Visual Indicators

An offline notification banner appears at the top of the page when the user's device loses internet connection. The notification:

- Provides immediate feedback about connectivity status
- Includes a link to the offline page to find available content
- Disappears automatically when connection is restored

### 5. Blog Post Caching

Blog posts are automatically cached when viewed through the `CacheCurrentPage.astro` component that:

- Adds the current page to the cache when viewed
- Caches all images on the page
- Only runs on blog post pages
- Ensures blog posts are available for offline reading after being viewed once

## How It Works for Users

1. **First Visit**:
   - Service worker installs and caches core assets
   - Homepage and static assets are pre-cached

2. **Browsing Blog Posts**:
   - Each blog post visited is automatically cached
   - Images in posts are also cached

3. **Going Offline**:
   - User sees an offline notification banner
   - Can continue to access previously visited pages
   - Can navigate to the offline page to see available content
   - If attempting to visit uncached content, redirected to offline page

4. **Reconnecting**:
   - Offline notification disappears
   - Service worker updates with any new content
   - Normal browsing resumes

## Testing Offline Functionality

To test the offline capabilities:

1. Visit the site while online
2. Browse several blog posts to cache them
3. In Chrome DevTools, go to Application > Service Workers and check "Offline"
4. Try navigating to previously visited pages (should work)
5. Try going to unvisited pages (should show offline page)
6. Go to the /offline page to see a list of all cached content

## Limitations

- Only pages visited while online will be available offline
- Dynamic content that requires API calls may not function properly offline
- Large media files might not be cached depending on size limitations

## Future Enhancements

Potential improvements to consider:

- Background sync for form submissions when offline
- More sophisticated caching for media content
- Offline-first data strategy with IndexedDB for user data
- Notification when new content is available
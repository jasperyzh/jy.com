---
contentType: video
pubDate: 250320
tags: ["video", "demo"]
location:
  name: "Demo Location"
media:
  - url: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4"
    type: "video"
    caption: "A demo video for testing video posts"
---

# Microblog Content Collection

This directory contains microblog posts for the website. Microblogs are short-form content similar to social media posts (Twitter/X, Instagram, etc.).

## Post Format

Each microblog post is a Markdown file with frontmatter for metadata:

```md
---
contentType: mixed|text|image|video
pubDate: YYMMDD or standard date
tags: ["tag1", "tag2"]
title: "Optional Title" 
media:
  - url: "/path/to/image.jpg"
    type: "image"
    alt: "Alt text"
    caption: "Optional caption"
location:
  name: "Location Name"
  coordinates: [latitude, longitude]
isPrivate: false
---

The post content goes here. Keep it brief and to the point!

#hashtags #are #supported
```

## Post Types

- **Text**: Simple text posts without media
- **Image**: Posts with one or more images
- **Video**: Posts with one or more videos
- **Mixed**: Posts with a combination of text and media

## Creating a New Post

1. Create a new `.md` file in this directory
2. Use the format YYMMDD-slug.md for the filename (e.g., `250320-hello-world.md`)
3. Add the required frontmatter (see above)
4. Write your content
5. Save the file

## Media Files

- Store images in `/public/img/` directory
- Videos can be stored locally or linked from external sources
- Use relative paths for local media (e.g., `/img/photo.jpg`)

## Privacy & Sharing

- Set `isPrivate: true` for posts that shouldn't appear in the public feed
- All posts have a share button that posts to a private social system
- The sharing API is at `/api/share` and can be customized for different platforms

---

For more information, see the documentation in `/src/pages/microblog/` and the components in `/src/components/microblog/`.
---
title: Streamlining .WebP Image Conversion & Serving for WordPress Websites
description: Do you feel restricted by webp plugins? Discover a do-it-yourself method to incorporate .webp format into your site.
pubDate: 230615 
author: jyzh 
image:
  url: ""
  alt: "#"
tags: ["general", "webdev"]
draft: true

---

Do you feel restricted by webp plugins? Discover a do-it-yourself method to incorporate .webp format into your site.

Have you ever felt frustrated by the limitations of webp plugins? If so, you're not alone. To overcome this, I've figured out a straightforward way to install the .webp format manually.

Follow these steps to convert all .jpg/.png images into .webp format and get your WordPress site up to speed:

1. Use FFmpeg: With this software, convert all your .jpg and .png images into the .webp format.

2. Utilise Bash Scripts: Craft a .sh file to locate each image and convert them in bulk.

3. Test the Accessibility: Check if both image formats (.jpg/.webp) can be accessed via URL.

4. Modify .htaccess: Amend the following in your .htaccess file:

Your .htaccess / Apache may still be a mystery if you haven't delved deeper than simple rewrites for WordPress and redirects. But worry not, because in this case, we're going to serve .webp if the .jpg|.png|.gif file has .webp alongside it.

Hence, when the website is loading the image, it will intercept and load the image/webp instead. The code snippet below accomplishes this:


1. using ffmpeg to convert all .jpg/.png into .webp
2. use bash .sh to find each image, and convert in bulk
3. Test if both image format (.jpg/.webp) are accessible via URL
4. .htaccess add the following 

## Onto WordPress

.htaccess / apache is still an unknown to me as I have never dive deeper than simple rewrite for WordPress and redirect.

In this case, we will have the server to serve .webp if the .jpg|.png|.gif file have .webp next to it.

So when the website is loading the image, it will be intecept and load the *image/webp* instead.


```
<IfModule mod_rewrite.c>
RewriteEngine On

# Extract the subdirectory from REQUEST_URI
# Took me hours to solve this as the path misalign as my wordpress root is on "/localhost/wordpress", and %{DOCUMENT_ROOT} does not includes the subdirectory
RewriteCond %{REQUEST_URI} ^(/[^/]+/)
RewriteRule ^ - [E=SUBDIR:%1]

# Check if browser supports WebP images
RewriteCond %{HTTP_ACCEPT} image/webp

# Check if WebP replacement image exists
RewriteCond %{DOCUMENT_ROOT}%{ENV:SUBDIR}$1.webp -f

# Serve WebP image instead
RewriteRule (.+)\.(jpe?g|png|gif)$ $1.webp [T=image/webp,E=REQUEST_image]
</IfModule>

<IfModule mod_headers.c>
# Vary: Accept for all the requests to jpeg, png and gif
Header append Vary Accept env=REQUEST_image
</IfModule>

<IfModule mod_mime.c>
AddType image/webp .webp
</IfModule>
```
Source: [WebP images with htaccess](https://github.com/vincentorback/WebP-images-with-htaccess)
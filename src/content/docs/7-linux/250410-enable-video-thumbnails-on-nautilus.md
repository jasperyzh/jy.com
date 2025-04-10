---
title: Enabling Video Thumbnails in Nautilus (aka Explorer) on Ubuntu
description: Enabling Video Thumbnails in Nautilus on Ubuntu
pubDate: 250410
draft: 0
---

# Enabling Video Thumbnails in Nautilus on Ubuntu

To enable video thumbnails in Nautilus (Files) on Ubuntu, follow these steps:

## Method 1: Install FFmpeg Thumbnailer

1. Open a terminal (Ctrl+Alt+T)
2. Install the required packages:
   ```bash
   sudo apt update
   sudo apt install ffmpegthumbnailer
   ```

## Method 2: Configure Nautilus Thumbnail Settings

1. Open the terminal and run:
   ```bash
   gsettings set org.gnome.nautilus.preferences show-image-thumbnails 'always'
   ```

## Method 3: Install Additional Thumbnailer Packages

For more comprehensive thumbnail support:
```bash
sudo apt install tumbler
```

## Method 4: Edit Local Configuration (if needed)

1. Create or edit the configuration file:
   ```bash
   sudo nano /etc/gnome/defaults.list
   ```
2. Add these lines (if they don't exist):
   ```
   video/*=ffmpegthumbnailer.desktop;
   ```

## Restart Nautilus

After making changes, restart Nautilus:
```bash
nautilus -q
```

Then reopen your file browser. Video thumbnails should now appear for supported formats (MP4, AVI, MKV, etc.).

If you still don't see thumbnails, try logging out and back in or restarting your system.
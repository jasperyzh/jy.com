#!/bin/bash

# Create blog directory if it doesn't exist
mkdir -p ./src/content/blog
mkdir -p ./src/content/microblog

# Copy blog posts from Obsidian vault to project directory
cp -r /home/matsu/Documents/--journal/blog/* ./src/content/blog/
cp -r /home/matsu/Documents/--journal/microblog/* ./src/content/microblog/

echo "Blog posts copied successfully!"
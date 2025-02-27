#!/bin/bash

# Create blog directory if it doesn't exist
mkdir -p ./src/content/blog

# Copy blog posts from Obsidian vault to project directory
cp -r /home/matsu/Documents/_note/_note/blog/* ./src/content/blog/

echo "Blog posts copied successfully!"
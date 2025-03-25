#!/bin/bash

# Create blog directory if it doesn't exist
mkdir -p ./content/blog
mkdir -p ./content/microblog

# Copy blog posts from Obsidian vault to project directory
cp -r /home/matsu/Documents/--journal/blog/* ./content/blog/
cp -r /home/matsu/Documents/--journal/microblog/* ./content/microblog/

echo "Blog posts copied successfully!"
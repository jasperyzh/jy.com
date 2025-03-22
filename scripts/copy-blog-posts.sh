#!/bin/bash

# Create blog directory if it doesn't exist
mkdir -p ./content/blog

# Copy blog posts from Obsidian vault to project directory
cp -r /home/matsu/Documents/_note/_note/blog/* ./content/blog/
cp -r /home/matsu/Documents/_note/_note/microblog/* ./content/microblog/

echo "Blog posts copied successfully!"
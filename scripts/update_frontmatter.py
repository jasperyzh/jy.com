#!/usr/bin/env python3
import re
import os
import glob

def update_frontmatter(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extract the date from filename if it exists (format: YYMMDD)
    filename = os.path.basename(file_path)
    date_match = re.match(r'(\d{6}).*', filename)
    pub_date = date_match.group(1) if date_match else "000000"
    
    # Extract existing frontmatter
    frontmatter_match = re.match(r'---\s+(.*?)\s+---', content, re.DOTALL)
    
    if not frontmatter_match:
        print(f"No frontmatter found in {file_path}, skipping...")
        return
    
    old_frontmatter = frontmatter_match.group(1)
    
    # Extract existing values
    title_match = re.search(r'title:\s*(.*)', old_frontmatter)
    title = title_match.group(1).strip() if title_match else "Untitled"
    
    description_match = re.search(r'description:\s*(.*)', old_frontmatter)
    description = description_match.group(1).strip() if description_match else ""
    
    tags_match = re.search(r'tags:\s*(\[.*?\])', old_frontmatter)
    tags = tags_match.group(1) if tags_match else '["General"]'
    
    # Create new frontmatter
    new_frontmatter = f"""---
pubDate: {pub_date}
title: {title}
description: {description}
tags: {tags}
draft: 0
thumbnail: "/img/placeholder.png" 
category: "Curiosity"
---"""
    
    # Replace old frontmatter with new
    new_content = re.sub(r'---\s+.*?\s+---', new_frontmatter, content, 1, re.DOTALL)
    
    with open(file_path, 'w', encoding='utf-8') as f:
        f.write(new_content)
    
    print(f"Updated frontmatter in {file_path}")

# Process all markdown files in the _blog-rewrite directory
blog_files = glob.glob('/home/matsu/Desktop/jy/src/content/blog/_blog-rewrite/*.md')
for file_path in blog_files:
    update_frontmatter(file_path)

print(f"Processed {len(blog_files)} files")
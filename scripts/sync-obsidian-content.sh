#!/bin/bash

# Define source and destination directories
OBSIDIAN_BLOG="/home/matsu/Documents/--journal/blog"
OBSIDIAN_DOCS="/home/matsu/Documents/--journal/docs"
OBSIDIAN_ASSETS="/home/matsu/Documents/--journal/_assets/images/blog"
PROJECT_BLOG="./src/content/blog"
PROJECT_DOCS="./src/content/docs"
PROJECT_IMAGES="./public/_assets/images/blog"
BACKUP_DIR="/home/matsu/Documents/--journal/_assets/-sync_backups"

# Create directories if they don't exist
mkdir -p "$PROJECT_BLOG"
mkdir -p "$PROJECT_DOCS"
mkdir -p "$PROJECT_IMAGES"
mkdir -p "$BACKUP_DIR"

# Function to sync directories bidirectionally with timestamp tracking
sync_directories() {
    local source_dir=$1
    local dest_dir=$2
    local name=$3
    
    echo "Syncing $name..."
    
    # Sync from source to destination, preserving timestamps and permissions
    rsync -avh --update "$source_dir/" "$dest_dir/"
    
    # Sync from destination to source (for new files created in the project)
    rsync -avh --update "$dest_dir/" "$source_dir/"
    
    # Check for conflicts (files modified in both places)
    find "$source_dir" -type f | while read source_file; do
        rel_path="${source_file#$source_dir/}"
        dest_file="$dest_dir/$rel_path"
        
        if [ -f "$dest_file" ]; then
            source_mtime=$(stat -c %Y "$source_file")
            dest_mtime=$(stat -c %Y "$dest_file")
            
            # If content differs but timestamps are close, it might be a conflict
            if ! cmp -s "$source_file" "$dest_file" && [ $(($source_mtime - $dest_mtime)) -lt 86400 ]; then
                echo "CONFLICT DETECTED: $rel_path"
                timestamp=$(date +%Y%m%d-%H%M%S)
                mkdir -p "$BACKUP_DIR/$name"
                cp "$source_file" "$BACKUP_DIR/$name/${rel_path}_obsidian_${timestamp}.md"
                cp "$dest_file" "$BACKUP_DIR/$name/${rel_path}_project_${timestamp}.md"
                echo "Backups created in $BACKUP_DIR/$name. Resolve manually."
            fi
        fi
    done
}

# Sync blog content
sync_directories "$OBSIDIAN_BLOG" "$PROJECT_BLOG" "blog"

# Sync docs content
sync_directories "$OBSIDIAN_DOCS" "$PROJECT_DOCS" "docs"

# Sync images from Obsidian assets to public folder
echo "Syncing images..."
rsync -avh --update "$OBSIDIAN_ASSETS/" "$PROJECT_IMAGES/"

# # Process any remaining Obsidian wiki-links to standard markdown
# echo "Processing Obsidian image links in markdown files..."
# find "$PROJECT_BLOG" -name "*.md" | while read file; do
#   # Replace Obsidian image syntax ![[filename.png]] with markdown ![](/_assets/images/blog/filename.png)
#   sed -i -E 's/!\[\[(.*\.(?:png|jpg|jpeg|gif|svg))\]\]/![](\\\/_assets\/images\/blog\/\1)/g' "$file"
# done

echo "Content synchronization complete!" 
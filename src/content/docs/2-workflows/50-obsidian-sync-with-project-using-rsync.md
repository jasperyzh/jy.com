---
title: Syncing Obsidian's note with website project using rsync
description: How to make sure content stay the same at both end
pubDate: 250409
draft: 1
---


# Syncing Obsidian's note with website project using rsync

basically trying to copy the markdown files to the project assets to make use of it.


## Guide: How the Sync Script Works

The `copy-blog-docs-posts.sh` script performs a **bidirectional synchronization** between your Obsidian notes and project directories. Here's how it works:

## Core Functionality

1. **Directory Setup**:
   - Obsidian sources: `/home/matsu/Documents/--journal/blog` and `/home/matsu/Documents/--journal/docs`
   - Project destinations: `./src/content/blog` and `./src/content/docs`
   - Backup location: `/home/matsu/Documents/--journal/_assets/-sync_backups`

2. **Synchronization Process**:
   - Creates lists of files in both source and destination
   - Copies newer files from Obsidian to project
   - Copies newer files from project to Obsidian
   - **Deletes files in project that were deleted in Obsidian**
   - **Deletes files in Obsidian that were deleted in project**

3. **Conflict Handling**:
   - If a file is modified in both places within 24 hours, it's flagged as a conflict
   - Backups of both versions are saved in the backup directory

## Important Warning

**The script propagates deletions in both directions.** If you delete a file in Obsidian, it will also be deleted from your project directory and vice versa.

## To Prevent Data Loss

1. Modify the script to create backups before deletions:
```bash
# Before deleting files
echo "Backing up files marked for deletion..."
timestamp=$(date +%Y%m%d-%H%M%S)
mkdir -p "$BACKUP_DIR/deletions_$timestamp"

while read -r file; do
    if [ -n "$file" ] && [ -f "$dest_dir/$file" ]; then
        echo "Backing up: $file"
        cp "$dest_dir/$file" "$BACKUP_DIR/deletions_$timestamp/${file}_backup.md"
    fi
done < "$temp_dir/delete_from_dest.txt"
```

2. Or modify to not delete files at all (one-way sync for deletions):
```bash
# Comment out or remove the deletion code blocks
# while read -r file; do
#     if [ -n "$file" ]; then
#         echo "Deleting from destination: $file"
#         rm -f "$dest_dir/$file"
#     fi
# done < "$temp_dir/delete_from_dest.txt"
```

3. Add a safeguard flag:
```bash
# Add at top of script
ALLOW_DELETIONS=false

# Then modify deletion blocks
if [ "$ALLOW_DELETIONS" = true ]; then
    # deletion code here
else
    echo "Deletions skipped. Set ALLOW_DELETIONS=true to enable."
fi
```

Always make backups before running sync scripts that handle deletions!

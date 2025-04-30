#!/bin/bash

# Config
OBSIDIAN_VAULT="/home/matsu/Documents/--journal/projects"
DESKTOP_PROJECTS="/home/matsu/Desktop"
BACKUP_DIR="/home/matsu/Documents/--journal/_assets/-sync_backups"  # For conflict resolution

# Create directories if missing
mkdir -p "$OBSIDIAN_VAULT" "$BACKUP_DIR"

# Sync in both directions with conflict detection
find "$DESKTOP_PROJECTS" -maxdepth 1 -type d | while read project_dir; do
    # Skip the Desktop directory itself
    [[ "$project_dir" == "$DESKTOP_PROJECTS" ]] && continue
    
    # Get clean project name
    project_name=$(basename "$project_dir")
    obsidian_note="$OBSIDIAN_VAULT/${project_name}.md"
    
    # Find case-insensitive README in project
    project_readme=$(find "$project_dir" -maxdepth 1 -type f \( -iname "readme.md" -o -iname "readme.txt" \) -print -quit)

    # Two-way sync logic
    if [ -f "$project_readme" ] && [ -f "$obsidian_note" ]; then
        # Compare modification times
        project_mtime=$(stat -c %Y "$project_readme")
        obsidian_mtime=$(stat -c %Y "$obsidian_note")
        
        if [ "$project_mtime" -gt "$obsidian_mtime" ]; then
            echo "Updating Obsidian from project: $project_name"
            rsync -avh --checksum "$project_readme" "$obsidian_note"
        elif [ "$obsidian_mtime" -gt "$project_mtime" ]; then
            echo "Updating project from Obsidian: $project_name"
            rsync -avh --checksum "$obsidian_note" "$project_readme"
        else
            echo "No changes: $project_name"
        fi
        
    elif [ -f "$project_readme" ]; then
        # New project -> Create Obsidian note
        echo "New project detected: $project_name"
        rsync -avh "$project_readme" "$obsidian_note"
    elif [ -f "$obsidian_note" ]; then
        # New Obsidian note -> Create project README
        echo "New Obsidian note detected: $project_name"
        mkdir -p "$project_dir"
        rsync -avh "$obsidian_note" "$project_dir/README.md"
    fi

    # Conflict resolution
    if [ -f "$project_readme" ] && [ -f "$obsidian_note" ]; then
        if ! cmp -s "$project_readme" "$obsidian_note"; then
            echo "CONFLICT DETECTED: $project_name"
            timestamp=$(date +%Y%m%d-%H%M%S)
            cp "$project_readme" "$BACKUP_DIR/${project_name}_project_${timestamp}.md"
            cp "$obsidian_note" "$BACKUP_DIR/${project_name}_obsidian_${timestamp}.md"
            echo "Backups created in $BACKUP_DIR. Resolve manually."
        fi
    fi
done

echo "Two-way sync complete!"
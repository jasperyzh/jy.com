#!/bin/bash
# Sync assets from Obsidian vault to repo for deployment
# Usage: ./scripts/sync-assets.sh

OBSIDIAN_ASSETS="/home/matsu/Documents/Journal__/Share__/assets--"
REPO_ASSETS="public/assets/assets--"

# Check if source exists
if [ -d "$OBSIDIAN_ASSETS" ]; then
  echo "Syncing assets from Obsidian vault..."
  mkdir -p "$REPO_ASSETS"
  rsync -av --delete "$OBSIDIAN_ASSETS/" "$REPO_ASSETS/"
  echo "Assets synced successfully!"
else
  echo "Warning: Obsidian assets directory not found at $OBSIDIAN_ASSETS"
  echo "Creating empty assets directory..."
  mkdir -p "$REPO_ASSETS"
fi


#!/bin/bash
# Sync assets from Obsidian vault to repo for deployment
# Usage: ./scripts/sync-assets.sh
# 
# This script handles both scenarios:
# - If assets-- is a symlink: Skip (assets auto-update from Obsidian)
# - If assets-- is files: Sync from Obsidian to files (for committing to git)

OBSIDIAN_ASSETS="/home/matsu/Documents/Journal__/Share__/assets--"
REPO_ASSETS="public/assets/assets--"

# Check if it's a symlink (local development mode)
if [ -L "$REPO_ASSETS" ]; then
  echo "Assets directory is a symlink - skipping sync."
  echo "Assets will auto-update from Obsidian vault during development."
  echo "To sync files for git commit, run: ./scripts/setup-assets.sh (to switch to files), then run this script again."
  exit 0
fi

# Check if Obsidian source exists
if [ ! -d "$OBSIDIAN_ASSETS" ]; then
  echo "Warning: Obsidian assets directory not found at $OBSIDIAN_ASSETS"
  echo "Cannot sync assets. If you're in CI/CD, this is expected."
  exit 1
fi

# Sync from Obsidian to files
echo "Syncing assets from Obsidian vault to repository..."
mkdir -p "$REPO_ASSETS"
rsync -av --delete "$OBSIDIAN_ASSETS/" "$REPO_ASSETS/"
echo "✓ Assets synced successfully!"
echo "  You can now commit these files to git."


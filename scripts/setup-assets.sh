#!/bin/bash
# Setup assets directory: symlink for local dev, files for CI/CD
# Usage: ./scripts/setup-assets.sh

OBSIDIAN_ASSETS="/home/matsu/Documents/Journal__/Share__/assets--"
REPO_ASSETS="public/assets/assets--"

# Remove existing directory/symlink
if [ -e "$REPO_ASSETS" ] || [ -L "$REPO_ASSETS" ]; then
  rm -rf "$REPO_ASSETS"
fi

# Check if Obsidian vault exists (local development)
if [ -d "$OBSIDIAN_ASSETS" ]; then
  echo "Obsidian vault found - creating symlink for local development..."
  ln -s "$OBSIDIAN_ASSETS" "$REPO_ASSETS"
  echo "✓ Symlink created: $REPO_ASSETS -> $OBSIDIAN_ASSETS"
  echo "  Assets will auto-update during development"
else
  echo "Obsidian vault not found - using copied files from repo..."
  # Ensure directory exists (files should be in git)
  if [ ! -d "$REPO_ASSETS" ]; then
    mkdir -p "$REPO_ASSETS"
    echo "⚠ Warning: Assets directory not found. Run 'npm run sync-assets' to copy assets."
  else
    echo "✓ Using copied assets from repository"
  fi
fi

echo "Assets setup complete."


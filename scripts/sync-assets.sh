#!/bin/bash
# Sync assets and content from Obsidian vault to repo for deployment
# Usage: ./scripts/sync-assets.sh
# 
# This script handles both scenarios:
# - If directories are symlinks: Skip (auto-update from Obsidian)
# - If directories are files: Sync from Obsidian to files (for committing to git)

# Use JOURNAL_BASE_PATH env var or default to local path
JOURNAL_BASE_PATH="${JOURNAL_BASE_PATH:-/home/matsu/Documents/Journal__}"
JOURNAL_SHARE="${JOURNAL_BASE_PATH}/Share__"

OBSIDIAN_ASSETS="${JOURNAL_SHARE}/assets--"
REPO_ASSETS="public/assets/assets--"

OBSIDIAN_BLOG="${JOURNAL_SHARE}/blog--"
REPO_BLOG="src/content/blog"

OBSIDIAN_TOOLSTACK="${JOURNAL_SHARE}/toolstack--"
REPO_TOOLSTACK="src/content/toolstack"

# Function to sync a directory
sync_directory() {
  local SOURCE=$1
  local TARGET=$2
  local NAME=$3

  # Check if target is a symlink (local development mode)
  if [ -L "$TARGET" ]; then
    echo "${NAME} directory is a symlink - skipping sync."
    echo "  ${NAME} will auto-update from Obsidian vault during development."
    return 0
  fi

  # Check if source exists
  if [ ! -d "$SOURCE" ]; then
    echo "Warning: ${NAME} source directory not found at $SOURCE"
    echo "  Cannot sync ${NAME}. If you're in CI/CD, this is expected."
    return 1
  fi

  # Sync from Obsidian to files
  echo "Syncing ${NAME} from Obsidian vault to repository..."
  mkdir -p "$TARGET"
  rsync -av --delete "$SOURCE/" "$TARGET/"
  echo "✓ ${NAME} synced successfully!"
}

# Sync assets
sync_directory "$OBSIDIAN_ASSETS" "$REPO_ASSETS" "Assets"

# Sync blog content
sync_directory "$OBSIDIAN_BLOG" "$REPO_BLOG" "Blog"

# Sync toolstack content
sync_directory "$OBSIDIAN_TOOLSTACK" "$REPO_TOOLSTACK" "Toolstack"

echo ""
echo "All content synced successfully!"
echo "  You can now commit these files to git."


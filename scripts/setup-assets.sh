#!/bin/bash
# Setup assets and content directories: symlink for local dev, files for CI/CD
# Usage: ./scripts/setup-assets.sh

# Use JOURNAL_BASE_PATH env var or default to local path
JOURNAL_BASE_PATH="${JOURNAL_BASE_PATH:-/home/matsu/Documents/Journal__}"
JOURNAL_SHARE="${JOURNAL_BASE_PATH}/Share__"

OBSIDIAN_ASSETS="${JOURNAL_SHARE}/assets--"
REPO_ASSETS="public/assets/assets--"

OBSIDIAN_BLOG="${JOURNAL_SHARE}/blog--"
REPO_BLOG="src/content/blog"

OBSIDIAN_TOOLSTACK="${JOURNAL_SHARE}/toolstack--"
REPO_TOOLSTACK="src/content/toolstack"

# Function to setup a directory (symlink or files)
setup_directory() {
  local SOURCE=$1
  local TARGET=$2
  local NAME=$3

# Remove existing directory/symlink
  if [ -e "$TARGET" ] || [ -L "$TARGET" ]; then
    rm -rf "$TARGET"
fi

  # Check if source exists (local development)
  if [ -d "$SOURCE" ]; then
    echo "Obsidian vault found - creating ${NAME} symlink for local development..."
    ln -s "$SOURCE" "$TARGET"
    echo "✓ Symlink created: $TARGET -> $SOURCE"
    echo "  ${NAME} will auto-update during development"
else
    echo "Obsidian vault not found - using copied ${NAME} files from repo..."
  # Ensure directory exists (files should be in git)
    if [ ! -d "$TARGET" ]; then
      mkdir -p "$TARGET"
      echo "⚠ Warning: ${NAME} directory not found. Run 'npm run sync-assets' to copy ${NAME}."
  else
      echo "✓ Using copied ${NAME} from repository"
  fi
fi
}

# Setup assets
setup_directory "$OBSIDIAN_ASSETS" "$REPO_ASSETS" "Assets"

# Setup blog content
setup_directory "$OBSIDIAN_BLOG" "$REPO_BLOG" "Blog"

# Setup toolstack content
setup_directory "$OBSIDIAN_TOOLSTACK" "$REPO_TOOLSTACK" "Toolstack"

echo ""
echo "Assets and content setup complete."


#!/bin/bash
# Create .assetsignore file in dist directory to exclude _worker.js from asset uploads
# This prevents Cloudflare Pages from uploading server-side code as static assets

DIST_DIR="dist"
ASSETSIGNORE_FILE="${DIST_DIR}/.assetsignore"

# Ensure dist directory exists
if [ ! -d "$DIST_DIR" ]; then
  echo "Warning: dist directory not found. Build may have failed."
  exit 1
fi

# Create .assetsignore file with _worker.js exclusion
echo "_worker.js" > "$ASSETSIGNORE_FILE"

echo "✓ Created .assetsignore file in dist directory"
echo "  Excluded _worker.js from asset uploads"


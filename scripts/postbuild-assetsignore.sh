#!/bin/bash
# Create .assetsignore file in dist directory to exclude _worker.js from asset uploads
# This prevents Cloudflare (Pages/Workers) from uploading server-side code as static assets
# Works for both Cloudflare Pages and Workers deployments

DIST_DIR="dist"
ASSETSIGNORE_FILE="${DIST_DIR}/.assetsignore"

# Ensure dist directory exists
if [ ! -d "$DIST_DIR" ]; then
  echo "Warning: dist directory not found. Build may have failed."
  exit 1
fi

# Ensure _worker.js directory exists (should be created by Astro build)
if [ ! -d "${DIST_DIR}/_worker.js" ]; then
  echo "Warning: _worker.js directory not found in dist. Worker may not be built correctly."
fi

# Create .assetsignore file with _worker.js exclusion
# This prevents _worker.js from being served as static assets
echo "_worker.js" > "$ASSETSIGNORE_FILE"

echo "✓ Created .assetsignore file in dist directory"
echo "  Excluded _worker.js from static asset uploads"
echo "  Worker script will be deployed as main entry point (Workers) or Pages Function (Pages)"


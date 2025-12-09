#!/bin/bash
# Ensure assets and content directories exist for build (used in CI/CD)
# This is a safety net for Cloudflare Pages builds

REPO_ASSETS="public/assets/assets--"
REPO_BLOG="src/content/blog"
REPO_TOOLSTACK="src/content/toolstack"

if [ ! -d "$REPO_ASSETS" ]; then
  echo "Creating assets directory..."
  mkdir -p "$REPO_ASSETS"
fi

if [ ! -d "$REPO_BLOG" ]; then
  echo "Creating blog content directory..."
  mkdir -p "$REPO_BLOG"
fi

if [ ! -d "$REPO_TOOLSTACK" ]; then
  echo "Creating toolstack content directory..."
  mkdir -p "$REPO_TOOLSTACK"
fi

echo "Assets and content directories ready."


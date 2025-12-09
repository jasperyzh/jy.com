#!/bin/bash
# Ensure assets directory exists for build (used in CI/CD)
# This is a safety net for Cloudflare Pages builds

REPO_ASSETS="public/assets/assets--"

if [ ! -d "$REPO_ASSETS" ]; then
  echo "Creating assets directory..."
  mkdir -p "$REPO_ASSETS"
fi

echo "Assets directory ready."


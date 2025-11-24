/**
 * View Counter API Endpoint
 * 
 * This endpoint tracks and returns view counts for blog posts.
 * For demo purposes, uses in-memory storage. In production, use a database.
 * 
 * Usage:
 * GET  /api/views/my-post-slug - Get view count
 * POST /api/views/my-post-slug - Increment view count
 */

import type { APIRoute } from 'astro';

// In-memory storage (resets on server restart)
// In production, replace with Redis, KV, or database
const viewCounts = new Map<string, number>();

// Mark this page as server-rendered (not pre-rendered)
export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  const { slug } = params;
  
  if (!slug) {
    return new Response(JSON.stringify({ error: 'Slug is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const views = viewCounts.get(slug) || 0;

  return new Response(
    JSON.stringify({
      slug,
      views,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    }
  );
};

export const POST: APIRoute = async ({ params, request }) => {
  const { slug } = params;

  if (!slug) {
    return new Response(JSON.stringify({ error: 'Slug is required' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Increment view count
  const currentViews = viewCounts.get(slug) || 0;
  const newViews = currentViews + 1;
  viewCounts.set(slug, newViews);

  return new Response(
    JSON.stringify({
      slug,
      views: newViews,
    }),
    {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    }
  );
};





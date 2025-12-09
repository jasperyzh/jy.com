/**
 * Hearts API Route
 * 
 * Purpose: Handle heart clicks for the GiveHeart component
 * - POST: Save a heart click with rate limiting
 * - GET: Fetch current heart count for a page
 * 
 * Usage:
 * POST /api/hearts - Body: { pageUrl: string }
 * GET /api/hearts?pageUrl=<url> - Query: pageUrl
 */

import type { APIRoute } from 'astro';
import { createClient } from '@supabase/supabase-js';

export const prerender = false; // Required for API routes

// Rate limiting: 1 minute per IP to prevent spam while allowing reasonable interaction
const RATE_LIMIT_MINUTES = 1;

/**
 * Extract IP address from request headers
 */
function getClientIP(request: Request): string {
  // Check various headers for IP address (common in proxies/load balancers)
  const forwarded = request.headers.get('x-forwarded-for');
  if (forwarded) {
    return forwarded.split(',')[0].trim();
  }
  
  const realIP = request.headers.get('x-real-ip');
  if (realIP) {
    return realIP;
  }
  
  // Fallback (may not work in all environments)
  return 'unknown';
}

/**
 * Initialize Supabase client with service role key (for server-side write operations)
 */
function getSupabaseServiceClient() {
  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  const serviceRoleKey = import.meta.env.SUPABASE_SERVICE_ROLE_KEY;
  
  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error('Supabase configuration missing. Please set PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in your .env file.');
  }
  
  return createClient(supabaseUrl, serviceRoleKey);
}

/**
 * Initialize Supabase client with anon key (for public read operations)
 * Uses anon key to respect RLS policies - best practice for public reads
 */
function getSupabaseAnonClient() {
  const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
  const anonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !anonKey) {
    throw new Error('Supabase configuration missing. Please set PUBLIC_SUPABASE_URL and PUBLIC_SUPABASE_ANON_KEY in your .env file.');
  }
  
  return createClient(supabaseUrl, anonKey);
}

/**
 * POST: Save a heart click
 */
export const POST: APIRoute = async ({ request }) => {
  try {
    const body = await request.json();
    const rawPageUrl = body.pageUrl || request.url;
    
    if (!rawPageUrl) {
      return new Response(
        JSON.stringify({ error: 'pageUrl is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Normalize the URL to ensure consistent format
    const pageUrl = normalizePageUrl(rawPageUrl);
    
    const supabase = getSupabaseServiceClient();
    const ipAddress = getClientIP(request);
    const userAgent = request.headers.get('user-agent') || 'unknown';
    
    // Rate limiting: Check if same IP clicked within the rate limit window
    const rateLimitAgo = new Date(Date.now() - RATE_LIMIT_MINUTES * 60 * 1000).toISOString();
    
    const { data: recentHearts, error: checkError } = await supabase
      .from('hearts')
      .select('id')
      .eq('ip_address', ipAddress)
      .gte('created_at', rateLimitAgo)
      .limit(1);
    
    if (checkError) {
      console.error('Error checking rate limit:', checkError);
      return new Response(
        JSON.stringify({ error: 'Failed to check rate limit' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    if (recentHearts && recentHearts.length > 0) {
      // Rate limited - return current count without incrementing
      // Use anon client for public read (best practice)
      const anonClient = getSupabaseAnonClient();
      const { count } = await anonClient
        .from('hearts')
        .select('*', { count: 'exact', head: true })
        .eq('page_url', pageUrl);
      
      const waitTime = RATE_LIMIT_MINUTES === 1 ? '1 minute' : `${RATE_LIMIT_MINUTES} minutes`;
      
      return new Response(
        JSON.stringify({ 
          error: 'rate_limited',
          message: `Please wait ${waitTime} before giving another heart`,
          count: count || 0
        }),
        { status: 429, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Insert new heart
    const { error: insertError } = await supabase
      .from('hearts')
      .insert({
        page_url: pageUrl,
        ip_address: ipAddress,
        user_agent: userAgent
      });
    
    if (insertError) {
      console.error('Error inserting heart:', insertError);
      return new Response(
        JSON.stringify({ error: 'Failed to save heart' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Get updated count using anon client (best practice for public reads)
    const anonClient = getSupabaseAnonClient();
    const { count } = await anonClient
      .from('hearts')
      .select('*', { count: 'exact', head: true })
      .eq('page_url', pageUrl);
    
    return new Response(
      JSON.stringify({ 
        success: true,
        count: count || 0
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error in POST /api/hearts:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};

/**
 * GET: Fetch current heart count for a page
 * Uses anon key to respect RLS policies - best practice for public reads
 */
export const GET: APIRoute = async ({ request, url }) => {
  try {
    const rawPageUrl = url.searchParams.get('pageUrl') || request.url;
    
    if (!rawPageUrl) {
      return new Response(
        JSON.stringify({ error: 'pageUrl is required' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    // Normalize the URL to ensure consistent format
    const pageUrl = normalizePageUrl(rawPageUrl);
    // Use anon client for public reads - respects RLS policies
    const supabase = getSupabaseAnonClient();
    
    const { count, error } = await supabase
      .from('hearts')
      .select('*', { count: 'exact', head: true })
      .eq('page_url', pageUrl);
    
    if (error) {
      console.error('Error fetching heart count:', error);
      return new Response(
        JSON.stringify({ error: 'Failed to fetch heart count' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }
    
    return new Response(
      JSON.stringify({ count: count || 0 }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
    
  } catch (error) {
    console.error('Error in GET /api/hearts:', error);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
};


/**
 * Normalize page URL to ensure consistent format
 * - Removes protocol and domain (keeps only path)
 * - Removes trailing slashes (except root)
 * - Ensures leading slash
 * - Handles query strings and fragments
 */
function normalizePageUrl(url: string): string {
  try {
    let path = url;
    
    // If it's a full URL, extract just the pathname
    if (url.startsWith('http://') || url.startsWith('https://')) {
      const urlObj = new URL(url);
      path = urlObj.pathname;
    } else if (url.includes('?')) {
      // Remove query string if present
      path = url.split('?')[0];
    } else if (url.includes('#')) {
      // Remove fragment if present
      path = url.split('#')[0];
    }
    
    // Remove trailing slash (except for root)
    if (path.length > 1 && path.endsWith('/')) {
      path = path.slice(0, -1);
    }
    
    // Ensure leading slash
    if (!path.startsWith('/')) {
      path = '/' + path;
    }
    
    return path;
  } catch (error) {
    // If URL parsing fails, return as-is but ensure leading slash
    const cleaned = url.split('?')[0].split('#')[0];
    return cleaned.startsWith('/') ? cleaned : '/' + cleaned;
  }
}
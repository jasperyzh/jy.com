# GiveHeart Component Setup Guide

## Overview

The GiveHeart component allows users to click a heart button that saves to Supabase PostgreSQL with rate limiting and displays total counts with animations.

## Prerequisites

1. A Supabase account and project
2. Node.js/Deno environment

## Setup Steps

### 1. Install Dependencies

The Supabase client is already added to `package.json`. If using Deno, it will be imported via `npm:@supabase/supabase-js`.

### 2. Create Supabase Database Table

1. Go to your Supabase Dashboard → SQL Editor
2. Run the SQL from `supabase-schema.sql`:

```sql
-- Create hearts table
CREATE TABLE IF NOT EXISTS hearts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  page_url TEXT NOT NULL,
  ip_address TEXT NOT NULL,
  user_agent TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_hearts_ip_created ON hearts(ip_address, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_hearts_page_url ON hearts(page_url);
CREATE INDEX IF NOT EXISTS idx_hearts_created_at ON hearts(created_at DESC);

-- Enable RLS
ALTER TABLE hearts ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow service role to insert hearts"
  ON hearts FOR INSERT TO service_role WITH CHECK (true);

CREATE POLICY "Allow public to read hearts"
  ON hearts FOR SELECT TO anon, authenticated USING (true);
```

### 3. Get Supabase Credentials

1. Go to Supabase Dashboard → Settings → API
2. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (for client-side, though we use service role on server)
   - **service_role key** (for server-side API routes - KEEP SECRET)

### 4. Configure Environment Variables

Create a `.env` file in the project root (or add to existing):

```env
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**Important:** 
- Never commit `.env` to version control
- The `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security - keep it secret
- Add `.env` to `.gitignore` if not already there

### 5. Enable Server Mode

The `astro.config.mjs` has been updated to enable server mode:
```js
output: "server", // Hybrid mode: mostly static with some server endpoints
```

This is required for API routes to work.

### 6. Usage

Add the component to any page:

```astro
---
import GiveHeart from '@/components/GiveHeart.astro';
---

<GiveHeart />
```

Or specify a custom page URL:

```astro
<GiveHeart pageUrl="/blog/my-post" />
```

## Features

- **Interactive Heart Button**: Clickable with hover effects
- **Total Count Display**: Shows current heart count for the page
- **Rate Limiting**: Prevents multiple clicks from same IP within 1 hour
- **Animations**: Heart bounce on click, pulse on success
- **Error Handling**: Graceful error messages and fallbacks
- **Loading States**: Visual feedback during API calls

## API Endpoints

### POST `/api/hearts`
Saves a heart click for a page.

**Request Body:**
```json
{
  "pageUrl": "/blog/my-post"
}
```

**Response (Success):**
```json
{
  "success": true,
  "count": 42
}
```

**Response (Rate Limited):**
```json
{
  "error": "rate_limited",
  "message": "Please wait before giving another heart",
  "count": 42
}
```

### GET `/api/hearts?pageUrl=<url>`
Fetches current heart count for a page.

**Response:**
```json
{
  "count": 42
}
```

## Rate Limiting

- **Window**: 1 hour per IP address
- **Enforcement**: Server-side check in Supabase
- **User Feedback**: Shows warning message if rate limited

## Privacy

- IP addresses are stored only for rate limiting purposes
- User agents are stored for analytics/debugging
- All data is stored in Supabase PostgreSQL

## Troubleshooting

### Component not working
1. Check browser console for errors
2. Verify environment variables are set correctly
3. Ensure Supabase table and policies are created
4. Check that server mode is enabled in `astro.config.mjs`

### Rate limiting not working
1. Verify the index on `ip_address` and `created_at` exists
2. Check Supabase logs for query errors
3. Ensure service role key has proper permissions

### Count not displaying
1. Check network tab for API call failures
2. Verify RLS policy allows SELECT operations
3. Check Supabase logs for errors


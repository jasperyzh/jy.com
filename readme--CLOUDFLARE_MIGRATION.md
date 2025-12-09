# Cloudflare Pages Migration Guide

## Overview

This guide walks through the steps to migrate the project from Vercel to Cloudflare Pages. The Cloudflare adapter has already been enabled in `astro.config.mjs`.

## Prerequisites

- Cloudflare account (already confirmed)
- GitHub repository access
- Environment variables from Vercel (for Supabase configuration)

## Step 1: Create Cloudflare Pages Project

1. Log in to [Cloudflare Dashboard](https://dash.cloudflare.com/)
2. Navigate to **Pages** in the sidebar
3. Click **Create a project**
4. Select **Connect to Git**
5. Choose your Git provider (GitHub)
6. Select the repository (`jy--`)
7. Configure build settings:
   - **Project name**: `jy` (or your preferred name)
   - **Production branch**: `main`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Root directory**: `/` (leave as default)
   - **Node version**: Use Node.js 18 or 20 (Cloudflare Pages default)

8. Click **Save and Deploy**

## Step 2: Configure Environment Variables

1. In your Cloudflare Pages project, go to **Settings** → **Environment variables**
2. Add the following variables (copy values from your Vercel dashboard):

   **Production environment:**
   - `PUBLIC_SUPABASE_URL` = `https://your-project.supabase.co`
   - `PUBLIC_SUPABASE_ANON_KEY` = `your-anon-key-here`
   - `SUPABASE_SERVICE_ROLE_KEY` = `your-service-role-key-here`

3. Click **Save** after adding each variable

**Note:** These are the same values you're using in Vercel. You can find them in:
- Vercel Dashboard → Your Project → Settings → Environment Variables

## Step 3: Test Deployment

1. After the initial deployment completes, Cloudflare will provide a `*.pages.dev` URL
2. Visit the deployment URL
3. Test the following:
   - **Homepage**: Verify it loads correctly
   - **API Routes**: Test `/api/hearts` endpoint
     - GET: `https://your-project.pages.dev/api/hearts?pageUrl=/`
     - POST: Use browser dev tools or curl to test POST requests
   - **GiveHeart Component**: Navigate to a page with the GiveHeart component and test clicking it
   - **Other Pages**: Verify blog, dailies, and other pages work

4. Check the deployment logs in Cloudflare Pages dashboard for any errors

## Step 4: Add Custom Domain (Gradual Migration)

1. In Cloudflare Pages project, go to **Custom domains**
2. Click **Set up a custom domain**
3. Enter `jasperyong.com`
4. Cloudflare will provide DNS records to add:
   - Usually a CNAME record pointing to your Pages project
   - Or A/AAAA records if using apex domain

5. **Do NOT update DNS yet** - just note the records provided

## Step 5: Update DNS Records (When Ready to Switch)

**Important:** Only do this step when you're ready to switch the domain from Vercel to Cloudflare.

1. Go to your domain registrar or Cloudflare DNS (if your domain is managed by Cloudflare)
2. Update DNS records as provided by Cloudflare Pages:
   - If using CNAME: Point `jasperyong.com` CNAME to the Cloudflare Pages URL
   - If using A records: Use the IP addresses provided

3. Wait for DNS propagation (usually 5-30 minutes, can take up to 48 hours)
4. Verify DNS propagation using tools like:
   - `dig jasperyong.com`
   - [whatsmydns.net](https://www.whatsmydns.net/)

## Step 6: Verify Migration

1. Once DNS has propagated, visit `https://jasperyong.com`
2. Verify all functionality:
   - Homepage loads correctly
   - API routes work (`/api/hearts`)
   - GiveHeart component functions properly
   - All pages are accessible
   - SSL certificate is active (should be automatic with Cloudflare)

3. Monitor for 24-48 hours to ensure stability

## Step 7: Remove Vercel Domain (After Verification)

1. Once Cloudflare is working and verified:
   - Go to Vercel Dashboard → Your Project → Settings → Domains
   - Remove `jasperyong.com` from Vercel
   
2. **Optional:** Keep Vercel project for rollback if needed, or delete it after successful migration

## Troubleshooting

### Build Failures

- Check build logs in Cloudflare Pages dashboard
- Verify Node.js version compatibility
- Ensure all dependencies are in `package.json`

### API Routes Not Working

- Verify environment variables are set correctly
- Check that `output: "server"` is set in `astro.config.mjs`
- Verify `adapter: cloudflare()` is enabled
- Check Cloudflare Pages function logs

### IP Address Detection Issues

- Cloudflare provides `CF-Connecting-IP` header
- The current implementation uses `x-forwarded-for` and `x-real-ip` which Cloudflare also provides
- If issues occur, you may need to update `getClientIP()` in `src/pages/api/hearts.ts` to also check `CF-Connecting-IP`

### Domain Not Resolving

- Verify DNS records are correct
- Wait for DNS propagation
- Check Cloudflare Pages custom domain configuration
- Ensure SSL certificate is provisioned (automatic with Cloudflare)

## Rollback Plan

If issues occur:

1. Re-add domain to Vercel
2. Update DNS records back to Vercel
3. Disable Cloudflare adapter in `astro.config.mjs` (comment it out)
4. Redeploy on Vercel

## Post-Migration Cleanup

After successful migration:

1. Update `readme--jy.md` to reflect Cloudflare Pages instead of Vercel
2. Remove `.vercel` from `.gitignore` if no longer needed (optional)
3. Archive or delete Vercel project (optional)

## Additional Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Astro Cloudflare Adapter](https://docs.astro.build/en/guides/integrations-guide/cloudflare/)
- [Cloudflare Pages Environment Variables](https://developers.cloudflare.com/pages/platform/build-configuration/#environment-variables)


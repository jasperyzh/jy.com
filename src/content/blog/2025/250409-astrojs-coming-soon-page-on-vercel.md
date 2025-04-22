---
pubDate: 250409
title: "Creating a Coming Soon Page with Astro.js and Vercel"
description: "Learn how to set up a temporary coming soon page that redirects all traffic while you build your Astro.js website on Vercel"
tags: ["astro", "vercel", "github", "redirect", "coming-soon"]
draft: 1
thumbnail: "/img/placeholder.png"
category: "Web Development"
---

# Creating a Coming Soon Page with Astro.js and Vercel

When launching a new website, you often need a temporary landing page while you complete the full site. In this guide, I'll show you how to create a "Coming Soon" page with Astro.js and deploy it on Vercel, redirecting all traffic to this page until your site is ready.

## What We'll Cover

1. Setting up a basic Astro.js project
2. Creating a Coming Soon page
3. Implementing redirects to the Coming Soon page
4. Deploying to Vercel via GitHub
5. Removing the redirects when your site is ready

## Prerequisites

- Node.js installed on your machine
- A GitHub account
- A Vercel account (free tier works fine)
- Basic knowledge of JavaScript and HTML

Let's get started!

## 1. Setting up a basic Astro.js project

Assuming you already have an Astro project set up, let's move on to creating our Coming Soon page. If you need to start from scratch, you can create a new Astro project with:

```bash
# Create a new project with npm
npm create astro@latest my-coming-soon-site

# Navigate to your new project
cd my-coming-soon-site
```

## 2. Creating a Coming Soon page

First, let's create a simple Coming Soon page. Create a new file at `src/pages/coming-soon.astro` with the following content:

```astro
---
---

<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="generator" content={Astro.generator} />
    <title>Coming Soon</title>
    <style>
      body, html {
        margin: 0;
        padding: 0;
        height: 100%;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      }
      
      body {
        background: linear-gradient(to bottom right, #1a202c, #2d3748);
        color: white;
      }
      
      main {
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
      }
      
      .content {
        text-align: center;
        padding: 0 20px;
      }
      
      h1 {
        font-size: 3rem;
        font-weight: bold;
        margin-bottom: 1.5rem;
      }
      
      p {
        font-size: 1.25rem;
        margin-bottom: 2rem;
        color: #cbd5e0;
      }
      
      .pulse {
        animation: pulse 2s infinite;
      }
      
      .line {
        height: 4px;
        width: 80px;
        background-color: #a0aec0;
        border-radius: 9999px;
        margin: 0 auto;
      }
      
      @keyframes pulse {
        0% {
          opacity: 0.6;
        }
        50% {
          opacity: 1;
        }
        100% {
          opacity: 0.6;
        }
      }
      
      @media (min-width: 768px) {
        h1 {
          font-size: 4rem;
        }
        p {
          font-size: 1.5rem;
        }
      }
    </style>
  </head>
  <body>
    <main>
      <div class="content">
        <h1>Coming Soon</h1>
        <p>We're working on something exciting!</p>
        <div class="pulse">
          <div class="line"></div>
        </div>
      </div>
    </main>
  </body>
</html>
```

This creates a simple, responsive coming soon page with a gradient background and a pulsing element.

## 3. Implementing redirects to the Coming Soon page

Now, we need to set up redirects to ensure all visitors are sent to our Coming Soon page. We'll implement multiple layers of redirection for maximum reliability:

### 3.1. Configure Vercel redirects

Create or update your `vercel.json` file at the root of your project:

```json
{
  "version": 2,
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "build": {
    "env": {
      "NODE_ENV": "production"
    }
  },
  "github": {
    "silent": true
  },
  "redirects": [
    {
      "source": "/((?!coming-soon).*)",
      "destination": "/coming-soon",
      "permanent": false
    }
  ]
}
```

This configuration tells Vercel to redirect all routes except `/coming-soon` to the Coming Soon page. The regex pattern `/((?!coming-soon).*)` matches any path that doesn't start with "coming-soon".

### 3.2. Add a backup HTML redirect

For additional reliability, create a `public/index.html` file with client-side redirection:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="refresh" content="0;url=/coming-soon">
  <title>Redirecting...</title>
</head>
<body>
  <p>Redirecting to <a href="/coming-soon">coming soon page</a>...</p>
  <script>
    window.location.href = "/coming-soon";
  </script>
</body>
</html>
```

This uses both a meta refresh tag and JavaScript redirect as fallbacks.

### 3.3. Add a client-side redirect in your main page

Update your `src/pages/index.astro` file to include a production-only redirect:

```astro
---
// Your existing imports
// ...

// Redirect to coming-soon page in production
const isProduction = import.meta.env.PROD;
---

<Layout title="Homepage" description={SITE_DESCRIPTION}>
  {isProduction && (
    <script>
      window.location.href = "/coming-soon";
    </script>
  )}
  
  <!-- Rest of your main page content -->
  // ... existing code ...
</Layout>
```

This adds a conditional script that only executes in production, redirecting visitors to the Coming Soon page.

## 4. Deploying to Vercel via GitHub

Now that we have our Coming Soon page and redirects set up, let's deploy to Vercel:

1. Commit your changes to Git:

```bash
git add .
git commit -m "Add Coming Soon page with redirects"
git push
```

2. Connect your repository to Vercel if you haven't already:
   - Go to [vercel.com](https://vercel.com) and sign in
   - Click "Add New" > "Project"
   - Select your GitHub repository
   - Keep the default settings and click "Deploy"

Vercel will automatically build and deploy your site, applying the redirects configured in `vercel.json`.

## 5. Testing the Redirects

After deployment, visit your Vercel domain (e.g., `your-project.vercel.app`) and you should be automatically redirected to the Coming Soon page. Test different paths to ensure the redirects are working properly.

## 6. Removing the Redirects When Your Site is Ready

When your website is complete and ready to launch, follow these steps to remove the redirects:

1. Remove or update the `redirects` section from `vercel.json`
2. Delete the `public/index.html` file
3. Remove the conditional redirect script from `src/pages/index.astro`
4. Commit and push your changes:

```bash
git add .
git commit -m "Remove Coming Soon redirects for launch"
git push
```

Vercel will automatically redeploy your site without the redirects, making your full website accessible to visitors.

## Conclusion

With this multi-layered approach, you can ensure that all visitors are redirected to your Coming Soon page while you work on your main site. The combination of Vercel configuration, meta redirects, and client-side JavaScript provides robust redirection that works across all browsers and environments.

This method allows you to continue building and testing your site behind the scenes while presenting a professional Coming Soon page to your visitors.

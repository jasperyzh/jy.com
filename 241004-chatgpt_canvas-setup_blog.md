# Step 1: Create a New Astro Project
npm create astro@latest my-portfolio --template typescript

# Step 2: Move into the Project Directory
cd my-portfolio

# Step 3: Install Dependencies
npm install bootstrap

# Step 4: Set Up Project Structure
# Create directories and basic content files for home, blog, portfolio, playground, config, and 404 page.
echo "Setting up project structure..."
echo "Debug: Creating project directories and initial structure." # Debug log
mkdir -p src/pages/{home,blog,portfolio,playground} src/content/blog src/components src/layouts

# Step 5: Create Components (Head, Header, Footer, Layout, PageBanner, Card)
echo "Creating Head component..."
echo "Debug: Creating Head component." # Debug log
echo "---
---
<head>
  <meta charset='UTF-8'>
  <meta name='viewport' content='width=device-width, initial-scale=1'>
  <link rel='stylesheet' href='https://stackpath.bootstrapcdn.com/bootstrap/5.1.0/css/bootstrap.min.css'>
  <title>My Astro Portfolio</title>
</head>" > src/components/Head.astro

echo "Creating Header component..."
echo "Debug: Creating Header component." # Debug log
echo "---
---
<header class='bg-dark text-white p-3'>
  <nav class='container d-flex justify-content-between'>
    <a href='/home' class='text-white'>Home</a>
    <a href='/blog' class='text-white'>Blog</a>
    <a href='/portfolio' class='text-white'>Portfolio</a>
    <a href='/playground' class='text-white'>Playground</a>
  </nav>
</header>" > src/components/Header.astro

echo "Creating Footer component..."
echo "Debug: Creating Footer component." # Debug log
echo "---
---
<footer class='bg-light text-center py-3'>
  <p>Made with Astro.js & Bootstrap</p>
</footer>" > src/components/Footer.astro

echo "Creating PageBanner component..."
echo "Debug: Creating PageBanner component." # Debug log
echo "---
import { Image } from '@astrojs/image/components';
prop: { image: { url: string, alt: string } }
---
<div class='page-banner'>
  <Image src={image.url} alt={image.alt} class='img-fluid w-100' />
</div>" > src/components/PageBanner.astro

echo "Creating Card component..."
echo "Debug: Creating Card component." # Debug log
echo "---
prop: { title: string, description: string, imageUrl: string, link: string }
---
<div class='card mb-4'>
  <img src={imageUrl} class='card-img-top' alt={title} />
  <div class='card-body'>
    <h5 class='card-title'>{title}</h5>
    <p class='card-text'>{description}</p>
    <a href={link} class='btn btn-primary'>Read More</a>
  </div>
</div>" > src/components/Card.astro

echo "Creating Layout component..."
echo "Debug: Creating Layout component." # Debug log
echo "---
import Header from '../components/Header.astro';
import Footer from '../components/Footer.astro';
import Head from '../components/Head.astro';
---
<!DOCTYPE html>
<html>
  <Head />
  <body>
    <Header />
    <main class='container my-5'>
      <slot />
    </main>
    <Footer />
  </body>
</html>" > src/layouts/Layout.astro

# Step 6: Set Up Pages Using New Layout
# Adding PageBanner to each page
echo "Creating home page..."
echo "Debug: Creating Home page with PageBanner." # Debug log
echo "---
layout: ../layouts/Layout.astro
import PageBanner from '../../components/PageBanner.astro';
---
<PageBanner image={{ url: '/images/home-banner.jpg', alt: 'Home Page Banner' }} />
<h1>Welcome to Home Page!</h1>" > src/pages/home/index.astro
echo "Creating blog page..."
echo "Debug: Creating Blog page with PageBanner." # Debug log
echo "---
layout: ../layouts/Layout.astro
import PageBanner from '../../components/PageBanner.astro';
---
<PageBanner image={{ url: '/images/blog-banner.jpg', alt: 'Blog Page Banner' }} />
<h1>Welcome to Blog Page!</h1>" > src/pages/blog/index.astro
echo "Creating portfolio page..."
echo "Debug: Creating Portfolio page with PageBanner." # Debug log
echo "---
layout: ../layouts/Layout.astro
import PageBanner from '../../components/PageBanner.astro';
---
<PageBanner image={{ url: '/images/portfolio-banner.jpg', alt: 'Portfolio Page Banner' }} />
<h1>Welcome to Portfolio Page!</h1>
<div class='row masonry-grid'>
  <div class='col masonry-item'>
    <h2>Project 1</h2>
    <p>Description of project 1.</p>
  </div>
  <div class='col masonry-item'>
    <h2>Project 2</h2>
    <p>Description of project 2.</p>
  </div>
  <div class='col masonry-item'>
    <h2>Project 3</h2>
    <p>Description of project 3.</p>
  </div>
  <div class='col masonry-item'>
    <h2>Project 4</h2>
    <p>Description of project 4.</p>
  </div>
</div>" > src/pages/portfolio/index.astro
echo "Creating playground page..."
echo "Debug: Creating Playground page with PageBanner." # Debug log
echo "---
layout: ../layouts/Layout.astro
import PageBanner from '../../components/PageBanner.astro';
---
<PageBanner image={{ url: '/images/playground-banner.jpg', alt: 'Playground Page Banner' }} />
<h1>Welcome to Playground Page!</h1>" > src/pages/playground/index.astro

# Step 7: Add Blog Content Collection
# Create some sample blog posts
echo "Adding first blog post..."
echo "Debug: Adding First Blog Post." # Debug log
echo "---
title: 'First Blog Post'
date: '2024-10-01'
description: 'This is the first blog post.'
tags: ['introduction', 'astro']
layout: ../../layouts/Layout.astro
import PageBanner from '../../components/PageBanner.astro';
---
<PageBanner image={{ url: '/images/first-post-banner.jpg', alt: 'First Blog Post Banner' }} />
<h1>First Blog Post</h1>
<p>This is the content of the first blog post.</p>" > src/content/blog/first-post.md
echo "Adding second blog post..."
echo "Debug: Adding Second Blog Post." # Debug log
echo "---
title: 'Second Blog Post'
date: '2024-10-02'
description: 'This is the second blog post.'
tags: ['tutorial', 'astro']
layout: ../../layouts/Layout.astro
import PageBanner from '../../components/PageBanner.astro';
---
<PageBanner image={{ url: '/images/second-post-banner.jpg', alt: 'Second Blog Post Banner' }} />
<h1>Second Blog Post</h1>
<p>This is the content of the second blog post.</p>" > src/content/blog/second-post.md

# Step 8: Update Blog Index to List Blog Posts with Pagination
# Update src/pages/blog/index.astro to include blog posts with pagination and use Card component
echo "Updating blog index to list blog posts with pagination..."
echo "Debug: Updating Blog Index with pagination and Card component." # Debug log
echo "---
layout: ../layouts/Layout.astro
import { getCollection } from 'astro:content';
import Card from '../../components/Card.astro';
const blogPosts = await getCollection('blog');
const PAGE_SIZE = 5;
const { currentPage = 1 } = Astro.params;
const totalPages = Math.ceil(blogPosts.length / PAGE_SIZE);
const start = (currentPage - 1) * PAGE_SIZE;
const end = start + PAGE_SIZE;
const paginatedPosts = blogPosts.slice(start, end);
import PageBanner from '../../components/PageBanner.astro';
---
<PageBanner image={{ url: '/images/blog-banner.jpg', alt: 'Blog Page Banner' }} />
<h1>Welcome to Blog Page!</h1>
<div class='row'>
  {paginatedPosts.map(post => (
    <div class='col-md-4'>
      <Card title={post.data.title} description={post.data.description} imageUrl={post.data.image.url} link={post.url} />
    </div>
  ))}
</div>
<nav class='mt-3'>
  {currentPage > 1 && <a href={`/blog/page/${currentPage - 1}`} class='btn btn-secondary'>Previous</a>}
  {currentPage < totalPages && <a href={`/blog/page/${currentPage + 1}`} class='btn btn-secondary ms-2'>Next</a>}
</nav>" > src/pages/blog/index.astro

# Step 9: Create CSS for Masonry Grid
echo "Creating global styles with masonry grid..."
echo "Debug: Creating global styles for masonry grid." # Debug log
echo "body {
  font-family: Arial, sans-serif;
}

.masonry-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
}

.masonry-item {
  background: #f0f0f0;
  padding: 16px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}" > src/styles/global.css

# Step 10: Add Config File for Content Collection
# Create config.ts for the content schema definition
echo "Creating config.ts for content schema..."
echo "Debug: Creating content schema configuration." # Debug log
echo "import { z, defineCollection } from 'astro:content';

import { numberToDate } from '../global/Utils';

const postsCollection = defineCollection({
  schema: z.object({
    title: z.string(),
    description: z
      .string()
      .max(
        160,
        'For best SEO results, please keep the description under 160 characters.'
      ),
    pubDate: z.number().transform((num) => numberToDate(num)),
    draft: z.boolean().default(false),

    author: z.string(),
    image: z.object({
      url: z.string(),
      alt: z.string(),
    }),
    tags: z.array(z.string()),
  }),
});

export const collections = {
  posts: postsCollection,
};" > src/content/config.ts

# Step 11: Create GitHub Actions Workflow for CI/CD to Deploy to GitHub Pages
mkdir -p .github/workflows
echo "Creating GitHub Actions workflow for CI/CD..."
echo "Debug: Creating GitHub Actions workflow for CI/CD deployment." # Debug log
echo "name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main
  pull_request:
    branches:
      - main

jobs:
  build-and-deploy:
    runs-on: ubuntu-latest

    steps:
      - name: Checkout code
        uses: actions/checkout@v3
        echo 'Debug: Checking out code.' # Debug log

      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '16'
        echo 'Debug: Setting up Node.js environment.' # Debug log

      - name: Install dependencies
        run: npm install
        echo 'Debug: Installing dependencies.' # Debug log

      - name: Build the project
        run: npm run build

      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: '${{ secrets.GITHUB_TOKEN }}'
          publish_dir: ./dist" > .github/workflows/deploy.yml

# Step 12: Run the Project
echo "Running the project..."
npm run dev
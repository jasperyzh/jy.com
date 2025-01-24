// import rss from '@astrojs/rss';
// import { getCollection } from 'astro:content';
// import { SITE_TITLE, SITE_DESCRIPTION } from '../consts';

// export async function GET(context) {
// 	const posts = await getCollection('blog');
// 	return rss({
// 		title: SITE_TITLE,
// 		description: SITE_DESCRIPTION,
// 		site: context.site,
// 		items: posts.map((post) => ({
// 			...post.data,
// 			link: `/blog/${post.slug}/`,
// 		})),
// 	});
// }

import { CollectionEntry, getCollection } from "astro:content";

import rss, { pagesGlobToRssItems } from "@astrojs/rss";
import { formatBlogPosts } from "../global/Utils";

const postImportResult = await getCollection("blog");
const posts: CollectionEntry<"blog">[] = formatBlogPosts(postImportResult);

export async function get(context) {
  return rss({
    stylesheet: "/rss/styles.xsl",
    title: "My Astro Blog",
    description: "A humble Astrojs guide to the stars",
    site: context.site,
    // items: await pagesGlobToRssItems(import.meta.glob("./blog/*.{md,mdx}")),
    items: posts.map((post) => ({
      link: `/blog/${post.slug}/`,
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      customData: `
        <category>${post.data.tag}</category>
      `,
    })),
  });
}

/*
// microblog/src/pages/rss.xml.js

import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function get() {
  const posts = await getCollection('posts');
  return rss({
    title: 'Astro Learner | Blog',
    description: 'My journey learning Astro',
    site: 'https://my-blog-site.netlify.app',
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: `/posts/${post.slug}/`,
    })),
    customData: `<language>en-us</language>`,
  });
} */

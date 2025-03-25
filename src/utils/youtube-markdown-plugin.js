/**
 * A remark plugin to transform YouTube links in markdown images to YouTube embeds
 * 
 * This plugin looks for markdown image syntax with YouTube URLs and transforms them
 * into proper YouTube embed iframes.
 * 
 * Example usage:
 * ![](https://www.youtube.com/watch?v=TwC0Db7oerM)
 */

export function remarkYouTubeEmbed() {
  return function transformer(tree) {
    // Walk through the tree and find image nodes with YouTube URLs
    visit(tree, 'image', (node) => {
      const url = node.url;
      
      // Check if it's a YouTube URL
      if (isYoutubeUrl(url)) {
        const videoId = getYoutubeVideoId(url);
        
        if (videoId) {
          // Transform the node into an HTML node with YouTube iframe
          node.type = 'html';
          node.value = `<div class="ratio ratio-16x9 youtube-embed">
            <iframe
              src="https://www.youtube.com/embed/${videoId}"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>`;
          
          // Remove image-specific properties
          delete node.url;
          delete node.alt;
          delete node.title;
        }
      }
    });
  };
}

// Function to extract YouTube video ID from URL
function getYoutubeVideoId(url) {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return (match && match[7].length === 11) ? match[7] : null;
}

// Function to check if a URL is a YouTube URL
function isYoutubeUrl(url) {
  return url.includes('youtube.com') || url.includes('youtu.be');
}

// Import the visit function from unist-util-visit
import { visit } from 'unist-util-visit';

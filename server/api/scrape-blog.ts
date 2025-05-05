import axios from 'axios';
import * as cheerio from 'cheerio';

export default defineEventHandler(async (event) => {
  try {
    // Get the target URL from query parameters
    const { url } = getQuery(event);
    
    if (!url) {
      throw new Error('URL parameter is required');
    }

    // Fetch the HTML content
    const response = await axios.get(url as string, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
      }
    });

    const html = response.data;
    const $ = cheerio.load(html);
    
    // Extract blog posts (adjust selectors based on the target website's structure)
    const posts = [];
    
    // Example selector - you'll need to adjust these based on the actual website structure
    $('article.post').each((i, element) => {
      const $el = $(element);
      
      posts.push({
        id: i + 1,
        title: $el.find('h2.entry-title').text().trim(),
        excerpt: $el.find('.entry-summary').text().trim(),
        image: $el.find('img').attr('src') || '/images/placeholder-blog.jpg',
        date: $el.find('.entry-date').text().trim() || 'May 5, 2023',
        category: $el.find('.entry-category').text().trim() || 'AI Tools',
        slug: $el.find('a').attr('href')?.split('/').filter(Boolean).pop() || `post-${i + 1}`
      });
    });

    return {
      success: true,
      data: posts,
      timestamp: new Date().toISOString()
    };
  } catch (error) {
    console.error('Scraping error:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'An unknown error occurred',
      timestamp: new Date().toISOString()
    };
  }
});

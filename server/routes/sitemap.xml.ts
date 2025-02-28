// import { SitemapStream, streamToPromise } from 'sitemap';
// import { serverQueryContent } from '#content/server';

// export default defineEventHandler(async (event) => {
//   // Fetch config
//   const config = useRuntimeConfig();
//   const siteUrl = config.public.siteUrl || 'https://your-ai-tools-site.com';
  
//   // Create a sitemap stream
//   const sitemap = new SitemapStream({
//     hostname: siteUrl
//   });
  
//   // Add static routes
//   sitemap.write({ url: '/', changefreq: 'daily', priority: 1.0 });
//   sitemap.write({ url: '/categories', changefreq: 'weekly', priority: 0.8 });
//   sitemap.write({ url: '/about', changefreq: 'monthly', priority: 0.5 });
//   sitemap.write({ url: '/privacy-policy', changefreq: 'yearly', priority: 0.3 });
//   sitemap.write({ url: '/terms-of-service', changefreq: 'yearly', priority: 0.3 });
//   sitemap.write({ url: '/blog', changefreq: 'weekly', priority: 0.7 });
  
//   // Fetch all categories from master file
//   try {
//     // In a real app, fetch this from your database or API
//     // Mock categories for this example
//     const categories = [
//       'text-generation',
//       'image-generation',
//       'audio-voice',
//       'video-generation',
//       'code-development',
//       'productivity-organization',
//       'business-marketing',
//       'research-data-analysis',
//       'design-creative',
//       'customer-service-chatbots',
//       'multimodal-all-in-one-ai',
//       'industry-specific-ai',
//       'extended-reality-ai'
//     ];
    
//     // Add category pages to sitemap
//     categories.forEach(category => {
//       sitemap.write({
//         url: `/categories/${category}`,
//         changefreq: 'weekly',
//         priority: 0.7
//       });
//     });
    
//     // In a real app, fetch all tools and add them to the sitemap
//     // For this example, we'll add some mock tool IDs
//     const toolIds = [
//       'chatgpt', 'claude', 'gemini', 'midjourney', 'dall-e', 'stable-diffusion',
//       'elevenlabs', 'github-copilot', 'notion-ai', 'perplexity', 'runway'
//     ];
    
//     // Add tool pages to sitemap
//     toolIds.forEach(toolId => {
//       sitemap.write({
//         url: `/tools/${toolId}`,
//         changefreq: 'weekly',
//         priority: 0.6
//       });
//     });
//   } catch (error) {
//     console.error('Error generating sitemap entries:', error);
//   }
  
//   // If you're using Nuxt Content, you can add blog posts to the sitemap
//   try {
//     // This would be for Nuxt Content - if you're not using it, remove this section
//     const docs = await serverQueryContent(event).where({ _extension: 'md' }).find();
//     for (const doc of docs) {
//       if (doc._path && !doc.draft) {
//         sitemap.write({
//           url: doc._path,
//           changefreq: 'monthly',
//           priority: 0.6,
//           lastmod: doc.updatedAt || doc.date
//         });
//       }
//     }
//   } catch (error) {
//     // Silently handle Content errors - maybe you're not using Nuxt Content
//   }
  
//   // End the sitemap stream
//   sitemap.end();
  
//   // Generate XML
//   const xml = await streamToPromise(sitemap);
  
//   // Set headers
//   setHeader(event, 'Content-Type', 'application/xml');
//   setHeader(event, 'Cache-Control', 'max-age=86400, s-maxage=86400');
  
//   // Return sitemap XML
//   return xml.toString();
// });
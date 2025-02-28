export default defineEventHandler((event) => {
  const config = useRuntimeConfig();
  const siteUrl = config.public.siteUrl || 'https://your-ai-tools-site.com';
  
  // Set content type
  setHeader(event, 'Content-Type', 'text/plain');
  
  // Generate robots.txt content
  return `
User-agent: *
Allow: /

# Disallow admin and internal paths
Disallow: /admin/
Disallow: /internal/
Disallow: /api/
Disallow: /_nuxt/
Disallow: /_ipx/

# Sitemaps
Sitemap: ${siteUrl}/sitemap.xml
  `.trim();
});
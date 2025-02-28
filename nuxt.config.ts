// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: true,

  nitro: {
    preset: 'node-server',
    // Enable prerendering for static pages that don't need dynamic data
    prerender: {
      routes: ['/about', '/privacy-policy', '/terms-of-service'],
    },
  },

  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      title: 'AI Tools Directory - Best AI Tools & Applications',
      titleTemplate: '%s | Your AI Tools Directory',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { hid: 'description', name: 'description', content: 'Discover the best AI tools and applications to enhance your productivity. Our curated directory features the top AI tools across various categories.' },
        { name: 'format-detection', content: 'telephone=no' },
        { name: 'robots', content: 'index, follow' },
        { name: 'author', content: 'Your Company Name' },
        { property: 'og:site_name', content: 'AI Tools Directory' },
        { property: 'og:type', content: 'website' },
        { hid: 'og:title', property: 'og:title', content: 'AI Tools Directory - Best AI Tools & Applications' },
        { hid: 'og:description', property: 'og:description', content: 'Discover the best AI tools and applications to enhance your productivity. Our curated directory features the top AI tools across various categories.' },
        { hid: 'og:image', property: 'og:image', content: '/og-image.jpg' },
        { hid: 'twitter:card', name: 'twitter:card', content: 'summary_large_image' },
        { hid: 'twitter:title', name: 'twitter:title', content: 'AI Tools Directory - Best AI Tools & Applications' },
        { hid: 'twitter:description', name: 'twitter:description', content: 'Discover the best AI tools and applications to enhance your productivity. Our curated directory features the top AI tools across various categories.' },
        { hid: 'twitter:image', name: 'twitter:image', content: '/twitter-image.jpg' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap' },
        { rel: 'canonical', href: 'https://your-ai-tools-site.com/' }
      ]
    }
  },

  typescript: {
    strict: true,
    shim: false,
  },

  // Global CSS/SCSS
  css: ['~/assets/scss/main.scss'],

  // Auto-import components
  components: [
    {
      path: '~/components',
      pathPrefix: true,
    },
  ],

  modules: [
    '@pinia/nuxt',     // State management
    '@nuxt/image',     // Image optimization
    '@nuxtjs/sitemap', // Sitemap generation for SEO
    '@nuxtjs/robots', // Robots.txt for SEO
    '@vueuse/nuxt',   // Composition utilities
    'nuxt-schema-org', // Structured data for SEO
    '@nuxtjs/color-mode'
  ],

  // Robots.txt configuration for SEO
  // Sitemap configuration for SEO
  robots: {
    UserAgent: '*',
    Allow: '/',
    Sitemap: 'https://your-ai-tools-site.com/sitemap.xml'
  },

  sitemap: {
    hostname: 'https://your-ai-tools-site.com',
    gzip: true,
    exclude: [
      '/admin/**'
    ]
  },

  // Schema.org structured data for SEO
  schemaOrg: {
    host: 'https://your-ai-tools-site.com'
  },

  // Image optimization
  image: {
    provider: 'ipx',
    quality: 80,
    format: ['webp', 'jpg', 'png'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536
    }
  },

  // Pinia store configuration
  pinia: {
    autoImports: ['defineStore', 'acceptHMRUpdate'],
  },

  // SCSS configuration
  vite: {
    css: {
      preprocessorOptions: {
        scss: {
          quietDeps: true,
          api: 'modern-compiler',
          silenceDeprecations: ['mixed-decls', 'color-functions', 'global-builtin', 'import'],
          additionalData: '@use "~/assets/scss/_variables.scss" as *; @use "~/assets/scss/_mixins.scss" as *;',
          // additionalData: '@import "~/assets/scss/variables.scss"; @import "~/assets/scss/mixins.scss";',

        },
        
      },
    },
  },


  // Runtime config (environment variables)
  // Route rules for specific page caching strategies
  runtimeConfig: {
    public: {
      apiBaseUrl: process.env.API_BASE_URL || 'http://localhost:3000',
      siteUrl: process.env.SITE_URL || 'https://siteul.com'
    },
  },

  routeRules: {
    // Home page - revalidate every hour
    '/': { swr: 60 * 60 },
    // Category pages - revalidate every day
    '/categories/**': { swr: 24 * 60 * 60 },
    // Individual tool pages - revalidate every day
    '/tools/**': { swr: 24 * 60 * 60 },
    // Static pages - cache permanently until next deployment
    '/about': { static: true },
    '/privacy-policy': { static: true },
    '/terms-of-service': { static: true },
  },

  compatibilityDate: '2025-02-27',
})
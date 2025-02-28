<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero__content">
          <h1 class="hero__title">Discover the Best AI Tools for Any Task</h1>
          <p class="hero__subtitle">
            Explore our curated collection of AI tools and applications to
            enhance your workflow and boost productivity.
          </p>
          <div class="hero__search">
            <SearchBar
              v-model="searchQuery"
              placeholder="Search for AI tools..."
              @search="handleSearch"
            />
          </div>
          <div class="hero__actions">
            <NuxtLink to="/categories" class="btn btn-primary">
              Explore Categories
            </NuxtLink>
            <NuxtLink to="/about" class="btn btn-outline">
              Learn More
            </NuxtLink>
          </div>
        </div>
      </div>
    </section>

    <!-- Featured Categories Section -->
    <section class="categories">
      <div class="container">
        <h2 class="section-title">Popular Categories</h2>

        <div class="categories__grid">
          <NuxtLink
            v-for="category in featuredCategories"
            :key="category.id"
            :to="`/categories/${category.slug}`"
            class="category-card"
          >
            <div class="category-card__icon">
              <component :is="category.icon" />
            </div>
            <h3 class="category-card__title">{{ category.name }}</h3>
            <p class="category-card__description">{{ category.description }}</p>
          </NuxtLink>
        </div>
      </div>
    </section>

    <!-- Featured Tools Section -->
    <section class="featured-tools">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Trending AI Tools</h2>
          <NuxtLink to="/categories" class="section-link">
            View All Tools
          </NuxtLink>
        </div>

        <div class="featured-tools__grid">
          <ToolCard
            v-for="tool in featuredTools"
            :key="tool.id"
            :tool="tool"
            :category="getCategoryNameById(tool.categoryId)"
          />
        </div>
      </div>
    </section>

    <!-- Latest Blog Posts -->
    <section class="blog-posts">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title">Latest AI Insights</h2>
          <NuxtLink to="/blog" class="section-link">
            Read More Articles
          </NuxtLink>
        </div>

        <div class="blog-posts__grid">
          <article v-for="post in latestPosts" :key="post.id" class="blog-card">
            <div class="blog-card__image">
              <NuxtLink :to="`/blog/${post.slug}`">
                <img :src="post.image" :alt="post.title" />
              </NuxtLink>
            </div>
            <div class="blog-card__content">
              <div class="blog-card__meta">
                <span class="blog-card__date">{{ formatDate(post.date) }}</span>
                <span class="blog-card__category">{{ post.category }}</span>
              </div>
              <h3 class="blog-card__title">
                <NuxtLink :to="`/blog/${post.slug}`">
                  {{ post.title }}
                </NuxtLink>
              </h3>
              <p class="blog-card__excerpt">{{ post.excerpt }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>

    <!-- Newsletter Section -->
    <section class="newsletter">
      <div class="container">
        <div class="newsletter__inner">
          <div class="newsletter__content">
            <h2 class="newsletter__title">Stay Updated on AI Trends</h2>
            <p class="newsletter__description">
              Subscribe to our newsletter to receive the latest updates on AI
              tools, industry news, and exclusive offers.
            </p>
          </div>

          <form
            class="newsletter__form"
            @submit.prevent="subscribeToNewsletter"
          >
            <div class="newsletter__input-group">
              <input
                type="email"
                v-model="emailInput"
                class="newsletter__input"
                placeholder="Enter your email address"
                required
              />
              <button type="submit" class="newsletter__button btn btn-primary">
                Subscribe
              </button>
            </div>
            <p class="newsletter__privacy">
              By subscribing, you agree to our
              <NuxtLink to="/privacy-policy">Privacy Policy</NuxtLink>.
            </p>
          </form>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
// SSR page for better SEO
definePageMeta({
  layout: "default",
  // middleware: ["fetch-featured-data"],
});

// State
const searchQuery = ref("");
const emailInput = ref("");

// Fetch data from API or store
const { data: featuredCategories } = await useAsyncData(
  "featuredCategories",
  () => {
    // In a real implementation, this would be an API call
    return Promise.resolve([
      {
        id: "text-generation",
        name: "Text Generation",
        slug: "text-generation",
        icon: "IconText",
        description:
          "AI tools for content creation, writing assistance, and text generation.",
      },
      {
        id: "image-generation",
        name: "Image Generation",
        slug: "image-generation",
        icon: "IconImage",
        description:
          "Create stunning visuals and artwork using AI-powered image generators.",
      },
      {
        id: "audio-voice",
        name: "Audio & Voice",
        slug: "audio-voice",
        icon: "IconAudio",
        description:
          "Voice synthesis, audio editing, and music generation powered by AI.",
      },
      {
        id: "video-generation",
        name: "Video Creation",
        slug: "video-generation",
        icon: "IconVideo",
        description:
          "Create and edit videos with AI-powered tools and effects.",
      },
      {
        id: "productivity",
        name: "Productivity",
        slug: "productivity-organization",
        icon: "IconProductivity",
        description:
          "Boost your workflow with AI assistants and automation tools.",
      },
      {
        id: "coding",
        name: "Coding & Development",
        slug: "code-development",
        icon: "IconCode",
        description:
          "AI-powered coding assistants, bug fixers, and development tools.",
      },
    ]);
  }
);

const { data: featuredTools } = await useAsyncData("featuredTools", () => {
  // In a real implementation, this would be an API call
  return Promise.resolve([
    {
      id: "chatgpt",
      title: "ChatGPT",
      description:
        "Powerful AI assistant for text generation, answering questions, and creative writing.",
      link: "https://chat.openai.com/",
      pricing: "Free tier available, ChatGPT Plus at $20/month",
      tags: ["conversational AI", "content generation", "writing assistant"],
      categoryId: "text-generation",
    },
    {
      id: "midjourney",
      title: "Midjourney",
      description:
        "AI image generator creating stunning, high-quality visuals from text descriptions.",
      link: "https://www.midjourney.com/",
      pricing: "Basic plan at $10/month, Standard at $30/month",
      tags: ["image generation", "artistic", "design"],
      categoryId: "image-generation",
    },
    {
      id: "elevenlabs",
      title: "ElevenLabs",
      description:
        "Advanced voice AI platform for realistic text-to-speech and voice cloning.",
      link: "https://elevenlabs.io/",
      pricing: "Free tier available, Starter plan at $5/month",
      tags: ["voice synthesis", "text-to-speech", "voice cloning"],
      categoryId: "audio-voice",
    },
    {
      id: "github-copilot",
      title: "GitHub Copilot",
      description:
        "AI pair programmer that suggests code completions based on context.",
      link: "https://github.com/features/copilot",
      pricing: "Individual plan at $10/month, Business plan at $19/user/month",
      tags: ["code generation", "pair programming", "developer tool"],
      categoryId: "coding",
    },
  ]);
});

const { data: latestPosts } = await useAsyncData("latestPosts", () => {
  // In a real implementation, this would be an API call
  return Promise.resolve([
    {
      id: 1,
      title: "Top 10 AI Tools for Content Creators in 2025",
      slug: "top-ai-tools-for-content-creators-2025",
      excerpt:
        "Discover the most powerful AI tools that every content creator should be using to streamline their workflow.",
      date: "2025-02-20",
      category: "Productivity",
      image: "/images/blog/content-creators.jpg",
    },
    {
      id: 2,
      title: "How AI is Revolutionizing Video Production",
      slug: "ai-revolutionizing-video-production",
      excerpt:
        "Explore how artificial intelligence is transforming the video production industry with automated editing and generation.",
      date: "2025-02-15",
      category: "Video",
      image: "/images/blog/video-production.jpg",
    },
    {
      id: 3,
      title: "The Ultimate Guide to AI Image Generators",
      slug: "ultimate-guide-ai-image-generators",
      excerpt:
        "A comprehensive comparison of the leading AI image generation tools and how to get the best results.",
      date: "2025-02-10",
      category: "Design",
      image: "/images/blog/image-generators.jpg",
    },
  ]);
});

// Methods
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    navigateTo(`/search?q=${encodeURIComponent(searchQuery.value)}`);
  }
};

const getCategoryNameById = (categoryId: string): string => {
  const category = featuredCategories.value?.find(
    (cat) => cat.id === categoryId
  );
  return category ? category.name : "General";
};

const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
};

const subscribeToNewsletter = () => {
  // In a real implementation, this would send the email to your API
  console.log("Subscribing email:", emailInput.value);
  // Show success message
  alert("Thank you for subscribing to our newsletter!");
  // Reset the form
  emailInput.value = "";
};

// SEO
useHead({
  title: "AI Tools Directory - Find the Best AI Tools & Applications",
  meta: [
    {
      name: "description",
      content:
        "Discover the best AI tools and applications to enhance your productivity. Our curated directory features the top AI tools across various categories.",
    },
    {
      name: "keywords",
      content:
        "AI tools, artificial intelligence, AI applications, AI directory, productivity tools",
    },
    {
      property: "og:title",
      content: "AI Tools Directory - Find the Best AI Tools & Applications",
    },
    {
      property: "og:description",
      content:
        "Discover the best AI tools and applications to enhance your productivity. Our curated directory features the top AI tools across various categories.",
    },
    { property: "og:type", content: "website" },
    { property: "og:url", content: "https://your-ai-tools-site.com/" },
    {
      property: "og:image",
      content: "https://your-ai-tools-site.com/images/og-image.jpg",
    },
    { name: "twitter:card", content: "summary_large_image" },
    {
      name: "twitter:title",
      content: "AI Tools Directory - Find the Best AI Tools & Applications",
    },
    {
      name: "twitter:description",
      content:
        "Discover the best AI tools and applications to enhance your productivity. Our curated directory features the top AI tools across various categories.",
    },
    {
      name: "twitter:image",
      content: "https://your-ai-tools-site.com/images/twitter-image.jpg",
    },
  ],
  link: [{ rel: "canonical", href: "https://your-ai-tools-site.com/" }],
});
</script>

<style lang="scss">
.home-page {
  // Hero section
  .hero {
    background: linear-gradient(
      135deg,
      lighten($primary-color, 25%),
      lighten($secondary-color, 20%)
    );
    padding: $spacing-3xl 0;
    margin-bottom: $spacing-3xl;

    &__content {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
    }

    &__title {
      font-size: $font-size-3xl;
      color: $heading-color;
      margin-bottom: $spacing-md;

      @include breakpoint(md) {
        font-size: $font-size-4xl;
      }
    }

    &__subtitle {
      font-size: $font-size-lg;
      color: $text-color;
      margin-bottom: $spacing-xl;

      @include breakpoint(md) {
        font-size: $font-size-xl;
      }
    }

    &__search {
      max-width: 600px;
      margin: 0 auto $spacing-xl;
    }

    &__actions {
      display: flex;
      flex-direction: column;
      gap: $spacing-sm;
      justify-content: center;
      align-items: center;

      @include breakpoint(sm) {
        flex-direction: row;
        gap: $spacing-md;
      }

      .btn {
        min-width: 150px;
      }
    }
  }

  // Section styles
  .section-title {
    font-size: $font-size-2xl;
    color: $heading-color;
    margin-bottom: $spacing-lg;
    text-align: center;

    @include breakpoint(md) {
      font-size: $font-size-3xl;
    }
  }

  .section-header {
    @include flex-between;
    margin-bottom: $spacing-lg;

    .section-title {
      margin-bottom: 0;
      text-align: left;
    }

    .section-link {
      color: $primary-color;
      font-weight: $font-weight-medium;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  // Categories section
  .categories {
    margin-bottom: $spacing-3xl;

    &__grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: $spacing-md;

      @include breakpoint(sm) {
        grid-template-columns: repeat(2, 1fr);
      }

      @include breakpoint(md) {
        grid-template-columns: repeat(3, 1fr);
      }

      @include breakpoint(lg) {
        grid-template-columns: repeat(6, 1fr);
        gap: $spacing-lg;
      }
    }
  }

  .category-card {
    background-color: white;
    border-radius: $border-radius;
    padding: $spacing-md;
    box-shadow: $card-shadow;
    text-align: center;
    transition: transform $transition-normal, box-shadow $transition-normal;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-decoration: none;
    color: $text-color;

    &:hover {
      transform: translateY(-5px);
      box-shadow: $card-shadow-hover;
      color: $text-color;
    }

    &__icon {
      width: 48px;
      height: 48px;
      margin-bottom: $spacing-sm;
      color: $primary-color;
    }

    &__title {
      font-size: $font-size-lg;
      font-weight: $font-weight-semibold;
      margin-bottom: $spacing-xs;
      color: $heading-color;
    }

    &__description {
      font-size: $font-size-sm;
      color: $text-color-secondary;

      @include breakpoint(lg) {
        display: none;
      }

      @include breakpoint(xl) {
        display: block;
      }
    }
  }

  // Featured tools section
  .featured-tools {
    margin-bottom: $spacing-3xl;

    &__grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: $spacing-lg;

      @include breakpoint(sm) {
        grid-template-columns: repeat(2, 1fr);
      }

      @include breakpoint(lg) {
        grid-template-columns: repeat(4, 1fr);
      }
    }
  }

  // Blog posts section
  .blog-posts {
    margin-bottom: $spacing-3xl;

    &__grid {
      display: grid;
      grid-template-columns: repeat(1, 1fr);
      gap: $spacing-lg;

      @include breakpoint(md) {
        grid-template-columns: repeat(3, 1fr);
      }
    }
  }

  .blog-card {
    background-color: white;
    border-radius: $border-radius;
    overflow: hidden;
    box-shadow: $card-shadow;
    transition: transform $transition-normal, box-shadow $transition-normal;

    &:hover {
      transform: translateY(-5px);
      box-shadow: $card-shadow-hover;
    }

    &__image {
      height: 200px;
      overflow: hidden;

      img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s ease;
      }

      &:hover img {
        transform: scale(1.05);
      }
    }

    &__content {
      padding: $spacing-md;
    }

    &__meta {
      display: flex;
      justify-content: space-between;
      margin-bottom: $spacing-xs;
      font-size: $font-size-xs;
      color: $text-color-secondary;
    }

    &__title {
      font-size: $font-size-lg;
      margin-bottom: $spacing-sm;

      a {
        color: $heading-color;
        text-decoration: none;

        &:hover {
          color: $primary-color;
        }
      }
    }

    &__excerpt {
      font-size: $font-size-sm;
      color: $text-color-secondary;
    }
  }

  // Newsletter section
  .newsletter {
    background-color: $bg-color-secondary;
    padding: $spacing-2xl 0;

    &__inner {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;

      @include breakpoint(md) {
        flex-direction: row;
        text-align: left;
        justify-content: space-between;
        align-items: center;
      }
    }

    &__content {
      margin-bottom: $spacing-lg;

      @include breakpoint(md) {
        flex: 1;
        margin-bottom: 0;
        margin-right: $spacing-xl;
      }
    }

    &__title {
      font-size: $font-size-2xl;
      color: $heading-color;
      margin-bottom: $spacing-sm;
    }

    &__description {
      color: $text-color-secondary;
      max-width: 600px;
    }

    &__form {
      width: 100%;

      @include breakpoint(md) {
        flex: 1;
        max-width: 500px;
      }
    }

    &__input-group {
      display: flex;
      flex-direction: column;
      gap: $spacing-sm;
      margin-bottom: $spacing-sm;

      @include breakpoint(sm) {
        flex-direction: row;
      }
    }

    &__input {
      flex: 1;
      padding: $spacing-sm $spacing-md;
      border: 1px solid $border-color;
      border-radius: $border-radius;
      font-size: $font-size-base;

      &:focus {
        outline: none;
        border-color: $primary-color;
        box-shadow: 0 0 0 3px rgba($primary-color, 0.1);
      }
    }

    &__button {
      white-space: nowrap;
    }

    &__privacy {
      font-size: $font-size-xs;
      color: $text-color-secondary;

      a {
        color: $primary-color;

        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>

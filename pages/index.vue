<template>
  <div class="home-page">
    <!-- Hero Section -->
    <section class="hero">
      <div class="container">
        <div class="hero__content">
          <div class="hero__title-wrapper">
            <h1 class="hero__title">Discover the Best AI Tools for Any Task</h1>
            <div class="hero__title-decoration">
              <div class="dot"></div>
              <div class="dot"></div>
              <div class="dot"></div>
            </div>
          </div>
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
              <span class="btn-text">Explore Categories</span>
              <span class="btn-icon">→</span>
            </NuxtLink>
            <NuxtLink to="/about" class="btn btn-outline">
              <span class="btn-text">Learn More</span>
              <span class="btn-icon">→</span>
            </NuxtLink>
          </div>
        </div>
        <div class="hero__visual">
          <div class="ai-waves">
            <div class="wave"></div>
            <div class="wave"></div>
            <div class="wave"></div>
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
import type { Category, CategoriesResponse, ToolsResponse } from '~/types/categories'

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
    return $fetch('/api/categories') as Promise<CategoriesResponse>;
  },
  {
    transform: (data: CategoriesResponse) => {
      return data?.featuredCategories?.slice(0, 8) || [];
    },
  }
);

const { data: featuredTools } = await useAsyncData(
  "featuredTools",
  () => {
    return $fetch('/api/tools') as Promise<ToolsResponse>;
  },
  {
    transform: (data: ToolsResponse) => {
      return data?.featuredTools || [];
    },
  }
);

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
  const category = featuredCategories.value?.find((cat: Category) => cat.id === categoryId);
  return category?.name || "General";
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
    position: relative;
    background: linear-gradient(
      135deg,
      rgba(13, 17, 23, 0.95),
      rgba(13, 17, 23, 0.95)
    );
    padding: $spacing-3xl 0;
    margin-bottom: $spacing-3xl;
    overflow: hidden;

    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: url('/images/hero-bg.png');
      background-size: cover;
      background-position: center;
      opacity: 0.1;
      z-index: 0;
    }

    &__content {
      max-width: 800px;
      margin: 0 auto;
      text-align: center;
      position: relative;
      z-index: 2;
    }

    &__title-wrapper {
      position: relative;
      margin-bottom: $spacing-xl;
      text-align: center;
    }

    &__title {
      font-size: $font-size-3xl;
      color: $heading-color;
      margin-bottom: $spacing-md;
      font-weight: 800;
      line-height: 1.2;
      position: relative;
      display: inline-block;

      @include breakpoint(md) {
        font-size: $font-size-3xl;
      }

      &::after {
        content: '';
        position: absolute;
        bottom: -10px;
        left: 0;
        right: 0;
        height: 2px;
        background: linear-gradient(
          90deg,
          $primary-color,
          $secondary-color
        );
        opacity: 0.5;
      }
    }

    &__title-decoration {
      display: flex;
      justify-content: center;
      gap: $spacing-sm;
      margin-top: $spacing-md;
      position: absolute;
      bottom: -20px;
      left: 50%;
      transform: translateX(-50%);
      z-index: 1;

      .dot {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        background: linear-gradient(
          45deg,
          $primary-color,
          $secondary-color
        );
        animation: pulse 2s infinite;
        box-shadow: 0 0 10px rgba($primary-color, 0.2);

        &:nth-child(2) {
          animation-delay: 0.2s;
        }

        &:nth-child(3) {
          animation-delay: 0.4s;
        }
      }
    }

    &__subtitle {
      font-size: $font-size-xl;
      color: $text-color;
      margin-bottom: $spacing-2xl;
      line-height: 1.6;
      font-weight: 400;
    }

    &__search {
      max-width: 600px;
      margin: 0 auto $spacing-2xl;
      position: relative;

      .search-bar {
        position: relative;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);
        border-radius: $border-radius-lg;
        padding: $spacing-md $spacing-xl;
        transition: all 0.3s ease;

        &:focus-within {
          background: rgba(255, 255, 255, 0.15);
          border-color: $primary-color;
          box-shadow: 0 0 20px rgba($primary-color, 0.1);
        }

        input {
          color: $heading-color;
          background: transparent;
          border: none;
          outline: none;
          width: 100%;
          font-size: $font-size-lg;
        }
      }
    }

    &__actions {
      display: flex;
      flex-direction: column;
      gap: $spacing-lg;
      justify-content: center;
      align-items: center;

      @include breakpoint(sm) {
        flex-direction: row;
        gap: $spacing-xl;
      }

      .btn {
        min-width: 200px;
        height: 56px;
        font-size: $font-size-lg;
        font-weight: 600;
        transition: all 0.3s ease;
        position: relative;
        overflow: hidden;

        &-primary {
          background: linear-gradient(
            135deg,
            $primary-color,
            $secondary-color
          );
          border: none;
          color: white;
          padding: 0 $spacing-xl;

          .btn-text {
            position: relative;
            z-index: 2;
          }

          .btn-icon {
            position: absolute;
            right: $spacing-sm;
            transition: transform 0.3s ease;
          }

          &:hover {
            transform: translateY(-2px);
            box-shadow: 0 10px 20px rgba($primary-color, 0.3);

            .btn-icon {
              transform: translateX(5px);
            }
          }
        }

        &-outline {
          border: 2px solid $primary-color;
          color: $primary-color;
          background: transparent;
          padding: 0 $spacing-xl;

          .btn-text {
            position: relative;
            z-index: 2;
          }

          .btn-icon {
            position: absolute;
            right: $spacing-sm;
            transition: transform 0.3s ease;
          }

          &:hover {
            background: rgba($primary-color, 0.1);
            transform: translateY(-2px);

            .btn-icon {
              transform: translateX(5px);
            }
          }
        }
      }
    }

    &__visual {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
      width: 50%;
      height: 100%;
      pointer-events: none;
      z-index: 1;

      @include breakpoint(md) {
        display: none;
      }

      .ai-waves {
        position: absolute;
        top: 0;
        right: 0;
        width: 100%;
        height: 100%;

        .wave {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            45deg,
            transparent 0%,
            rgba($primary-color, 0.1) 50%,
            transparent 100%
          );
          animation: wave 8s infinite;
          opacity: 0.3;

          &:nth-child(2) {
            animation-delay: 2s;
          }

          &:nth-child(3) {
            animation-delay: 4s;
          }
        }
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

  // Animations
  @keyframes pulse {
    0% {
      transform: scale(1);
      opacity: 1;
    }
    50% {
      transform: scale(1.2);
      opacity: 0.5;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  @keyframes wave {
    0% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-20px);
    }
    100% {
      transform: translateY(0);
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

<template>
  <div class="blog-page">
    <div class="container">
      <h1 class="page-title">AI Tools Blog</h1>
      <p class="page-subtitle">Latest news, guides, and insights about AI tools and technology</p>
      
      <div class="blog-grid">
        <div v-for="post in blogPosts" :key="post.id" class="blog-card">
          <div class="blog-card__image">
            <img :src="post.image" :alt="post.title" class="blog-image" />
          </div>
          <div class="blog-card__content">
            <div class="blog-card__meta">
              <span class="blog-card__date">{{ post.date }}</span>
              <span class="blog-card__category">{{ post.category }}</span>
            </div>
            <h2 class="blog-card__title">{{ post.title }}</h2>
            <p class="blog-card__excerpt">{{ post.excerpt }}</p>
            <NuxtLink :to="`/blog/${post.slug}`" class="read-more">
              Read More
              <span class="icon">→</span>
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: "default",
});

const blogPosts = [
  {
    id: 1,
    title: 'The Future of AI in 2023',
    slug: 'future-of-ai-2023',
    excerpt: 'Discover the latest trends and predictions for AI technology in the coming year.',
    date: 'May 1, 2023',
    category: 'AI Trends',
    image: '/images/placeholder-blog-1.jpg'
  },
  {
    id: 2,
    title: 'How to Choose the Right AI Tool',
    slug: 'choose-right-ai-tool',
    excerpt: 'A comprehensive guide to selecting the perfect AI solution for your needs.',
    date: 'April 25, 2023',
    category: 'Guides',
    image: '/images/placeholder-blog-2.jpg'
  },
  {
    id: 3,
    title: 'AI in Business: Case Studies',
    slug: 'ai-business-case-studies',
    excerpt: 'Learn how businesses are leveraging AI to transform their operations.',
    date: 'April 18, 2023',
    category: 'Case Studies',
    image: '/images/placeholder-blog-3.jpg'
  }
]

// SEO
useHead({
  title: "AI Tools Blog - Latest News and Insights",
  meta: [
    {
      name: "description",
      content: "Stay updated with the latest news, guides, and insights about AI tools and technology.",
    },
    {
      property: "og:title",
      content: "AI Tools Blog - Latest News and Insights",
    },
    {
      property: "og:description",
      content: "Stay updated with the latest news, guides, and insights about AI tools and technology.",
    },
  ],
});
</script>

<style lang="scss" scoped>
.blog-page {
  padding: $spacing-2xl 0;
}

.page-title {
  font-size: $font-size-3xl;
  margin-bottom: $spacing-sm;
  text-align: center;
  color: $heading-color;
}

.page-subtitle {
  text-align: center;
  color: $text-color-secondary;
  margin-bottom: $spacing-3xl;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: $spacing-xl;
  margin-top: $spacing-xl;
  
  @include breakpoint(sm) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @include breakpoint(lg) {
    grid-template-columns: repeat(3, 1fr);
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
    color: $heading-color;
  }
  
  &__excerpt {
    color: $text-color-secondary;
    margin-bottom: $spacing-md;
    line-height: 1.6;
    font-size: $font-size-sm;
  }
}

.read-more {
  display: inline-flex;
  align-items: center;
  color: $primary-color;
  font-weight: $font-weight-medium;
  text-decoration: none;
  font-size: $font-size-sm;
  
  .icon {
    margin-left: $spacing-xs;
    transition: transform 0.2s ease;
  }
  
  &:hover .icon {
    transform: translateX(3px);
  }
}
</style>

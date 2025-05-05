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
</script>

<style scoped>
.blog-page {
  padding: 2rem 0;
}

.page-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  text-align: center;
}

.page-subtitle {
  text-align: center;
  color: #666;
  margin-bottom: 3rem;
}

.blog-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
}

.blog-card {
  border: 1px solid #eaeaea;
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.blog-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
}

.blog-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.blog-card__content {
  padding: 1.5rem;
}

.blog-card__meta {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0.75rem;
  font-size: 0.875rem;
  color: #666;
}

.blog-card__title {
  font-size: 1.25rem;
  margin-bottom: 0.75rem;
}

.blog-card__excerpt {
  color: #666;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.read-more {
  display: inline-flex;
  align-items: center;
  color: #3b82f6;
  font-weight: 500;
  text-decoration: none;
}

.read-more .icon {
  margin-left: 0.5rem;
  transition: transform 0.2s ease;
}

.read-more:hover .icon {
  transform: translateX(3px);
}
</style>

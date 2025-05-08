<template>
  <div class="blog-post-page">
    <section class="blog-post-header">
      <div class="container">
        <div class="blog-post-meta">
          <span class="blog-post-date">{{ formatDate(post.date) }}</span>
          <span class="blog-post-category">{{ post.category }}</span>
        </div>
        <h1 class="blog-post-title">{{ post.title }}</h1>
        <div class="blog-post-author">
          <img :src="post.authorImage" :alt="post.author" class="blog-post-author-image" />
          <span class="blog-post-author-name">{{ post.author }}</span>
        </div>
      </div>
    </section>

    <section class="blog-post-content">
      <div class="container">
        <div class="blog-post-featured-image">
          <img :src="post.image" :alt="post.title" />
        </div>
        <div class="blog-post-body" v-html="post.content"></div>
        
        <div class="blog-post-tags">
          <span v-for="tag in post.tags" :key="tag" class="blog-post-tag">{{ tag }}</span>
        </div>
      </div>
    </section>

    <section class="related-posts">
      <div class="container">
        <h2 class="section-title">Related Articles</h2>
        <div class="related-posts-grid">
          <article v-for="relatedPost in relatedPosts" :key="relatedPost.id" class="blog-card">
            <div class="blog-card__image">
              <NuxtLink :to="`/blog/${relatedPost.slug}`">
                <img :src="relatedPost.image" :alt="relatedPost.title" />
              </NuxtLink>
            </div>
            <div class="blog-card__content">
              <div class="blog-card__meta">
                <span class="blog-card__date">{{ formatDate(relatedPost.date) }}</span>
                <span class="blog-card__category">{{ relatedPost.category }}</span>
              </div>
              <h3 class="blog-card__title">
                <NuxtLink :to="`/blog/${relatedPost.slug}`">
                  {{ relatedPost.title }}
                </NuxtLink>
              </h3>
              <p class="blog-card__excerpt">{{ relatedPost.excerpt }}</p>
            </div>
          </article>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});

// Get the slug from the route
const route = useRoute();
const slug = route.params.slug;

// In a real application, this would be an API call based on the slug
// For now, we'll simulate fetching a blog post
const { data: post } = await useAsyncData(`blog-${slug}`, () => {
  // Simulate API call
  return Promise.resolve({
    id: 1,
    slug: slug,
    title: "Top 10 AI Tools for Content Creators in 2025",
    excerpt: "Discover the most powerful AI tools that are revolutionizing content creation in 2025.",
    content: `
      <p>Artificial intelligence has transformed how content creators work, making it easier than ever to produce high-quality content efficiently. Here are the top 10 AI tools that every content creator should consider in 2025.</p>
      
      <h2>1. ContentGenius Pro</h2>
      <p>ContentGenius Pro uses advanced natural language processing to help writers create engaging blog posts, articles, and social media content. Its ability to adapt to different tones and styles makes it a versatile tool for any content creator.</p>
      
      <h2>2. VideoMaster AI</h2>
      <p>This revolutionary tool automates video editing, allowing creators to produce professional-quality videos in minutes rather than hours. Its scene detection and automatic transitions are particularly impressive.</p>
      
      <h2>3. AudioEnhance</h2>
      <p>Perfect for podcasters and video creators, AudioEnhance uses AI to improve audio quality, remove background noise, and even enhance vocal clarity without expensive equipment.</p>
      
      <p>The remaining tools in our list continue to push the boundaries of what's possible with AI-assisted content creation...</p>
    `,
    date: "2025-01-15",
    category: "Content Creation",
    author: "Alex Johnson",
    authorImage: "/images/authors/alex-johnson.jpg",
    image: "/images/blog/content-creation.jpg",
    tags: ["AI Tools", "Content Creation", "Productivity"],
  });
});

// Related posts
const { data: relatedPosts } = await useAsyncData("related-posts", () => {
  // In a real implementation, this would fetch posts related to the current one
  return Promise.resolve([
    {
      id: 2,
      slug: "ai-image-generators-comparison",
      title: "AI Image Generators: A Comprehensive Comparison",
      excerpt: "A comprehensive comparison of the leading AI image generation tools and how to get the best results.",
      date: "2025-02-10",
      category: "Design",
      image: "/images/blog/image-generators.jpg",
    },
    {
      id: 3,
      slug: "future-of-ai-content-creation",
      title: "The Future of AI in Content Creation",
      excerpt: "Exploring how artificial intelligence will continue to revolutionize content creation in the coming years.",
      date: "2025-01-28",
      category: "Technology",
      image: "/images/blog/future-ai.jpg",
    },
    {
      id: 4,
      slug: "ethical-considerations-ai-tools",
      title: "Ethical Considerations When Using AI Tools",
      excerpt: "Important ethical guidelines to follow when incorporating AI into your content creation workflow.",
      date: "2025-01-05",
      category: "Ethics",
      image: "/images/blog/ethics-ai.jpg",
    },
  ]);
});

// Format date
function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(date);
}

// SEO
useHead({
  title: `${post.value?.title} - AI Tools Directory`,
  meta: [
    {
      name: "description",
      content: post.value?.excerpt,
    },
    {
      property: "og:title",
      content: `${post.value?.title} - AI Tools Directory`,
    },
    {
      property: "og:description",
      content: post.value?.excerpt,
    },
    {
      property: "og:image",
      content: post.value?.image,
    },
    {
      name: "twitter:card",
      content: "summary_large_image",
    },
    {
      name: "twitter:title",
      content: `${post.value?.title} - AI Tools Directory`,
    },
    {
      name: "twitter:description",
      content: post.value?.excerpt,
    },
    {
      name: "twitter:image",
      content: post.value?.image,
    },
  ],
});
</script>

<style lang="scss" scoped>
.blog-post-page {
  padding-bottom: $spacing-3xl;
}

.blog-post-header {
  background-color: $bg-color-secondary;
  padding: $spacing-2xl 0;
  margin-bottom: $spacing-2xl;
  
  .container {
    max-width: 800px;
  }
}

.blog-post-meta {
  display: flex;
  gap: $spacing-md;
  margin-bottom: $spacing-md;
  font-size: $font-size-sm;
  color: $text-color-secondary;
}

.blog-post-category {
  color: $primary-color;
  font-weight: $font-weight-semibold;
}

.blog-post-title {
  font-size: clamp(2rem, 5vw, 3rem);
  line-height: 1.2;
  margin-bottom: $spacing-lg;
  color: $heading-color;
}

.blog-post-author {
  display: flex;
  align-items: center;
  gap: $spacing-sm;
  
  &-image {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    object-fit: cover;
  }
  
  &-name {
    font-weight: $font-weight-medium;
  }
}

.blog-post-content {
  .container {
    max-width: 800px;
  }
}

.blog-post-featured-image {
  margin-bottom: $spacing-xl;
  border-radius: $border-radius;
  overflow: hidden;
  
  img {
    width: 100%;
    height: auto;
    object-fit: cover;
  }
}

.blog-post-body {
  font-size: $font-size-base;
  line-height: 1.7;
  color: $text-color;
  
  h2 {
    font-size: $font-size-xl;
    color: $heading-color;
    margin: $spacing-xl 0 $spacing-md;
  }
  
  p {
    margin-bottom: $spacing-md;
  }
}

.blog-post-tags {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-sm;
  margin-top: $spacing-xl;
}

.blog-post-tag {
  background-color: rgba($primary-color, 0.1);
  color: $primary-color;
  padding: $spacing-xs $spacing-sm;
  border-radius: $border-radius-sm;
  font-size: $font-size-xs;
  font-weight: $font-weight-medium;
}

.related-posts {
  margin-top: $spacing-3xl;
  
  .section-title {
    text-align: center;
    margin-bottom: $spacing-xl;
  }
  
  &-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: $spacing-lg;
    
    @include breakpoint(md) {
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
}
</style>

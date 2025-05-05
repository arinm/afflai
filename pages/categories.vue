<template>
  <div class="categories-page">
    <div class="container">
      <h1 class="categories-page__title">All AI Categories</h1>

      <div class="categories-page__filters">
        <SearchBar
          v-model="searchQuery"
          placeholder="Search categories..."
          @search="handleSearch"
        />
      </div>

      <div class="categories-page__grid">
        <NuxtLink
          v-for="category in filteredCategories"
          :key="category.id"
          :to="`/categories/${category.slug}`"
          class="category-card"
        >
          <div class="category-card__icon">
            <component :is="category.icon" />
          </div>
          <h2 class="category-card__title">{{ category.name }}</h2>
          <p class="category-card__description">{{ category.description }}</p>
          <span class="category-card__count">{{ category.toolCount || 0 }} tools</span>
        </NuxtLink>
      </div>

      <div v-if="isLoading" class="categories-page__loading">
        <LoadingSpinner />
      </div>

      <div v-if="error" class="categories-page__error">
        <ErrorMessage :message="error" @retry="loadCategories" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Category } from '~/types/categories'

// SSR page for better SEO
definePageMeta({
  layout: "default",
  middleware: ["fetch-categories"],
})

// State
const searchQuery = ref("")
const isLoading = ref(false)
const error = ref<string | null>(null)

// Fetch categories from API
const { data: categories } = await useAsyncData<Category[]>(
  "allCategories",
  async () => {
    isLoading.value = true
    error.value = null
    try {
      const response = await $fetch('/api/categories')
      return response.featuredCategories
    } catch (err) {
      error.value = "Failed to load categories. Please try again."
      throw err
    } finally {
      isLoading.value = false
    }
  }
)

// Computed
const filteredCategories = computed(() => {
  if (!searchQuery.value) return categories.value || []
  
  const search = searchQuery.value.toLowerCase()
  return (categories.value || []).filter(category => 
    category.name.toLowerCase().includes(search) ||
    category.description.toLowerCase().includes(search)
  )
})

// Methods
const handleSearch = () => {
  if (searchQuery.value.trim()) {
    // Search is handled by the computed property
  }
}

const loadCategories = () => {
  // Trigger a reload of the categories
  error.value = null
  isLoading.value = true
  return $fetch('/api/categories')
    .then(response => {
      categories.value = response.featuredCategories
    })
    .catch(err => {
      error.value = "Failed to load categories. Please try again."
      throw err
    })
    .finally(() => {
      isLoading.value = false
    })
}

// SEO
useHead({
  title: "All AI Categories - Browse AI Tools by Category",
  meta: [
    {
      name: "description",
      content:
        "Explore our comprehensive collection of AI categories. Find the perfect AI tools for your needs across various categories.",
    },
    {
      property: "og:title",
      content: "All AI Categories - Browse AI Tools by Category",
    },
    {
      property: "og:description",
      content:
        "Explore our comprehensive collection of AI categories. Find the perfect AI tools for your needs across various categories.",
    },
  ],
})
</script>

<style lang="scss">
.categories-page {
  padding: $spacing-3xl 0;

  &__title {
    font-size: $font-size-3xl;
    color: $heading-color;
    margin-bottom: $spacing-2xl;
    text-align: center;
  }

  &__filters {
    margin-bottom: $spacing-2xl;
    max-width: 800px;
    margin-left: auto;
    margin-right: auto;
  }

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
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__loading {
    text-align: center;
    padding: $spacing-3xl 0;
  }

  &__error {
    text-align: center;
    padding: $spacing-3xl 0;
  }
}

.category-card {
  background: white;
  border-radius: $border-radius;
  padding: $spacing-md;
  text-decoration: none;
  color: $text-color;
  transition: all 0.3s ease;
  box-shadow: $card-shadow;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

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
    margin-bottom: $spacing-sm;
    color: $heading-color;
  }

  &__description {
    font-size: $font-size-sm;
    color: $text-color-secondary;
    margin-bottom: $spacing-sm;
  }

  &__count {
    font-size: $font-size-sm;
    color: $primary-color;
    font-weight: $font-weight-medium;
  }
}
</style>

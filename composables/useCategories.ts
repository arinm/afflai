import type { Category } from '~/types/category'

export const useCategories = () => {
  const categories = ref<Category[]>([])
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  const fetchCategories = async () => {
    isLoading.value = true
    error.value = null

    try {
      const data = await $fetch('/api/categories')
      categories.value = data.featuredCategories
      return categories.value
    } catch (err) {
      error.value = 'Failed to load categories. Please try again later.'
      console.error('Error fetching categories:', err)
      throw err
    } finally {
      isLoading.value = false
    }
  }

  const getCategoryBySlug = (slug: string) => {
    return categories.value.find(category => category.slug === slug)
  }

  const getCategoryById = (id: string) => {
    return categories.value.find(category => category.id === id)
  }

  // Get tools count for a specific category
  const getToolsCount = (categoryId: string) => {
    const category = getCategoryById(categoryId)
    return category?.toolCount || 0
  }

  // Get featured tools for a category
  const getFeaturedTools = (categoryId: string, limit = 4) => {
    // In a real app, this would be an API call with proper filtering
    return []
  }

  return {
    // State
    categories,
    isLoading,
    error,

    
    // Methods
    fetchCategories,
    getCategoryBySlug,
    getCategoryById,
    getToolsCount,
    getFeaturedTools,
  }
}

export default useCategories

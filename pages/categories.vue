<template>
  <div class="categories-page">
    <div class="container">
      <div class="categories-content">
        <div v-if="isLoading">
          <LoadingSpinner message="Loading categories..." />
        </div>
        <div v-else-if="error">
          <ErrorMessage :message="error" @retry="loadAllCategories" />
        </div>
        <div v-else>
          <div class="compact-hero">
            <div class="compact-hero__background">
              <div class="compact-hero__gradient"></div>
              <div class="compact-hero__particles">
                <div v-for="n in 10" :key="n" class="particle" :class="`particle-${n % 5}`"></div>
              </div>
            </div>
            <div class="compact-hero__content">
              <h1 class="compact-hero__title">AI Tool Categories</h1>
              <p class="compact-hero__subtitle">Browse our collection of cutting-edge AI tools by category or explore all tools at once</p>
            </div>
          </div>
          <CategoryFilter
            :categories="availableCategories"
            :selected-category="selectedCategory"
            @select="handleCategorySelect"
          />
          <div v-if="filteredTools?.length === 0" class="empty-container">
            <p class="empty-message">No tools found in this category.</p>
          </div>
          <div v-else>
            <div class="tools-count">
              <p>Showing {{ filteredTools?.length }} tools</p>
            </div>
            <ToolGrid
              :tools="filteredTools"
              :category="selectedCategory"
              :is-loading="false"
              :error="null"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tool } from '~/types';
import { useToolsStore } from '~/store/toolsStore';
import LoadingSpinner from '~/components/Ui/LoadingSpinner.vue';
import ErrorMessage from '~/components/Ui/ErrorMessage.vue';
import HeroSection from '~/components/Home/HeroSection.vue';
import ToolGrid from '~/components/Tool/ToolGrid.vue';
import CategoryFilter from '~/components/Category/Filter.vue';

// Define middleware
definePageMeta({
  middleware: ['fetch-categories']
});

// Use the store directly
const toolsStore = useToolsStore();

// Reactive state
const isLoading = ref(true);
const error = ref<string | null>(null);
const selectedCategory = ref('all');
const allTools = ref<Tool[]>([]);
const availableCategories = ref<string[]>([]);

// Computed
const filteredTools = computed(() => {
  if (selectedCategory.value === 'all') {
    return allTools.value;
  }
  
  return allTools.value.filter(tool => {
    // Check if the tool has a categories property and it's an array
    if (!tool.categories || !Array.isArray(tool.categories)) {
      // If no categories property, add it with the current category
      if (tool.categoryId) {
        // If the tool has a categoryId, use that
        return tool.categoryId === selectedCategory.value;
      }
      return false;
    }
    
    // If it has categories, check if it includes the selected category
    return tool.categories.includes(selectedCategory.value);
  });
});

// Methods
const loadAllCategories = async () => {
  isLoading.value = true;
  error.value = null;
  
  try {
    // Get all available categories
    const categories = await toolsStore.fetchAllCategories();
    availableCategories.value = categories.map(cat => cat.slug);
    
    // Load tools from all categories
    const toolsPromises = availableCategories.value.map(category => 
      toolsStore.fetchCategory(category)
    );
    
    await Promise.all(toolsPromises);
    
    // Combine all tools and remove duplicates
    const toolsMap = new Map();
    
    for (const category of availableCategories.value) {
      const categoryTools = toolsStore.getToolsByCategory(category) || [];
      
      for (const tool of categoryTools) {
        if (!toolsMap.has(tool.id)) {
          // Ensure the tool has a categories array
          if (!tool.categories || !Array.isArray(tool.categories)) {
            tool.categories = [category];
          } else if (!tool.categories.includes(category)) {
            // Add the current category if it's not already included
            tool.categories.push(category);
          }
          
          toolsMap.set(tool.id, tool);
        } else {
          // Update existing tool's categories if needed
          const existingTool = toolsMap.get(tool.id);
          if (!existingTool.categories) {
            existingTool.categories = [category];
          } else if (!existingTool.categories.includes(category)) {
            existingTool.categories.push(category);
          }
        }
      }
    }
    
    allTools.value = Array.from(toolsMap.values());
  } catch (err) {
    console.error("Error loading categories:", err);
    error.value = "Failed to load categories. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

const handleCategorySelect = (category: string) => {
  selectedCategory.value = category;
};

// Lifecycle
onMounted(() => {
  loadAllCategories();
});

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

<style lang="scss" scoped>
.categories-page {
  padding: 2rem 0;
}

.categories-hero {
  margin-bottom: 2rem;
}

.categories-content {
  margin-top: 2rem;
}

.loading-container,
.error-container,
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  text-align: center;
}

.empty-message {
  color: #666;
  margin-bottom: 1rem;
  font-size: 1.25rem;
}

.tools-count {
  margin-bottom: 1rem;
  color: #666;
  font-size: $font-size-sm;
}

/* Compact Hero Styles */
.compact-hero {
  position: relative;
  height: 300px;
  max-height: 300px;
  overflow: hidden;
  border-radius: 12px;
  margin-bottom: 2rem;
  background: linear-gradient(135deg, #1a73e8, #4285f4);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  &__background {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1;
  }
  
  &__gradient {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(135deg, rgba(26, 115, 232, 0.8), rgba(66, 133, 244, 0.8));
  }
  
  &__particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
  
  &__content {
    position: relative;
    z-index: 2;
    padding: 2rem;
    max-width: 800px;
  }
  
  &__title {
    font-size: 2.5rem;
    font-weight: 700;
    color: white;
    margin-bottom: 1rem;
    text-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  &__subtitle {
    font-size: 1.25rem;
    color: rgba(255, 255, 255, 0.9);
    margin-bottom: 1.5rem;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }
}

/* Particle animations */
.particle {
  position: absolute;
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  animation: float 15s infinite ease-in-out;
  
  &-0 {
    top: 10%;
    left: 10%;
    width: 15px;
    height: 15px;
    animation-delay: 0s;
  }
  
  &-1 {
    top: 20%;
    left: 80%;
    width: 20px;
    height: 20px;
    animation-delay: 2s;
  }
  
  &-2 {
    top: 70%;
    left: 30%;
    width: 12px;
    height: 12px;
    animation-delay: 4s;
  }
  
  &-3 {
    top: 40%;
    left: 60%;
    width: 18px;
    height: 18px;
    animation-delay: 6s;
  }
  
  &-4 {
    top: 80%;
    left: 80%;
    width: 8px;
    height: 8px;
    animation-delay: 8s;
  }
}

@keyframes float {
  0% {
    transform: translateY(0) translateX(0);
    opacity: 0.3;
  }
  25% {
    transform: translateY(-20px) translateX(10px);
    opacity: 0.6;
  }
  50% {
    transform: translateY(0) translateX(20px);
    opacity: 0.3;
  }
  75% {
    transform: translateY(20px) translateX(10px);
    opacity: 0.6;
  }
  100% {
    transform: translateY(0) translateX(0);
    opacity: 0.3;
  }
}
</style>

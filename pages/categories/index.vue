<template>
  <div class="categories-page">
    <div class="container">
      aici
      <HeroSection
        title="AI Tool Categories"
        subtitle="Browse our collection of AI tools by category or explore all tools at once"
        :show-search="false"
        class="categories-hero"
      />

      <div class="categories-content">
        <Category-Filter
          :categories="availableCategories"
          :selected-category="selectedCategory"
          @select="handleCategorySelect"
        />

        <div v-if="isLoading" class="loading-container">
          <LoadingSpinner message="Loading tools..." />
        </div>

        <div v-else-if="error" class="error-container">
          <ErrorMessage :message="error" @retry="loadAllCategories" />
        </div>

        <div v-else>
          <div v-if="filteredTools.length === 0" class="empty-container">
            <p class="empty-message">No tools found in this category.</p>
          </div>
          
          <div v-else>
            <div class="tools-count">
              <p>Showing {{ filteredTools.length }} tools</p>
            </div>
            
            <Tool-ToolGrid
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
  
  return allTools.value.filter(tool => 
    tool.categories.includes(selectedCategory.value)
  );
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
          toolsMap.set(tool.id, tool);
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
</script>

<style lang="scss" scoped>
.categories-page {
  padding: $spacing-xl 0;
}

.categories-hero {
  margin-bottom: $spacing-xl;
}

.categories-content {
  margin-top: $spacing-xl;
}

.loading-container,
.error-container,
.empty-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $spacing-xl;
  text-align: center;
}

.empty-message {
  color: $text-color-secondary;
  margin-bottom: $spacing-md;
  font-size: $font-size-lg;
}

.tools-count {
  margin-bottom: $spacing-md;
  color: $text-color-secondary;
  font-size: $font-size-sm;
}
</style>

import { defineStore } from 'pinia';
import type { Tool, Category, MasterFile, FilterOptions, SearchResult } from '~/types';

export const useToolsStore = defineStore('tools', () => {
  // State
  const masterFile = ref<MasterFile | null>(null);
  const categories = ref<string[]>([]);
  const categoryData = ref<Record<string, Category>>({});
  const currentCategory = ref<string | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  
  // Filters and search
  const searchTerm = ref('');
  const selectedTags = ref<string[]>([]);
  const selectedPriceRanges = ref<string[]>([]);
  
  // Getters
  const allTools = computed(() => {
    const tools: { tool: Tool; category: string }[] = [];
    
    Object.entries(categoryData.value).forEach(([category, data]) => {
      data.tools.forEach(tool => {
        tools.push({ tool, category });
      });
    });
    
    return tools;
  });
  
  const currentCategoryTools = computed(() => {
    if (!currentCategory.value || !categoryData.value[currentCategory.value]) {
      return [];
    }
    
    return categoryData.value[currentCategory.value].tools;
  });
  
  const filteredTools = computed(() => {
    let filtered = [...currentCategoryTools.value];
    
    // Apply search filter
    if (searchTerm.value) {
      const search = searchTerm.value.toLowerCase();
      filtered = filtered.filter(tool => 
        tool.title.toLowerCase().includes(search) || 
        tool.description.toLowerCase().includes(search) ||
        tool.tags.some(tag => tag.toLowerCase().includes(search))
      );
    }
    
    // Apply tag filters
    if (selectedTags.value.length > 0) {
      filtered = filtered.filter(tool => 
        selectedTags.value.some(tag => tool.tags.includes(tag))
      );
    }
    
    // Apply price filters (simplified example - would need parsing logic)
    if (selectedPriceRanges.value.length > 0) {
      filtered = filtered.filter(tool => {
        // This is a simplified example
        // You would need to parse the pricing string and check against ranges
        const pricingLower = tool.pricing.toLowerCase();
        
        return selectedPriceRanges.value.some(range => {
          switch (range) {
            case 'free':
              return pricingLower.includes('free');
            case 'paid':
              return !pricingLower.includes('free') || (pricingLower.includes('free') && pricingLower.includes('premium'));
            case 'enterprise':
              return pricingLower.includes('enterprise') || pricingLower.includes('custom pricing');
            default:
              return true;
          }
        });
      });
    }
    
    return filtered;
  });
  
  const allTags = computed(() => {
    const tagSet = new Set<string>();
    
    if (currentCategory.value && categoryData.value[currentCategory.value]) {
      categoryData.value[currentCategory.value].tools.forEach(tool => {
        tool.tags.forEach(tag => tagSet.add(tag));
      });
    }
    
    return Array.from(tagSet).sort();
  });
  
  // Actions
  async function fetchMasterFile() {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await fetch('/data/json-master-file.json');
      masterFile.value = await response.json();
      categories.value = masterFile.value.categories;
    } catch (err) {
      console.error('Failed to fetch master file:', err);
      error.value = 'Failed to load categories. Please try again later.';
    } finally {
      isLoading.value = false;
    }
  }
  
  async function fetchCategory(category: string) {
    if (categoryData.value[category]) {
      currentCategory.value = category;
      return;
    }
    
    isLoading.value = true;
    error.value = null;
    
    try {
      if (!masterFile.value) {
        await fetchMasterFile();
      }
      
      if (!masterFile.value) {
        throw new Error('Master file could not be loaded');
      }
      
      const fileName = masterFile.value.categoryFiles[category];
      const response = await fetch(`/data/${fileName}.json`);
      const data = await response.json();
      
      categoryData.value[category] = data;
      currentCategory.value = category;
    } catch (err) {
      console.error(`Failed to fetch category ${category}:`, err);
      error.value = `Failed to load ${category} tools. Please try again later.`;
    } finally {
      isLoading.value = false;
    }
  }
  
  function setSearchTerm(term: string) {
    searchTerm.value = term;
  }
  
  function toggleTag(tag: string) {
    const index = selectedTags.value.indexOf(tag);
    if (index === -1) {
      selectedTags.value.push(tag);
    } else {
      selectedTags.value.splice(index, 1);
    }
  }
  
  function togglePriceRange(range: string) {
    const index = selectedPriceRanges.value.indexOf(range);
    if (index === -1) {
      selectedPriceRanges.value.push(range);
    } else {
      selectedPriceRanges.value.splice(index, 1);
    }
  }
  
  function clearFilters() {
    searchTerm.value = '';
    selectedTags.value = [];
    selectedPriceRanges.value = [];
  }
  
  // Find a specific tool by ID
  function findToolById(id: string): { tool: Tool; category: string } | null {
    for (const [category, data] of Object.entries(categoryData.value)) {
      const tool = data.tools.find(t => t.id === id);
      if (tool) {
        return { tool, category };
      }
    }
    return null;
  }
  
  // Search across all categories
  async function searchAllCategories(term: string): Promise<SearchResult[]> {
    // Make sure all categories are loaded
    if (categories.value.length === 0) {
      await fetchMasterFile();
    }
    
    const results: SearchResult[] = [];
    const searchTerm = term.toLowerCase();
    
    // Load any unloaded categories
    const loadPromises = categories.value.map(async (category) => {
      if (!categoryData.value[category]) {
        await fetchCategory(category);
      }
    });
    
    await Promise.all(loadPromises);
    
    // Search through all loaded categories
    for (const [category, data] of Object.entries(categoryData.value)) {
      for (const tool of data.tools) {
        const titleMatch = tool.title.toLowerCase().includes(searchTerm);
        const descMatch = tool.description.toLowerCase().includes(searchTerm);
        const tagMatch = tool.tags.some(tag => tag.toLowerCase().includes(searchTerm));
        
        if (titleMatch || descMatch || tagMatch) {
          // Calculate relevance score (simple example)
          let relevanceScore = 0;
          if (titleMatch) relevanceScore += 3;
          if (descMatch) relevanceScore += 1;
          if (tagMatch) relevanceScore += 2;
          
          results.push({
            tool,
            category,
            relevanceScore
          });
        }
      }
    }
    
    // Sort by relevance score (highest first)
    return results.sort((a, b) => b.relevanceScore - a.relevanceScore);
  }
  
  return {
    // State
    masterFile,
    categories,
    categoryData,
    currentCategory,
    isLoading,
    error,
    searchTerm,
    selectedTags,
    selectedPriceRanges,
    
    // Getters
    allTools,
    currentCategoryTools,
    filteredTools,
    allTags,
    
    // Actions
    fetchMasterFile,
    fetchCategory,
    setSearchTerm,
    toggleTag,
    togglePriceRange,
    clearFilters,
    findToolById,
    searchAllCategories
  };
});
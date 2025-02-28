import { useToolsStore } from '~/store/toolsStore';
import type { Tool } from '~/types';

export const useTools = () => {
  const toolsStore = useToolsStore();
  const route = useRoute();
  const router = useRouter();
  
  // Local reactive state
  const isLoadingTools = ref(false);
  const currentTool = ref<Tool | null>(null);
  const relatedTools = ref<Tool[]>([]);
  
  // Get the current tool from the route param
  const fetchCurrentTool = async () => {
    if (!route.params.id) return null;
    
    const toolId = route.params.id as string;
    isLoadingTools.value = true;
    
    try {
      // Find the tool across all categories
      let toolInfo = toolsStore.findToolById(toolId);
      
      // If not found, we might need to load category data first
      if (!toolInfo) {
        await toolsStore.fetchMasterFile();
        
        // Try loading each category until we find the tool
        for (const category of toolsStore.categories) {
          await toolsStore.fetchCategory(category);
          toolInfo = toolsStore.findToolById(toolId);
          if (toolInfo) break;
        }
      }
      
      if (toolInfo) {
        currentTool.value = toolInfo.tool;
        await findRelatedTools(toolInfo.tool, toolInfo.category);
      } else {
        currentTool.value = null;
        relatedTools.value = [];
        console.error(`Tool with ID ${toolId} not found`);
      }
    } catch (error) {
      console.error('Error fetching tool:', error);
      currentTool.value = null;
    } finally {
      isLoadingTools.value = false;
    }
    
    return currentTool.value;
  };
  
  // Find related tools based on tags and category
  const findRelatedTools = async (tool: Tool, category: string) => {
    if (!tool) return [];
    
    // Ensure category data is loaded
    await toolsStore.fetchCategory(category);
    
    // Get all tools in the same category
    const categoryTools = toolsStore.categoryData[category]?.tools || [];
    
    // Find tools with similar tags, excluding the current tool
    const toolsWithTagMatch = categoryTools
      .filter(t => t.id !== tool.id)
      .map(t => {
        // Count matching tags
        const matchingTags = t.tags.filter(tag => tool.tags.includes(tag));
        return {
          tool: t,
          matchCount: matchingTags.length
        };
      })
      .filter((item: { matchCount: number; }) => item.matchCount > 0) // Must have at least one matching tag
      .sort((a, b) => b.matchCount - a.matchCount) // Sort by most matches first
      .map(item => item.tool); // Extract just the tool object
    
    // Get top 4 related tools
    relatedTools.value = toolsWithTagMatch.slice(0, 4);
    
    // If we don't have enough related tools by tag, add some from the same category
    if (relatedTools.value.length < 4) {
      const remainingCount = 4 - relatedTools.value.length;
      const relatedIds = new Set(relatedTools.value.map(t => t.id));
      
      // Add more tools from the same category that aren't already included
      const additionalTools = categoryTools
        .filter(t => t.id !== tool.id && !relatedIds.has(t.id))
        .slice(0, remainingCount);
      
      relatedTools.value = [...relatedTools.value, ...additionalTools];
    }
    
    return relatedTools.value;
  };
  
  // Generate an affiliate link for a tool
  const getAffiliateLink = (tool: Tool) => {
    // This is a placeholder. In a real implementation, you'd have logic to:
    // 1. Add affiliate IDs to links
    // 2. Track clicks (maybe via a redirect through your API)
    // 3. Handle different affiliate programs
    
    // Simple example for demonstration
    return `${tool.link}?ref=arnxaffiliate`;
  };
  
  // Track when a user clicks on an affiliate link
  const trackAffiliateClick = (tool: Tool, category: string) => {
    // In a real implementation, you might send this to your API
    console.log('Tracking affiliate click:', {
      toolId: tool.id,
      category,
      timestamp: Date.now()
    });
    
    // Example: fire a pixel or send analytics event
    if (process.client) {
      // Google Analytics example (if you were using it)
      // window.gtag?.('event', 'affiliate_click', {
      //   tool_id: tool.id,
      //   tool_name: tool.title,
      //   category: category
      // });
    }
  };
  
  // Handle affiliate link click with tracking
  const handleAffiliateClick = (tool: Tool, category: string) => {
    trackAffiliateClick(tool, category);
    
    // Open the affiliate link in a new tab
    if (process.client) {
      window.open(getAffiliateLink(tool), '_blank');
    }
    
    return false; // Prevent default link behavior if used in @click
  };
  
  // Navigate to a tool detail page
  const navigateToTool = (toolId: string) => {
    router.push(`/tools/${toolId}`);
  };
  
  return {
    // State
    isLoadingTools,
    currentTool,
    relatedTools,
    
    // From store
    categories: computed(() => toolsStore.categories),
    currentCategory: computed(() => toolsStore.currentCategory),
    allTools: computed(() => toolsStore.allTools),
    filteredTools: computed(() => toolsStore.filteredTools),
    isStoreLoading: computed(() => toolsStore.isLoading),
    allTags: computed(() => toolsStore.allTags),
    
    // Methods
    fetchCurrentTool,
    findRelatedTools,
    getAffiliateLink,
    trackAffiliateClick,
    handleAffiliateClick,
    navigateToTool,
    
    // Pass-through to store actions
    fetchCategory: toolsStore.fetchCategory,
    setSearchTerm: toolsStore.setSearchTerm,
    toggleTag: toolsStore.toggleTag,
    clearFilters: toolsStore.clearFilters,
    searchAllCategories: toolsStore.searchAllCategories
  };
};
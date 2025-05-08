// Middleware to fetch categories data
import { useToolsStore } from '~/store/toolsStore';

export default defineNuxtRouteMiddleware(async (to) => {
  // Import the store directly
  const store = useToolsStore();
  
  // Fetch master file for all category routes
  await store.fetchMasterFile();
  
  // If we're on the categories index page, fetch all categories
  if (to.path === '/categories' || to.path === '/categories/') {
    await store.fetchAllCategories();
  }
  // If we're on a specific category page, fetch that category
  else if (to.params.category) {
    const category = to.params.category as string;
    await store.fetchCategory(category);
  }
});

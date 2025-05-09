<template>
  <div class="category-page">
    <div class="container">
      <BreadcrumbNav :items="breadcrumbs" />

      <h1 class="category-page__title">{{ categoryName }} AI Tools</h1>

      <CategoryAgent
        v-if="categoryData"
        :category-name="categoryName"
        :category-data="categoryData"
      />

      <div class="category-page__filters">
        <SearchBar
          v-model="searchQuery"
          placeholder="Search for tools..."
          @search="handleSearch"
        />

        <TagFilter
          :tags="allTags"
          :selected-tags="selectedTags"
          @toggle="toggleTag"
        />
      </div>

      <ToolGrid
        :tools="filteredTools"
        :category="categoryName"
        :is-loading="isLoading"
        :error="error"
        @retry="loadCategory"
        @clear-filters="clearFilters"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTools } from "~/composables/useTools";

// Get route params
const route = useRoute();
const categorySlug = computed(() => route.params.category as string);

// Replace hyphens with spaces and capitalize words for display
const categoryName = computed(() => {
  return categorySlug.value
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
});

// Set up breadcrumbs
const breadcrumbs = computed(() => [
  { text: "Home", to: "/" },
  { text: "Categories", to: "/categories" },
  { text: categoryName.value, to: route.fullPath, active: true },
]);

// Get tools composable
const {
  fetchCategory,
  filteredTools,
  isStoreLoading,
  allTags,
  setSearchTerm,
  toggleTag: toggleTagAction,
  clearFilters: clearFiltersAction,
} = useTools();

// Local state
const searchQuery = ref("");
const selectedTags = ref<string[]>([]);
const isLoading = ref(true);
const error = ref<string | null>(null);

// Methods
const loadCategory = async () => {
  isLoading.value = true;
  error.value = null;

  try {
    // Convert category name to match the format in JSON
    const formattedCategory = categoryName.value;
    await fetchCategory(formattedCategory);
  } catch (err) {
    console.error("Error loading category:", err);
    error.value = "Failed to load tools. Please try again.";
  } finally {
    isLoading.value = false;
  }
};

const handleSearch = () => {
  setSearchTerm(searchQuery.value);
};

const toggleTag = (tag: string) => {
  toggleTagAction(tag);

  // Update local selectedTags state to keep UI in sync
  const index = selectedTags.value.indexOf(tag);
  if (index === -1) {
    selectedTags.value.push(tag);
  } else {
    selectedTags.value.splice(index, 1);
  }
};

const clearFilters = () => {
  searchQuery.value = "";
  selectedTags.value = [];
  clearFiltersAction();
};

// Load data on page load
onMounted(async () => {
  await loadCategory();
});

// Watch for route changes to reload data
watch(categorySlug, async (newSlug, oldSlug) => {
  if (newSlug !== oldSlug) {
    await loadCategory();
  }
});

// Set up page metadata
useHead({
  title: `${categoryName.value} AI Tools - Best ${categoryName.value} Tools & Apps`,
  meta: [
    {
      name: "description",
      content: `Discover the best ${categoryName.value} AI tools and applications to streamline your workflow and boost productivity.`,
    },
  ],
});
</script>

<style lang="scss">
.category-page {
  padding: $spacing-xl 0;

  &__title {
    margin-bottom: $spacing-lg;
    color: $heading-color;
    font-size: $font-size-3xl;

    @include breakpoint(md) {
      font-size: $font-size-4xl;
    }
  }

  &__filters {
    margin-bottom: $spacing-xl;

    @include flex(column, flex-start, stretch);
    gap: $spacing-md;

    @include breakpoint(md) {
      @include flex(row, space-between, center);
    }
  }
}
</style>

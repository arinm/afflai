<template>
  <div class="tool-detail">
    <div class="container">
      <div v-if="isLoading" class="tool-detail__loading">
        <div class="loading-spinner"></div>
        <p>Loading tool information...</p>
      </div>

      <div v-else-if="!currentTool" class="tool-detail__error">
        <h2>Tool Not Found</h2>
        <p>Sorry, we couldn't find the tool you're looking for.</p>
        <NuxtLink to="/" class="btn btn-primary mt-4"> Back to Home </NuxtLink>
      </div>

      <template v-else>
        <BreadcrumbNav :items="breadcrumbs" />

        <div class="tool-detail__header">
          <h1 class="tool-detail__title">{{ currentTool.title }}</h1>

          <div class="tool-detail__actions">
            <button class="btn btn-primary" @click="visitWebsite">
              Visit Website
            </button>
          </div>
        </div>

        <div class="tool-detail__content">
          <div class="tool-detail__main">
            <div class="tool-detail__section">
              <h2 class="tool-detail__section-title">Overview</h2>
              <p class="tool-detail__description">
                {{ currentTool.description }}
              </p>
            </div>

            <div class="tool-detail__section">
              <h2 class="tool-detail__section-title">Pricing</h2>
              <div class="tool-detail__pricing">
                <p>{{ currentTool.pricing }}</p>
              </div>
            </div>

            <div class="tool-detail__section">
              <h2 class="tool-detail__section-title">Tags</h2>
              <div class="tool-detail__tags">
                <span
                  v-for="tag in currentTool.tags"
                  :key="tag"
                  class="tool-detail__tag"
                >
                  {{ tag }}
                </span>
              </div>
            </div>
          </div>

          <div class="tool-detail__sidebar">
            <div class="tool-detail__card">
              <h3 class="tool-detail__card-title">Quick Info</h3>

              <div class="tool-detail__info-item">
                <span class="tool-detail__info-label">Category:</span>
                <NuxtLink
                  :to="`/categories/${formatCategorySlug(toolCategory)}`"
                  class="tool-detail__info-value tool-detail__info-link"
                >
                  {{ toolCategory }}
                </NuxtLink>
              </div>

              <div class="tool-detail__info-item">
                <span class="tool-detail__info-label">Website:</span>
                <a
                  :href="getAffiliateLink(currentTool)"
                  class="tool-detail__info-value tool-detail__info-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  @click.prevent="visitWebsite"
                >
                  {{ getDomainFromUrl(currentTool.link) }}
                </a>
              </div>

              <div class="tool-detail__cta">
                <button class="btn btn-primary btn-block" @click="visitWebsite">
                  Visit Website
                </button>
              </div>
            </div>
          </div>
        </div>

        <div v-if="relatedTools.length > 0" class="tool-detail__related">
          <h2 class="tool-detail__section-title">Similar Tools</h2>

          <div class="tool-detail__related-grid">
            <ToolCard
              v-for="tool in relatedTools"
              :key="tool.id"
              :tool="tool"
              :category="toolCategory"
            />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useTools } from "~/composables/useTools";

// Get route and tools composable
const route = useRoute();
const toolId = computed(() => route.params.id as string);

const {
  fetchCurrentTool,
  currentTool,
  relatedTools,
  isLoadingTools,
  handleAffiliateClick,
  getAffiliateLink,
} = useTools();

// Local state
const isLoading = ref(true);
const toolCategory = ref("");

// Computed
const breadcrumbs = computed(() => {
  const items = [
    { text: "Home", to: "/" },
    { text: "Tools", to: "/categories" },
  ];

  if (currentTool.value && toolCategory.value) {
    items.push({
      text: toolCategory.value,
      to: `/categories/${formatCategorySlug(toolCategory.value)}`,
    });
  }

  if (currentTool.value) {
    items.push({
      text: currentTool.value.title,
      to: route.fullPath,
      active: true,
    });
  }

  return items;
});

// Methods
const loadToolData = async () => {
  isLoading.value = true;

  try {
    const tool = await fetchCurrentTool();

    if (tool) {
      // Find the tool's category
      const result = findToolCategory(tool.id);
      if (result) {
        toolCategory.value = result;
      }
    }
  } catch (error) {
    console.error("Error loading tool data:", error);
  } finally {
    isLoading.value = false;
  }
};

const findToolCategory = (toolId: string): string | null => {
  // This is a placeholder. In a real implementation,
  // you would have a way to determine the category.
  // For now, using a hardcoded value for demonstration.
  return "AI Tools";
};

const formatCategorySlug = (category: string): string => {
  return category.toLowerCase().replace(/\s+/g, "-");
};

const getDomainFromUrl = (url: string): string => {
  try {
    const domain = new URL(url).hostname.replace("www.", "");
    return domain;
  } catch (error) {
    return url;
  }
};

const visitWebsite = () => {
  if (currentTool.value) {
    handleAffiliateClick(currentTool.value, toolCategory.value);
  }
};

// Load data when page loads
onMounted(async () => {
  await loadToolData();
});

// Watch for route changes
watch(toolId, async (newId, oldId) => {
  if (newId !== oldId) {
    await loadToolData();
  }
});

// Set up page metadata
useHead(() => ({
  title: currentTool.value
    ? `${currentTool.value.title} - AI Tool Review & Features`
    : "Loading Tool Details",
  meta: [
    {
      name: "description",
      content: currentTool.value
        ? `Learn about ${currentTool.value.title} features, pricing, and how it can help your workflow. Comprehensive review and information.`
        : "Loading tool information",
    },
  ],
}));
</script>

<style lang="scss">
.tool-detail {
  padding: $spacing-xl 0;

  &__loading,
  &__error {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 300px;
    text-align: center;
  }

  &__header {
    margin-bottom: $spacing-xl;

    @include breakpoint(md) {
      @include flex-between;
    }
  }

  &__title {
    font-size: $font-size-3xl;
    margin-bottom: $spacing-md;

    @include breakpoint(md) {
      margin-bottom: 0;
      font-size: $font-size-4xl;
    }
  }

  &__content {
    display: grid;
    grid-template-columns: 1fr;
    gap: $spacing-xl;
    margin-bottom: $spacing-2xl;

    @include breakpoint(lg) {
      grid-template-columns: 3fr 1fr;
    }
  }

  &__section {
    margin-bottom: $spacing-xl;

    &:last-child {
      margin-bottom: 0;
    }
  }

  &__section-title {
    font-size: $font-size-xl;
    margin-bottom: $spacing-md;
    color: $heading-color;
    font-weight: $font-weight-semibold;
  }

  &__description {
    font-size: $font-size-base;
    line-height: 1.6;
    color: $text-color;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-xs;
  }

  &__tag {
    background-color: $tag-bg;
    color: $tag-color;
    font-size: $font-size-sm;
    padding: $spacing-xs $spacing-md;
    border-radius: $border-radius-full;
  }

  &__sidebar {
    @include breakpoint(md) {
      position: sticky;
      top: $spacing-xl;
    }
  }

  &__card {
    @include card($spacing-md, $border-radius);

    &:hover {
      transform: none;
    }
  }

  &__card-title {
    font-size: $font-size-lg;
    margin-bottom: $spacing-md;
    padding-bottom: $spacing-sm;
    border-bottom: 1px solid $border-color;
  }

  &__info-item {
    margin-bottom: $spacing-sm;

    &:last-child {
      margin-bottom: $spacing-md;
    }
  }

  &__info-label {
    display: block;
    font-weight: $font-weight-medium;
    font-size: $font-size-sm;
    color: $text-color-secondary;
    margin-bottom: $spacing-xs;
  }

  &__info-value {
    font-size: $font-size-base;
  }

  &__info-link {
    color: $primary-color;

    &:hover {
      text-decoration: underline;
    }
  }

  &__cta {
    margin-top: $spacing-md;
  }

  &__related {
    margin-top: $spacing-2xl;
  }

  &__related-grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: $spacing-lg;

    @include breakpoint(sm) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include breakpoint(lg) {
      grid-template-columns: repeat(4, 1fr);
    }
  }
}

.btn-block {
  width: 100%;
  display: block;
}
</style>

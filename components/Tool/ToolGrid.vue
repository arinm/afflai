<template>
  <div>
    <div v-if="isLoading" class="loading-container">
      <LoadingSpinner message="Loading tools..." />
    </div>

    <div v-else-if="error" class="error-container">
      <ErrorMessage :message="error" @retry="$emit('retry')" />
    </div>

    <div v-else-if="tools.length === 0" class="empty-container">
      <p class="empty-message">No tools found matching your criteria.</p>
      <button class="btn btn-outline" @click="$emit('clear-filters')">
        Clear Filters
      </button>
    </div>

    <div v-else class="tool-grid">
      <Tool-Card
        v-for="tool in paginatedTools"
        :key="tool.id"
        :tool="tool"
        :category="category"
      />
    </div>

    <div v-if="pagination && tools.length > 0 && totalPages > 1" class="pagination">
      <button
        class="pagination__button"
        :disabled="currentPage <= 1"
        @click="changePage(currentPage - 1)"
      >
        Previous
      </button>

      <span class="pagination__info">
        Page {{ currentPage }} of {{ totalPages }}
      </span>

      <button
        class="pagination__button"
        :disabled="currentPage >= totalPages"
        @click="changePage(currentPage + 1)"
      >
        Next
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tool } from "~/types";

const props = defineProps({
  tools: {
    type: Array as () => Tool[],
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  isLoading: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: null,
  },
  pagination: {
    type: Boolean,
    default: true,
  },
  itemsPerPage: {
    type: Number,
    default: 12,
  },
});

const emit = defineEmits(["retry", "clear-filters", "page-change"]);

// Pagination state
const currentPage = ref(1);
const totalPages = computed(() =>
  Math.ceil(props.tools.length / props.itemsPerPage)
);

// Paginated tools
const paginatedTools = computed(() => {
  const start = (currentPage.value - 1) * props.itemsPerPage;
  const end = start + props.itemsPerPage;
  return props.tools.slice(start, end);
});

// Methods
const changePage = (page: number) => {
  currentPage.value = page;
  emit("page-change", page);
  
  // Scroll to top of grid when page changes
  if (process.client) {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }
};

// Reset to page 1 when tools change
watch(
  () => props.tools,
  () => {
    currentPage.value = 1;
  }
);
</script>

<style lang="scss" scoped>
.tool-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: $spacing-lg;
  margin-bottom: $spacing-xl;
  
  @include breakpoint(sm) {
    grid-template-columns: repeat(2, 1fr);
  }
  
  @include breakpoint(lg) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @include breakpoint(xl) {
    grid-template-columns: repeat(4, 1fr);
  }
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

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: $spacing-xl;
  gap: $spacing-md;

  &__button {
    padding: $spacing-xs $spacing-md;
    background-color: transparent;
    color: $primary-color;
    border: 1px solid $primary-color;
    border-radius: $border-radius;
    font-weight: $font-weight-medium;
    cursor: pointer;
    transition: all $transition-normal;
    
    &:hover:not(:disabled) {
      background-color: $primary-color;
      color: white;
    }

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
  }

  &__info {
    font-size: $font-size-sm;
    color: $text-color-secondary;
  }
}
</style>

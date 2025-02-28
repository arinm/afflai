<template>
  <div>
    <div v-if="isLoading" class="loading-container">
      <div class="loading-spinner"></div>
      <p>Loading tools...</p>
    </div>

    <div v-else-if="error" class="error-container">
      <p class="error-message">{{ error }}</p>
      <button class="btn btn-primary" @click="retryLoading">Try Again</button>
    </div>

    <div v-else-if="tools.length === 0" class="empty-container">
      <p class="empty-message">No tools found matching your criteria.</p>
      <button class="btn btn-outline" @click="clearFilters">
        Clear Filters
      </button>
    </div>

    <div v-else class="tool-grid">
      <ToolCard
        v-for="tool in tools"
        :key="tool.id"
        :tool="tool"
        :category="category"
      />
    </div>

    <div v-if="pagination && tools.length > 0" class="pagination">
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
    type: Array as PropType<Tool[]>,
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
    default: false,
  },
  itemsPerPage: {
    type: Number,
    default: 12,
  },
});

const emit = defineEmits(["retry", "clearFilters", "pageChange"]);

// Pagination state
const currentPage = ref(1);
const totalPages = computed(() =>
  Math.ceil(props.tools.length / props.itemsPerPage)
);

// Methods
const retryLoading = () => {
  emit("retry");
};

const clearFilters = () => {
  emit("clearFilters");
};

const changePage = (page: number) => {
  currentPage.value = page;
  emit("pageChange", page);
};

// Reset to page 1 when tools change
watch(
  () => props.tools,
  () => {
    currentPage.value = 1;
  }
);
</script>

<style lang="scss">
.tool-grid {
  @include grid-responsive(1, 2, 3, 4, $spacing-lg);
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

.loading-spinner {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 3px solid rgba($primary-color, 0.3);
  border-radius: 50%;
  border-top-color: $primary-color;
  animation: spin 1s ease-in-out infinite;
  margin-bottom: $spacing-md;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.error-message {
  color: $error-color;
  margin-bottom: $spacing-md;
}

.empty-message {
  color: $text-color-secondary;
  margin-bottom: $spacing-md;
}

.pagination {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: $spacing-xl;
  gap: $spacing-md;

  &__button {
    @include button-base;
    @include button-outline($primary-color);

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;

      &:hover {
        background-color: transparent;
        color: $primary-color;
      }
    }
  }

  &__info {
    font-size: $font-size-sm;
    color: $text-color-secondary;
  }
}
</style>

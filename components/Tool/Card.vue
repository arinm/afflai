<template>
  <div class="tool-card">
    <div class="tool-card__content">
      <h3 class="tool-card__title">
        {{ tool.title }}
      </h3>

      <p class="tool-card__description">
        {{ truncatedDescription }}
      </p>

      <div class="tool-card__tags">
        <span v-for="tag in displayTags" :key="tag" class="tool-card__tag">
          {{ tag }}
        </span>
        <span
          v-if="tool.tags.length > maxTags"
          class="tool-card__tag tool-card__tag--more"
        >
          +{{ tool.tags.length - maxTags }}
        </span>
      </div>

      <div class="tool-card__pricing mb-3">
        <strong>Pricing:</strong> {{ tool.pricing }}
      </div>

      <div class="tool-card__actions">
        <button class="btn btn-primary btn-sm" @click="openAffiliateLink">
          Visit Website
        </button>

        <button class="btn btn-outline btn-sm" @click="navigateToDetails">
          View Details
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Tool } from "~/types";
import { useTools } from "~/composables/useTools";

const props = defineProps<{
  tool: Tool;
  category: string;
}>();

const { handleAffiliateClick, navigateToTool } = useTools();

// Constants
const maxDescriptionLength = 120;
const maxTags = 3;

// Computed properties
const truncatedDescription = computed(() => {
  if (props.tool.description.length <= maxDescriptionLength) {
    return props.tool.description;
  }
  return props.tool.description.substring(0, maxDescriptionLength) + "...";
});

const displayTags = computed(() => {
  return props.tool.tags.slice(0, maxTags);
});

// Methods
const openAffiliateLink = () => {
  handleAffiliateClick(props.tool, props.category);
};

const navigateToDetails = () => {
  navigateToTool(props.tool.id);
};
</script>

<style lang="scss">
.tool-card {
  @include card;
  display: flex;
  flex-direction: column;
  height: 100%;

  &__content {
    display: flex;
    flex-direction: column;
    height: 100%;
  }

  &__title {
    font-size: $font-size-xl;
    font-weight: $font-weight-semibold;
    margin-bottom: $spacing-sm;
    color: $heading-color;
  }

  &__description {
    font-size: $font-size-base;
    color: $text-color-secondary;
    margin-bottom: $spacing-md;
    flex-grow: 1;
    @include truncate(3);
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-xs;
    margin-bottom: $spacing-md;
  }

  &__tag {
    background-color: $tag-bg;
    color: $tag-color;
    font-size: $font-size-xs;
    padding: $spacing-xs $spacing-sm;
    border-radius: $border-radius-full;

    &--more {
      background-color: $border-color-dark;
    }
  }

  &__pricing {
    font-size: $font-size-sm;
    color: $text-color;
  }

  &__actions {
    display: flex;
    gap: $spacing-sm;
    margin-top: auto;

    @include breakpoint(sm) {
      flex-direction: row;
    }

    .btn {
      flex: 1;
    }
  }
}

.btn-sm {
  font-size: $font-size-sm;
  padding: $spacing-xs $spacing-md;
}
</style>

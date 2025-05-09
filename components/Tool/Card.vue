<template>
  <div class="tool-card" :class="{ 'tool-card--featured': tool.featured }">
    <div v-if="tool.featured" class="tool-card__badge">Featured</div>

    <div class="tool-card__content">
      <div class="tool-card__header">
        <div class="tool-card__logo" v-if="tool.logoUrl">
          <img :src="tool.logoUrl" :alt="`${tool.title} logo`" />
        </div>
        <h3 class="tool-card__title">{{ tool.title }}</h3>
      </div>

      <p class="tool-card__description">{{ truncatedDescription }}</p>

      <div class="tool-card__tags">
        <span
          v-for="tag in displayTags"
          :key="tag"
          class="tool-card__tag"
          :style="{ backgroundColor: getTagColor(tag) }"
        >
          {{ tag }}
        </span>
        <span
          v-if="tool.tags.length > maxTags"
          class="tool-card__tag tool-card__tag--more"
        >
          +{{ tool.tags.length - maxTags }}
        </span>
      </div>

      <div class="tool-card__footer">
        <!-- <div class="tool-card__pricing">
          <span class="tool-card__pricing-label">Pricing:</span>
          <span class="tool-card__pricing-value">{{ tool.pricing }}</span>
        </div> -->

        <div class="tool-card__actions">
          <button
            class="tool-card__button tool-card__button--primary"
            @click="openAffiliateLink"
          >
            <span class="tool-card__button-icon">↗</span>
            Visit Website
          </button>

          <button
            class="tool-card__button tool-card__button--secondary"
            @click="navigateToDetails"
          >
            Details
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";
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

// Tag colors mapping
const tagColors = {
  ai: "#8B5CF6",
  productivity: "#10B981",
  marketing: "#F59E0B",
  analytics: "#3B82F6",
  design: "#EC4899",
  free: "#059669",
  premium: "#8B5CF6",
  enterprise: "#1F2937",
  // Add more tag colors as needed
};

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

const getTagColor = (tag: string) => {
  const tagLower = tag.toLowerCase();
  return tagColors[tagLower] || "#6B7280"; // Default color if tag not found
};
</script>

<style lang="scss">
.tool-card {
  position: relative;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.06);
  transition: all 0.3s ease;
  overflow: hidden;
  height: 100%;
  border: 1px solid rgba(0, 0, 0, 0.05);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1),
      0 4px 6px -2px rgba(0, 0, 0, 0.05);
  }

  &--featured {
    border: 1px solid #8b5cf6;
    box-shadow: 0 4px 20px -5px rgba(139, 92, 246, 0.5);
  }

  &__badge {
    position: absolute;
    top: 12px;
    right: 12px;
    background-color: #8b5cf6;
    color: white;
    font-size: 12px;
    font-weight: 600;
    padding: 4px 8px;
    border-radius: 20px;
    z-index: 1;
  }

  &__content {
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 24px;
    gap: 16px;
  }

  &__header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 4px;
  }

  &__logo {
    width: 36px;
    height: 36px;
    border-radius: 8px;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f3f4f6;

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  &__title {
    font-size: 18px;
    font-weight: 700;
    color: #111827;
    margin: 0;
    line-height: 1.2;
  }

  &__description {
    font-size: 14px;
    line-height: 1.5;
    color: #4b5563;
    margin: 0;
    flex-grow: 1;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 3;
    overflow: hidden;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }

  &__tag {
    font-size: 12px;
    font-weight: 500;
    padding: 4px 10px;
    border-radius: 20px;
    color: white;
    backdrop-filter: brightness(1.1);

    &--more {
      background-color: #6b7280;
    }
  }

  &__footer {
    margin-top: auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }

  &__pricing {
    display: flex;
    align-items: center;
    gap: 4px;

    &-label {
      font-size: 13px;
      font-weight: 600;
      color: #6b7280;
    }

    &-value {
      font-size: 13px;
      color: #1f2937;
    }
  }

  &__actions {
    display: flex;
    gap: 8px;
  }

  &__button {
    border: none;
    border-radius: 8px;
    font-size: 14px;
    font-weight: 600;
    padding: 10px 16px;
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;

    &--primary {
      background-color: #4f46e5;
      color: white;
      flex: 1.5;

      &:hover {
        background-color: #4338ca;
      }
    }

    &--secondary {
      background-color: #f3f4f6;
      color: #4b5563;
      flex: 1;

      &:hover {
        background-color: #e5e7eb;
        color: #1f2937;
      }
    }

    &-icon {
      font-size: 12px;
    }
  }

  // Responsive adjustments
  @media (max-width: 640px) {
    &__actions {
      flex-direction: column;
    }

    &__button {
      width: 100%;
    }
  }
}
</style>

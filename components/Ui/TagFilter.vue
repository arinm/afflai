<template>
  <div class="tag-filter">
    <h3 class="tag-filter__title" v-if="title">{{ title }}</h3>
    <div class="tag-filter__tags">
      <button
        v-for="tag in tags"
        :key="tag"
        class="tag-filter__tag"
        :class="{ 'tag-filter__tag--active': isTagSelected(tag) }"
        @click="toggleTag(tag)"
      >
        {{ tag }}
        <span v-if="isTagSelected(tag)" class="tag-filter__tag-icon">✓</span>
      </button>
      <p v-if="tags.length === 0" class="tag-filter__empty">No tags available</p>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  tags: {
    type: Array as () => string[],
    default: () => [],
  },
  selectedTags: {
    type: Array as () => string[],
    default: () => [],
  },
  title: {
    type: String,
    default: 'Filter by Tags',
  },
});

const emit = defineEmits(['toggle']);

const isTagSelected = (tag: string) => {
  return props.selectedTags.includes(tag);
};

const toggleTag = (tag: string) => {
  emit('toggle', tag);
};
</script>

<style lang="scss" scoped>
.tag-filter {
  width: 100%;
  
  &__title {
    font-size: $font-size-base;
    font-weight: $font-weight-medium;
    margin-bottom: $spacing-sm;
    color: $heading-color;
  }
  
  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-xs;
  }
  
  &__tag {
    background-color: $bg-color-secondary;
    border: 1px solid $border-color;
    border-radius: $border-radius-sm;
    padding: $spacing-xs $spacing-sm;
    font-size: $font-size-sm;
    color: $text-color;
    cursor: pointer;
    transition: all $transition-normal;
    display: flex;
    align-items: center;
    gap: $spacing-xs;
    
    &:hover {
      background-color: rgba($primary-color, 0.05);
      border-color: rgba($primary-color, 0.2);
    }
    
    &--active {
      background-color: rgba($primary-color, 0.1);
      border-color: $primary-color;
      color: $primary-color;
      font-weight: $font-weight-medium;
    }
  }
  
  &__tag-icon {
    font-size: $font-size-xs;
  }
  
  &__empty {
    color: $text-color-secondary;
    font-size: $font-size-sm;
    font-style: italic;
  }
}
</style>

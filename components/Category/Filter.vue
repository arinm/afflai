<template>
  <div class="category-filter">
    <div class="category-filter__tabs">
      <button
        class="category-filter__tab"
        :class="{ 'category-filter__tab--active': selectedCategory === 'all' }"
        @click="selectCategory('all')"
      >
        All
      </button>
      <button
        v-for="category in categories"
        :key="category"
        class="category-filter__tab"
        :class="{ 'category-filter__tab--active': selectedCategory === category }"
        @click="selectCategory(category)"
      >
        {{ formatCategoryName(category) }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps({
  categories: {
    type: Array as () => string[],
    required: true
  },
  selectedCategory: {
    type: String,
    default: 'all'
  }
});

const emit = defineEmits(['select']);

const selectCategory = (category: string) => {
  emit('select', category);
};

const formatCategoryName = (slug: string) => {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
</script>

<style lang="scss" scoped>
.category-filter {
  margin-bottom: $spacing-xl;
  
  &__tabs {
    display: flex;
    flex-wrap: wrap;
    gap: $spacing-xs;
    border-bottom: 1px solid $border-color;
    padding-bottom: $spacing-sm;
  }
  
  &__tab {
    padding: $spacing-sm $spacing-md;
    background: transparent;
    border: none;
    border-radius: $border-radius $border-radius 0 0;
    font-size: $font-size-base;
    color: $text-color;
    cursor: pointer;
    transition: all $transition-normal;
    position: relative;
    
    &::after {
      content: '';
      position: absolute;
      bottom: -1px;
      left: 0;
      width: 100%;
      height: 2px;
      background-color: transparent;
      transition: background-color $transition-normal;
    }
    
    &:hover {
      color: $primary-color;
      
      &::after {
        background-color: rgba($primary-color, 0.3);
      }
    }
    
    &--active {
      color: $primary-color;
      font-weight: $font-weight-medium;
      
      &::after {
        background-color: $primary-color;
      }
    }
  }
}
</style>

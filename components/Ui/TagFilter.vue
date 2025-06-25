<template>
  <div class="tag-filter">
    <button
      v-for="tag in tags"
      :key="tag"
      type="button"
      class="tag-filter__tag"
      :class="{ 'tag-filter__tag--selected': selectedTags.includes(tag) }"
      @click="emitToggle(tag)"
    >
      {{ tag }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue';

const props = defineProps({
  tags: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
  selectedTags: {
    type: Array as PropType<string[]>,
    default: () => [],
  },
});

const emit = defineEmits(['toggle']);

function emitToggle(tag: string) {
  emit('toggle', tag);
}
</script>

<style lang="scss">
.tag-filter {
  display: flex;
  flex-wrap: wrap;
  gap: $spacing-xs;

  &__tag {
    background-color: $tag-bg;
    color: $tag-color;
    font-size: $font-size-xs;
    padding: $spacing-xs $spacing-sm;
    border-radius: $border-radius-full;
    border: none;
    cursor: pointer;
    transition: background-color $transition-fast;

    &--selected {
      background-color: $primary-color;
      color: white;
    }

    &:hover {
      background-color: darken($tag-bg, 5%);
    }
  }
}
</style>

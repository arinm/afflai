<template>
  <nav aria-label="Breadcrumb" class="breadcrumb-nav">
    <ol class="breadcrumb-list">
      <li v-for="(item, index) in items" :key="index" class="breadcrumb-item" :class="{ 'active': item.active }">
        <NuxtLink v-if="!item.active" :to="item.to" class="breadcrumb-link">
          {{ item.text }}
        </NuxtLink>
        <span v-else class="breadcrumb-text">{{ item.text }}</span>
        <span v-if="index < items.length - 1" class="breadcrumb-separator">/</span>
      </li>
    </ol>
  </nav>
</template>

<script setup lang="ts">
interface BreadcrumbItem {
  text: string;
  to: string;
  active?: boolean;
}

defineProps({
  items: {
    type: Array as () => BreadcrumbItem[],
    required: true
  }
});
</script>

<style lang="scss" scoped>
.breadcrumb-nav {
  margin-bottom: $spacing-md;
}

.breadcrumb-list {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  padding: 0;
  margin: 0;
}

.breadcrumb-item {
  font-size: $font-size-sm;
  color: $text-color-secondary;
  
  &.active {
    color: $primary-color;
    font-weight: $font-weight-medium;
  }
}

.breadcrumb-link {
  color: $text-color-secondary;
  text-decoration: none;
  transition: color $transition-normal;
  
  &:hover {
    color: $primary-color;
    text-decoration: underline;
  }
}

.breadcrumb-separator {
  margin: 0 $spacing-xs;
}
</style>

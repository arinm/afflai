<template>
  <section class="featured-section">
    <div class="container">
      <div class="section__header">
        <h2 class="section__title">Trending AI Tools</h2>
        <NuxtLink to="/categories" class="section__link">
          View All Tools
        </NuxtLink>
      </div>

      <div class="featured-section__grid">
        <div
          v-for="(tool, index) in featuredTools"
          :key="tool.id"
          class="featured-section__tool"
          :style="{ animationDelay: `${0.1 * index}s` }"
        >
          <ToolCard
            :tool="tool"
            :category="getCategoryNameById(tool.categoryId)"
          />
        </div>
      </div>
    </div>

    <div class="featured-section__shape featured-section__shape--1"></div>
    <div class="featured-section__shape featured-section__shape--2"></div>
  </section>
</template>

<script setup lang="ts">
const props = defineProps({
  featuredTools: {
    type: Array,
    required: true,
  },
  categories: {
    type: Array,
    required: true,
  },
});

const getCategoryNameById = (categoryId: string): string => {
  const category = props.categories.find((cat) => cat.id === categoryId);
  return category ? category.name : "General";
};
</script>

<style lang="scss">
.featured-section {
  position: relative;
  padding: $spacing-3xl 0;
  background-color: white;
  overflow: hidden;

  &__grid {
    display: grid;
    grid-template-columns: repeat(1, 1fr);
    gap: $spacing-lg;
    position: relative;
    z-index: 2;

    @include breakpoint(sm) {
      grid-template-columns: repeat(2, 1fr);
    }

    @include breakpoint(lg) {
      grid-template-columns: repeat(4, 1fr);
    }
  }

  &__tool {
    opacity: 0;
    animation: fadeInUp 0.8s cubic-bezier(0.4, 0, 0.2, 1) forwards;
  }

  // Decorative shapes
  &__shape {
    position: absolute;
    background-color: rgba($primary-color, 0.03);
    z-index: 1;
    border-radius: 50%;

    &--1 {
      width: 400px;
      height: 400px;
      top: -200px;
      right: -100px;
    }

    &--2 {
      width: 600px;
      height: 600px;
      bottom: -300px;
      left: -200px;
    }
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>

<template>
  <section class="categories-section">
    <div class="container">
      <div class="section__header">
        <h2 class="section__title">Explore Categories</h2>
        <p class="section__subtitle">
          Discover the perfect AI tools for your specific needs
        </p>
      </div>

      <div class="categories-section__grid">
        <div
          v-for="(category, index) in categories"
          :key="category.id"
          class="categories-section__category"
          :style="{ animationDelay: `${0.05 * index}s` }"
        >
          <CategoryCard :category="category" />
        </div>
      </div>

      <div class="categories-section__cta">
        <NuxtLink to="/categories" class="btn btn-gradient btn-lg">
          View All Categories
        </NuxtLink>
      </div>
    </div>

    <div class="categories-section__bg-shape"></div>
  </section>
</template>

<script setup lang="ts">
defineProps({
  categories: {
    type: Array,
    required: true,
  },
});
</script>

<style lang="scss">
.categories-section {
  position: relative;
  padding: $spacing-3xl 0;
  background-color: $bg-color-secondary;
  overflow: hidden;

  &__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: $spacing-md;
    margin-bottom: $spacing-2xl;
    position: relative;
    z-index: 2;

    @include breakpoint(md) {
      grid-template-columns: repeat(3, 1fr);
      gap: $spacing-lg;
    }

    @include breakpoint(lg) {
      grid-template-columns: repeat(6, 1fr);
    }
  }

  &__category {
    opacity: 0;
    transform: translateY(20px);
    animation: categoryAppear 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  }

  &__cta {
    text-align: center;
    margin-top: $spacing-2xl;
    position: relative;
    z-index: 2;
    opacity: 0;
    animation: fadeIn 0.8s ease 0.6s forwards;
  }

  // Background shape for visual interest
  &__bg-shape {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    background-image: url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%235465ff' fill-opacity='0.03' fill-rule='evenodd'/%3E%3C/svg%3E");
  }
}

@keyframes categoryAppear {
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

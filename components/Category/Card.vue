//
<template>
  //
  <NuxtLink :to="`/categories/${category.slug}`" class="category-card">
    //
    <div class="category-card__icon">
      // <component :is="category.icon" /> //
    </div>
    //
    <div class="category-card__content">
      //
      <h3 class="category-card__title">{{ category.name }}</h3>
      //
      <p class="category-card__description">{{ category.description }}</p>
      //
    </div>
    //
    <div class="category-card__count">{{ category.count }} tools</div>
    //
  </NuxtLink>
  //
</template>

//
<script setup lang="ts">
// defineProps({
//   category: {
//     type: Object,
//     required: true,
//   },
// });
//
</script>

//
<style lang="scss">
// .category-card {
//   position: relative;
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   background-color: white;
//   border-radius: $border-radius-lg;
//   padding: $spacing-lg;
//   text-decoration: none;
//   color: $text-color;
//   overflow: hidden;
//   isolation: isolate;

//   // Modern glass card effect
//   @include glass-effect(0.8, 5px);

//   // Card shadow and hover animation
//   box-shadow: $card-shadow;
//   transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
//     box-shadow 0.3s ease;

//   &:hover {
//     transform: translateY(-8px);
//     box-shadow: $card-shadow-hover;

//     .category-card__icon {
//       transform: scale(1.1) translateY(-5px);
//       color: $secondary-color;
//     }

//     .category-card__title {
//       color: $primary-color;
//     }

//     &::after {
//       transform: translateY(0);
//     }
//   }

//   // Bottom border animation
//   &::after {
//     content: "";
//     position: absolute;
//     bottom: 0;
//     left: 0;
//     width: 100%;
//     height: 4px;
//     background: $gradient-primary;
//     transform: translateY(4px);
//     transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
//     z-index: -1;
//   }

//   &__icon {
//     display: flex;
//     align-items: center;
//     justify-content: center;
//     width: 60px;
//     height: 60px;
//     background-color: rgba($primary-color, 0.1);
//     color: $primary-color;
//     border-radius: 20px;
//     margin-bottom: $spacing-md;
//     transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1),
//       color 0.3s ease;

//     svg {
//       width: 30px;
//       height: 30px;
//     }
//   }

//   &__content {
//     text-align: center;
//     margin-bottom: $spacing-md;
//   }

//   &__title {
//     font-size: $font-size-lg;
//     font-weight: $font-weight-semibold;
//     color: $heading-color;
//     margin-bottom: $spacing-xs;
//     transition: color 0.3s ease;
//   }

//   &__description {
//     font-size: $font-size-sm;
//     color: $text-color-secondary;
//     margin: 0;
//     @include truncate(2);

//     @include breakpoint(lg) {
//       display: none;
//     }

//     @include breakpoint(xl) {
//       display: block;
//     }
//   }

//   &__count {
//     font-size: $font-size-xs;
//     color: $text-color-secondary;
//     background-color: rgba($primary-color, 0.05);
//     padding: $spacing-xs $spacing-sm;
//     border-radius: $border-radius-full;
//     margin-top: auto;
//   }
// }
//
</style>

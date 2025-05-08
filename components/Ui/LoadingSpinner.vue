<template>
  <div class="loading-spinner">
    <div class="spinner"></div>
    <p v-if="message" class="loading-message">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  message: {
    type: String,
    default: 'Loading...'
  },
  size: {
    type: String,
    default: 'medium' // small, medium, large
  }
});
</script>

<style lang="scss" scoped>
.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $spacing-md;
  
  .spinner {
    width: 40px;
    height: 40px;
    border: 3px solid rgba($primary-color, 0.3);
    border-radius: 50%;
    border-top-color: $primary-color;
    animation: spin 1s ease-in-out infinite;
    margin-bottom: $spacing-sm;
  }
  
  .loading-message {
    color: $text-color-secondary;
    font-size: $font-size-sm;
    margin: 0;
  }
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

<template>
  <div class="error-message">
    <div class="error-icon">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="8" x2="12" y2="12"></line>
        <line x1="12" y1="16" x2="12.01" y2="16"></line>
      </svg>
    </div>
    <p class="error-text">{{ message || 'An error occurred. Please try again.' }}</p>
    <button v-if="showRetry" class="retry-button" @click="$emit('retry')">
      Try Again
    </button>
  </div>
</template>

<script setup lang="ts">
defineProps({
  message: {
    type: String,
    default: ''
  },
  showRetry: {
    type: Boolean,
    default: true
  }
});

defineEmits(['retry']);
</script>

<style lang="scss" scoped>
.error-message {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: $spacing-lg;
  background-color: rgba($error-color, 0.05);
  border-radius: $border-radius;
  border: 1px solid rgba($error-color, 0.2);
  
  .error-icon {
    color: $error-color;
    margin-bottom: $spacing-sm;
  }
  
  .error-text {
    color: $text-color;
    text-align: center;
    margin-bottom: $spacing-md;
  }
  
  .retry-button {
    padding: $spacing-xs $spacing-md;
    background-color: $primary-color;
    color: white;
    border: none;
    border-radius: $border-radius;
    font-weight: $font-weight-medium;
    cursor: pointer;
    transition: background-color $transition-normal;
    
    &:hover {
      background-color: darken($primary-color, 10%);
    }
  }
}
</style>

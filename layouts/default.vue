<template>
  <div class="site-layout">
    <Header />
    <main class="site-main">
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '~/components/Layout/Header.vue';
</script>

<style lang="scss" scoped>
.site-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.site-main {
  flex: 1;
}
</style>

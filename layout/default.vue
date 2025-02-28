<template>
  <div class="layout">
    <AppHeader />

    <main class="main">
      <slot />
    </main>

    <AppFooter />

    <!-- Schema.org JSON-LD is automatically injected by nuxt-schema-org -->
  </div>
</template>

<script setup>
// Any layout-wide logic can go here
</script>

<style lang="scss">
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.main {
  flex: 1;
}
</style>

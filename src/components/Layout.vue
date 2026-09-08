<template>
  <Header />
  <div class="layout">
    <main class="main">
      <slot />
    </main>
  </div>
</template>

<script setup>
import Header from './Header.vue'
</script>

<style scoped>
.layout {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
}

.main {
  min-height: calc(100vh - 100px);
}
</style>

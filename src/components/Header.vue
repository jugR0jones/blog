<template>
  <header class="header">
    <nav class="nav">
      <ul class="nav-list">
        <li class="nav-item"><a href="/">Home</a></li>
        <li class="nav-item"><a href="/posts">Posts</a></li>
        <li class="nav-item"><a href="/projects">Projects</a></li>
        <li class="nav-item"><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
// Header remains permanently visible; no scroll behavior needed
</script>

<style scoped>
.header {
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  background-color: #ffffff;
  z-index: 100;
  width: 100%;
}

.nav-list {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-item a {
  color: #1a1a1a;
  text-decoration: none;
}

.nav-item a:hover {
  text-decoration: underline;
}
</style>

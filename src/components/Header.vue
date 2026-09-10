<template>
  <header class="header">
    <nav class="nav">
      <ul class="nav-list">
        <li class="nav-item"><router-link to="/">Home</router-link></li>
        <li class="nav-item"><router-link to="/posts">Posts</router-link></li>
        <li class="nav-item"><router-link to="/projects">Projects</router-link></li>
        <li class="nav-item"><router-link to="/about">About</router-link></li>
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
  flex-wrap: wrap;
}

@media (max-width: 768px) {
  .nav-list {
    gap: 1rem;
    padding: 0 0.5rem;
  }
  
  .nav-item a {
    font-size: 0.9rem;
  }
}

.nav-item a {
  color: #1a1a1a;
  text-decoration: none;
}

.nav-item a:hover {
  text-decoration: underline;
}
</style>

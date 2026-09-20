<template>
  <Header />
  <div class="layout">
    <div class="layout-sidebar">
      <nav class="sidebar-nav">
        <ul class="sidebar-nav-list">
          <li class="sidebar-nav-item"><router-link to="/">Home</router-link></li>
          <li class="sidebar-nav-item"><router-link to="/posts">Posts</router-link></li>
          <li class="sidebar-nav-item"><router-link to="/projects">Projects</router-link></li>
          <li class="sidebar-nav-item"><router-link to="/about">About</router-link></li>
        </ul>
      </nav>
    </div>
    <div class="layout-content">
      <slot />
    </div>
  </div>
</template>

<script setup>
import Header from './Header.vue'
</script>

<style scoped>
.layout {
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 1rem;
}

.layout-sidebar {
  position: sticky;
  top: 84px;
  height: fit-content;
}

.sidebar-nav-list {
  list-style: none;
  margin: 0;
  padding: 0;
}

.sidebar-nav-item {
  margin-bottom: 0.5rem;
}

.sidebar-nav-item a {
  color: #1a1a1a;
  text-decoration: none;
  display: block;
  padding: 0.5rem;
  border-radius: 4px;
}

.sidebar-nav-item a:hover {
  background-color: #f4f4f4;
  text-decoration: none;
}

.sidebar-nav-item a.router-link-active {
  background-color: #e0e0e0;
  font-weight: 600;
}

.layout-content {
  min-width: 0;
}

@media (max-width: 768px) {
  .layout {
    grid-template-columns: 1fr;
    padding: 0.5rem;
  }
  
  .layout-sidebar {
    position: static;
  }
  
  .sidebar-nav-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
  
  .sidebar-nav-item {
    margin-bottom: 0;
  }
}
</style>

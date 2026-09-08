/* Updated Header.vue with properly spaced navigation items */
<template>
  <header class=\
header\>
    <nav class=\
nav\>
      <ul class=\
nav-list\>
        <li class=\
nav-item\><a href=\/\>Home</a></li>
        <li class=\
nav-item\><a href=\/archive\>Archive</a></li>
        <li class=\
nav-item\><a href=\/about\>About</a></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isSticky = ref(false)
let lastScrollY = 0

const handleScroll = () => {
  const currentScrollY = window.scrollY
  
  // Only update the sticky state when scrolling down or up
  if (currentScrollY > lastScrollY && currentScrollY > 100) {
    // Scrolling down - hide header
    isSticky.value = true
  } else if (currentScrollY < lastScrollY) {
    // Scrolling up - show header
    isSticky.value = false
  }

  lastScrollY = currentScrollY
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.header {
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  background-color: #ffffff;
  z-index: 100;
  transition: transform 0.3s ease;
  width: 100%;
}

.header.sticky {
  transform: translateY(-100%);
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  justify-content: space-between;
  width: 100%;
  align-items: center;
}

.nav-item a {
  color: #1a1a1a;
  text-decoration: none;
}

.nav-item a:hover {
  text-decoration: underline;
}
</style>

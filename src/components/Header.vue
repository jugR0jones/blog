<template>
  <header class=\
header\>
    <nav class=\nav\>
      <ul class=\nav-list\>
        <li class=\nav-item\><a href=\/\>Home</a></li>
        <li class=\nav-item\><a href=\/archive\>Archive</a></li>
        <li class=\nav-item\><a href=\/about\>About</a></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
</script>

<style scoped>
.header {
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
}

.nav-list {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  gap: 1rem;
}

.nav-item a {
  color: #1a1a1a;
  text-decoration: none;
}

.nav-item a:hover {
  text-decoration: underline;
}
</style>

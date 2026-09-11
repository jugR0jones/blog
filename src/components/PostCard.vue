<template>
  <article class="post-card">
    <h2 class="post-title"><router-link :to="'/posts/' + post.slug">{{ post.title }}</router-link></h2>
    <p class="post-date">{{ formatDate(post.date) }}</p>
    <p class="post-excerpt">{{ post.excerpt || post.summary }}</p>
  </article>
</template>

<script setup>
import { RouterLink } from 'vue-router'
defineProps({
  post: {
    type: Object,
    required: true
  }
})

const formatDate = (dateString) => {
  const options = { year: 'numeric', month: 'long', day: 'numeric' }
  return new Date(dateString).toLocaleDateString(undefined, options)
}
</script>

<style scoped>
.post-card {
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
}

.post-title {
  margin: 0 0 0.5rem 0;
}

.post-title a {
  color: #1a1a1a;
  text-decoration: none;
}

.post-title a:hover {
  text-decoration: underline;
}

.post-date {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
}

.post-excerpt {
  margin: 0;
}
</style>

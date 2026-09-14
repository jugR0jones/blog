<template>
  <article class="project-card">
    <h2 class="project-title">
      <router-link :to="'/projects/' + project.slug">{{ project.name }}</router-link>
    </h2>
    <p class="project-date">{{ formatDate(project.date) }}</p>
    <p class="project-excerpt">{{ project.summary }}</p>
  </article>
</template>

<script setup>
import { RouterLink } from 'vue-router'

defineProps({
  project: {
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
.project-card {
  border-bottom: 1px solid #eee;
  padding: 1rem 0;
}

.project-title {
  margin: 0 0 0.5rem 0;
}

.project-title a {
  color: #1a1a1a;
  text-decoration: none;
}

.project-title a:hover {
  text-decoration: underline;
}

.project-date {
  color: #666;
  font-size: 0.9rem;
  margin: 0 0 0.5rem 0;
}

.project-excerpt {
  margin: 0;
}
</style>

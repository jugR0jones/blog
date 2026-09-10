<template>
  <div class="home">
    <h1>My Blog</h1>
    <p>Welcome to my personal blog where I share my thoughts and experiences.</p>

    <section class="recent-posts">
      <h2>Recent Posts</h2>
      <article v-for="post in recentPosts" :key="post.slug" class="post-summary">
        <h3><router-link :to="'/posts/' + post.slug">{{ post.title }}</router-link></h3>
        <p>{{ post.summary }}</p>
        <p class="meta">Published {{ formatDate(post.date) }}</p>
      </article>
      <p v-if="recentPosts.length === 0">No posts available.</p>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([])

onMounted(async () => {
  const modules = import.meta.glob('/src/content/posts/*.md', { as: 'raw' })
  const entries = await Promise.all(
    Object.entries(modules).map(async ([path, loader]) => {
      const raw = await loader()
      const { data } = parseFrontmatter(raw)
      return { ...data, path }
    })
  )
  const valid = entries.filter(p => p.title && p.slug && p.date && p.summary)
  valid.sort((a, b) => new Date(b.date) - new Date(a.date))
  posts.value = valid.slice(0, 5)
})

function parseFrontmatter(raw) {
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!fmMatch) return { data: {}, content: '' }
  const fm = fmMatch[1]
  const content = fmMatch[2]
  const data = {}
  fm.split(/\r?\n/).forEach(line => {
    const [key, ...rest] = line.split(':')
    if (key) {
      let val = rest.join(':').trim()
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1)
      }
      data[key.trim()] = val
    }
  })
  return { data, content }
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString()
}

const recentPosts = posts
</script>

<style scoped>
.recent-posts {
  margin-top: 2rem;
}
.post-summary {
  margin-bottom: 1.5rem;
}
.post-summary h3 {
  margin-bottom: 0.25rem;
}
.meta {
  color: #666;
  font-size: 0.85rem;
}
</style>

<template>
  <article class="post-detail">
    <h1>{{ post?.title }}</h1>
    <p class="meta">Published {{ formattedDate }}</p>
    <div v-if="post" v-html="renderedContent"></div>
    <p v-else>Post not found.</p>
  </article>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const slug = computed(() => route.params.slug)
const post = ref(null)
const renderedContent = ref('')

onMounted(async () => {
  const modules = import.meta.glob('/src/content/posts/*.md', { as: 'raw' })
  const paths = Object.keys(modules)
  const targetPath = paths.find(p => p.includes(slug.value))
  if (targetPath) {
    const raw = await modules[targetPath]()
    const { data, content } = parseFrontmatter(raw)
    post.value = { ...data, slug: data.slug }
    renderedContent.value = content
  }
})

function parseFrontmatter(raw) {
  const fmMatch = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/)
  if (!fmMatch) return { data: {}, content: raw }
  const fm = fmMatch[1]
  const content = fmMatch[2]
  const data = {}
  fm.split(/\r?\n/).forEach(line => {
    const [key, ...rest] = line.split(':')
    if (key) data[key.trim()] = rest.join(':').trim()
  })
  return { data, content }
}

const formattedDate = computed(() => {
  if (!post.value?.date) return ''
  return new Date(post.value.date).toLocaleDateString()
})
</script>

<style scoped>
.post-detail {
  max-width: 800px;
}
.meta {
  color: #666;
  font-size: 0.9rem;
}
</style>

<template>
  <article class="project-detail">
    <h1>{{ project?.name }}</h1>
    <p class="meta">Published {{ formattedDate }}</p>
    <p v-if="project?.summary" class="summary">{{ project.summary }}</p>
    <div v-if="project?.github" class="github-link">
      <a :href="project.github" target="_blank" rel="noopener">View on GitHub</a>
    </div>
    <div v-if="project" v-html="renderedContent"></div>
    <p v-else>Project not found.</p>
  </article>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { marked } from 'marked'

const route = useRoute()
const slug = computed(() => route.params.slug)
const project = ref(null)
const renderedContent = ref('')

onMounted(async () => {
  const modules = import.meta.glob('/src/content/projects/*.md', { query: '?raw' })
  const paths = Object.keys(modules)
  const targetPath = paths.find(p => p.includes(slug.value))
  if (targetPath) {
    const mod = await modules[targetPath]()
    const raw = mod.default || mod
    const { data, content } = parseFrontmatter(raw)
    project.value = { ...data, slug: data.slug }
    renderedContent.value = marked.parse(content)
    document.title = `${data.name} | Projects`
    let canonical = document.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', location.origin + '/#/projects/' + data.slug)
    let ogTitle = document.querySelector('meta[property="og:title"]')
    if (!ogTitle) {
      ogTitle = document.createElement('meta')
      ogTitle.setAttribute('property', 'og:title')
      document.head.appendChild(ogTitle)
    }
    ogTitle.setAttribute('content', data.name)
    let ogDesc = document.querySelector('meta[property="og:description"]')
    if (!ogDesc) {
      ogDesc = document.createElement('meta')
      ogDesc.setAttribute('property', 'og:description')
      document.head.appendChild(ogDesc)
    }
    ogDesc.setAttribute('content', data.summary)
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
  if (!project.value?.date) return ''
  return new Date(project.value.date).toLocaleDateString()
})
</script>

<style scoped>
.project-detail {
  max-width: 800px;
}
.summary {
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 4px;
  margin: 0.75rem 0 1rem;
}
.meta {
  color: #666;
  font-size: 0.9rem;
}
.github-link {
  margin: 1rem 0;
}
.github-link a {
  color: #1a1a1a;
  text-decoration: none;
}
.github-link a:hover {
  text-decoration: underline;
}
</style>

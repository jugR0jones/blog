<template>
  <div class="projects">
    <h1>Projects</h1>
    
    <section class="all-projects">
      <ProjectCard v-for="project in projects" :key="project.slug" :project="project" />
      <p v-if="projects.length === 0">No projects available.</p>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProjectCard from '../components/ProjectCard.vue'

const projects = ref([])

onMounted(async () => {
  const modules = import.meta.glob('/src/content/projects/*.md', { query: '?raw' })
  const entries = await Promise.all(
    Object.entries(modules).map(async ([path, loader]) => {
      const mod = await loader()
      const raw = mod.default || mod
      const { data } = parseFrontmatter(raw)
      return { ...data, path }
    })
  )
  const valid = entries.filter(p => p.name && p.slug && p.date && p.summary && p.github)
  valid.sort((a, b) => new Date(b.date) - new Date(a.date))
  projects.value = valid
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
</script>

<style scoped>
.all-projects {
  margin-top: 2rem;
}
</style>

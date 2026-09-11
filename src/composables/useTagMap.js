import { ref, computed } from 'vue'

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

export function useTagMap() {
  const posts = ref([])

  const modules = import.meta.glob('/src/content/posts/*.md', { query: '?raw', eager: true })
  const entries = Object.entries(modules).map(([path, mod]) => {
    const raw = mod.default || mod
    const { data } = parseFrontmatter(raw)
    return { ...data, path }
  }).filter(p => p.title && p.slug && p.date && p.summary && p.tags)

  posts.value = entries.sort((a, b) => new Date(b.date) - new Date(a.date))

  const tagMap = computed(() => {
    const map = new Map()
    posts.value.forEach(post => {
      const tags = post.tags.split(',').map(t => t.trim().toLowerCase())
      tags.forEach(tag => {
        if (!map.has(tag)) map.set(tag, [])
        map.get(tag).push(post)
      })
    })
    return map
  })

  const allTags = computed(() => Array.from(tagMap.value.keys()).sort())

  return { posts, tagMap, allTags }
}

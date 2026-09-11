<template>
  <div class="tags">
    <h1>Tags</h1>
    <ul class="tag-list">
      <li v-for="tag in allTags" :key="tag">
        <router-link :to="'/tags/' + tag">{{ tag }}</router-link>
        <span class="count">({{ tagMap.get(tag)?.length || 0 }})</span>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useTagMap } from '../composables/useTagMap.js'

const { allTags, tagMap } = useTagMap()
</script>

<style scoped>
.tag-list {
  list-style: none;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
.tag-list li {
  background: #f0f0f0;
  padding: 0.5rem 1rem;
  border-radius: 4px;
}
.count {
  color: #666;
  font-size: 0.85rem;
}
</style>

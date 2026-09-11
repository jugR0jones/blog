<template>
  <div class="tag-detail">
    <h1>Posts tagged “{{ tag }}”</h1>
    <p class="meta">{{ posts.length }} post{{ posts.length !== 1 ? 's' : '' }}</p>
    <div class="posts-grid">
      <PostCard v-for="post in posts" :key="post.slug" :post="post" />
    </div>
    <p v-if="posts.length === 0">No posts found for this tag.</p>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import PostCard from '../components/PostCard.vue'
import { useTagMap } from '../composables/useTagMap.js'

const route = useRoute()
const tag = computed(() => route.params.tag?.toLowerCase() || '')

const { tagMap } = useTagMap()
const posts = computed(() => tagMap.value.get(tag.value) || [])
</script>

<style scoped>
.tag-detail h1 {
  margin-bottom: 0.5rem;
}
.meta {
  color: #666;
  margin-bottom: 1.5rem;
}
.posts-grid {
  display: grid;
  gap: 1.5rem;
}
</style>

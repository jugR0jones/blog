import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import App from './App.vue'

// Import pages
import Home from './pages/Home.vue'
import About from './pages/About.vue'
import Posts from './pages/Posts.vue'
import Projects from './pages/Projects.vue'
import PostDetail from './pages/PostDetail.vue'
import Tags from './pages/Tags.vue'
import TagDetail from './pages/TagDetail.vue'

// Define routes
const routes = [
  { path: '/', component: Home },
  { path: '/posts', component: Posts },
  { path: '/posts/:slug', component: PostDetail },
  { path: '/tags', component: Tags },
  { path: '/tags/:tag', component: TagDetail },
  { path: '/projects', component: Projects },
  { path: '/about', component: About }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

const app = createApp(App)
app.use(router)
app.mount('#app')

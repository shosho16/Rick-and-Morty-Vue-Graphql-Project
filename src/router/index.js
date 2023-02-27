import { createRouter, createWebHashHistory } from 'vue-router'
import CharacterList from '../components/CharacterList.vue'
import CharacterPage from '../components/CharacterPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: CharacterList,
    props: true
  },
  {
    path: '/charactepage/:name/:status/:species/:gender',
    name: 'charactepage',
    component: CharacterPage,
    props: true,
    meta: {
      auth: true
  }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

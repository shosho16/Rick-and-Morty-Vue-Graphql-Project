import { createRouter, createWebHashHistory } from 'vue-router'
import HelloWorld from '../components/HelloWorld.vue'
import CharacterPage from '../components/CharacterPage.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: HelloWorld,
    props: true
  },
  {
    path: '/about/:name/:status/:species/:gender',
    name: 'about',
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

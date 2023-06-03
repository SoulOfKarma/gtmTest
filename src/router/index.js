import { createRouter, createWebHistory } from 'vue-router'
import MainMascotas from '../views/MainMascotas.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'main',
      component: MainMascotas
    },
  ]
})

export default router

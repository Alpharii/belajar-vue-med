import { createRouter, createWebHistory } from 'vue-router'
import { LayoutType } from './layouts'
import authenticate from './middleware/authenticate'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('@/pages/login/index.vue'),
    },
    {
      path: '/',
      name: '',
      component: () => import('@/pages/login/index.vue'),
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('@/pages/home/index.vue'),
      meta: {
        layout: LayoutType.ProtectedLayout,
      },
    },
    {
      path: '/profile',
      name: 'profile',
      component: () => import('@/pages/profile/index.vue'),
      meta: {
        layout: LayoutType.ProtectedLayout,
      },
    },
    {
      path: '/doctor',
      name: 'doctor',
      component: () => import('@/pages/dokter/index.vue'),
      meta: {
        layout: LayoutType.ProtectedLayout,
      },
    },
  ],
})

// register authenticate middleware
router.beforeEach(authenticate)

export default router

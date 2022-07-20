import {
  createRouter,
  createWebHashHistory,
  RouteRecordRaw
} from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/home/index.vue')
  },
  {
    path: '/user',
    name: 'User',
    component: () => import('@/views/user/index.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/login',
    name: 'login',
    meta: {layout: 'auth'},
    component: () => import('../views/Login.vue')
  },
  {
    path: '/registration',
    name: 'registration',
    meta: {layout: 'auth'},
    component: () => import('../views/Registration.vue')
  },
  {
    path: '/',
    name: 'home',
    meta: {layout: 'main'},
    component: () => import('../views/Home.vue')
  },
  {
    path: '/category',
    name: 'category',
    meta: {layout: 'main'},
    component: () => import('../views/Category.vue')
  },
  {
    path: '/new',
    name: 'new',
    meta: {layout: 'main'},
    component: () => import('../views/NewEntry.vue')
  },
  {
    path: '/planing',
    name: 'planing',
    meta: {layout: 'main'},
    component: () => import('../views/Planing.vue')
  },
  {
    path: '/history',
    name: 'history',
    meta: {layout: 'main'},
    component: () => import('../views/History.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
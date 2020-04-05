import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/pages/home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/create-task',
    name: 'create-task',
    component: () => import('@/pages/create-task.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/pages/login.vue')
  },
  {
    path: '/registration',
    name: 'Registration',
    component: () => import('@/pages/registration.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

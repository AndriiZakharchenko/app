import Vue from 'vue'
import VueRouter from 'vue-router'
// import store from '../store'

import Home from '@/pages/home.vue'

Vue.use(VueRouter);

const UserProfile = { render(h) {return h('div', 'Profile')}};
const UserPosts = { render(h) {return h('div', 'User')}};

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/create-task',
    name: 'create-task',
    component: () => import('@/pages/create-task.vue'),
  },
  {
    path: '/vuex',
    name: 'vuex',
    component: () => import('@/pages/vuex.vue'),
  },
  {
    path: '/vuerouter',
    name: 'vuerouter',
    component: () => import('@/pages/vuerouter.vue'),
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: UserProfile
      },
      {
        path: 'posts',
        name: 'posts',
        component: UserPosts
      },
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login.vue')
  },
  {
    path: '/registration',
    name: 'registration',
    component: () => import('@/pages/registration.vue'),
  },
  {
    path: '*',
    name: '404',
    component: () => import('@/pages/404.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

// router.beforeEach((to, from, next) => {
//   if (to.name !== 'login' && !store.getters['user/checkUser']) {
//     next({ name: 'login' });
//   } else next()
// });

export default router

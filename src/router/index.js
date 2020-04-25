import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'

import Home from '@/pages/home.vue'

Vue.use(VueRouter);

const UserProfile = { render(h) {return h('div', 'Profile')}};
const UserPosts = { render(h) {return h('div', 'User')}};

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: { requiresAuth: true },
  },
  {
    path: '/create-task',
    name: 'create-task',
    component: () => import('@/pages/create-task.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/vuex',
    name: 'vuex',
    component: () => import('@/pages/vuex.vue'),
    meta: { requiresAuth: true },
  },
  {
    path: '/vuerouter',
    name: 'vuerouter',
    component: () => import('@/pages/vuerouter.vue'),
    meta: { requiresAuth: true },
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
    name: 'error',
    component: () => import('@/pages/error.vue'),
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const currentUser = store.getters['user/checkUser'];
  const requiresAuth = to.matched[0].meta.requiresAuth;

  if (requiresAuth && !currentUser) next({name: 'login'});
  else if (!requiresAuth && currentUser) next(from.name);
  else next();
});

export default router;

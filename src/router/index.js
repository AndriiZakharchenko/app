import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '../store';

import Home from '@/pages/home.vue';

Vue.use(VueRouter);

const UserProfile = { render(h) {return h('div', 'Profile');}};
const UserPosts = { render(h) {return h('div', 'User');}};

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      requiresAuth: true,
      guest : false,
    },
  },
  {
    path: '/create-task',
    name: 'create-task',
    component: () => import('@/pages/create-task.vue'),
    meta: {
      requiresAuth: true,
      guest : false,
    },
  },
  {
    path: '/vee-validate',
    name: 'vee-validate',
    component: () => import('@/pages/vee-validate.vue'),
    meta: {
      requiresAuth: true,
      guest : false,
    },
  },
  {
    path: '/vuex',
    name: 'vuex',
    component: () => import('@/pages/vuex.vue'),
    meta: {
      requiresAuth: true,
      guest : false,
    },
  },
  {
    path: '/vuerouter',
    name: 'vuerouter',
    component: () => import('@/pages/vuerouter.vue'),
    meta: {
      requiresAuth: true,
      guest : false,
    },
    children: [
      {
        path: 'profile',
        name: 'profile',
        component: UserProfile,
        meta: {
          requiresAuth: true,
          guest : false,
        },
      },
      {
        path: 'posts',
        name: 'posts',
        component: UserPosts,
        meta: {
          requiresAuth: true,
          guest : false,
        },
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login.vue'),
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
  routes,
});

router.beforeEach((to, from, next) => {
  const isAuthenticated = store.getters['user/isAuthenticated'];
  const requiresAuth = to.meta.requiresAuth;

  if (requiresAuth) {
    if (isAuthenticated) {
      next();
      return;
    }
    next({name: 'login'});
  } else {
    if (isAuthenticated && typeof(to.meta.guest) !== 'undefined') {
      next({name: 'home'});
      return;
    }
    next();
  }
});

export default router;

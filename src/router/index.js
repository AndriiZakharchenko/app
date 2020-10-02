import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import Home from '@/pages/home.vue';

Vue.use(VueRouter);

const ROUTER_PROFILE = { render(h) {return h('div', 'Profile');}};
const ROTER_USER = { render(h) {return h('div', 'User');}};

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/add-film',
    name: 'add-film',
    component: () => import('@/pages/add-film.vue'),
  },
  {
    path: '/posts',
    name: 'posts',
    component: () => import('@/pages/posts.vue'),
  },
  {
    path: '/vee-validate',
    name: 'vee-validate',
    component: () => import('@/pages/vee-validate.vue'),
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
        component: ROUTER_PROFILE,
      },
      {
        path: 'user',
        name: 'user',
        component: ROTER_USER,
      },
    ],
  },
  {
    path: '/table-info',
    name: 'table-info',
    component: () => import('@/pages/table-info.vue'),
  },
  {
    path: '/giphy',
    name: 'giphy',
    component: () => import('@/pages/giphy.vue'),
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/pages/login.vue'),
    meta: {
      authPage: true,
    },
  },
  {
    path: '/sign-up',
    name: 'sign-up',
    component: () => import('@/pages/sign-up.vue'),
    meta: {
      authPage: true,
    },
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
  const IS_AUTHENTICATED = store.getters['user/IS_AUTHENTICATED'];
  const authPage = to.meta.authPage;

  if (IS_AUTHENTICATED) {
    if (authPage) {
      next({name: 'home', query: {message: 'You are logged'}});
      return;
    }
    next();
  } else {
    if (authPage) {
      next();
      return;
    }
    next({name: 'login'});
  }
});

export default router;

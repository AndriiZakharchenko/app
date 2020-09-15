import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

import Home from '@/pages/home.vue';

Vue.use(VueRouter);

const UserProfile = { render(h) {return h('div', 'Profile');}};
const UserPosts = { render(h) {return h('div', 'User');}};

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
    path: '/database',
    name: 'database',
    component: () => import('@/pages/database.vue'),
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
        component: UserProfile,
      },
      {
        path: 'posts',
        name: 'posts',
        component: UserPosts,
      },
    ],
  },
  {
    path: '/table-info',
    name: 'table-info',
    component: () => import('@/pages/table-info.vue'),
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
    path: '/registration',
    name: 'registration',
    component: () => import('@/pages/registration.vue'),
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

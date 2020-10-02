import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from 'firebase/app';
import axios from 'axios';
Vue.prototype.$http = axios;

import '@/plugins';
import '@/assets/main.scss';

Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch('user/LOGGED_USER', user)
      .then(() => {})
      .catch((error) => {
        console.error(error);
      });
  }

  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
});


import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import firebase from 'firebase/app';

import './plugins';
import '../src/assets/main.scss';

Vue.config.productionTip = false;

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    store.dispatch('user/loggedUser', user);
  }

  new Vue({
    router,
    store,
    render: h => h(App),
  }).$mount('#app');
});


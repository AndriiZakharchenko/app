import Vue from 'vue'
import App from './App.vue'
import Vuelidate from 'vuelidate'
import router from './router'
import store from './store'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/messaging'
import 'firebase/storage'

import VueMaterial from 'vue-material'
import 'vue-material/dist/vue-material.min.css'
import '../src/assets/main.scss'

Vue.use(VueMaterial);
Vue.use(Vuelidate);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    const firebaseConfig = {
      apiKey: "AIzaSyDElO0vaF7RrBDyN8aJlCYZrkSeATnCf3A",
      authDomain: "film-library-92d9c.firebaseapp.com",
      databaseURL: "https://film-library-92d9c.firebaseio.com",
      projectId: "film-library-92d9c",
      storageBucket: "film-library-92d9c.appspot.com",
      messagingSenderId: "711120086311",
      appId: "1:711120086311:web:25e93287e1b35404437502"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('loggedUser', user);
      }
    })
  }
}).$mount('#app')

<template>
  <div id="app">
    <br>
    <b>Authorized: {{ checkUser }}</b>
    <!--    <b>{{ $store.getters['user/checkUser'] }}</b>-->
    <div id="nav">
      <router-link
        v-for="(link, i) in navLinks"
        :key="i"
        :to="{ name: `${link.to}` }"
      >{{ link.name }}</router-link>
      <a
        v-if="checkUser"
        @click="logout"
      >Log out</a>
    </div>
    <transition name="fade" mode="out-in">
      <router-view />
    </transition>
  </div>
</template>

<script>
  // @ is an alias to /src
  import { mapGetters } from 'vuex';

  export default {
    computed: {
      ...mapGetters({
        checkUser: 'user/checkUser',
      }),
      navLinks() {
        if (this.checkUser) {
          return [
            {
              to: 'home',
              name: 'Home',
            },
            {
              to: 'create-task',
              name: 'Create task',
            },
            {
              to: 'vuerouter',
              name: 'Vuerouter',
            },
            {
              to: 'vuex',
              name: 'Vuex & Axios',
            },
          ]
        } else {
          return [
            {
              to: 'login',
              name: 'Login',
            },
            {
              to: 'registration',
              name: 'Registration',
            },
          ]
        }
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('user/logoutUser');
        console.info('Logout');
        this.$router.push({name: 'login'});
      }
    }
  }
</script>

<template>
  <div id="app">
    <p>Authorized: {{ checkUser }}</p>
    <div id="nav">
      <router-link
        v-for="(link, i) in navLinks"
        :key="i"
        :to="{name: `${link.name}`}"
      >
        {{ link.to }}
      </router-link>
      <a
        v-if="checkUser"
         @click="logout"
      >Log out</a>
    </div>
    <transition name="fade" mode="out-in">
      <router-view/>
    </transition>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  export default {
    computed: {
      ...mapGetters([
        'checkUser'
      ]),
      navLinks() {
        if (this.checkUser) {
          return [
            {
              name: 'home',
              to: 'Home',
            },
            {
              name: 'create-task',
              to: 'Create task',
            },
            {
              name: 'vuex',
              to: ' Vuex',
            },
            {
              name: 'vuerouter',
              to: ' Vuerouter',
            },
          ]
        } else {
          return [
            {
              name: 'login',
              to: 'Login',
            },
            {
              name: 'registration',
              to: 'Registration',
            },
          ]
        }
      }
    },
    methods: {
      logout() {
        this.$store.dispatch('logoutUser');
        this.$router.push({name: 'login'});
      }
    }
  }
</script>

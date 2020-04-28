<template>
  <div id="app">
    <br/>
    <b>Authorized: {{ isAuthenticated }}</b>
    <!--    <b>{{ $store.getters['user/isAuthenticated'] }}</b>-->
    <div id="nav">
      <router-link
        v-for="(link, i) in navLinks"
        :key="i"
        :to="{ name: `${link.to}` }"
      >{{ link.name }}</router-link>
      <a
        v-if="isAuthenticated"
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
      isAuthenticated: 'user/isAuthenticated',
    }),
    navLinks() {
      if (this.isAuthenticated) {
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
            to: 'vee-validate',
            name: 'Vee-validate',
          },
          {
            to: 'vuerouter',
            name: 'Vuerouter',
          },
          {
            to: 'vuex',
            name: 'Vuex & Axios',
          },
        ];
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
        ];
      }
    },
  },
  methods: {
    logout() {
      this.$store.dispatch('user/logoutUser')
        .then(() => {
          this.status = 'Logging';
          this.showStatus = true;
          console.info('Logout');
          this.$router.push({name: 'login'});
        })
        .catch((error) => {
          this.showStatus = true;
          this.status = error;
        });
    },
  },
};
</script>

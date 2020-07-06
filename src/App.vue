<template>
  <div id="app">
    <b>Authorized: {{ isAuthenticated }}</b>
    <nav class="nav">
      <router-link
        v-for="(link, i) in navLinks"
        :key="i"
        :to="{ name: `${link.name}` }"
      >{{ link.label }}</router-link>
      <a
        href="#"
        v-if="isAuthenticated"
        @click.prevent="logout"
      >Log out</a>
    </nav>
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
            name: 'home',
            label: 'Home',
          },
          {
            name: 'create-task',
            label: 'Create task',
          },
          {
            name: 'vee-validate',
            label: 'Vee-validate',
          },
          {
            name: 'vuerouter',
            label: 'Vuerouter',
          },
          {
            name: 'vuex',
            label: 'Vuex & Axios',
          },
        ];
      } else {
        return [
          {
            name: 'login',
            label: 'Login',
          },
          {
            name: 'registration',
            label: 'Registration',
          },
        ];
      }
    },
  },
  methods: {
    async logout() {
      await this.$store.dispatch('user/logoutUser')
        .then(() => {
          this.status = 'Logout';
          this.showStatus = true;
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

<style scoped>
  b {
    display: block;
    padding: 10px;
    background-color: #AFEEEE;
  }

  nav {
    background-color: #E0FFFF;
  }
</style>

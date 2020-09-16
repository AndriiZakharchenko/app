<template>
  <header>
    <b>Authorized: {{ IS_AUTHENTICATED }}</b>
    <nav class="nav">
      <router-link
        v-for="link in navLinks"
        :key="link.name"
        :to="{ name: `${link.name}` }"
      >{{ link.label }}</router-link>
      <a
        href="#"
        v-if="IS_AUTHENTICATED"
        @click.prevent="logoutUser"
      >Log out</a>
    </nav>
  </header>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'TheHeader',
  computed: {
    ...mapGetters({
      IS_AUTHENTICATED: 'user/IS_AUTHENTICATED',
    }),
    navLinks() {
      if (this.IS_AUTHENTICATED) {
        return [
          {
            name: 'home',
            label: 'Home',
          },
          {
            name: 'add-film',
            label: 'Add film',
          },
          {
            name: 'posts',
            label: 'Posts',
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
          {
            name: 'table-info',
            label: 'Table-info',
          },
        ];
      } else {
        return [
          {
            name: 'login',
            label: 'Login',
          },
          {
            name: 'sign-up',
            label: 'Sign up',
          },
        ];
      }
    },
  },
  methods: {
    ...mapActions({
      LOGOUT_USER: 'user/LOGOUT_USER',
    }),
    ...mapMutations({
      SHOW_NOTIFICATION: 'app/SHOW_NOTIFICATION',
    }),
    async logoutUser() {
      await this.LOGOUT_USER()
        .then(() => {
          this.SHOW_NOTIFICATION('Logout');
          this.$router.push({name: 'login'});
        })
        .catch((error) => {
          this.SHOW_NOTIFICATION(error);
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


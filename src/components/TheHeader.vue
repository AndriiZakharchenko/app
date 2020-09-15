<template>
  <header>
    <b>Authorized: {{ IS_AUTHENTICATED }}</b>
    <nav class="nav">
      <router-link
        v-for="(link, i) in navLinks"
        :key="i"
        :to="{ name: `${link.name}` }"
      >{{ link.label }}</router-link>
      <a
        href="#"
        v-if="IS_AUTHENTICATED"
        @click.prevent="logout"
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
            name: 'create-task',
            label: 'Create task',
          },
          {
            name: 'database',
            label: 'Database',
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
            name: 'registration',
            label: 'Registration',
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
      CHANGE_STATUS: 'app/CHANGE_STATUS',
    }),
    async logout() {
      await this.LOGOUT_USER()
        .then(() => {
          this.CHANGE_STATUS('Logout');
          this.$router.push({name: 'login'});
        })
        .catch((error) => {
          this.CHANGE_STATUS(error);
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


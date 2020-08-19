<template>
  <header>
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
  </header>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
  name: 'TheHeader',
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
            name: 'table',
            label: 'Table',
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
      logoutUser: 'user/logoutUser',
    }),
    ...mapMutations({
      changeStatus: 'app/changeStatus',
    }),
    async logout() {
      await this.logoutUser()
        .then(() => {
          this.changeStatus('Logout');
          this.$router.push({name: 'login'});
        })
        .catch((error) => {
          this.changeStatus(error);
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


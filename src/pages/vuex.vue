<template>
  <div>
    <h1>Vuex</h1>
    <!--    {{ $store.getters.getLoading }}-->
        {{ $store.state.app.loading }}
    <button @click="$store.commit('setLoading', true)">Change state</button>
    <form action="">
      <input type="text" v-model="message">
      <br>
      <p>V model in vuex - {{ message }}</p>
    </form>
    <!--    <p>Namespaced: true - {{ $store.getters['user/getTest'] }}</p>-->
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  export default {
    name: "vuex-page",
    data() {
      return {};
    },
    computed: {
      // getLoading() {
      //   return this.$store.getters.getLoading;
      // }
      // ...mapGetters({
      //   'checkUser': 'checkUser'
      // }),
      // checkUser() {
      //   return this.$store.getters.checkUser;
      // },
      ...mapState ({
        loading: state => state.app.loading,
      }),
      message: {
        get () {
          return this.$store.state.app.message
        },
        set (val) {
          this.$store.commit('updateMessage', val)
        }
      }
    },
    methods: {
      setLoading() {
        this.$store.commit('setLoading', true);
      }
    }
  }
</script>


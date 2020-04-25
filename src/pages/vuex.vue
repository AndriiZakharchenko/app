<template>
  <div>
    <h1>Vuex & Axios</h1>
    {{ loading }}
    <button @click="setLoading">Change state</button>
    <form>
      <input type="text" v-model.trim="message">
      <br>
      <p>V model in vuex - {{ message }}</p>
    </form>
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
      ...mapState ({
        loading: state => state.app.loading,
      }),
      message: {
        get () {
          return this.$store.state.app.message;
        },
        set (val) {
          this.$store.commit('app/updateMessage', val);
        }
      }
    },
    methods: {
      setLoading() {
        this.$store.commit('app/setLoading', true);
      }
    }
  }
</script>


<template>
  <div>
    <h1>Vuex & Axios</h1>
    {{ isLoading }}
    <br/>
    <md-button class="md-raised" @click="setLoading">Change state</md-button>
    <form>
      <input type="text" v-model.trim="message"/>
      <br/>
      <p>V model in vuex - {{ message }}</p>
    </form>
    <md-button class="md-raised" @click="getLists">
      <span v-if="isLoading">Loading...</span>
      <span v-else>Get posts </span>
    </md-button>
    <ul class="post-list">
      <li v-for="(post, i) in posts" :key="i">
        <b>{{ post.title }}</b>
        <p>{{ post.body }}</p>
      </li>
    </ul>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'vuex-page',
  computed: {
    ...mapState ({
      isLoading: state => state.app.isLoading,
      posts: state => state.app.posts,
    }),
    message: {
      get() {
        return this.$store.state.app.message;
      },
      set(val) {
        this.$store.commit('app/updateMessage', val);
      },
    },
  },
  methods: {
    setLoading() {
      this.$store.commit('app/setLoading', true);
    },
    async getLists() {
      await this.$store.dispatch('app/getPosts');
    },
  },
};
</script>

<style lang="scss" scoped>
  .post-list {
    list-style-type: none;
    max-width: 500px;
    margin: 30px auto 0;
    text-align: left;

    li {
      margin: 10px;
      padding: 15px;
      border: 1px solid lightblue;
    }
  }
</style>

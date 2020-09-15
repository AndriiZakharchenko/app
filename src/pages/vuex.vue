<template>
  <div>
    <h1>Vuex & Axios</h1>
    <form>
      <input type="text" v-model.trim="message" />
      <p>V model in vuex - {{ message }}</p>
    </form>
    <md-button
      class="md-raised"
      @click="getLists"
    >
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
import { mapState, mapMutations } from 'vuex';

export default {
  name: 'vuex-page',
  computed: {
    ...mapState ({
      isLoading: state => state.app.isLoading,
      posts: state => state.posts.posts,
    }),
    message: {
      get() {
        return this.$store.state.posts.message;
      },
      set(val) {
        this.UPDATE_MESSAGE(val);
      },
    },
  },
  methods: {
    ...mapMutations({
      CHANGE_STATUS: 'app/CHANGE_STATUS',
      UPDATE_MESSAGE: 'posts/UPDATE_MESSAGE',
    }),
    async getLists() {
      await this.$store.dispatch('posts/GET_POSTS')
        .then(() => {})
        .catch((error) => {
          this.CHANGE_STATUS(error);
        });
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

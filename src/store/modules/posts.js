import axios from 'axios';

export default {
  namespaced: true,
  state: {
    posts: [],
    message: '',
  },
  getters: {},
  actions: {
    async getPosts({commit, state}) {
      if (state.posts.length) {
        return;
      }
      commit('app/setLoading', true, { root: true });
      await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
        .then(response => {
          commit('addPosts', response.data);
        })
        .catch((error) => {
          throw error;
        })
        .finally(() => {
          commit('app/setLoading', false, { root: true });
        })
    },
  },
  mutations: {
    addPosts(state, payload) {
      state.posts = payload;
    },
    updateMessage(state, payload) {
      state.message = payload;
    },
  },
};

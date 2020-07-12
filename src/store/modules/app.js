import axios from 'axios';

export default {
  namespaced: true,
  state: {
    isLoading: false,
    error: '',
    message: '',
    status: '',
    showStatus: false,
    posts: [],
  },
  getters: {},
  actions: {
    async getPosts({commit, state}) {
      if (state.posts.length) {
        return;
      }
      commit('clearError');
      commit('setLoading', true);
      await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=3')
        .then(response => {
          setTimeout(() => {
            commit('addPosts', response.data);
            commit('setLoading', false);
          }, 2000)
        })
        .catch((error) => {
          commit('setLoading', false);
          commit('setError', error.message);
        });
    },
  },
  mutations: {
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    addPosts(state, payload) {
      state.posts = payload;
    },
    updateMessage(state, payload) {
      state.message = payload;
    },
  },
};

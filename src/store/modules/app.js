import axios from 'axios';

export default {
  namespaced: true,
  state: {
    posts: [],
    isLoading: false,
    message: '',
    status: '',
  },
  getters: {},
  actions: {
    async getPosts({commit, state}) {
      if (state.posts.length) {
        return;
      }
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
          throw error;
        });
    },
  },
  mutations: {
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    addPosts(state, payload) {
      state.posts = payload;
    },
    updateMessage(state, payload) {
      state.message = payload;
    },
  },
};

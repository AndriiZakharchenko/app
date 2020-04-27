import axios from 'axios';

export default {
  namespaced: true,
  state: {
    isLoading: false,
    message: '',
    status: '',
    showStatus: false,
    posts: [],
  },
  getters: {},
  actions: {
    async getPosts({commit}) {
      await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=3')
        .then(response => {
          commit('addPosts', response.data);
        })
        .catch((error) => {
          console.error(error);
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

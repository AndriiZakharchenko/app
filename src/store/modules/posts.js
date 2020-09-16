import axios from 'axios';

export default {
  namespaced: true,
  state: {
    posts: [],
    message: '',
  },
  getters: {},
  actions: {
    async GET_POSTS({commit, state}) {
      if (!state.posts.length) {
        commit('app/SHOW_LOADING', true, {root: true});
        await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
          .then(response => {
            commit('UPDATE_POSTS', response.data);
          })
          .catch((error) => {
            throw error;
          })
          .finally(() => {
            commit('app/SHOW_LOADING', false, {root: true});
          });
      }
    },
  },
  mutations: {
    UPDATE_POSTS(state, payload) {
      state.posts = payload;
    },
    UPDATE_MESSAGE(state, payload) {
      state.message = payload;
    },
  },
};

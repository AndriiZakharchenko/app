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
      if (state.posts.length) {
        return;
      }
      commit('app/SET_LOADING', true, { root: true });
      await axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')
        .then(response => {
          commit('ADD_POSTS', response.data);
        })
        .catch((error) => {
          throw error;
        })
        .finally(() => {
          commit('app/SET_LOADING', false, { root: true });
        });
    },
  },
  mutations: {
    ADD_POSTS(state, payload) {
      state.posts = payload;
    },
    UPDATE_MESSAGE(state, payload) {
      state.message = payload;
    },
  },
};

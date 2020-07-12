import firebase from 'firebase/app';

export default {
  namespaced: true,
  state: {
    posts: [],
    isLoading: false,
    error: null,
  },
  getters: {},
  actions: {
    async addPost({dispatch, commit}, payload) {
      commit('clearError');
      commit('setLoading', true);
      await firebase.database().ref('posts').push(payload)
        .then(() => {
          dispatch('getPosts');
          commit('setLoading', false);
        })
        .catch((error) => {
          commit('setLoading', false);
          commit('setError', error.message);
        });
    },
    async getPosts({commit}) {
      commit('clearError');
      commit('setLoading', true);
      await firebase.database().ref('posts').once('value')
        .then((response) => {
          const tasksArray = [];
          const tasks = response.val();
          Object.keys(tasks).forEach(key => {
            tasksArray.push({
              ...tasks[key],
              id: key,
            });
          });
          commit('fetchPosts', tasksArray);
          commit('setLoading', false);
        })
        .catch((error) => {
          commit('setLoading', false);
          commit('setError', error.message);
        });
    }
  },
  mutations: {
    fetchPosts(state, payload) {
      state.posts = payload;
    },
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
  },
};

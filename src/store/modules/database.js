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
    async addPost({commit, dispatch, rootState}, payload) {
      commit('clearError');
      commit('setLoading', true);
      const user = rootState.user.user;
      await firebase.database().ref('posts/' + user).push(payload)
        .then(() => {
          dispatch('getPosts');
          commit('setLoading', false);
        })
        .catch((error) => {
          commit('setLoading', false);
          commit('setError', error.message);
        });
    },
    async editPost({commit, dispatch, rootState}, {title, description, id},) {
      commit('clearError');
      commit('setLoading', true);
      const user = rootState.user.user;
      await firebase.database().ref('posts/' + user).child(id).update({
        title,
        description,
      })
        .then(() => {
          dispatch('getPosts');
          commit('setLoading', false);
        })
        .catch((error) => {
          commit('setLoading', false);
          commit('setError', error.message);
          throw error;
        });
    },
    async deletePost({commit, dispatch, rootState}, id) {
      commit('clearError');
      commit('setLoading', true);
      const user = rootState.user.user;
      await firebase.database().ref('posts/' + user).child(id).remove()
        .then(() => {
          dispatch('getPosts');
          commit('setLoading', false);
        })
        .catch((error) => {
          commit('setLoading', false);
          commit('setError', error.message);
          throw error;
        });
    },
    async getPosts({commit, rootState}) {
      commit('clearError');
      commit('setLoading', true);
      const user = rootState.user.user;
      await firebase.database().ref('posts/' + user).once('value')
        .then((response) => {
          const tasksArray = [];
          const tasks = response.val();
          if (tasks) {
            Object.keys(tasks).forEach(key => {
              tasksArray.push({
                ...tasks[key],
                id: key,
              });
            });
          }
          commit('fetchPosts', tasksArray);
          commit('setLoading', false);
        })
        .catch((error) => {
          commit('setLoading', false);
          commit('setError', error.message);
          throw error;
        });
    },
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

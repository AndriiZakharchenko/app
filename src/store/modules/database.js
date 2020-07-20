import firebase from 'firebase/app';

export default {
  namespaced: true,
  state: {
    posts: [],
  },
  getters: {},
  actions: {
    async addPost({commit, dispatch, rootState}, payload) {
      commit('app/setLoading', true, { root: true });
      const user = rootState.user.user;
      await firebase.database().ref('users/' + user + '/posts').push(payload)
        .then(() => {
          dispatch('getPosts');
          commit('app/setLoading', false, { root: true });
        })
        .catch((error) => {
          commit('app/setLoading', false, { root: true });
          throw error;
        });
    },
    async editPost({commit, dispatch, rootState}, {title, description, id},) {
      commit('app/setLoading', true, { root: true });
      const user = rootState.user.user;
      await firebase.database().ref('users/' + user + '/posts').child(id).update({
        title,
        description,
      })
        .then(() => {
          dispatch('getPosts');
          commit('app/setLoading', false, { root: true });
        })
        .catch((error) => {
          commit('app/setLoading', false, { root: true });
          throw error;
        });
    },
    async deletePost({commit, dispatch, rootState}, id) {
      commit('app/setLoading', true, { root: true });
      const user = rootState.user.user;
      await firebase.database().ref('users/' + user + '/posts').child(id).remove()
        .then(() => {
          dispatch('getPosts');
          commit('app/setLoading', false, { root: true });
        })
        .catch((error) => {
          commit('app/setLoading', false, { root: true });
          throw error;
        });
    },
    async getPosts({commit, rootState}) {
      commit('app/setLoading', true, { root: true })
      const user = rootState.user.user;
      await firebase.database().ref('users/' + user + '/posts').once('value')
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
          commit('app/setLoading', false, { root: true });

        })
        .catch((error) => {
          commit('app/setLoading', false, { root: true });
          throw error;
        });
    },
  },
  mutations: {
    fetchPosts(state, payload) {
      state.posts = payload;
    },
  },
};

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
        })
        .catch((error) => {
          throw error;
        })
        .finally(() => {
          commit('app/setLoading', false, { root: true });
        });
    },
    async editPost({commit, dispatch, rootState}, {title, description, id}) {
      commit('app/setLoading', true, { root: true });
      const user = rootState.user.user;
      await firebase.database().ref('users/' + user + '/posts').child(id).update({
        title,
        description,
      })
        .then(() => {
          dispatch('getPosts');
        })
        .catch((error) => {
          throw error;
        })
        .finally(() => {
          commit('app/setLoading', false, { root: true });
        });
    },
    async deletePost({commit, dispatch, rootState}, id) {
      commit('app/setLoading', true, { root: true });
      const user = rootState.user.user;
      await firebase.database().ref('users/' + user + '/posts').child(id).remove()
        .then(() => {
          dispatch('getPosts');
        })
        .catch((error) => {
          throw error;
        })
        .finally(() => {
          commit('app/setLoading', false, { root: true });
        });
    },
    async getPosts({commit, rootState}) {
      commit('app/setLoading', true, { root: true });
      const user = rootState.user.user;
      await firebase.database().ref('users/' + user + '/posts').once('value')
        .then((response) => {
          const tasksArray = [];
          const tasks = response.val();
          if (tasks) {
            // the firebase send the object with unique id for each posts
            // we create new array and add the unique id to the each post
            Object.keys(tasks).forEach(key => {
              tasksArray.push({
                ...tasks[key],
                id: key,
              });
            });
          }
          commit('fetchPosts', tasksArray);
        })
        .catch((error) => {
          commit('app/changeStatus', error, { root: true });
          throw error;
        })
        .finally(() => {
          commit('app/setLoading', false, { root: true });
        });
    },
  },
  mutations: {
    fetchPosts(state, payload) {
      state.posts = payload;
    },
  },
};

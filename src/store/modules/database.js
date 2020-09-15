import firebase from 'firebase/app';

export default {
  namespaced: true,
  state: {
    posts: [],
  },
  getters: {},
  actions: {
    async ADD_POST({commit, dispatch, rootState}, payload) {
      commit('app/SET_LOADING', true, { root: true });
      const user = rootState.user.user;
      await firebase.database().ref(`users/${user}/posts`).push(payload)
        .then(() => {
          dispatch('GET_POSTS');
        })
        .catch((error) => {
          throw error;
        })
        .finally(() => {
          commit('app/SET_LOADING', false, { root: true });
        });
    },
    async EDIT_POST({commit, dispatch, rootState}, {title, description, id}) {
      commit('app/SET_LOADING', true, { root: true });
      const user = rootState.user.user;
      await firebase.database().ref(`users/${user}/posts`).child(id).update({
        title,
        description,
      })
        .then(() => {
          dispatch('GET_POSTS');
        })
        .catch((error) => {
          throw error;
        })
        .finally(() => {
          commit('app/SET_LOADING', false, { root: true });
        });
    },
    async DELETE_POST({commit, dispatch, rootState}, id) {
      commit('app/SET_LOADING', true, { root: true });
      const user = rootState.user.user;
      await firebase.database().ref(`users/${user}/posts`).child(id).remove()
        .then(() => {
          dispatch('GET_POSTS');
        })
        .catch((error) => {
          throw error;
        })
        .finally(() => {
          commit('app/SET_LOADING', false, { root: true });
        });
    },
    async GET_POSTS({commit, rootState}) {
      commit('app/SET_LOADING', true, { root: true });
      const user = rootState.user.user;
      await firebase.database().ref(`users/${user}/posts`).once('value')
        .then((response) => {
          const tasksArray = [];
          const tasks = response.val();
          if (tasks) {
            // the firebase send the object with unique id for each posts
            // we create new array and add the unique id to the each post
            for (let key in tasks) {
              tasksArray.push({
                ...tasks[key],
                id: key,
              });
            }
          }
          commit('FETCH_POSTS', tasksArray);
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
    FETCH_POSTS(state, payload) {
      state.posts = payload;
    },
  },
};

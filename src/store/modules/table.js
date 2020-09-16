import firebase from 'firebase/app';

export default {
  namespaced: true,
  state: {},
  getters: {},
  actions: {
    async ADD_DATA({commit, dispatch, rootState}, payload) {
      commit('app/SHOW_LOADING', true, { root: true });
      const user = rootState.user.user;
      await firebase.database().ref(`users/${user}/table`).push(payload)
        .then(() => {
          dispatch('GET_DATA');
        })
        .catch((error) => {
          throw error;
        })
        .finally(() => {
          commit('app/SHOW_LOADING', false, { root: true });
        });
    },
    async EDIT_DATA({commit, dispatch, rootState}, data) {
      commit('app/SHOW_LOADING', true, { root: true });
      const user = rootState.user.user;
      await firebase.database().ref(`users/${user}/table`).child(data.id).update({
        name: data.name,
        email: data.email,
        description: data.description,
      })
        .then(() => {
          dispatch('GET_DATA');
        })
        .catch((error) => {
          throw error;
        })
        .finally(() => {
          commit('app/SHOW_LOADING', false, { root: true });
        });
    },
    async DELETE_DATA({commit, dispatch, rootState}, id) {
      commit('app/SHOW_LOADING', true, { root: true });
      const user = rootState.user.user;
      await firebase.database().ref(`users/${user}/table`).child(id).remove()
        .then(() => {
          dispatch('GET_DATA');
        })
        .catch((error) => {
          throw error;
        })
        .finally(() => {
          commit('app/SHOW_LOADING', false, { root: true });
        });
    },
    async GET_DATA({commit, rootState}) {
      commit('app/SHOW_LOADING', true, { root: true });
      const user = rootState.user.user;
      const dataArray = [];
      await firebase.database().ref(`users/${user}/table`).once('value')
        .then((response) => {
          const data = response.val();
          // NOTE: the firebase send the object with unique id for each posts
          // we create new array and add the unique id to the each post
          if (data) {
            for (let key in data) {
              dataArray.push({
                ...data[key],
                id: key,
                isEditable: false,
              });
            }
          }
        })
        .catch((error) => {
          throw error;
        })
        .finally(() => {
          commit('app/SHOW_LOADING', false, { root: true });
        });

      return dataArray;
    },
  },
  mutations: {},
};

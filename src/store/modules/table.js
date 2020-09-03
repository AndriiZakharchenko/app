import firebase from 'firebase/app';

export default {
  namespaced: true,
  state: {},
  getters: {},
  actions: {
    async addData({commit, dispatch, rootState}, payload) {
      commit('app/setLoading', true, { root: true });
      const user = rootState.user.user;
      await firebase.database().ref(`users/${user}/table`).push(payload)
        .then(() => {
          dispatch('getData');
        })
        .catch((error) => {
          throw error;
        })
        .finally(() => {
          commit('app/setLoading', false, { root: true });
        });
    },
    async editData({commit, dispatch, rootState}, data) {
      commit('app/setLoading', true, { root: true });
      const user = rootState.user.user;
      await firebase.database().ref(`users/${user}/table`).child(data.id).update({
        name: data.name,
        email: data.email,
        description: data.description,
      })
        .then(() => {
          dispatch('getData');
        })
        .catch((error) => {
          throw error;
        })
        .finally(() => {
          commit('app/setLoading', false, { root: true });
        });
    },
    async deleteData({commit, dispatch, rootState}, id) {
      commit('app/setLoading', true, { root: true });
      const user = rootState.user.user;
      await firebase.database().ref(`users/${user}/table`).child(id).remove()
        .then(() => {
          dispatch('getData');
        })
        .catch((error) => {
          throw error;
        })
        .finally(() => {
          commit('app/setLoading', false, { root: true });
        });
    },
    async getData({commit, rootState}) {
      commit('app/setLoading', true, { root: true });
      const user = rootState.user.user;
      const dataArray = [];
      await firebase.database().ref(`users/${user}/table`).once('value')
        .then((response) => {
          const data = response.val();
          if (data) {
            // the firebase send the object with unique id for each posts
            // we create new array and add the unique id to the each post
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
          commit('app/setLoading', false, { root: true });
        });

      return dataArray;
    },
  },
  mutations: {},
};

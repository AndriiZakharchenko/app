import firebase from 'firebase/app';

export default {
  namespaced: true,
  state: {
    table: [],
  },
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
    async editData({commit, dispatch, rootState}, {name, email, description, id}) {
      commit('app/setLoading', true, { root: true });
      const user = rootState.user.user;
      await firebase.database().ref(`users/${user}/table`).child(id).update({
        name,
        email,
        description,
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
      await firebase.database().ref(`users/${user}/table`).once('value')
        .then((response) => {
          commit('fetchData', response.val());
        })
        .catch((error) => {
          throw error;
        })
        .finally(() => {
          commit('app/setLoading', false, { root: true });
        });
    },
  },
  mutations: {
    fetchData(state, payload) {
      state.table = payload;
    },
  },
};

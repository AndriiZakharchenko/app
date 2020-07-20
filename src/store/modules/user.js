import firebase from 'firebase/app';

export default {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null;
    },
  },
  actions: {
    async registerUser({commit}, {email, password}) {
      commit('app/setLoading', true, { root: true })
      await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
          commit('setUser', res.user.uid);
          commit('app/setLoading', false, { root: true })
        })
        .catch((error) => {
          commit('app/setLoading', false, { root: true })
          throw error;
        });
    },
    async loginUser({commit}, {email, password}) {
      commit('app/setLoading', true, { root: true })
      await firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
          commit('setUser', res.user.uid);
          commit('app/setLoading', false, { root: true })
        })
        .catch((error) => {
          commit('app/setLoading', false, { root: true })
          throw error;
        });
    },
    loggedUser({commit}, payload) {
      commit('setUser', payload.uid);
    },
    async logoutUser({commit}) {
      await firebase.auth().signOut()
        .then(() => {
          commit('setUser', null);
        })
        .catch((error) => {
          throw error;
        });
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
  },
};

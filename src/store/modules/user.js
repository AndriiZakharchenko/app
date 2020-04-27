import firebase from 'firebase/app';

export default {
  namespaced: true,
  state: {
    user: null,
    isLoading: false,
    error: null,
  },
  getters: {
    isAuthenticated(state) {
      return state.user !== null;
    },
  },
  actions: {
    async registerUser({commit}, {email, password}) {
      commit('clearError');
      commit('setLoading', true);
      try {
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
        commit('setUser', user.user.uid);
        commit('setLoading', false);
      } catch(error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error;
      }
    },
    async loginUser({commit}, {email, password}) {
      commit('clearError');
      commit('setLoading', true);
      try {
        const user = await firebase.auth().signInWithEmailAndPassword(email, password);
        commit('setUser', user.user.uid);
        commit('setLoading', false);
      } catch(error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error;
      }
    },
    loggedUser({commit}, payload) {
      commit('setUser', payload.uid);
    },
    async logoutUser({commit}) {
      commit('clearError');
      firebase.auth().signOut()
        .then(() => {
          commit('setUser', null);
        })
        .catch((error) => {
          commit('setError', error.message);
        });
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
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

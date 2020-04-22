import firebase from 'firebase/app'

import User from './user_help.js'

export default {
  namespaced: true,
  state: {
    user: null,
    loading: false,
    error: null,
  },
  getters: {
    user(state) {
      return state.user;
    },
    checkUser(state) {
      return state.user !== null
    },
  },
  actions: {
    async registerUser ({commit}, {email, password}) {
      commit('clearError');
      commit('setLoading', true);
      try {
        // logic
        const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
        commit('setUser', new User(user.user.uid));
        commit('setLoading', false);
      } catch(error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error
      }
    },
    async loginUser ({commit}, {email, password}) {
      commit('clearError');
      commit('setLoading', true);
      try {
        // logic
        const user = await firebase.auth().signInWithEmailAndPassword(email, password);
        commit('setUser', new User(user.user.uid));
        commit('setLoading', false);
      } catch(error) {
        commit('setLoading', false);
        commit('setError', error.message);
        throw error
      }
    },
    loggedUser({commit}, payload) {
      commit('setUser', new User(payload.uid));
    },
    logoutUser({commit}) {
      firebase.auth().signOut();
      commit('setUser', null);
    },
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload;
    },
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
  }
};

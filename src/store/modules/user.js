import firebase from 'firebase/app';

export default {
  namespaced: true,
  state: {
    user: null,
  },
  getters: {
    IS_AUTHENTICATED(state) {
      return state.user !== null;
    },
  },
  actions: {
    async LOGIN_USER({commit}, {email, password}) {
      commit('app/SHOW_LOADING', true, { root: true });
      await firebase.auth().signInWithEmailAndPassword(email, password)
        .then((res) => {
          commit('SET_USER', res.user.uid);
        })
        .catch((error) => {
          throw error;
        })
        .finally(() => {
          commit('app/SHOW_LOADING', false, { root: true });
        });
    },
    async REGISTER_USER({commit}, {email, password}) {
      commit('app/SHOW_LOADING', true, { root: true });
      await firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((res) => {
          commit('SET_USER', res.user.uid);
        })
        .catch((error) => {
          throw error;
        })
        .finally(() => {
          commit('app/SHOW_LOADING', false, { root: true });
        });
    },
    async LOGOUT_USER({commit}) {
      await firebase.auth().signOut()
        .then(() => {
          commit('SET_USER', null);
        })
        .catch((error) => {
          throw error;
        });
    },
    LOGGED_USER({commit}, payload) {
      commit('SET_USER', payload.uid);
    },
  },
  mutations: {
    SET_USER(state, payload) {
      state.user = payload;
    },
  },
};

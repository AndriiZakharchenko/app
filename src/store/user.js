import firebase from 'firebase/app'

import User from './user_help.js'

export default {
  state: {
    user: null
  },
  mutations: {
    setUser(state, payload) {
      this.state.user = payload;
    }
  },
  actions: {
    async registerUser ({commit}, {email, password}) {
      const user = await firebase.auth().createUserWithEmailAndPassword(email, password);
      console.log(user);
      commit('setUser', new User(user.user.uid));
    }
  },
  getters: {
    user(state) {
      return state.user;
    },
    checkUser(state) {
      return state.user !== null
    }
  }
};

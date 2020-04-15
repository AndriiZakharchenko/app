import Vue from 'vue'
import Vuex from 'vuex'

import app from './modules/app';
import user from './modules/user/user';
import films from './modules/films';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    user,
    films,
  },
  strict: process.env.NODE_ENV !== 'production'
})

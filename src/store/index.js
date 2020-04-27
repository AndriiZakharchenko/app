import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import app from './modules/app';
import user from './modules/user';
import films from './modules/films';

export default new Vuex.Store({
  modules: {
    app,
    user,
    films,
  },
  strict: process.env.NODE_ENV !== 'production',
});

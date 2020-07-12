import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import app from './modules/app';
import user from './modules/user';
import films from './modules/films';
import database from './modules/database';

export default new Vuex.Store({
  modules: {
    app,
    user,
    films,
    database,
  },
  strict: process.env.NODE_ENV !== 'production',
});

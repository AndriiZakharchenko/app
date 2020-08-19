import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import app from './modules/app';
import database from './modules/database';
import films from './modules/films';
import posts from './modules/posts';
import user from './modules/user';
import table from './modules/table';

export default new Vuex.Store({
  modules: {
    app,
    database,
    films,
    posts,
    table,
    user,
  },
  strict: process.env.NODE_ENV !== 'production',
});

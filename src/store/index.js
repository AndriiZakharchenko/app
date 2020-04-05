import Vue from 'vue'
import Vuex from 'vuex'

import common from './common';
import user from './user';
import films from './films';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: [
    common,
    user,
    films
  ]
})

export default {
  namespaced: true,
  state: {
    status: '',
    showStatus: false,
    isLoading: false,
    preloader: true,
  },
  getters: {},
  actions: {},
  mutations: {
    REMOVE_PRELOADER(state) {
      state.preloader = false;
    },
    SET_LOADING(state, payload) {
      state.isLoading = payload;
    },
    CHANGE_STATUS(state, payload) {
      state.status = payload;
      state.showStatus = true;
    },
    CLEAR_STATUS(state) {
      state.status = '';
      state.showStatus = false;
    },
  },
};

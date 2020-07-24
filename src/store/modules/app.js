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
    removePreloader(state) {
      state.preloader = false;
    },
    setLoading(state, payload) {
      state.isLoading = payload;
    },
    changeStatus(state, payload) {
      state.status = payload;
      state.showStatus = true;
    },
    clearStatus(state) {
      state.status = '';
      state.showStatus = false;
    },
  },
};

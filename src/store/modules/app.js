export default {
  namespaced: true,
  state: {
    preloader: true,
    status: '',
    showStatus: false,
    isLoading: false,
  },
  getters: {},
  actions: {},
  mutations: {
    removePreloader(state, payload) {
      state.preloader = payload;
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

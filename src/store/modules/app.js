export default {
  namespaced: true,
  state: {
    notificationMessage: '',
    showNotification: false,
    showPreloader: true,
    isLoading: false,
  },
  getters: {},
  actions: {},
  mutations: {
    HIDE_PRELOADER(state) {
      state.showPreloader = false;
    },
    SHOW_LOADING(state, payload) {
      state.isLoading = payload;
    },
    SHOW_NOTIFICATION(state, payload) {
      state.notificationMessage = payload;
      state.showNotification = true;
    },
    HIDE_NOTIFICATION(state) {
      state.notificationMessage = '';
      state.showNotification = false;
    },
  },
};

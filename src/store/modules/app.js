export default {
  namespaced: true,
  state: {
    loading: false,
    message: '',
  },
  getters: {},
  actions: {},
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    updateMessage(state, payload) {
      state.message = payload;
    },
  },
};

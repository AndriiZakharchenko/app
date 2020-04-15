export default {
  state: {
    loading: false,
    error: null,
    message: '',
  },
  getters: {
    getLoading(state) {
      return state.loading;
    },
    getError(state) {
      return state.error;
    },
  },
  actions: {
    setLoading({commit}, payload) {
      commit('setLoading', payload);
    },
    setError({commit}, payload) {
      commit('setError', payload);
    },
    clearError({commit}) {
      commit('clearError');
    },
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setError(state, payload) {
      state.error = payload;
    },
    clearError(state) {
      state.error = null;
    },
    updateMessage(state, message) {
      state.message = message;
    },
  },
};

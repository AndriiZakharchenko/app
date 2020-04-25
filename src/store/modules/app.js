export default {
  namespaced: true,
  state: {
    loading: false,
    message: '',
  },
  getters: {},
  actions: {
    // getPosts({commit}) {
    //   axios.get(url).then(response => {
    //     commit('setPosts', response.data)
    //   })
    // }
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    updateMessage(state, payload) {
      state.message = payload;
    },
  },
};

export default {
  namespaced: true,
  state: {
    films: [
      {
        title: 'GrowthBusters: Hooked on Growth',
        description: 'I directed this documentary challenging the myths linking growth with prosperity and fulfillment. It explores how our beliefs about economic and consumption',
        completed: true,
      },
      {
        title: 'Game of thrones',
        description: 'Best serials',
        completed: false,
      },
    ]
  },
  getters: {},
  actions: {},
  mutations: {
    addFilm(state, payload) {
      state.films.push(payload);
    }
  },
};

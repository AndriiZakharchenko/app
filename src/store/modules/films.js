export default {
  namespaced: true,
  state: {
    films: [
      {
        title: 'GrowthBusters: Hooked on Growth',
        description: 'I directed this documentary challenging the myths linking growth with prosperity and fulfillment. It explores how our beliefs about economic and consumption',
        isCompleted: true,
      },
      {
        title: 'Game of thrones',
        description: 'Best serials',
        isCompleted: false,
      },
    ],
  },
  getters: {},
  actions: {},
  mutations: {
    addFilm(state, payload) {
      state.films.push(payload);
    },
  },
};

export default {
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
      }
    ]
  },
  getters: {
    getFilms(state) {
      return state.films;
    },
  },
  actions: {},
  mutations: {},
};

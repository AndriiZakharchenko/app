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
        isCompleted: true,
      },
      {
        title: 'Future',
        description: 'Best serials',
        isCompleted: false,
      },
    ],
  },
  getters: {
    filterFilms(state) {
      return val => {
        switch (val) {
        case 'all':
          return state.films;
        case 'completed':
          return state.films.filter(film => film.isCompleted);
        case 'active':
          return state.films.filter(film => !film.isCompleted);
        default:
          return state.films.films;
        }
      }
    },
  },
  actions: {},
  mutations: {
    addFilm(state, payload) {
      state.films.push(payload);
    },
  },
};

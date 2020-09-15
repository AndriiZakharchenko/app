import { FILM_FILTERS } from '@/constants/filters';

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
    FILTER_FILMS(state) {
      return val => {
        switch (val) {
        case FILM_FILTERS.all:
          return state.films;
        case FILM_FILTERS.completed:
          return state.films.filter(film => film.isCompleted);
        case FILM_FILTERS.active:
          return state.films.filter(film => !film.isCompleted);
        default:
          return state.films.films;
        }
      };
    },
  },
  actions: {},
  mutations: {
    ADD_FILM(state, payload) {
      state.films.push(payload);
    },
  },
};

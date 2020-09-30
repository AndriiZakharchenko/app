<template>
  <div class="home">
    <h1>Home</h1>
    <div class="filter-list">
      <a
        role="button"
        class="active"
        @click="filterFilms(FILM_FILTERS.all, $event)"
      >All</a>
      <a
        role="button"
        @click="filterFilms(FILM_FILTERS.completed, $event)"
      >Completed</a>
      <a
        role="button"
        @click="filterFilms(FILM_FILTERS.active, $event)"
      >Active</a>
    </div>
    <div
      class="film"
      v-if="films.length"
    >
      <transition-group
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeInDown"
      >
        <div
          class="film__item"
          v-for="(film) in films"
          :key="film.title"
        >
          <h3>{{ film.title }}</h3>
          <p>{{ film.description }}</p>
          <input
            type="checkbox"
            :checked="film.isCompleted"
            disabled
          />
          <label>Saw</label>
        </div>
      </transition-group>
    </div>
    <h3 v-else>Empty list</h3>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { FILM_FILTERS } from '@/constants/filters';

export default {
  name: 'Home',
  mounted() {
    const message = this.$route.query.message;
    const messageBool = !!message;
    if (messageBool) {
      this.SHOW_NOTIFICATION(message);
    }

    this.films = this.$store.getters['films/FILTER_FILMS'](FILM_FILTERS.all);
  },
  data: () => ({
    films: [],
    currentFilter: FILM_FILTERS.all,
    FILM_FILTERS,
  }),
  methods: {
    ...mapMutations({
      SHOW_NOTIFICATION: 'app/SHOW_NOTIFICATION',
    }),
    filterFilms(val, event) {
      const filterElements = document.querySelectorAll('.filter-list a');
      filterElements.forEach(elem => {
        elem.classList.remove('active');
      });
      event.target.classList.add('active');

      return this.films = this.$store.getters['films/FILTER_FILMS'](val);
    },
  },
};
</script>

<style scoped lang="scss">
  .filter-list a {
    margin-right: 15px;
    font-weight: bold;
    color: #2c3e50;
    cursor: pointer;

    &.active {
      color: #42b983;
    }
  }
</style>

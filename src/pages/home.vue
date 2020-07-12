<template>
  <div class="home">
    <md-snackbar
      class="md-theme-demo-light"
      md-position="center"
      :md-duration="4000"
      :md-active.sync="showMessage"
      md-persistent
    >
      <span>{{ message }}</span>
    </md-snackbar>
    <h1>Home</h1>
    <div class="filter-list">
      <a href="#" ref="defaultFilter" @click="filterFilms('all', $event)">All</a>
      <a href="#" @click="filterFilms('completed', $event)">Completed</a>
      <a href="#" @click="filterFilms('active', $event)">Active</a>
    </div>
    <div class="film">
      <transition-group enter-active-class="animated fadeInUp" leave-active-class="animated fadeInDown">
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
  </div>
</template>

<script>
export default {
  name: 'Home',
  mounted() {
    const message = this.$route.query.message;
    const messageBool = !!message;
    if (messageBool) {
      this.showMessage = true;
      this.message = message;
    }

    //Filter list
    this.$refs.defaultFilter.click();
  },
  data: () => ({
    message: '',
    showMessage: false,
    films: [],
  }),
  methods: {
    filterFilms(val, event) {
      const filterElements = document.querySelectorAll('.filter-list a');
      filterElements.forEach(elem => elem.classList.remove('active'));
      event.target.classList.add('active');
      return this.films = this.$store.getters['films/filterFilms'](val);
    }
  }
};
</script>

<style scoped lang="scss">
  .filter-list a {
    margin-right: 15px;
    font-weight: bold;
    color: #2c3e50;

    &.active {
      color: #42b983;
    }
  }
</style>

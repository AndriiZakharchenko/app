<template>
  <div class="home">
    <md-snackbar
      class="md-theme-demo-light"
      md-position="center"
      :md-duration="4000"
      :md-active.sync="showMessage"
      md-persistent>
      <span>{{ message }}</span>
    </md-snackbar>
    <h1>Home</h1>
    <div class="film">
      <div
        class="film__item"
        v-for="(film, i) in films"
        :key="i"
      >
        <h3>{{ film.title }}</h3>
        <p>{{ film.description }}</p>
        <input
          type="checkbox"
          checked="film.isCompleted"
          disabled />
        <label>Saw</label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  mounted() {
    const message = this.$route.query;
    if (message.length) {
      this.showMessage = true;
      this.message = message[0];
    }
  },
  data() {
    return {
      message: '',
      showMessage: false,
    };
  },
  computed: {
    ...mapState({
      films: state => state.films.films,
    }),
  },
};
</script>

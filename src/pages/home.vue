<template>
  <div class="home">
    <h1>Home</h1>
    <div class="film">
      <div
        class="film__item"
        v-for="(film, i) in films"
        :key="i"
      >
        <h3>{{ film.title }}</h3>
        <p>{{ film.description }}</p>
        <input type="checkbox" v-model="film.completed">
        <label>Saw</label>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Home',
  computed: {
    ...mapState({
      films: state => state.films.films,
    }),
  }
}
</script>

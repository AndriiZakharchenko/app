<template>
  <div class="home">
    <h1>Home</h1>
    <form>
      <fieldset>
        <label>Film title</label>
        <input
          type="text"
          v-model="title"
          @keyup.enter="newFilm"
        >
      </fieldset>
      <fieldset>
        <label>Film description</label>
        <input
          type="text"
          v-model="description"
          @keyup.enter="newFilm"
        >
      </fieldset>
    </form>
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
// @ is an alias to /src
export default {
  name: 'Home',
  data() {
    return {
      title: '',
      description: '',
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
    };
  },
  methods: {
    newFilm() {
      if (!this.title || !this.description) {
        console.error('Empty data');
        return;
      }
      const film = {
        title: this.title,
        description: this.description,
        completed: false,
      };
      this.films.push(film);
      console.info('Push new film');
    }
  }
}
</script>

<style lang="scss">
</style>

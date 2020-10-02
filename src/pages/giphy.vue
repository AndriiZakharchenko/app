<template>
  <div>
    <h1>Giphy</h1>
    <form
      @submit.prevent=getGifs()
      novalidate
    >
      <div class="fieldset">
        <input
          type="text"
          v-model.trim="gifName"
        />
        <md-button
          type="submit"
          class="md-raised"
        >Search</md-button>
      </div>
    </form>
    <ul class="gif-list">
      <li v-for="gif in gifs" :key="gif.id">
        <img :src="gif.images.original.url" :key="gif.title" />
      </li>
    </ul>
    <md-button
      type="button"
      class="md-raised"
      @click="getGifs(6)"
    >More...</md-button>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';

export default {
  name: 'giphy',
  async mounted() {
    await this.getGifs();
  },
  data() {
    return {
      gifName: 'cat',
      gifs: [],
      limit: 6,
    };
  },
  methods: {
    ...mapMutations({
      SHOW_NOTIFICATION: 'app/SHOW_NOTIFICATION',
    }),
    async getGifs(iterator = 0) {
      this.limit += iterator;
      const apiKey = process.env.VUE_APP_GIPHY_API_KEY;
      const searchEndPoint = 'https://api.giphy.com/v1/gifs/search?';
      let url = `${ searchEndPoint }&api_key=${ apiKey }&q=${ this.gifName }&limit=${ this.limit }`;

      await this.$http.get(url)
        .then((res) => {
          this.gifs = res.data.data;
        })
        .catch((error) => {
          this.SHOW_NOTIFICATION(error.message);
        });
    },
  },
};
</script>

<style scoped>
  .fieldset {
    display: flex;
  }

  .fieldset button {
    margin: 0 0 0 5px;
    border-radius: 25px;
  }

  .gif-list {
    display: grid;
    grid-gap: 30px;
    grid-template-columns: repeat(6, 1fr);
    list-style-type: none;
    padding: 20px;
    margin: auto;
    text-align: left;
  }
</style>

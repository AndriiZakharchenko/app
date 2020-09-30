<template>
  <div>
    <h1>Add new film</h1>
    <form @submit.prevent="addFilm">
      <form-group :validator="$v.title" label="Film title">
        <input
          type="text"
          v-model.trim="title"
          @change="$v.title.$touch()"
        />
      </form-group>
      <form-group :validator="$v.description" label="Description">
        <input
          type="text"
          v-model.trim="description"
          @change="$v.description.$touch()"
        />
      </form-group>
      <md-button
        type="submit"
        class="md-raised"
        :disabled="$v.$invalid"
      >Add</md-button>
    </form>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapMutations } from 'vuex';

export default {
  name: 'add-film',
  data: () => ({
    title: '',
    description: '',
  }),
  validations: {
    title: {
      required,
    },
    description: {
      required,
    },
  },
  methods: {
    ...mapMutations({
      ADD_FILM: 'films/ADD_FILM',
      SHOW_NOTIFICATION: 'app/SHOW_NOTIFICATION',
    }),
    addFilm() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const film = {
          title: this.title,
          description: this.description,
          completed: false,
        };
        this.ADD_FILM(film);
        this.SHOW_NOTIFICATION('Added new film');
        setTimeout(() => {
          this.$router.push('/');
        }, 1000);
      }
    },
  },
};
</script>

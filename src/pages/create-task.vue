<template>
  <div>
    <h1>Add new film</h1>
    <form @submit.prevent="ADD_FILMData">
      <fieldset :class="{ 'input-error': $v.title.$error }">
        <label>Film title</label>
        <input
          type="text"
          v-model="title"
          @change="$v.title.$touch()"
        />
        <div class="error" v-if="!$v.title.required">Title is required.</div>
      </fieldset>
      <fieldset :class="{ 'input-error': $v.description.$error }">
        <label>Film description</label>
        <input
          type="text"
          v-model="description"
          @change="$v.description.$touch()"
        />
        <div class="error" v-if="!$v.description.required">Description is required.</div>
      </fieldset>
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
  name: 'create-task',
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
      CHANGE_STATUS: 'app/CHANGE_STATUS',
    }),
    ADD_FILMData() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const film = {
          title: this.title,
          description: this.description,
          completed: false,
        };
        this.ADD_FILM(film);
        this.CHANGE_STATUS('Added new film');
        setTimeout(() => {
          this.$router.push('/');
        }, 1000);
      }
    },
  },
};
</script>

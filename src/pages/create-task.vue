<template>
  <div>
    <h1>Add new film</h1>
    <form @submit.prevent="onSubmit">
      <md-snackbar class="md-theme-demo-light" md-position="center" :md-duration="1000" :md-active.sync="showStatus" md-persistent>
        <span>{{ status }}</span>
      </md-snackbar>
      <fieldset :class="{ 'input-error': $v.title.$error }">
        <label>Film title</label>
        <input
          type="text"
          v-model="title"
          @change="$v.title.$touch()"
        >
        <div class="error" v-show="!$v.title.required">Title is required.</div>
      </fieldset>
      <fieldset :class="{ 'input-error': $v.description.$error }">
        <label>Film description</label>
        <input
          type="text"
          v-model="description"
          @change="$v.description.$touch()"
        >
        <div class="error" v-show="!$v.description.required">Description is required.</div>
      </fieldset>
      <md-button type="submit" class="md-raised">Add</md-button>
    </form>
  </div>
</template>

<script>
  import { required } from 'vuelidate/lib/validators';

  export default {
    data() {
      return {
        title: '',
        description: '',
        status: '',
        showStatus: false,
      }
    },
    validations: {
      title: {
        required,
      },
      description: {
        required,
      },
    },
    methods: {
      onSubmit() {
        this.$v.$touch();
        if (!this.$v.$invalid) {
          const film = {
            title: this.title,
            description: this.description,
            completed: false,
          };
          this.$store.commit('films/addFilm', film);
          this.status = 'Added new film';
          this.showStatus = true;
          setTimeout(() => {
            this.$router.push('/');
          }, 1000);
          console.info('Push new film');
        }
      },
    }
  }
</script>

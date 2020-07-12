<template>
  <div>
    <h1>Database</h1>
    <form @submit.prevent="onSubmit">
      <md-snackbar
        class="md-theme-demo-light"
        md-position="center"
        :md-duration="4000"
        :md-active.sync="showStatus"
        md-persistent
>
        <span>{{ status }}</span>
      </md-snackbar>
      <fieldset :class="{ 'input-error': $v.title.$error }">
        <label>Post title</label>
        <input
          type="text"
          v-model="title"
          @change="$v.title.$touch()"
        />
        <div class="error" v-if="!$v.title.required">Title is required.</div>
      </fieldset>
      <fieldset :class="{ 'input-error': $v.description.$error }">
        <label>Post description</label>
        <input
          type="text"
          v-model="description"
          @change="$v.description.$touch()"
        />
        <div class="error" v-if="!$v.description.required">Description is required.</div>
      </fieldset>
      <md-button type="submit" class="md-raised">Add</md-button>
    </form>
  </div>
</template>

<script>
import {required} from 'vuelidate/lib/validators';

export default {
  name: 'database',
  data: () => ({
    title: '',
    description: '',
    status: '',
    showStatus: false,
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
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const post = {
          title: this.title,
          description: this.description,
        };
        this.$store.commit('post/addPost', post);
        this.status = 'Added new post';
        this.showStatus = true;
      }
    },
  },
};
</script>

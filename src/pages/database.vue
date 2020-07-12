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
    <br>
    <div class="post">
      <transition-group enter-active-class="animated fadeInUp" leave-active-class="animated fadeInDown" tag="div">
        <div
          class="post__item"
          v-for="post in posts"
          :key="post.id"
        >
          <h3>{{ post.title }}</h3>
          <p>{{ post.description }}</p>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapState, mapActions } from 'vuex';

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
  async created() {
    await this.$store.dispatch('database/getPosts')
  },
  computed: {
    ...mapState({
      posts: state => state.database.posts,
    }),
  },
  methods: {
    ...mapActions({
      getPosts: 'database/getPosts',
      addPost: 'database/addPost',
    }),
    onSubmit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        const post = {
          title: this.title,
          description: this.description,
        };
        this.addPost(post);

        //Reset fields
        this.title = this.description = '';
        this.$v.$reset();

        this.status = 'Added new post';
        this.showStatus = true;
      }
    },
  },
};
</script>

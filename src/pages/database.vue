<template>
  <div>
    <md-snackbar
      class="md-theme-demo-light"
      md-position="center"
      :md-duration="4000"
      :md-active.sync="showStatus"
      md-persistent
    >
      <span>{{ status }}</span>
    </md-snackbar>

    <h1>Database</h1>
    <md-dialog :md-active.sync="showDialog">
      <md-dialog-title>Post editing</md-dialog-title>
      <form novalidate>
        <fieldset :class="{ 'input-error': $v.titleEdit.$error }">
          <label>Post title</label>
          <input
            type="text"
            v-model="titleEdit"
            @change="$v.titleEdit.$touch()"
          />
          <div class="error" v-if="!$v.titleEdit.required">Title is required.</div>
        </fieldset>
        <fieldset :class="{ 'input-error': $v.descriptionEdit.$error }">
          <label>Post description</label>
          <input
            type="text"
            v-model="descriptionEdit"
            @change="$v.descriptionEdit.$touch()"
          />
          <div class="error" v-if="!$v.descriptionEdit.required">Description is required.</div>
        </fieldset>
      </form>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showDialog = false">Close</md-button>
        <md-button class="md-primary" @click.native="onEditPost" type="submit">Save</md-button>
      </md-dialog-actions>
    </md-dialog>

    <form @submit.prevent="onSubmit" novalidate>
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
          <md-button class="md-raised" @click="showModal(post)">Change post</md-button>
          <md-button class="md-raised" @click="deleteCurrent(post.id)">Delete post</md-button>
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
    showDialog: false,
    id: '',
    titleEdit: '',
    descriptionEdit: '',
  }),
  validations: {
    title: {
      required,
    },
    description: {
      required,
    },
    titleEdit: {
      required,
    },
    descriptionEdit: {
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
      editPost: 'database/editPost',
      deletePost: 'database/deletePost',
    }),
    async onSubmit() {
      // this.$v.$touch();
      this.$v.title.$touch();
      this.$v.description.$touch();
      if (!this.$v.title.$invalid && !this.$v.description.$invalid) {
        const post = {
          title: this.title,
          description: this.description,
        };
        await this.addPost(post)
          .then(() => {
          //Reset fields
            this.title = this.description = '';
            this.$v.$reset();

            this.status = 'Added new post';
            this.showStatus = true;
          })
          .catch((error) => {
            this.status = error;
            this.showStatus = true;
          })
      }
    },
    showModal(post) {
      this.showDialog = true;
      this.titleEdit = post.title;
      this.descriptionEdit = post.description;
      this.id = post.id;
    },
    async onEditPost() {
      this.$v.titleEdit.$touch();
      this.$v.descriptionEdit.$touch();
      if (!this.$v.titleEdit.$invalid && !this.$v.descriptionEdit.$invalid) {
        const post = {
          title: this.titleEdit,
          description: this.descriptionEdit,
          id: this.id,
        };
        await this.editPost(post)
          .then(() => {
            this.showDialog = false;
            this.status = 'Change current post';
            this.showStatus = true;
          })
          .catch((error) => {
            this.showDialog = false;
            this.status = error;
            this.showStatus = true;
          })
      }
    },
    async deleteCurrent(id) {
      await this.deletePost(id)
        .then(() => {
          this.status = 'Delete current post';
          this.showStatus = true;
        })
        .catch((error) => {
          this.status = error;
          this.showStatus = true;
        })
    }
  },
};
</script>

<style lang="scss" scoped>
  .md-dialog {
    background-color: #fff;

    form {
      margin: 0;
      padding: 0;
    }
  }
</style>

<template>
  <div>
    <h1>Posts</h1>
    <md-dialog :md-active.sync="isShowDeleteModal">
      <md-dialog-title>Are you sure?</md-dialog-title>
      <md-dialog-actions>
        <md-button
          class="md-primary"
          @click="isShowDeleteModal = false"
        >Close</md-button>
        <md-button
          class="md-primary"
          type="submit"
          @click.native="deletePost"
        >Delete</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog :md-active.sync="isShowEditModal">
      <md-dialog-title>Post editing</md-dialog-title>
      <form
        @submit.native="editPost"
        novalidate
      >
        <form-group :validator="$v.editablePost.title" label="Post title">
          <input
            type="text"
            v-model.trim="editablePost.title"
            @change="$v.editablePost.title.$touch()"
          />
        </form-group>
        <form-group :validator="$v.editablePost.description" label="Post description">
          <input
            type="text"
            v-model.trim="editablePost.description"
            @change="$v.editablePost.description.$touch()"
          />
        </form-group>
        <md-dialog-actions>
          <md-button class="md-primary" @click="isShowEditModal = false">Close</md-button>
          <md-button
            class="md-primary"
            type="submit"
            :disabled="$v.editablePost.$invalid"
          >Save</md-button>
        </md-dialog-actions>
      </form>
    </md-dialog>

    <form
      @submit.prevent="addPost"
      novalidate
    >
      <form-group :validator="$v.post.title" label="Post title">
        <input
          type="text"
          v-model.trim="post.title"
          @change="$v.post.title.$touch()"
        />
      </form-group>
      <form-group :validator="$v.post.description" label="Post description">
        <input
          type="text"
          v-model.trim="post.description"
          @change="$v.post.description.$touch()"
        />
      </form-group>
      <md-button
        type="submit"
        :disabled="$v.post.$invalid"
        class="md-raised"
      >Add</md-button>
    </form>

    <div class="post">
      <transition-group
        enter-active-class="animated fadeInUp"
        leave-active-class="animated fadeInDown"
        tag="div"
      >
        <div
          class="post__item"
          v-for="post in posts"
          :key="post.id"
        >
          <h3>{{ post.title }}</h3>
          <p>{{ post.description }}</p>
          <md-button class="md-raised" @click="showEditModal(post)">Change post</md-button>
          <md-button class="md-raised" @click="showDeleteModal(post.id)">Delete post</md-button>
        </div>
      </transition-group>
    </div>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'posts',
  async created() {
    await this.GET_POSTS()
      .then(() => {})
      .catch((error) => {
        this.SHOW_NOTIFICATION(error);
      });
  },
  data: () => ({
    post: {
      title: '',
      description: '',
    },
    editablePost: {
      title: '',
      description: '',
      id: '',
    },
    id: null,
    isShowEditModal: false,
    isShowDeleteModal: false,
  }),
  validations: {
    post: {
      title: {
        required,
      },
      description: {
        required,
      },
    },
    editablePost: {
      title: {
        required,
      },
      description: {
        required,
      },
    },
  },
  computed: {
    ...mapState({
      posts: state => state.database.posts,
    }),
  },
  methods: {
    ...mapActions({
      GET_POSTS: 'database/GET_POSTS',
      ADD_POST: 'database/ADD_POST',
      EDIT_POST: 'database/EDIT_POST',
      DELETE_POST: 'database/DELETE_POST',
    }),
    ...mapMutations({
      SHOW_NOTIFICATION: 'app/SHOW_NOTIFICATION',
    }),
    async addPost() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        const post = {
          title: this.form.title,
          description: this.form.description,
        };
        await this.ADD_POST(post)
          .then(() => {
            //Reset fields
            this.$v.$reset();
            for (let key in this.form) {
              this.form[key] = '';
            }
            this.SHOW_NOTIFICATION('Added new post');
          })
          .catch((error) => {
            this.SHOW_NOTIFICATION(error.message);
          });
      }
    },
    showEditModal(post) {
      this.isShowEditModal = true;
      Object.assign(this.editablePost, post);
    },
    async editPost() {
      this.$v.editablePost.$touch();
      if (!this.$v.editablePost.$invalid) {
        await this.EDIT_POST(this.editablePost)
          .then(() => {
            this.SHOW_NOTIFICATION('Changed current post');
          })
          .catch((error) => {
            this.SHOW_NOTIFICATION(error.message);
          })
          .finally(() => {
            this.isShowEditModal = false;
          });
      }
    },
    showDeleteModal(id) {
      this.isShowDeleteModal = true;
      this.id = id;
    },
    async deletePost() {
      await this.DELETE_POST(this.id)
        .then(() => {
          this.SHOW_NOTIFICATION('Deleted current post');
        })
        .catch((error) => {
          this.SHOW_NOTIFICATION(error);
        })
        .finally(() => {
          this.isShowDeleteModal = false;
        });
    },
  },
};
</script>

<style lang="scss" scoped>
  .md-dialog {
    form {
      margin: 0;
      padding: 0;
    }
  }
</style>

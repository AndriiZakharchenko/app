<template>
  <div>
    <h1>Database</h1>
    <md-dialog :md-active.sync="showDeleteDialog">
      <md-dialog-title>Are you sure?</md-dialog-title>
      <md-dialog-actions>
        <md-button
          class="md-primary"
          @click="showDeleteDialog = false"
        >Close</md-button>
        <md-button
          class="md-primary"
          type="submit"
          @click.native="onDeletePost"
        >Delete</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog :md-active.sync="showEditDialog">
      <md-dialog-title>Post editing</md-dialog-title>
      <form novalidate>
        <fieldset :class="{ 'input-error': $v.formEdit.title.$error }">
          <label>Post title</label>
          <input
            type="text"
            v-model="formEdit.title"
            @change="$v.formEdit.title.$touch()"
          />
          <div class="error" v-if="!$v.formEdit.title.required">Title is required.</div>
        </fieldset>
        <fieldset :class="{ 'input-error': $v.formEdit.description.$error }">
          <label>Post description</label>
          <input
            type="text"
            v-model="formEdit.description"
            @change="$v.formEdit.description.$touch()"
          />
          <div class="error" v-if="!$v.formEdit.description.required">Description is required.</div>
        </fieldset>
      </form>
      <md-dialog-actions>
        <md-button class="md-primary" @click="showEditDialog = false">Close</md-button>
        <md-button
          class="md-primary"
          type="submit"
          :disabled="$v.formEdit.$invalid"
          @click.native="onEditPost"
        >Save</md-button>
      </md-dialog-actions>
    </md-dialog>

    <form @submit.prevent="onSubmit" novalidate>
      <fieldset :class="{ 'input-error': $v.form.title.$error }">
        <label>Post title</label>
        <input
          type="text"
          v-model="form.title"
          @change="$v.form.title.$touch()"
        />
        <div class="error" v-if="!$v.form.title.required">Title is required.</div>
      </fieldset>
      <fieldset :class="{ 'input-error': $v.form.description.$error }">
        <label>Post description</label>
        <input
          type="text"
          v-model="form.description"
          @change="$v.form.description.$touch()"
        />
        <div class="error" v-if="!$v.form.description.required">Description is required.</div>
      </fieldset>
      <md-button
        type="submit"
        :disabled="$v.form.$invalid"
        class="md-raised"
      >Add</md-button>
    </form>
    <br/>
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
  name: 'database',
  async created() {
    await this.getPosts()
      .then(() => {})
      .catch((error) => {
        this.changeStatus(error);
      });
  },
  data: () => ({
    form: {
      title: '',
      description: '',
    },
    formEdit: {
      title: '',
      description: '',
      id: '',
    },
    id: null,
    showEditDialog: false,
    showDeleteDialog: false,
  }),
  validations: {
    form: {
      title: {
        required,
      },
      description: {
        required,
      },
    },
    formEdit: {
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
      showStatus: state => state.app.showStatus,
      status: state => state.app.status,
    }),
  },
  methods: {
    ...mapActions({
      getPosts: 'database/getPosts',
      addPost: 'database/addPost',
      editPost: 'database/editPost',
      deletePost: 'database/deletePost',
    }),
    ...mapMutations({
      changeStatus: 'app/changeStatus',
    }),
    async onSubmit() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        const post = {
          title: this.form.title,
          description: this.form.description,
        };
        await this.addPost(post)
          .then(() => {
            //Reset fields
            this.$v.$reset();
            let form = this.form;
            for (let key in form) {
              form[key] = '';
            }
            this.changeStatus('Added new post');
          })
          .catch((error) => {
            this.changeStatus(error);
          });
      }
    },
    showEditModal(post) {
      this.showEditDialog = true;
      Object.assign(this.formEdit, post);
    },
    async onEditPost() {
      this.$v.formEdit.$touch();
      if (!this.$v.formEdit.$invalid) {
        await this.editPost(this.formEdit)
          .then(() => {
            this.changeStatus('Changed current post');
          })
          .catch((error) => {
            this.changeStatus(error);
          })
          .finally(() => {
            this.showEditDialog = false;
          });
      }
    },
    showDeleteModal(id) {
      this.showDeleteDialog = true;
      this.id = id;
    },
    async onDeletePost() {
      await this.deletePost(this.id)
        .then(() => {
          this.changeStatus('Deleted current post');
        })
        .catch((error) => {
          this.changeStatus(error);
        })
        .finally(() => {
          this.showDeleteDialog = false;
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

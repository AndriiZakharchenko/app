<template>
  <div>
    <h1>Database</h1>
    <md-dialog :md-active.sync="showDeleteDialog">
      <md-dialog-title>Post editing</md-dialog-title>
      <form novalidate>
        <fieldset :class="{ 'input-error': $v.titleEdit.$error }">
          <label>Post title</label>
          <input
            type="text"
            v-model="titleEdit"
            @change="$v.titleEdit.$touch()"
          />
          <div class="error" v-if="!$v.editForm.titleEdit.required">Title is required.</div>
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
        <md-button
class="md-primary"
@click.native="onEditPost"
type="submit"
>Save</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog :md-active.sync="showEditDialog">
      <md-dialog-title>Post editing</md-dialog-title>
      <form novalidate>
        <fieldset :class="{ 'input-error': $v.titleEdit.$error }">
          <label>Post title</label>
          <input
            type="text"
            v-model="titleEdit"
            @change="$v.titleEdit.$touch()"
          />
          <div class="error" v-if="!$v.editForm.titleEdit.required">Title is required.</div>
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
        <md-button
class="md-primary"
@click.native="onEditPost"
type="submit"
>Save</md-button>
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
          <md-button class="md-raised" @click="showModal(post)">Change post</md-button>
          <md-button class="md-raised" @click="deleteCurrent(post.id)">Delete post</md-button>
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
    await this.getPosts();
    this.defaultForm = this.form;
  },
  data: () => ({
    defaultForm: null,
    form: {
      title: '',
      description: '',
    },
    editForm: {
      id: '',
      titleEdit: '',
      descriptionEdit: '',
    },
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
    editForm: {
      titleEdit: {
        required,
      },
      descriptionEdit: {
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
      // this.$v.$touch();
      this.$v.title.$touch();
      this.$v.description.$touch();
      if (!this.$v.form.title.$invalid && !this.$v.form.description.$invalid) {
        const post = {
          title: this.form.title,
          description: this.form.description,
        };
        await this.addPost(post)
          .then(() => {
            //Reset fields
            // this.title = this.description = '';
            // Object.assign(this.$data, this.$options.data());
            this.defaultForm = Object.assign({}, this.form);
            this.$v.$reset();
            this.changeStatus('Added new post');
          })
          .catch((error) => {
            this.changeStatus(error);
          });
      }
    },
    showModal(post) {
      this.showEditDialog = true;
      this.form.titleEdit = post.title;
      this.form.descriptionEdit = post.description;
      this.form.id = post.id;
    },
    async editPost() {
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
            this.changeStatus('Changed current post');
          })
          .catch((error) => {
            this.changeStatus(error);
          }).
          finally(() => {
            this.showEditDialog = false;
          });
      }
    },
    async deletePost(id) {
      await this.deletePost(id)
        .then(() => {
          this.changeStatus('Deleted current post');
        })
        .catch((error) => {
          this.changeStatus(error);
        });
    },
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

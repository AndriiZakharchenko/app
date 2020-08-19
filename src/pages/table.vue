<template>
  <div>
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
          @click.native="onDeleteData"
        >Delete</md-button>
      </md-dialog-actions>
    </md-dialog>

    <h1>Table</h1>
    <form @submit.prevent="onSubmit" novalidate>
      <fieldset :class="{ 'input-error': $v.form.name.$error }">
        <label>Name</label>
        <input
          type="text"
          v-model="form.name"
          @change="$v.form.name.$touch()"
        />
        <div class="error" v-if="!$v.form.name.required">Title is required.</div>
      </fieldset>
      <fieldset :class="{ 'input-error': $v.form.email.$error }">
        <label>Email</label>
        <input
          type="email"
          v-model="form.email"
          @change="$v.form.email.$touch()"
        />
        <div class="error" v-if="!$v.form.email.required">Email is required.</div>
        <div class="error" v-if="!$v.form.email.email">Email must be correct.</div>
      </fieldset>
      <fieldset :class="{ 'input-error': $v.form.description.$error }">
        <label>Description</label>
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
    <md-table>
      <md-table-row>
        <md-table-head md-numeric>Id</md-table-head>
        <md-table-head>Name</md-table-head>
        <md-table-head>Email</md-table-head>
        <md-table-head>Description</md-table-head>
        <md-table-head>Actions</md-table-head>
      </md-table-row>
      <md-table-row v-for="(item, i, index) in table" :key="i">
        <md-table-cell md-numeric >{{ index + 1 }}</md-table-cell>
        <md-table-cell>
          <input
            type="text"
            :value="item.name"
            :disabled="!editable"
          />
        </md-table-cell>
        <md-table-cell>
          <input
            type="text"
            :value="item.email"
            :disabled="!editable"
          />
        </md-table-cell>
        <md-table-cell>
          <input
            type="text"
            :value="item.description"
            :disabled="!editable"
          />
        </md-table-cell>
        <md-table-cell class="table-actions">
          <md-button
            class="md-fab md-mini md-primary"
            v-show="editable"
            @click="onSaveData"
          >
            <md-icon>save</md-icon>
          </md-button>
          <md-button
            class="md-fab md-mini md-primary"
            v-show="!editable"
            @click="onEditData"
          >
            <md-icon>edit</md-icon>
          </md-button>
          <md-button class="md-fab md-mini md-accent" @click="showDeleteModal(i)">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
    <br/><br/>
    <br/><br/>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';
import { mapState, mapActions, mapMutations } from 'vuex';

export default {
  name: 'table',
  async created() {
    await this.getData()
      .then(() => {})
      .catch((error) => {
        this.changeStatus(error);
      });
  },
  computed: {
    ...mapState({
      table: state => state.table.table,
    }),
  },
  data: () => ({
    id: null,
    showDeleteDialog: false,
    editable: false,
    form: {
      name: '',
      email: '',
      description: '',
    },
  }),
  validations: {
    form: {
      name: {
        required,
      },
      email: {
        email,
        required,
      },
      description: {
        required,
      },
    },
  },
  methods: {
    ...mapActions({
      addData: 'table/addData',
      editData: 'table/editData',
      deleteData: 'table/deleteData',
      getData: 'table/getData',
    }),
    ...mapMutations({
      changeStatus: 'app/changeStatus',
    }),
    async onSubmit() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        const data = {
          name: this.form.name,
          email: this.form.email,
          description: this.form.description,
        };
        await this.addData(data)
          .then(() => {
            //Reset fields
            this.$v.$reset();
            Object.keys(this.form).forEach((key) => {
              this.form[key] = '';
            });
            this.changeStatus('Added new data to table');
          })
          .catch((error) => {
            this.changeStatus(error);
          });
      }
    },
    onEditData() {
      this.editable = true;

    },
    async onSaveData() {
      this.editable = false;
      await this.editData()
        .then(() => {
          this.changeStatus('Changed current post');
        })
        .catch((error) => {
          this.changeStatus(error);
        })
        .finally(() => {
          this.showEditDialog = false;
        });
    },
    showDeleteModal(id) {
      this.showDeleteDialog = true;
      this.id = id;
    },
    async onDeleteData() {
      await this.deleteData(this.id)
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

<style scoped>
  >>> .md-table table {
    margin: 0 auto;
    max-width: 1050px;
    text-align: left;
  }

  >>> .table-actions .md-table-cell-container {
    display: flex;
    align-items: center;
  }
</style>

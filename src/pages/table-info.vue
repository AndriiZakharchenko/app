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

    <h1>Table-info</h1>
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

    <md-table
      v-model="table"
      md-card
      md-fixed-header
    >
      <md-table-toolbar>
        <h1 class="md-title">Table</h1>
      </md-table-toolbar>

      <md-table-row
        slot-scope="{ item, index }"
        slot="md-table-row"
      >
        <md-table-cell md-label="ID" md-numeric >{{ index + 1 }}</md-table-cell>
        <md-table-cell md-label="Name">
          <input
            type="text"
            :value="item.name"
            :disabled="!item.isEditable"
          />
        </md-table-cell>
        <md-table-cell md-label="Email">
          <input
            type="email"
            :value="item.email"
            :disabled="!item.isEditable"
          />
        </md-table-cell>
        <md-table-cell md-label="Description">
          <input
            type="text"
            :value="item.description"
            :disabled="!item.isEditable"
          />
        </md-table-cell>
        <md-table-cell class="table-actions" md-label="Actions">
          <md-button
            class="md-fab md-mini md-primary"
            v-show="item.isEditable"
            @click="onSaveData(index)"
            title="Save"
          >
            <md-icon>save</md-icon>
          </md-button>
          <md-button
            class="md-fab md-mini md-primary"
            v-show="!item.isEditable"
            @click="onEditData(index)"
            title="Edit"
          >
            <md-icon>edit</md-icon>
          </md-button>
          <md-button
            class="md-fab md-mini md-accent"
            @click="showDeleteModal(item.id)"
            title="Delete"
          >
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
  name: 'table-info',
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
      changeRow: 'table/changeRow',
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
    onEditData(index) {
      this.changeRow({
        index,
        isEditable: true,
      });
    },
    async onSaveData(index) {
      this.changeRow({
        index,
        isEditable: false,
      });
      // const rowData = {
      //   name: this.table[index].name,
      //   email: this.table[index].email,
      //   description: this.table[index].description,
      // };
      // await this.editData(rowData)
      //   .then(() => {
      //     this.changeStatus('Changed current row');
      //   })
      //   .catch((error) => {
      //     this.changeStatus(error);
      //   });
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
  >>> .md-table {
    text-align: left;
  }

  >>> .table-actions .md-table-cell-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }
</style>

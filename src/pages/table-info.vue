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
          v-model.trim="form.name"
          @change="$v.form.name.$touch()"
        />
        <div class="error" v-if="!$v.form.name.required">Name is required.</div>
      </fieldset>
      <fieldset :class="{ 'input-error': $v.form.email.$error }">
        <label>Email</label>
        <input
          type="email"
          v-model.trim="form.email"
          @change="$v.form.email.$touch()"
        />
        <div class="error" v-if="!$v.form.email.required">Email is required.</div>
        <div class="error" v-if="!$v.form.email.email">Email should be correct.</div>
      </fieldset>
      <fieldset :class="{ 'input-error': $v.form.description.$error }">
        <label>Description</label>
        <input
          type="text"
          v-model.trim="form.description"
          @change="$v.form.description.$touch()"
        />
        <div class="error" v-if="!$v.form.description.required">Description is required.</div>
      </fieldset>
      <md-button
        type="submit"
        :disabled="$v.form.$invalid"
        class="md-raised md-svg-loader"
      >Add Data</md-button>
    </form>

    <md-table
      v-model="table"
      md-card
      md-fixed-header
    >
      <md-table-toolbar>
        <h1 class="md-title">Table</h1>
      </md-table-toolbar>

      <md-table-empty-state>
        Empty Data
      </md-table-empty-state>

      <md-table-row
        slot-scope="{ item, index }"
        slot="md-table-row"
      >
        <md-table-cell md-label="ID" md-numeric >{{ index + 1 }}</md-table-cell>
        <md-table-cell md-label="Name">
          <fieldset :class="{ 'input-error': $v.editableRow.name.$invalid && table[index].isEditable }">
            <input
              type="text"
              v-model.trim="item.name"
              :disabled="!item.isEditable"
              @change="onChangeData(index)"
            />
            <div class="error" v-if="!$v.editableRow.name.required">Name is required.</div>
          </fieldset>
        </md-table-cell>
        <md-table-cell md-label="Email">
          <fieldset :class="{ 'input-error': $v.editableRow.email.$invalid && table[index].isEditable }">
            <input
              type="email"
              v-model.trim="item.email"
              :disabled="!item.isEditable"
              @change="onChangeData(index)"
            />
            <div class="error" v-if="!$v.editableRow.email.required">Email is required.</div>
            <div class="error" v-if="!$v.editableRow.email.email">Email should be correct.</div>
          </fieldset>
        </md-table-cell>
        <md-table-cell md-label="Description">
          <fieldset :class="{ 'input-error': $v.editableRow.description.$invalid && table[index].isEditable }">
            <input
              type="text"
              v-model.trim="item.description"
              :disabled="!item.isEditable"
              @change="onChangeData(index)"
            />
            <div class="error" v-if="!$v.editableRow.description.required">Description is required.</div>
          </fieldset>
        </md-table-cell>
        <md-table-cell class="table-actions" md-label="Actions">
          <md-button
            class="md-fab md-mini md-primary"
            title="Save"
            v-show="item.isEditable"
            :disabled="$v.editableRow.$invalid"
            @click="onSaveData(index)"
          >
            <md-icon>save</md-icon>
          </md-button>
          <md-button
            class="md-fab md-mini md-primary"
            title="Edit"
            v-show="!item.isEditable"
            :disabled="disableEditBtn"
            @click="onEditData(index)"
          >
            <md-icon>edit</md-icon>
          </md-button>
          <md-button
            class="md-fab md-mini md-accent"
            title="Delete"
            @click="showDeleteModal(item.id)"
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
import { mapActions, mapMutations } from 'vuex';

export default {
  name: 'table-info',
  async created() {
    await this.updateData();
  },
  data: () => ({
    id: null,
    showDeleteDialog: false,
    saveDisabled: false,
    table: [],
    form: {
      name: '',
      email: '',
      description: '',
    },
    editableRow: {
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
    editableRow: {
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
  computed: {
    disableEditBtn() {
      return !!this.editableRow.isEditable;
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
            let form = this.form;
            for (let key in form) {
              form[key] = '';
            }
            this.changeStatus('Added new data to table');
          })
          .catch((error) => {
            this.changeStatus(error);
          });

        await this.updateData();
      }
    },
    onEditData(index) {
      this.table[index].isEditable = true;
      this.onChangeData(index);
    },
    onChangeData(index) {
      this.editableRow = {...this.table[index]};
    },
    async onSaveData(index) {
      this.table[index].isEditable = false;
      await this.editData(this.table[index])
        .then(() => {
          this.changeStatus('Changed current row');
          this.editableRow = [];
        })
        .catch((error) => {
          this.changeStatus(error);
        });

      await this.updateData();
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

      await this.updateData();
    },
    updateData() {
      this.getData()
        .then((dataArray) => {
          this.table = dataArray;
        })
        .catch((error) => {
          this.changeStatus(error);
        });
    },
  },
};
</script>

<style scoped>
  >>> .md-table {
    text-align: left;
  }

  >>> .md-table fieldset {
    padding: 0;
    margin-bottom: 0;
  }

  >>> .table-actions .md-table-cell-container {
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  >>> .md-table .error {
    position: absolute;
    bottom: 0;
  }

  >>> .md-table .md-table-cell {
    height: 90px;
  }
</style>

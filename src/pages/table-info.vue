<template>
  <div>
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
          @click.native="deleteData"
        >Delete</md-button>
      </md-dialog-actions>
    </md-dialog>

    <md-dialog :md-active.sync="isShowAddDataModal">
      <md-dialog-title>Add new data to table</md-dialog-title>
      <form @submit.prevent="addData" novalidate>
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
      </form>
      <md-dialog-actions>
        <md-button
          class="md-primary"
          @click="isShowAddDataModal = false"
        >Close</md-button>
        <md-button
          type="submit"
          class="md-raised"
          :disabled="$v.form.$invalid"
        >Add Row</md-button>
      </md-dialog-actions>
    </md-dialog>

    <h1>Table-info</h1>
    <md-button
      type="button"
      class="md-raised"
      @click="isShowAddDataModal = true"
    >Add Row</md-button>
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
              @change="changeData(index)"
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
              @change="changeData(index)"
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
              @change="changeData(index)"
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
            @click="saveData(index)"
          >
            <md-icon>save</md-icon>
          </md-button>
          <md-button
            class="md-fab md-mini md-primary"
            title="Edit"
            v-show="!item.isEditable"
            :disabled="disableEditBtn"
            @click="editData(index)"
          >
            <md-icon>edit</md-icon>
          </md-button>
          <md-button
            class="md-fab md-mini md-accent"
            title="Delete"
            @click="isShowDeleteModal(item.id)"
          >
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>
      </md-table-row>
    </md-table>
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
    isShowAddDataModal: false,
    isShowDeleteModal: false,
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
      ADD_DATA: 'table/ADD_DATA',
      EDIT_DATA: 'table/EDIT_DATA',
      DELETE_DATA: 'table/DELETE_DATA',
      GET_DATA: 'table/GET_DATA',
    }),
    ...mapMutations({
      SHOW_NOTIFICATION: 'app/SHOW_NOTIFICATION',
    }),
    async addData() {
      this.$v.form.$touch();
      if (!this.$v.form.$invalid) {
        const data = {
          name: this.form.name,
          email: this.form.email,
          description: this.form.description,
        };
        await this.ADD_DATA(data)
          .then(() => {
            //Reset fields
            this.$v.$reset();
            for (let key in this.form) {
              this.form[key] = '';
            }
            this.isShowAddDataModal = false;
            this.SHOW_NOTIFICATION('Added new data to table');
          })
          .catch((error) => {
            this.SHOW_NOTIFICATION(error.message);
          });

        await this.updateData();
      }
    },
    editData(index) {
      this.table[index].isEditable = true;
      this.changeData(index);
    },
    changeData(index) {
      this.editableRow = {...this.table[index]};
    },
    async saveData(index) {
      this.table[index].isEditable = false;
      await this.EDIT_DATA(this.table[index])
        .then(() => {
          this.SHOW_NOTIFICATION('Changed current row');
          this.editableRow = [];
        })
        .catch((error) => {
          this.SHOW_NOTIFICATION(error);
        });

      //NOTE: Fetch & update the data
      await this.updateData();
    },
    isShowDeleteModal(id) {
      this.isShowDeleteModal = true;
      this.id = id;
    },
    async deleteData() {
      await this.DELETE_DATA(this.id)
        .then(() => {
          this.SHOW_NOTIFICATION('Deleted current post');
        })
        .catch((error) => {
          this.SHOW_NOTIFICATION(error);
        })
        .finally(() => {
          this.isShowDeleteModal = false;
        });

      //NOTE: Fetch & update the data
      await this.updateData();
    },
    async updateData() {
      await this.GET_DATA()
        .then((dataArray) => {
          this.table = dataArray;
        })
        .catch((error) => {
          this.SHOW_NOTIFICATION(error);
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

  >>> .md-dialog-container {
    min-width: 450px !important;
  }

  >>> .md-dialog-container form {
    margin: 0;
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

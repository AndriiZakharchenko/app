<template>
  <div>
    <h1>Vee validate</h1>
    <validation-observer
      v-slot="{ invalid }"
      tag="div"
    >
      <form
        class="vee-form"
        @submit.prevent="validateForm"
        novalidate
      >
        <validation-provider
          name="name"
          rules="required|alpha"
          v-slot="{ errors, classes }"
          tag="div"
          class="vee-form__item"
        >
          <fieldset :class="{ 'input-error': errors[0] }">
            <label>Name</label>
            <input
              :class="classes"
              v-model="name"
              type="text"
            />
            <span class="error" v-if="errors[0]">{{ errors[0] }}</span>
          </fieldset>
        </validation-provider>
        <validation-provider
          name="email"
          rules="required|email"
          v-slot="{ errors, classes }"
          tag="div"
          class="vee-form__item"
        >
          <fieldset :class="{ 'input-error': errors[0] }">
            <label>Email</label>
            <input
              :class="classes"
              v-model="email"
              type="email"
            />
            <span class="error" v-if="errors[0]">{{ errors[0] }}</span>
          </fieldset>
        </validation-provider>
        <md-button
          type="submit"
          class="md-raised"
          :disabled="invalid"
        >Check the field</md-button>
      </form>
    </validation-observer>
  </div>
</template>

<script>
export default {
  name: 'vee-validate',
  data: () => ({
    name: '',
    email: '',
  }),
  methods: {
    validateForm() {
      alert('Form has been submitted!');
    },
  },
};
</script>

<style scoped>
  .vee-form__item {
    margin-bottom: 25px;
  }
</style>

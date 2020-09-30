<template>
  <fieldset class="form-group" :class="{ 'input-error': hasErrors }">
    <label v-if="label">{{ label }}</label>
    <slot></slot>
    <div class="errors" v-if="hasErrors">
      <div
        class="error"
        v-for="error in activeErrorMessages"
        :key="error"
      >{{ error }}</div>
    </div>
  </fieldset>
</template>

<script>
import { singleErrorExtractorMixin } from 'vuelidate-error-extractor';

export default {
  mixins: [singleErrorExtractorMixin],
  props: {
    label: {
      type: String,
      default: '',
    },
  },
};
</script>

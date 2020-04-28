import Vue from 'vue';
import { ValidationProvider } from 'vee-validate';

Vue.component('ValidationProvider', ValidationProvider);

import { extend } from 'vee-validate';

extend('positive', value => {
  if (value >= 0) {
    return true;
  }

  return 'This field must be a positive number';
});

extend('min', value => {
  if (value >= 3) {
    return true;
  }

  return 'This field must be more than 3';
});

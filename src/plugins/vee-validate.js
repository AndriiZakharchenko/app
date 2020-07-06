import Vue from 'vue';
import { ValidationObserver, ValidationProvider } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import { messages } from 'vee-validate/dist/locale/en.json';
import { extend } from 'vee-validate';
import { configure } from 'vee-validate';

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);

Object.keys(rules).forEach(rule => {
  extend(rule, {
    ...rules[rule], // copies rule configuration
    message: messages[rule], // assign message
  });
});

configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid',
    dirty: ['is-dirty', 'is-dirty'], // multiple classes per flag!
  },
});

/* Custom validation*/
extend('positive', value => {
  if (value >= 0) {
    return true;
  }

  return 'This field must be a positive number';
});

extend('minmax', {
  validate(value, args) {
    const length = value.length;
    return length >= args.min && length <= args.max;
  },
  params: ['min', 'max'],
  message: 'This field must be more than {min}, less {max}',
});

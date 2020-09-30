import Vue from 'vue';
import Vuelidate from 'vuelidate';
import VuelidateErrorExtractor from 'vuelidate-error-extractor';

import formGroup from '@/components/FormGroup';

Vue.use(Vuelidate);
Vue.use(VuelidateErrorExtractor, {
  template: formGroup,
  messages: {
    required: '{attribute} is required!',
    email: '{attribute} is not a valid address.',
    minLength: '{attribute} must have at more 6 letters.',
    sameAsPassword: 'Passwords should be identical.',
  },
});

<template>
  <div>
    <h1>Sign up</h1>
    <form
      @submit.prevent="onSubmit"
      novalidate
    >
      <form-group :validator="$v.email" label="Email">
        <input
          type="email"
          placeholder="Enter your email"
          v-model.trim="email"
          @change="$v.email.$touch()"
        />
      </form-group>
      <form-group :validator="$v.password" label="Password">
        <input
          type="password"
          placeholder="Enter your password"
          v-model.trim="password"
          @change="$v.password.$touch()"
        />
      </form-group>
      <form-group :validator="$v.repeatPassword" label="Repeat password">
        <input
          type="password"
          placeholder="Repeat your password"
          v-model.trim="repeatPassword"
          @change="$v.repeatPassword.$touch()"
        />
      </form-group>
      <div class="button-wrap">
        <md-button
          class="md-raised"
          type="submit"
          :disabled="$v.$invalid || isLoading"
        >
          <span v-if="isLoading">Register...</span>
          <md-progress-spinner
            v-if="isLoading"
            :md-diameter="16"
            :md-stroke="2"
            md-mode="indeterminate"
          />
          <span v-else>Registration</span>
        </md-button>
      </div>
    </form>
    <div>Do you have account?
      <router-link :to="{name: 'login'}">Login</router-link>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { email, sameAs, minLength, required } from 'vuelidate/lib/validators';

export default {
  name: 'sign-up',
  data: () => ({
    email: '',
    password: '',
    repeatPassword: '',
  }),
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
      minLength: minLength(6),
    },
    repeatPassword: {
      sameAsPassword: sameAs('password'),
    },
  },
  computed: {
    ...mapState({
      isLoading: state => state.app.isLoading,
    }),
  },
  methods: {
    ...mapActions({
      REGISTER_USER: 'user/REGISTER_USER',
    }),
    ...mapMutations({
      SHOW_NOTIFICATION: 'app/SHOW_NOTIFICATION',
    }),
    async onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.SHOW_NOTIFICATION('Please enter the valid values in the form');
      } else {
        const user = {
          email: this.email,
          password: this.password,
        };
        await this.REGISTER_USER(user)
          .then(() => {
            this.SHOW_NOTIFICATION('Registered');
            this.$router.push('/');
          })
          .catch((error) => {
            this.SHOW_NOTIFICATION(error.message);
          });
      }
    },
  },
};
</script>


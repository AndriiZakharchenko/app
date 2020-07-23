<template>
  <div>
    <md-snackbar
      class="md-theme-demo-light"
      md-position="center"
      :md-duration="4000"
      :md-active.sync="showStatus"
      md-persistent
>
      <span>{{ status }}</span>
    </md-snackbar>
    <h1>Registration</h1>
    <form @submit.prevent="onSubmit">
      <fieldset :class="{ 'input-error': $v.email.$error }">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          placeholder="Enter your email"
          v-model="email"
          @change="$v.email.$touch()"
        />
        <div class="error" v-if="!$v.email.required">Password is required.</div>
        <div class="error" v-if="!$v.email.email">Email must be correct.</div>
      </fieldset>
      <fieldset :class="{ 'input-error': $v.password.$error }">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          placeholder="Enter your password"
          v-model="password"
          @change="$v.password.$touch()"
        />
        <div class="error" v-if="!$v.password.required">Password is required.</div>
        <div class="error" v-if="!$v.password.minLength">Password must have at least {{
          $v.password.$params.minLength.min }} letters.
        </div>
      </fieldset>
      <fieldset :class="{ 'input-error': $v.repeatPassword.$error }">
        <label for="repeat-password">Repeat password</label>
        <input
          type="password"
          id="repeat-password"
          placeholder="Repeat your password"
          v-model="repeatPassword"
          @change="$v.repeatPassword.$touch()"
        />
        <div class="error" v-if="!$v.repeatPassword.sameAsPassword">Passwords must be identical.</div>
      </fieldset>
      <div class="button-wrap">
        <md-button
          class="md-raised"
          type="submit"
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
import { mapState, mapMutations } from 'vuex';
import { email, sameAs, minLength, required } from 'vuelidate/lib/validators';

export default {
  name: 'registration',
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
    ...mapMutations({
      changeStatus: 'app/changeStatus',
    }),
    async onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.changeStatus('Please enter the valid values in the form');
      } else {
        const user = {
          email: this.email,
          password: this.password,
        };
        await this.$store.dispatch('user/registerUser', user)
          .then(() => {
            this.changeStatus('Registered');
            setTimeout(() => {
              this.$router.push('/');
            }, 1000);
          })
          .catch((error) => {
            this.changeStatus(error);
          });
      }
    },
  },
};
</script>


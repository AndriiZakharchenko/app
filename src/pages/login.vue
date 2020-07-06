<template>
  <div>
    <md-snackbar
      class="md-theme-demo-light"
      md-position="center"
      :md-duration="4000"
      :md-active.sync="showStatus"
      md-persistent>
      <span>{{ status }}</span>
    </md-snackbar>

    <h1>Login</h1>
    <form @submit.prevent="onSubmit" novalidate>
      <fieldset :class="{ 'input-error': $v.email.$error }">
        <label for="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your email"
          v-model="email"
          @change="$v.email.$touch()"
        />
        <div class="error" v-show="!$v.email.required">Password is required.</div>
        <div class="error" v-show="!$v.email.email">Email must be correct.</div>
      </fieldset>
      <fieldset :class="{ 'input-error': $v.password.$error }">
        <label for="password">Password</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Enter your password"
          v-model="password"
          @change="$v.password.$touch()"
        />
        <div class="error" v-show="!$v.password.required">Password is required.</div>
        <div class="error" v-show="!$v.password.minLength">Password must have at least {{ $v.password.$params.minLength.min }} letters.</div>
      </fieldset>
      <div class="button-wrap">
        <md-button
          class="md-raised"
          type="submit"
          :disabled="isLoading">
          <span v-if="!isLoading">Login</span>
          <md-progress-spinner
            v-else
            :md-diameter="16"
            :md-stroke="2"
            md-mode="indeterminate"/>
        </md-button>
      </div>
    </form>
    <div>Need registration? <router-link :to="{name: 'registration'}">Enter here</router-link> </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { required, email, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: '',
    status: '',
    showStatus: false,
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
  },
  computed: {
    ...mapState({
      isLoading: state => state.user.isLoading,
    }),
  },
  methods: {
    async onSubmit() {
      this.$v.$touch();
      if (this.$v.$invalid) {
        this.status = 'Error';
        this.showStatus = true;
      } else {
        const user = {
          email: this.email,
          password: this.password,
        };
        await this.$store.dispatch('user/loginUser', user)
          .then(() => {
            this.status = 'Logging';
            this.showStatus = true;
            console.info('Logging');
            this.$router.push('/');
          })
          .catch((error) => {
            this.showStatus = true;
            this.status = error;
          });
      }
    },
  },
};
</script>


<template>
  <div>
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
        <div class="error" v-if="!$v.email.required">Password is required.</div>
        <div class="error" v-if="!$v.email.email">Email should be correct.</div>
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
        <div class="error" v-if="!$v.password.required">Password is required.</div>
        <div class="error" v-if="!$v.password.minLength">Password must have at least {{ $v.password.$params.minLength.min }} letters.</div>
      </fieldset>
      <div class="button-wrap">
        <md-button
          class="md-raised"
          type="submit"
          :disabled="$v.$invalid || isLoading"
        >
          <md-progress-spinner
            v-if="isLoading"
            :md-diameter="16"
            :md-stroke="2"
            md-mode="indeterminate"
          />
          <span v-else>Login</span>
        </md-button>
      </div>
    </form>
    <div>Need registration? <router-link :to="{name: 'registration'}">Enter here</router-link> </div>
  </div>
</template>

<script>
import { mapState, mapActions, mapMutations } from 'vuex';
import { required, email, minLength } from 'vuelidate/lib/validators';

export default {
  name: 'login',
  data: () => ({
    email: '',
    password: '',
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
      isLoading: state => state.app.isLoading,
    }),
  },
  methods: {
    ...mapActions({
      loginUser: 'user/loginUser',
    }),
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
        await this.loginUser(user)
          .then(() => {
            this.changeStatus('Logging');
            this.$router.push('/');
          })
          .catch((error) => {
            this.changeStatus(error.message);
          });
      }
    },
  },
};
</script>


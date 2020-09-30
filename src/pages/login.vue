<template>
  <div>
    <h1>Login</h1>
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
    <div>Need registration? <router-link :to="{name: 'sign-up'}">Enter here</router-link> </div>
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
      LOGIN_USER: 'user/LOGIN_USER',
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
        await this.LOGIN_USER(user)
          .then(() => {
            this.SHOW_NOTIFICATION('Logging');
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


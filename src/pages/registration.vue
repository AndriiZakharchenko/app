<template>
  <div>
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
        <div class="error" v-show="!$v.email.required">Password is required.</div>
        <div class="error" v-show="!$v.email.email">Email must be correct.</div>
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
        <div class="error" v-show="!$v.password.required">Password is required.</div>
        <div class="error" v-show="!$v.password.minLength">Password must have at least {{ $v.password.$params.minLength.min }} letters.</div>
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
        <div class="error" v-show="!$v.repeatPassword.sameAsPassword">Passwords must be identical.</div>
      </fieldset>
      <div class="button-wrap">
        <md-button class="md-raised" type="submit" :disabled="getLoading">
          <span v-if="getLoading">Sending...</span>
          <span v-else>Registration</span>
        </md-button>
        <md-progress-spinner v-if="getLoading" :md-diameter="20" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
      </div>
      <p style="text-align: center">{{ submitStatus }}</p>
    </form>
    <div>Do you have account? <router-link to="/login">Login</router-link> </div>
  </div>
</template>

<script>
  import { email, sameAs, minLength, required } from 'vuelidate/lib/validators'

  export default {
    name: "registration",
    data() {
      return {
        email: '',
        password: '',
        repeatPassword: '',
        submitStatus: ''
      }
    },
    validations: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6)
      },
      repeatPassword: {
        sameAsPassword: sameAs('password')
      }
    },
    computed: {
      getLoading() {
        return this.$store.getters.getLoading;
      },
      getError() {
        return this.$store.getters.getError;
      },
    },
    methods: {
      onSubmit() {
        console.log('submit!');
        this.$v.$touch();
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          const user = {
            email: this.email,
            password: this.password
          };
          this.$store.dispatch('registerUser', user)
            .then(() => {
              console.log('REGISTER');
              this.submitStatus = 'OK';
              this.$router.push('/');
            })
            .catch((err) => {
              this.submitStatus = err;
            })
        }
      }
    }
  }
</script>


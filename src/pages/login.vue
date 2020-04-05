<template>
  <div>
    <h1>Login</h1>
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
      <div class="button-wrap">
        <md-button class="md-raised" type="submit" :disabled="submitStatus === 'PENDING'">Login</md-button>
        <md-progress-spinner v-if="submitStatus === 'PENDING'" :md-diameter="20" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
      </div>
      <p class="typo__p" v-if="submitStatus === 'OK'">Thanks for your submission!</p>
      <p class="typo__p" v-if="submitStatus === 'ERROR'">Please fill the form correctly.</p>
      <p class="typo__p" v-if="submitStatus === 'PENDING'">Sending...</p>
    </form>
    <div>Need registration? <router-link to="/registration">Enter here</router-link> </div>
  </div>
</template>

<script>
  import { required, email, minLength } from 'vuelidate/lib/validators'

  export default {
    name: "login",
    data() {
      return {
        email: '',
        password: '',
        submitStatus: null
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
    },
    methods: {
      onSubmit() {
        console.log('submit!')
        this.$v.$touch()
        if (this.$v.$invalid) {
          this.submitStatus = 'ERROR'
        } else {
          const user = {
            email: this.email,
            password: this.password
          };
          console.log(user);
          this.submitStatus = 'PENDING';
          setTimeout(() => {
            this.submitStatus = 'OK'
          }, 1500)
        }
      }
    }
  }
</script>


<template>
  <div>
    <md-snackbar class="md-theme-demo-light" md-position="center" :md-duration="1000" :md-active.sync="showStatus" md-persistent>
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
        <md-button class="md-raised" type="submit" :disabled="loading">
          <span v-if="loading">Register...</span>
          <span v-else>Registration</span>
        </md-button>
        <md-progress-spinner v-if="loading" :md-diameter="20" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
      </div>
    </form>
    <div>Do you have account? <router-link :to="{name: 'login'}">Login</router-link></div>
  </div>
</template>

<script>
  import { mapState }  from 'vuex';
  import { email, sameAs, minLength, required } from 'vuelidate/lib/validators'

  export default {
    name: "registration",
    data() {
      return {
        email: '',
        password: '',
        repeatPassword: '',
        status: '',
        showStatus: false,
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
      ...mapState({
        loading: state => state.user.loading,
      }),
    },
    methods: {
      onSubmit() {
        this.$v.$touch();
        if (this.$v.$invalid) {
          this.status = 'Error';
          this.showStatus = true;
        } else {
          const user = {
            email: this.email,
            password: this.password
          };
          this.$store.dispatch('user/registerUser', user)
            .then(() => {
              this.status = 'Register';
              this.showStatus = true;
              console.info('Register');
              setTimeout(() => {
                this.$router.push('/');
              }, 1000);
            })
            .catch((error) => {
              this.showStatus = true;
              this.status = error;
            })
        }
      }
    }
  }
</script>


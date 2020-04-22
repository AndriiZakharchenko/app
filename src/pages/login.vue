<template>
  <div>
    <md-snackbar class="md-theme-demo-light" md-position="center" :md-duration="1000" :md-active.sync="showStatus" md-persistent>
      <span>{{ status }}</span>
    </md-snackbar>

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
        <md-button class="md-raised" type="submit" :disabled="loading">
          <span v-if="loading">Sending...</span>
          <span v-else>Login</span>
        </md-button>
        <md-progress-spinner v-if="loading" :md-diameter="20" :md-stroke="3" md-mode="indeterminate"></md-progress-spinner>
      </div>
    </form>
    <div>Need registration? <router-link :to="{name: 'registration'}">Enter here</router-link> </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex';
  import { required, email, minLength } from 'vuelidate/lib/validators';

  export default {
    name: "login",
    data() {
      return {
        email: '',
        password: '',
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
            password: this.password,
          };
          this.$store.dispatch('user/loginUser', user)
            .then(() => {
              this.status = 'Logging';
              this.showStatus = true;
              console.info('Logging');
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


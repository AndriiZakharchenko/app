<template>
  <div>
    <h1>Vue router</h1>
    <button @click="goBack">Go back</button>
    <div class="nav">
      <router-link :to="{name: 'profile'}">Profile</router-link>
      <router-link :to="{name: 'posts'}">Posts</router-link>
    </div>
    <h2>User</h2>
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'vuerouter',
  methods: {
    goBack() {
      window.history.length > 1 ? this.$router.go(-1) : this.$router.push('/');
    },
  },
  // beforeRouteUpdate (to, from, next) {
  //   next();
  // }
};
</script>


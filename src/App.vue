<template>
  <div id="app" class="layout">
    <div
      class="icon-load"
      :class="{'active': preloader}"
    >
      <div class="sk-folding-cube">
        <div class="sk-cube1 sk-cube"></div>
        <div class="sk-cube2 sk-cube"></div>
        <div class="sk-cube4 sk-cube"></div>
        <div class="sk-cube3 sk-cube"></div>
      </div>
    </div>

    <the-header />
    <transition name="fade" mode="out-in">
      <main>
        <router-view />
      </main>
    </transition>
    <the-footer />
  </div>
</template>

<script>
// @ is an alias to /src
import TheHeader from './components/TheHeader';
import TheFooter from './components/TheFooter';
import { mapState } from 'vuex';

export default {
  components: {TheFooter, TheHeader},
  mounted() {
    setTimeout(() => {
      this.$store.commit('app/removePreloader', false);
    }, 1500);
  },
  computed: {
    ...mapState({
      preloader: state => state.app.preloader,
    }),
  }
};
</script>

<style scoped lang="scss">
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    main {
      flex: 1;
    }
  }
</style>

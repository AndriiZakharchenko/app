<template>
  <div id="app" class="layout">
    <!--    Preloader    -->
    <div
      v-if="showPreloader"
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

    <!--    Notification    -->
    <md-snackbar
      class="md-theme-demo-light"
      md-position="center"
      md-persistent
      :md-duration="statusDuration"
      :md-active.sync="showStatus"
    >
      <span>{{ status }}</span>
    </md-snackbar>

    <the-header />
    <main>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </main>
    <the-footer />
  </div>
</template>

<script>
import TheHeader from './components/TheHeader';
import TheFooter from './components/TheFooter';
import { mapState } from 'vuex';

export default {
  components: {
    TheFooter,
    TheHeader,
  },
  mounted() {
    if (this.preloader) {
      setTimeout(() => {
        this.$store.commit('app/removePreloader');
      }, 1000);
      setTimeout(() => {
        this.showPreloader = false;
      }, 1500);
    }
  },
  data: () => ({
    showPreloader: true,
    statusDuration: 4000,
  }),
  computed: {
    ...mapState({
      preloader: state => state.app.preloader,
      status: state => state.app.status,
    }),
    showStatus: {
      get() {
        return this.$store.state.app.showStatus;
      },
      set(val) {
        setTimeout(() => {
          this.$store.commit('app/clearStatus', val);
        }, this.statusDuration);
      },
    },
  },
};
</script>

<style scoped lang="scss">
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;

    main {
      flex: 1;
      padding: 40px 0;
    }
  }
</style>

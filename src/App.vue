<template>
  <div id="app" class="layout">
    <!-- PRELOADER -->
    <div
      v-if="showPreloader"
      class="icon-load"
      :class="{'active': showPreloaderAnimation}"
    >
      <div class="sk-folding-cube">
        <div class="sk-cube1 sk-cube"></div>
        <div class="sk-cube2 sk-cube"></div>
        <div class="sk-cube4 sk-cube"></div>
        <div class="sk-cube3 sk-cube"></div>
      </div>
    </div>
    <!-- PRELOADER EOF -->

    <!-- NOTIFICATION -->
    <md-snackbar
      class="md-theme-demo-light"
      md-position="center"
      md-persistent
      :md-duration="notificationDuration"
      :md-active.sync="showNotification"
    >
      <span>{{ notificationMessage }}</span>
    </md-snackbar>
    <!-- NOTIFICATION EOF-->

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
import TheHeader from '@/components/TheHeader';
import TheFooter from '@/components/TheFooter';
import { mapState } from 'vuex';

export default {
  components: {
    TheFooter,
    TheHeader,
  },
  mounted() {
    if (this.showPreloader) {
      setTimeout(() => {
        this.showPreloaderAnimation = false;
      }, 1000);
      setTimeout(() => {
        this.$store.commit('app/HIDE_PRELOADER');
      }, 1500);
    }
  },
  data: () => ({
    showPreloaderAnimation: true,
    notificationDuration: 3000,
  }),
  computed: {
    ...mapState({
      showPreloader: state => state.app.showPreloader,
      notificationMessage: state => state.app.notificationMessage,
    }),
    showNotification: {
      get() {
        return this.$store.state.app.showNotification;
      },
      set(val) {
        this.$store.commit('app/HIDE_NOTIFICATION', val);
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
      padding: 40px 100px;
    }
  }
</style>

<template>
  <div id="app" class="layout">
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

export default {
  components: {TheFooter, TheHeader},
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

<template>
  <footer class="section has-text-centered">
    <b>
      <i>{{ date }}</i>
    </b>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  data: () => ({
    date: null,
  }),
  mounted() {
    const timeOptions = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: false,
    };
    let setCurrentTime = setInterval(() => {
      this.date = new Intl.DateTimeFormat('en-GB', timeOptions).format(new Date());
    }, 1000);

    // Memory leak optimization
    this.$once('hook:beforeDestroy', () => {
      clearInterval(setCurrentTime);
    });
  },
};
</script>

<style scoped>
  footer {
    padding: 40px 0;
    background-color: #333;
    color: #fff;
  }
</style>

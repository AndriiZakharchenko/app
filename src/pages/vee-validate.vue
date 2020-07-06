<template>
  <div>
    <h1>Vee validate</h1>
    <form>
      <validation-provider rules="positive|min" v-slot="{ errors }">
        <label>Name</label>
        <input v-model="name" type="text"/>
        <span>{{ errors[0] }}</span>
      </validation-provider>
      <br/><br/>
      <md-button type="submit" class="md-raised">Check the field</md-button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'vee-validate',
  data: () => ({
    name: '',
  }),
};
</script>

<style scoped>

</style>

<template>
  <v-app id="inspire">
    <v-main class="q-main">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

export default {
  name: 'App',

  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
  .q-main {
    width: 100%;
    margin: 0 auto;
  }
</style>

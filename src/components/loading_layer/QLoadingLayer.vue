<template>
  <v-overlay
    :value="value"
    class="q-loading-layer"
    z-index="9999"
  >
    <v-progress-circular
      indeterminate
      color="primary"
    ></v-progress-circular>
  </v-overlay>
</template>

<script>

export default {
  props: {
    value: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<template >
   <v-snackbar
      :value="value"
      color="red"
      timeout="3000"
      @input="$emit('input', $event)"
    >
      {{ text }}

      <template v-slot:action="{ attrs }">
        <v-btn
          color="white"
          icon
          v-bind="attrs"
          @click="$emit('input', false)"
        >
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </template>

    </v-snackbar>
</template>
<script>
export default {
  props: {
    value: {
      type: Boolean,
      default: false
    },
    text: {
      type: String,
      default: ''
    }
  }
}
</script>

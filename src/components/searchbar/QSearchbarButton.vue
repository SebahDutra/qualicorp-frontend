<template>
  <v-btn
    fab
    dark
    elevation="0"
    color="primary"
    class="ml-auto mr-2 my-auto"
    @click="$emit('click', $event)"
  >
    <v-icon dark>
      mdi-magnify
    </v-icon>
  </v-btn>
</template>

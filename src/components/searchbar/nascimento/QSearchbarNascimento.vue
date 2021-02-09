<template>
  <v-menu
    class="q-searchbar-nascimento"
    eager
    bottom
    offset-y
    nudge-bottom="20"
    rounded="xl"
    :close-on-content-click="false"
  >
    <template #activator="{ on }">
      <q-searchbar-nascimento-item
        :data-nascimento="dataNascimento"
        v-on="on"
      />
    </template>

    <template #default>
      <q-searchbar-nascimento-form
        v-model="dataNascimento"
      />
    </template>

  </v-menu>
</template>

<script>

import QSearchbarNascimentoItem from './QSearchbarNascimentoItem'
import QSearchbarNascimentoForm from './QSearchbarNascimentoForm'

export default {
  components: {
    QSearchbarNascimentoItem,
    QSearchbarNascimentoForm
  },

  props: {
    value: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      dataNascimento: null
    }
  },

  watch: {
    value: {
      immediate: true,
      handler: function (value) {
        this.dataNascimento = value
      }
    },

    dataNascimento (value) {
      this.$emit('input', value)
    }
  }
}
</script>

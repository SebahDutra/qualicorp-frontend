<template>
  <v-menu
    class="q-searchbar-localizacao"
    eager
    bottom
    offset-y
    nudge-bottom="20"
    rounded="xl"
    :close-on-content-click="false"
  >
    <template #activator="{ on }">
      <q-searchbar-localizacao-item
        :uf="localizacao.uf"
        :cidade="localizacao.cidade"
        v-on="on"
      />
    </template>

    <template #default>
      <q-searchbar-localizacao-form
        :uf.sync="localizacao.uf"
        :cidade.sync="localizacao.cidade"
      />
    </template>

  </v-menu>
</template>

<script>

import QSearchbarLocalizacaoItem from './QSearchbarLocalizacaoItem'
import QSearchbarLocalizacaoForm from './QSearchbarLocalizacaoForm'

export default {
  components: {
    QSearchbarLocalizacaoItem,
    QSearchbarLocalizacaoForm
  },

  props: {
    uf: {
      type: String,
      default: null
    },
    cidade: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      localizacao: {
        uf: '',
        cidade: ''
      }
    }
  },

  watch: {
    'localizacao.uf': {
      handler: function (value) {
        this.$emit('update:uf', value)
      }
    },

    'localizacao.cidade': {
      handler: function (value) {
        this.$emit('update:cidade', value)
      }
    },

    uf: {
      immediate: true,
      handler: function (value) {
        this.localizacao.uf = value
      }
    },

    cidade: {
      immediate: true,
      handler: function (value) {
        this.localizacao.cidade = value
      }
    }
  }
}
</script>

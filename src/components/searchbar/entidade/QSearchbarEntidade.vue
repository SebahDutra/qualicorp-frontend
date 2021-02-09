<template>
  <v-menu
    class="q-searchbar-entidade"
    eager
    bottom
    offset-y
    nudge-bottom="20"
    rounded="xl"
    :close-on-content-click="false"
  >
    <template #activator="{ on }">
      <q-searchbar-entidade-item
        :profissao="dadosProfissionais.profissao"
        :entidade="dadosProfissionais.entidade"
        v-on="on"
      />
    </template>

    <template #default>
      <q-searchbar-entidade-form
        :profissao.sync="dadosProfissionais.profissao"
        :entidade.sync="dadosProfissionais.entidade"
        :uf="uf"
        :cidade="cidade"
      />
    </template>

  </v-menu>
</template>

<script>

import QSearchbarEntidadeItem from './QSearchbarEntidadeItem'
import QSearchbarEntidadeForm from './QSearchbarEntidadeForm'

export default {
  components: {
    QSearchbarEntidadeItem,
    QSearchbarEntidadeForm
  },

  props: {
    profissao: {
      type: String,
      default: null
    },
    entidade: {
      type: String,
      default: null
    },
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
      dadosProfissionais: {
        profissao: '',
        entidade: ''
      }
    }
  },

  watch: {
    'dadosProfissionais.profissao': {
      handler: function (value) {
        this.$emit('update:profissao', value)
      }
    },

    'dadosProfissionais.entidade': {
      handler: function (value) {
        this.$emit('update:entidade', value)
      }
    },

    profissao: {
      immediate: true,
      handler: function (value) {
        this.dadosProfissionais.profissao = value
      }
    },

    entidade: {
      immediate: true,
      handler: function (value) {
        this.dadosProfissionais.entidade = value
      }
    }
  }
}
</script>

<template>
  <q-searchbar-form
    class="q-searchbar-entidade-form"
  >
    <v-autocomplete
      v-model="dadosProfissionais.profissao"
      :items="listaProfissoes"
      :loading="loadingProfissoes"
      :dense="!$vuetify.breakpoint.mobile"
      :no-data-text="noDataTextProfissao"
      label="Profissão"
      outlined
      @change="evChangeProfissao"
    />

    <v-autocomplete
      v-model="dadosProfissionais.entidade"
      :items="listaEntidades"
      :loading="loadingEntidades"
      :dense="!$vuetify.breakpoint.mobile"
      :no-data-text="noDataTextEntidade"
      label="Entidade"
      outlined
      @change="evChangeEntidade"
    />
  </q-searchbar-form>
</template>

<script>
import QSearchbarForm from '../base_components/QSearchbarForm'
import apiQualicorp from '@/services/apiQualicorp'

export default {
  components: {
    QSearchbarForm
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
        profissao: null,
        entidade: null
      },
      listaProfissoes: [],
      listaEntidades: [],
      loadingProfissoes: false,
      loadingEntidades: false
    }
  },

  computed: {
    noDataTextProfissao () {
      return this.loadingProfissoes ? 'Carregando profissões...' : 'Informe a localização primeiro'
    },

    noDataTextEntidade () {
      return this.loadingEntidades ? 'Carregando entidades...' : 'Selecione uma profissão primeiro'
    }
  },

  watch: {
    'dadosProfissionais.profissao': {
      handler: function (value) {
        value && this.buscarListaEntidades(value, this.uf, this.cidade)
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
    },

    cidade: {
      immediate: true,
      handler: function (value) {
        this.$emit('update:profissao', null)
        this.$emit('update:entidade', null)
        this.listaProfissoes = []
        this.listaEntidades = []

        value && this.buscarListaProfissoes(this.uf, this.cidade)
      }
    }
  },

  methods: {
    evChangeProfissao (profissao) {
      this.$emit('update:profissao', profissao)
      this.$emit('update:entidade', null)
    },

    evChangeEntidade (entidade) {
      this.$emit('update:entidade', entidade)
    },

    buscarListaProfissoes (uf, cidade) {
      this.listaProfissoes = []
      this.loadingProfissoes = true
      apiQualicorp.getProfissoes(uf, cidade)
        .then(this.handleSuccesBuscarListaProfissoes)
        .catch(this.handleErrorBuscarListaProfissoes)
        .finally(() => (this.loadingProfissoes = false))
    },

    buscarListaEntidades (profissao, uf, cidade) {
      this.listaEntidades = []
      this.loadingEntidades = true
      apiQualicorp.getEntidades(profissao, uf, cidade)
        .then((lista) => (this.listaEntidades = lista))
        .catch(this.handleErrorBuscarListaEntidades)
        .finally(() => (this.loadingEntidades = false))
    },

    handleSuccesBuscarListaProfissoes (data) {
      this.listaProfissoes = data
      this.profissao && this.buscarListaEntidades(this.profissao, this.uf, this.cidade)
    },

    handleErrorBuscarListaProfissoes (error) {
      console.log(error)
    },

    handleErrorBuscarListaEntidades (error) {
      console.log(error)
    }

  }
}
</script>

<style lang="scss" scoped>
  .q-searchbar-entidade-form {
    width: 400px;
    background-color: white;
  }
</style>

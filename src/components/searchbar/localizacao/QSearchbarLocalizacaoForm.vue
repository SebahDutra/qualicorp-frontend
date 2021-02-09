<template>
  <q-searchbar-form
    class="q-searchbar-localizacao-form"
  >
    <v-autocomplete
      v-model="localizacao.uf"
      :items="listaUfs"
      :loading="loadingUfs"
      :dense="!$vuetify.breakpoint.mobile"
      :no-data-text="noDataTextUf"
      item-text="sigla"
      label="Estados"
      outlined
      @change="evChangeUf"
    />

    <v-autocomplete
      v-model="localizacao.cidade"
      :items="listaCidades"
      :loading="loadingCidades"
      :dense="!$vuetify.breakpoint.mobile"
      :no-data-text="noDataTextCidade"
      item-text="nome"
      label="Cidade"
      outlined
      @change="evChangeCidade"
    />
  </q-searchbar-form>
</template>

<script>
import QSearchbarForm from '../base_components/QSearchbarForm'
import apiIBGE from '@/services/apiIBGE'

export default {
  components: {
    QSearchbarForm
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
        uf: null,
        cidade: null
      },
      listaUfs: [],
      listaCidades: [],
      loadingUfs: false,
      loadingCidades: false
    }
  },

  computed: {
    noDataTextUf () {
      return this.loadingUfs ? 'Carregando estados...' : 'Não foi possível carregar os estados'
    },

    noDataTextCidade () {
      return this.loadingCidades ? 'Carregando cidades...' : 'Selecione um estado primeiro'
    }
  },

  watch: {
    'localizacao.uf': {
      handler: function (value) {
        const ufSelecionado = this.listaUfs.find((uf) => uf.sigla === value)
        ufSelecionado && this.buscarListaCidades(ufSelecionado.id)
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
  },

  created () {
    this.buscarListaUfs()
  },

  methods: {
    evChangeUf (uf) {
      this.$emit('update:uf', uf)
      this.$emit('update:cidade', null)
    },

    evChangeCidade (cidade) {
      this.$emit('update:cidade', cidade)
    },

    buscarListaUfs () {
      this.listaUfs = []
      this.loadingUfs = true
      apiIBGE.getUfs()
        .then(this.handleSuccesBuscarListaUfs)
        .catch(this.handleErrorBuscarListaUfs)
        .finally(() => (this.loadingUfs = false))
    },

    buscarListaCidades (idUf) {
      this.listaCidades = []
      this.loadingCidades = true
      apiIBGE.getCidades(idUf)
        .then((lista) => (this.listaCidades = lista))
        .catch(this.handleErrorBuscarListaCidades)
        .finally(() => (this.loadingCidades = false))
    },

    handleSuccesBuscarListaUfs (data) {
      this.listaUfs = data
      if (this.uf) {
        const ufSelecionado = this.listaUfs.find((uf) => uf.sigla === this.uf)
        ufSelecionado && this.buscarListaCidades(ufSelecionado.id)
      }
    },

    handleErrorBuscarListaUfs (error) {
      console.log(error)
    },

    handleErrorBuscarListaCidades (error) {
      console.log(error)
    }

  }
}
</script>

<style lang="scss" scoped>
  .q-searchbar-localizacao-form {
    width: 400px;
    background-color: white;
  }
</style>

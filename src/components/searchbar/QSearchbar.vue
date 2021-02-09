<template>
  <div
    v-if="$vuetify.breakpoint.mobile"
    class="q-searchbar q-searchbar__mobile"
  >
    <v-btn
      color="primary"
      rounded
      dark
      x-large
      @click="mostaDialog = true"
    >
      {{ textoBotaoMobile }}
    </v-btn>

    <q-searchbar-dialog
      v-model="mostaDialog"
      :profissao.sync="profissao"
      :entidade.sync="entidade"
      :uf.sync="uf"
      :cidade.sync="cidade"
      :data-nascimento.sync="dataNascimento"
      @click:pesquisar="evBtnPesquisar"
    />
  </div>

  <div
    v-else
    class="q-searchbar q-searchbar__desktop"
  >
    <q-searchbar-localizacao
      class="q-searchbar__localizacao"
      :uf.sync="uf"
      :cidade.sync="cidade"
    />

    <q-searchbar-divider />

    <q-searchbar-entidade
      :profissao.sync="profissao"
      :entidade.sync="entidade"
      :uf="uf"
      :cidade="cidade"
    />

    <q-searchbar-divider />

    <q-searchbar-nascimento
      v-model="dataNascimento"
    />

    <q-searchbar-button
      @click="evBtnPesquisar"
    />
  </div>
</template>

<script>

import QSearchbarLocalizacao from './localizacao/QSearchbarLocalizacao'
import QSearchbarEntidade from './entidade/QSearchbarEntidade'
import QSearchbarNascimento from './nascimento/QSearchbarNascimento'
import QSearchbarButton from './QSearchbarButton'
import QSearchbarDivider from './QSearchbarDivider'
import QSearchbarDialog from './QSearchbarDialog'
import apiQualicorp from '@/services/apiQualicorp'

export default {
  components: {
    QSearchbarLocalizacao,
    QSearchbarEntidade,
    QSearchbarNascimento,
    QSearchbarButton,
    QSearchbarDivider,
    QSearchbarDialog
  },

  props: {
    textoBotaoMobile: {
      type: String,
      default: 'Conheça os planos'
    }
  },

  data () {
    return {
      uf: null,
      cidade: null,
      profissao: null,
      entidade: null,
      dataNascimento: null,

      mostaDialog: false,
      loading: false
    }
  },

  watch: {
    cidade () {
      this.profissao = null
    },

    loading (value) {
      this.emitChangeEstado(value ? 'pesquisando' : 'normal')
    }
  },

  methods: {

    emitChangeEstado (estado) {
      ['pesquisando', 'normal'].includes(estado) && this.$emit('change:estado', estado)
    },

    emitResultado (resultado) {
      this.$emit('resultado', {
        planos: resultado,
        parametros: {
          uf: this.uf,
          cidade: this.cidade,
          profissao: this.profissao,
          entidade: this.entidade,
          dataNascimento: this.dataNascimento
        }
      })
    },

    emitErro (mensagem) {
      this.$emit('erro', mensagem)
    },

    evBtnPesquisar () {
      if (!this.uf || !this.cidade) {
        this.emitErro('A localização deve ser informada')
        return
      }

      if (!this.entidade) {
        this.emitErro('Uma entidade deve ser selecionada')
        return
      }

      if (!this.dataNascimento) {
        this.emitErro('Preencha a data de nascimento')
        return
      }

      this.executarPesquisa(this.uf, this.cidade, this.entidade, this.dataNascimento)
    },

    executarPesquisa (uf, cidade, entidade, dataNascimento) {
      this.loading = true
      apiQualicorp.getPlanos(uf, cidade, entidade, dataNascimento)
        .then(this.handleSuccesPesquisa)
        .catch(this.handleErrorPesquisa)
        .finally(() => (this.loading = false))
    },

    handleSuccesPesquisa (data) {
      this.emitResultado(data)
    },

    handleErrorPesquisa (error) {
      this.emitErro(error.message)
    },

    setParametros ({ uf, cidade, profissao, entidade, dataNascimento }) {
      this.uf = uf
      this.cidade = cidade
      this.profissao = profissao
      this.entidade = entidade
      this.dataNascimento = dataNascimento
    }
  }
}
</script>

<style lang="scss" scoped>
  .q-searchbar {
    width: 100%;

    &__desktop {
      display: flex;
      height: 70px;
      border-radius: 35px;
      background-color: white;
      box-shadow: 0px 16px 32px rgba(0, 0, 0, 0.15), 0px 3px 8px rgba(0, 0, 0, 0.1);
    }

    &__mobile {
      text-align: center;
    }
  }
</style>

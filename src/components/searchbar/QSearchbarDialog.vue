<template>
  <v-dialog
    :value="value"
    fullscreen
    hide-overlay
    transition="dialog-bottom-transition"
    @input="$emit('input', $event)"
  >

    <v-stepper v-model="step" class="q-searchbar-dialog__stepper">
      <v-stepper-items class="q-searchbar-dialog__stepper-container">

        <v-stepper-content class="q-searchbar-dialog__step" step="1">
          <div class="q-searchbar-dialog__step-localizacao">
            <v-btn
              class="ml-n3"
              icon
              large
              @click="$emit('input', false)"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <div class="text-h6 ml-auto mr-auto mt-3 mb-4">Vamos começar informando sua localização</div>
            <q-searchbar-localizacao-form
              class="q-searchbar-dialog__localizacao-form"
              :uf.sync="localizacao.uf"
              :cidade.sync="localizacao.cidade"
            />

            <v-btn
              :disabled="desabilitaContinuarLocalizacao"
              color="primary"
              class="mt-auto"
              rounded
              x-large
              @click="step = 2"
            >
              CONTINUAR
            </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content class="q-searchbar-dialog__step" step="2">
          <div class="q-searchbar-dialog__step-entidade">
            <v-btn
              class="ml-n3"
              icon
              large
              @click="step = 1"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <div class="text-h6 ml-auto mr-auto mt-3 mb-4">Agora selecione sua profissão e uma entidade</div>
            <q-searchbar-entidade-form
              class="q-searchbar-dialog__entidade-form"
              :profissao.sync="dadosProfissionais.profissao"
              :entidade.sync="dadosProfissionais.entidade"
              :uf="uf"
              :cidade="cidade"
            />

            <v-btn
              :disabled="desabilitaContinuarEntidade"
              color="primary"
              class="mt-auto"
              rounded
              x-large
              @click="step = 3"
            >
              CONTINUAR
            </v-btn>
          </div>
        </v-stepper-content>

        <v-stepper-content class="q-searchbar-dialog__step" step="3">
          <div class="q-searchbar-dialog__step-nascimento">
            <v-btn
              class="ml-n3"
              icon
              large
              @click="step = 2"
            >
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <div class="text-h6 ml-auto mr-auto mt-3 mb-4">Para finalizar, informe sua data de nascimento</div>
            <q-searchbar-nascimento-form
              v-model="nascimento"
              class="q-searchbar-dialog__nascimento-form"
            />
            <v-btn
              :disabled="desabilitaPesquisar"
              :dark="!desabilitaPesquisar"
              class="mt-auto"
              color="#960000"
              rounded
              x-large
              @click="$emit('click:pesquisar')"
            >
              PESQUISAR
            </v-btn>
          </div>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>

  </v-dialog>
</template>

<script>
import QSearchbarLocalizacaoForm from './localizacao/QSearchbarLocalizacaoForm'
import QSearchbarEntidadeForm from './entidade/QSearchbarEntidadeForm'
import QSearchbarNascimentoForm from './nascimento/QSearchbarNascimentoForm'

export default {
  components: {
    QSearchbarLocalizacaoForm,
    QSearchbarEntidadeForm,
    QSearchbarNascimentoForm
  },

  props: {
    value: {
      type: Boolean,
      default: false
    },
    uf: {
      type: String,
      default: null
    },
    cidade: {
      type: String,
      default: null
    },
    profissao: {
      type: String,
      default: null
    },
    entidade: {
      type: String,
      default: null
    },
    dataNascimento: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      step: 1,
      localizacao: {
        uf: '',
        cidade: ''
      },
      dadosProfissionais: {
        profissao: '',
        entidade: ''
      },
      nascimento: ''
    }
  },

  computed: {
    desabilitaContinuarLocalizacao () {
      return !this.localizacao.uf || !this.localizacao.cidade
    },

    desabilitaContinuarEntidade () {
      return !this.dadosProfissionais.profissao || !this.dadosProfissionais.entidade
    },

    desabilitaPesquisar () {
      return !this.nascimento
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

    nascimento (value) {
      this.$emit('update:dataNascimento', value)
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

    dataNascimento: {
      immediate: true,
      handler: function (value) {
        this.nascimento = value
      }
    }
  }
}

</script>

<style lang="scss">

  .q-searchbar-dialog {

    &__stepper {
      height: 100%;
    }

    &__stepper-container {
      height: 100%;
    }

    &__step {
      padding-top: 8px !important;
      height: 100%;

      &> * {
        height: 100%;
      }
    }

    &__step-localizacao, &__step-entidade, &__step-nascimento {
      display: flex;
      flex-direction: column;
      height: 100%;
      width: 100%;
    }

    &__localizacao-form, &__entidade-form, &__nascimento-form {
      margin: 5px 0 !important;
      padding: 0 !important;
      width: auto !important;
    }
  }
</style>

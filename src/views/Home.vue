<template>
  <div class="q-view-home">
     <v-app-bar
      absolute
      color="#0000"
      flat
    >
      <v-img
        alt="Qualicorp"
        max-height="50"
        max-width="150"
        src="@/assets/logo.png"
      />
    </v-app-bar>

    <q-searchbar
      class="q-view-home__searchbar"
      @resultado="evResultadoPesquisa"
      @change:estado="loading = $event === 'pesquisando'"
      @erro="exibirErro"
    />

    <q-loading-layer :value="loading" />
    <q-error-message
      v-model="exibeErro"
      :text="mensagemErro"
    />
  </div>
</template>

<script>

import QSearchbar from '@/components/searchbar/QSearchbar'
import QLoadingLayer from '@/components/loading_layer/QLoadingLayer'
import QErrorMessage from '@/components/error_message/QErrorMessage'
import { mapMutations } from 'vuex'

export default {
  components: {
    QSearchbar,
    QLoadingLayer,
    QErrorMessage
  },

  data () {
    return {
      loading: false,
      exibeErro: false,
      mensagemErro: ''
    }
  },

  methods: {
    ...mapMutations({
      setParametrosUtilizados: 'setParametros',
      setPlanos: 'setPlanos'
    }),

    evResultadoPesquisa (resultado) {
      this.setParametrosUtilizados(resultado.parametros)
      this.setPlanos(resultado.planos)
      this.navigateToPlanosRoute()
    },

    navigateToPlanosRoute () {
      this.$router.push({ name: 'Planos' })
    },

    exibirErro (mensagem) {
      this.mensagemErro = mensagem
      this.exibeErro = true
    }
  }
}
</script>

<style lang="scss" scoped>
  .q-view-home {
    height: 100%;
    // max-width: 1760px;
    padding: 50px 0 0 0;

    background-image: url("../assets/background.jpg");
    background-repeat: no-repeat;
    background-position: right;
    background-size: cover;

    &__searchbar {
      max-width: 800px;
      margin: 50px auto;
    }
  }
</style>

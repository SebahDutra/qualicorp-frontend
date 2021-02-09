<template>
  <div class="home">
    <v-app-bar
      app
      color="white"
      height="70px"
      :extension-height="extendAppbarHeight"
    >
      <v-img
        alt="Qualicorp"
        style="position: absolute"
        max-height="50"
        max-width="150"
        src="@/assets/logo.png"
      />

      <q-mini-searchbar
        v-show="!extendedBar && !$vuetify.breakpoint.mobile"
        class="ml-auto mr-auto"
        :uf="parametros.uf"
        :cidade="parametros.cidade"
        :entidade="parametros.entidade"
        :nascimento="parametros.dataNascimento"
        @click="extendedBar = true"
      />

      <template v-slot:extension>
        <q-searchbar
          v-show="extendedBar"
          class="q-view-planos__searchbar"
          @resultado="evResultadoPesquisa"
          @change:estado="loading = $event === 'pesquisando'"
          @erro="exibirErro"
        />
      </template>
    </v-app-bar>

    <div>
      <div class="d-flex">
        <div
          v-show="!$vuetify.breakpoint.mobile"
          class="text-h6 mt-5 ml-5"
        >
          {{ planosOrdenados.length }} planos disponíveis
        </div>

        <div class="mt-4 ml-auto mr-4" style="width: 200px;">
          <v-select
            label="Ordenar por"
            :items="itensOrdenacao"
            v-model="ordenacao"
            outlined
            rounded
            dense
          ></v-select>
        </div>
      </div>

      <div class="mt-3 ml-3 mr-3">
        <v-row>
          <template v-for="(plano, index) in planosOrdenados">
            <v-col cols="12" sm="6" md="4" lg="3" xl="2" :key="index">
              <q-card-plano
                :plano="plano"
              />
            </v-col>
          </template>
        </v-row>
      </div>
      <v-overlay
        absolute
        :value="extendedBar"
        @click.native="extendedBar = false"
      />
    </div>

    <q-loading-layer :value="loading" />
    <q-error-message
      v-model="exibeErro"
      :text="mensagemErro"
    />
  </div>
</template>

<script>
import QMiniSearchbar from '@/components/searchbar/QMiniSearchbar'
import QSearchbar from '@/components/searchbar/QSearchbar'
import QCardPlano from '@/components/cards/QCardPlano'
import QLoadingLayer from '@/components/loading_layer/QLoadingLayer'
import QErrorMessage from '@/components/error_message/QErrorMessage'

import { mapState, mapMutations } from 'vuex'

export default {
  name: 'Planos',

  components: {
    QMiniSearchbar,
    QSearchbar,
    QCardPlano,
    QLoadingLayer,
    QErrorMessage
  },

  data () {
    return {
      ordenacao: 1,
      itensOrdenacao: [
        { value: 1, text: 'Menor preço' },
        { value: 2, text: 'Maior preço' }
      ],
      extendedBar: false,
      loading: false,
      exibeErro: false,
      mensagemErro: ''
    }
  },

  computed: {
    ...mapState(['parametros', 'planos']),

    extendAppbarHeight () {
      return this.extendedBar ? 100 : 0
    },

    planosOrdenados () {
      const decrescente = this.ordenacao === 2
      return this.getPlanosOrdenadosPorPreco(this.planos, decrescente)
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
      this.extendedBar = false
    },

    exibirErro (mensagem) {
      this.mensagemErro = mensagem
      this.exibeErro = true
    },

    getPlanosOrdenadosPorPreco (plano, decrescente = false) {
      const arr = [...plano]
      if (decrescente) {
        arr.sort((a, b) => {
          return b.precos.total - a.precos.total
        })
        return arr
      }

      arr.sort((a, b) => {
        return a.precos.total - b.precos.total
      })
      return arr
    }
  }
}
</script>

<style lang="scss" scoped>
  .q-view-planos {

    &__searchbar {
      max-width: 800px;
      margin: 0 auto 50px auto;
    }
  }
</style>

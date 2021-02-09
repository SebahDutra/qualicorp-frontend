<template>
  <v-card
    class="q-card-plano"
    elevation="6"
  >
    <v-img
      alt="logotipo"
      height="70"
      contain
      class="q-card-plano__logo"
      :src="plano.operadoraLogo"
    />
    <div class="q-card-plano__nome">{{ plano.nome_plano_ans }}</div>

    <div class="q-card-plano__segmentacao">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            class="mr-3"
            close-delay="2000"
            v-bind="attrs"
            v-on="on"
          >
            mdi-hospital-building
          </v-icon>
        </template>
        <span>Segmentação</span>
      </v-tooltip>
      <div class="q-card-plano__texto-caracteritica">{{ formartarSegmentacao(plano.segmentacao) }}</div>
    </div>

    <v-divider class="mt-2" />

    <div class="q-card-plano__reembolso">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            class="mr-3"
            close-delay="2000"
            v-bind="attrs"
            v-on="on"
          >
            mdi-cash-multiple
          </v-icon>
        </template>
        <span>Reembolso</span>
      </v-tooltip>
      <div class="q-card-plano__texto-caracteritica">{{ formatarReembolso(plano.reembolso) }}</div>
    </div>

    <v-divider class="mt-2" />

    <div class="q-card-plano__abrangencia">
      <v-tooltip bottom>
        <template v-slot:activator="{ on, attrs }">
          <v-icon
            class="mr-3"
            close-delay="2000"
            v-bind="attrs"
            v-on="on"
          >
            mdi-map-marker-question
          </v-icon>
        </template>
        <span>Abrangência</span>
      </v-tooltip>
      <div class="q-card-plano__texto-caracteritica">{{ formatarAbrangencia(plano.abrangencia) }}</div>
    </div>

    <div class="q-card-plano__preco primary--text">{{ formatarPreco(plano.precos.total) }}</div>

  </v-card>
</template>
<script>
export default {
  props: {
    plano: {
      type: Object,
      required: true
    }
  },

  methods: {
    formartarSegmentacao (segmentacao) {
      return segmentacao.toUpperCase()
    },

    formatarReembolso (reembolso) {
      return `${reembolso ? 'COM' : 'SEM'} REEMBOLSO`
    },

    formatarAbrangencia (abrangencia) {
      return abrangencia.toUpperCase()
    },

    formatarPreco (preco) {
      return `R$ ${preco.replace('.', ',')}`
    }
  }

}
</script>

<style lang="scss">
  .q-card-plano {
    display: flex;
    flex-direction: column;
    height: 350px;
    padding: 16px;

    &__logo {
      margin: 0 auto;
    }

    &__nome {
      text-align: center;
      height: 50px;
      margin-top: 8px;
      font-weight: 500;
    }

    &__segmentacao, &__reembolso, &__abrangencia {
      display: flex;
      height: 25px;
      margin-top: 8px;
      font-size: 12px;
      font-weight: 400;
    }

    &__texto-caracteritica {
      align-self: center;
    }

    &__preco {
      text-align: center;
      margin-top: 12px;
      font-size: 28px;
      font-weight: 700;
    }
  }
</style>

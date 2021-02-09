<template>
  <q-searchbar-item
    @click="$emit('click', $event)"
    style="width:30%"
  >
    <div class="q-searchbar-localizacao__item">
      <div class="text-caption font-weight-bold">Localização</div>
      <div
        v-if="localizacao"
        class="text-body-2 font-weight-bold"
      >
        {{ localizacao }}
      </div>
      <div
        v-else
        class="text-body-2 font-weight-light grey--text text--darken-3"
      >
        Informe sua localização
      </div>
    </div>
  </q-searchbar-item>
</template>

<script>
import QSearchbarItem from '../base_components/QSearchbarItem'

export default {
  components: {
    QSearchbarItem
  },

  props: {
    cidade: {
      type: String,
      default: ''
    },

    uf: {
      type: String,
      default: ''
    }
  },

  computed: {
    localizacao () {
      if (this.cidade && this.uf) {
        return `${this.cidade} - ${this.uf}`
      }
      return ''
    }
  }
}
</script>

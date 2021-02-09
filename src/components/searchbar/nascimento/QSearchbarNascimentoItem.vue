<template>
  <q-searchbar-item
    @click="$emit('click', $event)"
    style="width:30%"
  >
    <div class="q-searchbar-nescimento__item">
      <div class="text-caption font-weight-bold">Data de nascimento</div>
      <div
        v-if="dataNascimento"
        class="text-body-2 font-weight-bold"
      >
        {{ dataFormatada }}
      </div>
      <div
        v-else
        class="text-body-2 font-weight-light grey--text text--darken-3"
      >
        Preencha a data
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
    dataNascimento: {
      type: String,
      default: null
    }
  },

  computed: {
    dataFormatada () {
      if (!this.dataNascimento) {
        return ''
      }
      const splited = this.dataNascimento.split('-')
      return `${splited[2]}/${splited[1]}/${splited[0]}`
    }
  }
}
</script>

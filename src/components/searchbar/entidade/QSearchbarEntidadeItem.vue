<template>
  <q-searchbar-item
    @click="$emit('click', $event)"
    style="width:30%"
  >
    <div class="q-searchbar-entidade__item">
      <div class="text-caption font-weight-bold">Entidade</div>
      <div
        v-if="entidade"
        class="text-body-2 font-weight-bold"
      >
        {{ entidade }}
      </div>
      <div
        v-else
        class="text-body-2 font-weight-light grey--text text--darken-1"
      >
        Selecione uma entidade
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
    entidade: {
      type: String,
      default: ''
    }
  }
}
</script>

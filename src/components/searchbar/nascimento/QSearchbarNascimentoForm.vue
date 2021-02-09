<template>
  <q-searchbar-form
    class="q-searchbar-nascimento-form"
  >
    <v-date-picker
      v-model="dataNascimento"
      locale="pt-br"
      no-title
    />
  </q-searchbar-form>
</template>

<script>
import QSearchbarForm from '../base_components/QSearchbarForm'

export default {
  components: {
    QSearchbarForm
  },

  props: {
    value: {
      type: String,
      default: null
    }
  },

  data () {
    return {
      dataNascimento: null
    }
  },

  watch: {
    value: {
      immediate: true,
      handler: function (value) {
        this.dataNascimento = value
      }
    },

    dataNascimento (value) {
      this.$emit('input', value)
    }
  }
  // methods: {
  //   converterDataIsoParaBr (data) {
  //     if (!data) {
  //       return ''
  //     }
  //     const splited = data.split('-')
  //     return `${splited[2]}/${splited[1]}/${splited[0]}`
  //   },

  //   converterDataBrParaIso (data) {
  //     if (!data) {
  //       return ''
  //     }
  //     const splited = data.split('/')
  //     return `${splited[2]}-${splited[1]}-${splited[0]}`
  //   }
  // }
}
</script>

<style lang="scss" scoped>
  .q-searchbar-nascimento-form {
    width: 280px;
    padding: 0;
    background-color: white;
  }
</style>

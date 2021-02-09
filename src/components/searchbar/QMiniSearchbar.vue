<template>
  <div
    class="q-mini-searchbar"
  >
    <div
      class="q-mini-searchbar__item q-mini-searchbar__item--localizacao"
      @click="$emit('click', 'localizacao')"
    >
      {{ cidade }} - {{ uf }}
    </div>

    <v-divider
      inset
      vertical
      color="#ccc"
    />

    <div
      class="q-mini-searchbar__item q-mini-searchbar__item--entidade"
      @click="$emit('click', 'entidade')"
    >
      {{ entidade }}
    </div>

    <v-divider
      inset
      vertical
      color="#ccc"
    />

    <div
      class="q-mini-searchbar__item q-mini-searchbar__item--nascimento"
      @click="$emit('click', 'nascimento')"
    >
      {{ dataFormatada }}
    </div>

    <div
      class="q-mini-searchbar__item q-mini-searchbar__item--button"
      @click="$emit('click', 'nascimento')"
    >
      <v-btn
        fab
        dark
        x-small
        color="primary"
        elevation="0"
      >
        <v-icon dark>
          mdi-magnify
        </v-icon>
      </v-btn>
    </div>

  </div>
</template>

<script>
export default {
  props: {
    cidade: {
      type: String,
      default: null
    },
    uf: {
      type: String,
      default: null
    },
    entidade: {
      type: String,
      default: null
    },
    nascimento: {
      type: String,
      default: null
    }
  },

  computed: {
    dataFormatada () {
      if (!this.nascimento) {
        return ''
      }
      const splited = this.nascimento.split('-')
      return `${splited[2]}/${splited[1]}/${splited[0]}`
    }
  }
}
</script>

<style lang="scss" scoped>
  .q-mini-searchbar {
    --height: 44px;
    display: flex;
    height: var(--height, 44px);
    width: 500px;
    border: solid 1px #ccc;
    border-radius: calc(var(--height, 44px) / 2);

    &:hover {
      box-shadow: 0px 3px 10px -2px rgba(0,0,0,0.30);
    }

    &__item {
      color: black;
      font-weight: 500;
      height: 100%;
      padding-top: 12px;
      cursor: pointer;
      font-size: 14px;

      &--localizacao {
        flex-grow: 1;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-left: 10px;
        padding-right: 10px;
      }

      &--entidade {
        flex-grow: 1;
        text-align: center;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        padding-left: 10px;
        padding-right: 10px;
      }

      &--nascimento {
        flex-grow: 0;
        width: 100px;
        padding-left: 10px;
      }

      &--button {
        padding-top: 5px;
        width: 38px;
      }
    }
  }
</style>

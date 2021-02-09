<template>
  <div
    class="q-searchbar-item"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </div>
</template>

<script>

export default {

}
</script>

<style lang="scss" scoped>
  .q-searchbar-item {
    padding: 16px 28px;
    height: 100%;
    border-radius: 9999px;
    background-color: #FFF;

    &:hover {
      background-color: #EEE;
    }
  }
</style>

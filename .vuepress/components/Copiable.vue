<template>
  <span class="copiable" @click="copy">
    <template v-if="showCopied">Copied!</template>
    <template v-else><slot /></template>
  </span>
</template>

<script>
import copy from 'copy-text-to-clipboard'

export default {
  props: {
    text: {
      type: String
    }
  },
  data: () => ({
    showCopied: false
  }),
  methods: {
    copy() {
      copy(this.text || this.$el.innerText)
      this.showCopied = true
      setTimeout(() => (this.showCopied = false), 1000)
    }
  }
}
</script>

<style lang="stylus" scoped>
.copiable
  display inline-block
  cursor pointer
</style>

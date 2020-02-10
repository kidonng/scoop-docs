<template>
  <button>
    <Copiable class="inner" :text="transformedHash">Copy {{ type }}</Copiable>
  </button>
</template>

<script>
export default {
  props: {
    hash: {
      type: String | Array,
      required: true
    }
  },
  computed: {
    hashItem() {
      const { hash } = this
      return Array.isArray(hash) ? hash[0] : hash
    },
    transformedHash() {
      const { hashItem } = this
      return hashItem.includes(':') ? hashItem.split(':')[1] : hashItem
    },
    type() {
      const { hashItem } = this
      return hashItem.includes(':')
        ? hashItem.split(':')[0].toUpperCase()
        : 'SHA256'
    }
  }
}
</script>

<style lang="stylus" scoped>
button
  white-space nowrap
  border 0
  border-bottom 1px solid darken($accentColor, 10%)
  padding 0
  border-radius 4px
  color white
  background-color $accentColor
  transition background-color .1s ease

  &:hover
    background-color lighten($accentColor, 10%)

.inner
  padding .4rem .8rem
</style>

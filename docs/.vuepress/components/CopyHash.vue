<template>
  <button class="clip" :data-clipboard-text="transformedHash">
    Copy {{ type }}
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
  data() {
    const { hash } = this
    const hashItem = Array.isArray(hash) ? hash[0] : hash

    const transformedHash = hashItem.includes(':')
      ? hashItem.split(':')[1]
      : hashItem
    const type = hashItem.includes(':')
      ? hashItem.split(':')[0].toUpperCase()
      : 'SHA256'

    return { transformedHash, type }
  }
}
</script>

<style lang="stylus" scoped>
button
  white-space nowrap
  border 0
  border-bottom 1px solid darken($accentColor, 10%)
  padding .4rem .8rem
  border-radius 4px
  color white
  background-color $accentColor
  transition background-color .1s ease

  &:hover
    background-color lighten($accentColor, 10%)
</style>

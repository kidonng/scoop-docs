<template>
  <button class="clip" :data-clipboard-text="parsedHash">
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
  computed: {
    convertedHash() {
      return Array.isArray(this.hash) ? this.hash[0] : this.hash
    },
    parsedHash() {
      return this.convertedHash.includes(':')
        ? this.convertedHash.split(':')[1]
        : this.convertedHash
    },
    type() {
      return this.convertedHash.includes(':')
        ? this.convertedHash.split(':')[0].toUpperCase()
        : 'SHA256'
    }
  }
}
</script>

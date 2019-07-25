<template>
  <button class="clip" :data-clipboard-text="convertedHash">
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
  setup({ hash }) {
    hash = Array.isArray(hash) ? hash[0] : hash

    const convertedHash = hash.includes(':') ? hash.split(':')[1] : hash

    const type = hash.includes(':')
      ? hash.split(':')[0].toUpperCase()
      : 'SHA256'

    return { convertedHash, type }
  }
}
</script>

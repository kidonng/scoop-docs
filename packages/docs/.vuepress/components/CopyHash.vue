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
  setup(props) {
    const convertedHash = Array.isArray(props.hash) ? props.hash[0] : props.hash
    const parsedHash = convertedHash.includes(':')
      ? convertedHash.split(':')[1]
      : convertedHash
    const type = convertedHash.includes(':')
      ? convertedHash.split(':')[0].toUpperCase()
      : 'SHA256'

    return {
      parsedHash,
      type
    }
  }
}
</script>

<template>
  <a :href="convertedHref" target="_blank" rel="noopener noreferrer">
    {{ text }}
    <OutboundLink />
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String | Array,
      required: true
    },
    text: {
      type: String,
      required: true
    }
  },
  computed: {
    convertedHref() {
      return Array.isArray(this.href) ? this.href[0] : this.href
    }
  }
}
</script>

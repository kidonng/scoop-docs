<template>
  <a :href="convertedHref" target="_blank" rel="noopener noreferrer">
    <slot />
    <OutboundLink />
  </a>
</template>

<script>
export default {
  props: {
    href: {
      type: String | Array,
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

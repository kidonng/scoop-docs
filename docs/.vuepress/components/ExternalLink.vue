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
  setup: ({ href }) => ({
    convertedHref: Array.isArray(href) ? href[0] : href
  })
}
</script>

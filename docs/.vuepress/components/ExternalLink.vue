<template>
  <a :href="transformedHref" target="_blank" rel="noopener noreferrer">
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
  data() {
    const { href } = this
    const transformedHref = Array.isArray(href) ? href[0] : href

    return { transformedHref }
  }
}
</script>

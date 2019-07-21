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
  setup(props) {
    return {
      convertedHref: Array.isArray(props.href) ? props.href[0] : props.href
    }
  }
}
</script>

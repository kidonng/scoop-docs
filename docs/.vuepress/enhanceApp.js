import InstantSearch from 'vue-instantsearch'

export default ({ Vue }) => {
  Vue.use(InstantSearch)

  // https://github.com/algolia/algoliasearch-client-javascript/issues/691
  if (typeof window !== 'undefined') window.process = { env: { DEBUG: false } }
}

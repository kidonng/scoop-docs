import InstantSearch from 'vue-instantsearch'

export default ({ Vue }) => {
  Vue.use(InstantSearch)

  // https://github.com/algolia/algoliasearch-client-javascript/issues/691
  window.process = {
    env: { DEBUG: undefined }
  }
}

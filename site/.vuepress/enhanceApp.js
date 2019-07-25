import { plugin } from 'vue-function-api'
import InstantSearch from 'vue-instantsearch'

export default ({ Vue, router }) => {
  Vue.use(plugin)
  Vue.use(InstantSearch)

  if (typeof process === 'undefined') {
    // https://github.com/algolia/algoliasearch-client-javascript/issues/691
    window.process = {
      env: { DEBUG: false }
    }
  }
}

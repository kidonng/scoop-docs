import { plugin } from 'vue-function-api'
import InstantSearch from 'vue-instantsearch'

export default ({ Vue }) => {
  Vue.use(plugin)
  Vue.use(InstantSearch)

  // https://github.com/algolia/algoliasearch-client-javascript/issues/691
  if (typeof process === 'undefined')
    window.process = {
      env: { DEBUG: false }
    }
}

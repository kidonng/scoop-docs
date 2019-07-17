import { plugin } from 'vue-function-api'
import InstantSearch from 'vue-instantsearch'

export default ({ Vue, router }) => {
  Vue.use(plugin)
  Vue.use(InstantSearch)

  // https://github.com/algolia/algoliasearch-client-javascript/issues/691
  if (typeof process === 'undefined')
    window.process = {
      env: { DEBUG: false }
    }

  document.addEventListener('click', e => {
    const target = e.target.closest('.algolia-docsearch-suggestion')
    if (target) {
      e.preventDefault()
      router.push(target.href.replace('https://scoop-docs.now.sh', ''))
    }
  })
}

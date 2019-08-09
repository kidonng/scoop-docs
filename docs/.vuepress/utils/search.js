import algoliasearch from 'algoliasearch/lite'
import { history } from 'instantsearch.js/es/lib/routers'
import { simple } from 'instantsearch.js/es/lib/stateMappings'
import 'instantsearch.css/themes/algolia-min.css'

export default {
  indexName: 'scoop_apps',
  searchClient: algoliasearch('F8ONSWSRN9', '134a8d4dd5935708368241431ab745c3'),
  routing: {
    router: history(),
    stateMapping: simple()
  }
}

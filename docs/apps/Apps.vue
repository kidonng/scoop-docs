<template>
  <ais-instant-search
    :search-client="searchClient"
    :index-name="indexName"
    :routing="routing"
  >
    <ais-search-box />

    <ais-state-results>
      <template slot-scope="{ query, hits }">
        <template v-if="query.length > 0 && hits.length > 0">
          <ais-hits>
            <table slot-scope="{ items }">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Install</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="item in items" :key="item.objectID">
                  <td>
                    <strong>
                      <ais-highlight :hit="item" attribute="name" />
                    </strong>
                    ({{ item.version }})
                  </td>
                  <td>
                    <ais-highlight :hit="item" attribute="description" />
                    <ExternalLink
                      v-if="item.homepage"
                      :href="item.homepage"
                      text="Homepage"
                    />
                  </td>
                  <td>
                    <code
                      title="Click to copy"
                      :data-clipboard-text="
                        `scoop bucket add ${
                          item.bucket.split('/')[1]
                        } https://github.com/${item.bucket}`
                      "
                    >
                      scoop bucket add
                      <strong>{{ item.bucket.split('/')[1] }}</strong>
                      https://github.com/{{ item.bucket }}
                    </code>
                    <code
                      title="Click to copy"
                      :data-clipboard-text="`scoop install ${item.name}`"
                    >
                      scoop install {{ item.name }}
                    </code>
                  </td>
                  <td>
                    <template v-if="item.url">
                      <ExternalLink :href="item.url" text="Download" />
                      <button :data-clipboard-text="convert(item.hash)">
                        Copy Hash
                      </button>
                    </template>
                    <ul v-else>
                      <li v-if="item.architecture['64bit']">
                        <ExternalLink
                          :href="item.architecture['64bit'].url"
                          text="64bit"
                        />
                        <button
                          :data-clipboard-text="
                            convert(item.architecture['64bit'].hash)
                          "
                        >
                          Copy Hash
                        </button>
                      </li>
                      <li v-if="item.architecture['32bit']">
                        <ExternalLink
                          :href="item.architecture['32bit'].url"
                          text="32bit"
                        />
                        <button
                          :data-clipboard-text="
                            convert(item.architecture['32bit'].hash)
                          "
                        >
                          Copy Hash
                        </button>
                      </li>
                    </ul>
                  </td>
                </tr>
              </tbody>
            </table>
          </ais-hits>

          <ais-pagination :show-first="false" :show-last="false" />
        </template>
        <span v-if="hits.length === 0">No results 😥</span>
      </template>
    </ais-state-results>
  </ais-instant-search>
</template>

<script>
import algoliasearch from 'algoliasearch/lite'
import { history as historyRouter } from 'instantsearch.js/es/lib/routers'
import { simple as simpleMapping } from 'instantsearch.js/es/lib/stateMappings'
import 'instantsearch.css/themes/algolia-min.css'
import ClipboardJS from 'clipboard'
import ExternalLink from './ExternalLink'

export default {
  components: {
    ExternalLink
  },
  data: () => ({
    searchClient: algoliasearch(
      'F8ONSWSRN9',
      '134a8d4dd5935708368241431ab745c3'
    ),
    routing: {
      router: historyRouter(),
      stateMapping: simpleMapping()
    },
    indexName: 'scoop_apps',
    clipboard: null,
    copyListener: e => {
      if (e.target.getAttribute('data-clipboard-text')) {
        const saved = e.target.textContent
        e.target.textContent = 'Copied!'
        setTimeout(() => (e.target.textContent = saved), 1000)
      }
    }
  }),
  methods: {
    convert(original) {
      return Array.isArray(original) ? original[0] : original
    }
  },
  mounted() {
    this.clipboard = new ClipboardJS('[data-clipboard-text]')
    document.addEventListener('click', this.copyListener)
  },
  beforeDestroy() {
    this.clipboard.destroy()
    document.removeEventListener('click', this.copyListener)
  }
}
</script>

<style lang="stylus" scoped>
.ais-SearchBox
.ais-Hits
  margin-bottom 1rem

code
  display block
  margin-top .5rem
  cursor pointer

button
  background none
  border .1rem solid $accentColor
</style>

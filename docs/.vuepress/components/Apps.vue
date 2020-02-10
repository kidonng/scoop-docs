<template>
  <ClientOnly>
    <ais-instant-search
      :index-name="indexName"
      :search-client="searchClient"
      :routing="routing"
    >
      <ais-search-box
        placeholder="Also try: scoop search <app>"
        autofocus
        show-loading-indicator
      />

      <ais-state-results>
        <template slot-scope="{ query, nbHits, nbPages, page }">
          <template v-if="nbHits">
            <ais-hits :transform-items="transformItems">
              <table slot-scope="{ items }">
                <thead>
                  <tr>
                    <th>App ({{ nbHits }})</th>
                    <th>Description</th>
                    <th>Install (Click to copy)</th>
                    <th>Download</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in items" :key="item.objectID">
                    <td>
                      <strong>
                        <ais-highlight :hit="item" attribute="name" />
                      </strong>
                      ({{ item.version }})
                    </td>
                    <td>
                      <ais-highlight :hit="item" attribute="description" />
                      <ExternalLink v-if="item.homepage" :href="item.homepage">
                        Homepage
                      </ExternalLink>
                    </td>
                    <td>
                      <code v-if="!item.main">
                        <Copiable class="inner">
                          scoop bucket add
                          <template v-if="item.known">
                            {{ trimBucketName(item) }}
                          </template>
                          <template v-else>
                            <strong>{{ item.bucket.split('/')[1] }}</strong>
                            https://github.com/{{ item.bucket }}
                          </template>
                        </Copiable>
                      </code>
                      <code>
                        <Copiable class="inner">
                          scoop install {{ item.name }}
                        </Copiable>
                      </code>
                    </td>
                    <td>
                      <ul>
                        <li v-if="item.url">
                          <ExternalLink :href="item.url">Download</ExternalLink>
                          <CopyHash :hash="item.hash" />
                        </li>
                        <template v-else>
                          <li v-if="item.architecture['64bit']">
                            <ExternalLink
                              :href="item.architecture['64bit'].url"
                            >
                              64bit
                            </ExternalLink>
                            <CopyHash :hash="item.architecture['64bit'].hash" />
                          </li>
                          <li v-if="item.architecture['32bit']">
                            <ExternalLink
                              :href="item.architecture['32bit'].url"
                            >
                              32bit
                            </ExternalLink>
                            <CopyHash :hash="item.architecture['32bit'].hash" />
                          </li>
                        </template>
                      </ul>
                    </td>
                  </tr>
                </tbody>
              </table>
            </ais-hits>

            <ais-pagination
              :show-first="false"
              :show-previous="page !== 0"
              :show-next="page !== nbPages - 1"
              :show-last="false"
            />
          </template>

          <div v-else>
            No results found for query <strong>"{{ query }}"</strong>
          </div>
        </template>
      </ais-state-results>
    </ais-instant-search>
  </ClientOnly>
</template>

<script>
import search from '../utils/search'

export default {
  data: () => ({
    ...search,
    transformItems: items => {
      window.scroll({ top: 0 })

      return items
    }
  }),
  methods: {
    trimBucketName(item) {
      const bucket = item.bucket.split('/')[1].toLowerCase()

      return bucket.includes('scoop-') ? bucket.substring(6) : bucket
    }
  }
}
</script>

<style lang="stylus" scoped>
code
  display block
  margin-top .5rem

.inner
  display block !important
</style>

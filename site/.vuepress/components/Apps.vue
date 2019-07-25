<template>
  <ClientOnly>
    <ais-instant-search
      :index-name="indexName"
      :search-client="searchClient"
      :routing="routing"
    >
      <ais-search-box
        placeholder="You can also search for apps via scoop search <app>"
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
                      <code
                        v-if="!item.main"
                        class="clip"
                        :id="`bucket${index}`"
                        :data-clipboard-target="`#bucket${index}`"
                      >
                        scoop bucket add
                        <template v-if="item.known">
                          {{
                            item.bucket
                              .split('/')[1]
                              .toLowerCase()
                              .includes('scoop-')
                              ? item.bucket
                                  .split('/')[1]
                                  .toLowerCase()
                                  .substring(6)
                              : item.bucket.split('/')[1].toLowerCase()
                          }}
                        </template>
                        <template v-else>
                          <strong>{{ item.bucket.split('/')[1] }}</strong>
                          https://github.com/{{ item.bucket }}
                        </template>
                      </code>
                      <code
                        class="clip"
                        :id="`app${index}`"
                        :data-clipboard-target="`#app${index}`"
                      >
                        scoop install {{ item.name }}
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
import ExternalLink from './ExternalLink'
import CopyHash from './CopyHash'
import search from '../utils/search'
import clipboard from '../utils/clipboard'

export default {
  components: {
    ExternalLink,
    CopyHash
  },
  setup() {
    clipboard('.clip')

    const transformItems = items => {
      scroll({ top: 0 })

      return items
    }

    return { ...search, transformItems }
  }
}
</script>

<style lang="stylus" scoped>
code.clip
  display block
  margin-top .5rem
  cursor pointer

button
  white-space nowrap
  border 0
  border-bottom 1px solid darken($accentColor, 10%)
  padding .4rem .8rem
  border-radius 4px
  color white
  background-color $accentColor
  transition background-color .1s ease

  &:hover
    background-color lighten($accentColor, 10%)
</style>

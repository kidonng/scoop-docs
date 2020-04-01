import { graphql } from '@octokit/graphql'
import algoliasearch from 'algoliasearch'
import { last } from 'lodash'
import * as path from 'path'

const { GITHUB_TOKEN, ALGOLIA_APPID, ALGOLIA_APIKEY } = process.env
const graphqlWithAuth = graphql.defaults({
  headers: {
    authorization: `token ${GITHUB_TOKEN}`,
  },
})
const client = algoliasearch(ALGOLIA_APPID, ALGOLIA_APIKEY)
const index = client.initIndex('scoop_apps_new')

const searchRepo = async (first: number, after?: string) => {
  const {
    search: { edges },
  } = await graphqlWithAuth(`
    {
      search(type: REPOSITORY, query: "topic:scoop-bucket", first: ${first}${
    after ? `, after: "${after}"` : ''
  }) {
        edges {
          node {
            ... on Repository {
              owner {
                login
              }
              name
              defaultBranchRef {
                name
              }
            }
          }
          cursor
        }
      }
    }
  `)

  return edges
}

const repoQuery = (
  {
    owner,
    name,
    expression,
  }: {
    owner: string
    name: string
    expression: string
  },
  index = 0
) => `
  repo${index}: repository(owner: "${owner}", name: "${name}") {
    object(expression: "${expression}") {
      ... on Tree {
        entries {
          name
          type
          object {
            ... on Blob {
              text
            }
          }
        }
      }
    }
  }
`

interface Repo {
  owner: string
  name: string
  branch: string
}

interface Bucket extends Repo {
  entries: any[]
}

;(async () => {
  console.info('Start indexing')
  // Known buckets without `scoop-bucket` tag
  const repos: Repo[] = [
    { owner: 'kodybrown', name: 'scoop-nirsoft', branch: 'master' },
    { owner: 'ScoopInstaller', name: 'Nightlies', branch: 'master' },
  ]

  // Get all repos with `scoop-bucket` tag
  let searchRepoResult
  while (
    (searchRepoResult = await searchRepo(
      100,
      // @ts-ignore
      searchRepoResult ? last(searchRepoResult).cursor : null
    )).length !== 0
  )
    repos.push(
      ...searchRepoResult.map(
        ({ node: { owner, name, defaultBranchRef } }) => ({
          owner: owner.login,
          name,
          branch: defaultBranchRef.name,
        })
      )
    )

  console.info('Repo count:', repos.length)
  // Split query to avoid exceeding size limit
  const splitRepos: typeof repos[] = []
  while (repos.length) splitRepos.push(repos.splice(0, 20))

  const buckets: Bucket[] = []
  for (const split of splitRepos) {
    // Get raw results
    const query = `{${split
      .map(({ owner, name, branch }, index) =>
        repoQuery({ owner, name, expression: `${branch}:` }, index)
      )
      .join('')}}`
    const queryResult = await graphqlWithAuth(query)

    // Map results
    const result = Object.values(
      queryResult
    ).map(({ object: { entries } }, index) => ({ ...split[index], entries }))

    // Get manifests in `bucket` dir
    await Promise.all(
      result.map(async ({ owner, name, branch, entries }, index) => {
        if (
          entries.some(({ name, type }) => name === 'bucket' && type === 'tree')
        ) {
          const { repo0 } = await graphqlWithAuth(`
            {
              ${repoQuery({ owner, name, expression: `${branch}:bucket` })}
            }
          `)
          result[index].entries = repo0.object.entries
        }
      })
    )

    buckets.push(...result)
    console.info('Buckets indexed:', buckets.length)
  }

  // Process manifests
  const manifests = []
  buckets.forEach(({ owner, name: bucketName, entries }) => {
    const bucket = `${owner}/${bucketName}`
    console.info(`Processing bucket: ${bucket}`)

    entries
      // E.g. https://github.com/rasa/scoops/blob/master/schema.json
      .filter(({ name }) => name.endsWith('.json') && !(name === 'schema.json'))
      .forEach(({ name, object: { text } }) => {
        const data = JSON.parse(text.replace(/\n/g, ''))
        const { version, description, homepage, url, hash, architecture } = data

        const { name: appName } = path.parse(name)

        const manifest: Record<string, string> = {
          appName,
          bucket,
          version,
          description,
          homepage,
          objectID: `${bucket}:${appName}`,
        }

        Object.assign(manifest, architecture ? { architecture } : { url, hash })

        manifests.push(manifest)
      })
  })

  console.info('Manifest count:', manifests.length)
  index.saveObjects(manifests)
})()

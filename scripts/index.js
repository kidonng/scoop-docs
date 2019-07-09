const graphql = require('@octokit/graphql').defaults({
  headers: { authorization: `token ${process.env.GITHUB_TOKEN}` }
})
const algoliasearch = require('algoliasearch')

const client = algoliasearch(
  process.env.ALGOLIA_APPID,
  process.env.ALGOLIA_APIKEY
)
const index = client.initIndex(process.env.ALGOLIA_INDEX)

;(async () => {
  let known = (await graphql(`
    {
      repository(owner: "lukesampson", name: "scoop") {
        object(expression: "master:buckets.json") {
          ... on Blob {
            text
          }
        }
      }
    }
  `)).repository.object.text

  let query = ''

  known = Object.values(JSON.parse(known)).map((bucket, index) => {
    // 19 === 'https://github.com/'.length
    const repo = bucket.substring(19).split('/')
    const owner = repo[0]
    const name = repo[1]

    query += `
      bucket${index}: repository(owner: "${owner}", name: "${name}") {
        object(expression: "master:") {
          ... on Tree {
            entries {
              name
              type
            }
          }
        }
      }
    `

    return {
      owner,
      name
    }
  })

  Object.values(await graphql(`{${query}}`)).forEach((repo, index) => {
    if (
      repo.object.entries.some(
        entry => entry.name === 'bucket' && entry.type === 'tree'
      )
    )
      known[index].subDir = true
  })

  query = ''

  known.forEach((bucket, index) => {
    query += `
      bucket${index}: repository(owner: "${bucket.owner}", name: "${
      bucket.name
    }") {
        object(expression: "master:${bucket.subDir ? 'bucket' : ''}") {
          ... on Tree {
            entries {
              name
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
  })

  let data = Object.values(await graphql(`{${query}}`)).map(bucket =>
    bucket.object.entries.filter(entry => entry.name.endsWith('.json'))
  )

  let apps = []

  data.forEach((bucket, index) =>
    bucket.forEach(app => {
      const data = JSON.parse(app.object.text.replace(/\n/g, ''))
      const {
        version,
        description,
        license,
        homepage,
        url,
        hash,
        architecture
      } = data

      apps.push({
        bucket: `${known[index].owner}/${known[index].name}`,
        name: app.name.substring(0, app.name.indexOf('.json')),
        version,
        description,
        license,
        homepage,
        url,
        hash,
        architecture: !url && architecture
      })
    })
  )

  index.clearIndex().then(() => index.addObjects(apps))
})()

const graphql = require('@octokit/graphql').defaults({
  headers: { authorization: `token ${process.env.GITHUB_TOKEN}` }
})
const algoliasearch = require('algoliasearch')

const client = algoliasearch('F8ONSWSRN9', process.env.ALGOLIA_APIKEY)
const index = client.initIndex('scoop_apps')

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
  known = Object.values(JSON.parse(known))

  let buckets = [
    ...known,
    // Some most starred buckets (https://github.com/rasa/scoop-directory/blob/master/by-stars.md)
    'https://github.com/Ash258/scoop-Ash258',
    'https://github.com/h404bi/dorado',
    'https://github.com/TheCjw/scoop-retools',
    'https://github.com/rasa/scoops',
    'https://github.com/MCOfficer/scoop-nirsoft'
  ]

  let query = ''

  buckets = buckets.map((bucket, index) => {
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
      buckets[index].subDir = true
  })

  query = ''

  buckets.forEach((bucket, index) => {
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
    bucket.object.entries
      .filter(entry => entry.name.endsWith('.json'))
      .filter(entry => !(entry.name === 'schema.json'))
  )

  let apps = []

  data.forEach((bucket, index) =>
    bucket.forEach(entry => {
      const data = JSON.parse(entry.object.text.replace(/\n/g, ''))
      const { version, description, homepage, url, hash, architecture } = data

      let app = {
        bucket: `${buckets[index].owner}/${buckets[index].name}`,
        name: entry.name.substring(0, entry.name.indexOf('.json')),
        version,
        description,
        homepage,
        url,
        hash
      }

      if (!url) app.architecture = architecture

      if (app.bucket === 'ScoopInstaller/Main') app.main = true
      else if (index <= known.length - 1) app.known = true

      apps.push(app)
    })
  )

  console.log(`Buckets: ${buckets.length} Apps: ${apps.length}`)

  index.clearIndex().then(() => index.addObjects(apps))
})()

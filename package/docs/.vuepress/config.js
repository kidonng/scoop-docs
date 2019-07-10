const sidebar = require('./sidebar')

module.exports = {
  title: 'Scoop',
  description: 'A command-line installer for Windows',
  themeConfig: {
    nav: [
      { text: 'Docs', link: '/docs/' },
      { text: 'Apps', link: '/apps/' },
      { text: 'Scoop', link: 'https://github.com/lukesampson/scoop' }
    ],
    sidebar,
    algolia: {
      apiKey: '4a251822a0aa04bde14c4499c3b17cb7',
      indexName: 'scoop-docs'
    },
    lastUpdated: true,
    repo: 'kidonng/scoop-docs',
    docsDir: 'docs',
    editLinks: true
  },
  plugins: [
    [
      '@vuepress/google-analytics',
      {
        ga: 'UA-140053908-4'
      }
    ]
  ],
  evergreen: true
}

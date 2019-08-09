const sidebar = require('./utils/sidebar')

module.exports = {
  title: 'Scoop',
  description: 'A command-line installer for Windows',
  dest: 'public',
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
    repo: 'kidonng/scoop-docs',
    docsDir: 'docs',
    editLinks: true,
    editLinkText: 'Help improve this page'
  },
  plugins: {
    '@vuepress/google-analytics': { ga: 'UA-140053908-4' },
    '@vuepress/plugin-back-to-top': true,
    '@vuepress/pwa': { updatePopup: true }
  }
}

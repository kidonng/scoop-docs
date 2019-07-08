const sidebar = require('./sidebar')

module.exports = {
  title: 'Scoop',
  description: 'A command-line installer for Windows',
  dest: 'dist',
  themeConfig: {
    nav: [
      { text: 'Docs', link: '/docs/' },
      { text: 'Apps', link: '/apps/' },
      { text: 'Scoop', link: 'https://github.com/lukesampson/scoop' }
    ],
    sidebar,
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

const sidebar = require('./sidebar')

module.exports = {
  title: 'Scoop',
  description: 'A command-line installer for Windows',
  themeConfig: {
    nav: [{ text: 'Documentation', link: '/docs/' }],
    sidebar,
    lastUpdated: true,
    repo: 'kidonng/scoop-docs',
    editLinks: true
  },
  dest: 'dist'
}

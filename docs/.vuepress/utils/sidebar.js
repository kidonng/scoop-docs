const { join } = require('path')
const { sync } = require('fast-glob')

const groups = [
  {
    title: 'overview',
    children: [
      'So-What.md',
      'Chocolatey-Comparison.md',
      'Cygwin-and-MSYS-Comparison.md'
    ]
  },
  {
    title: 'getting-started',
    children: [
      'Quick-Start.md',
      'Commands.md',
      'FAQ.md',
      'Uninstalling-Scoop.md'
    ]
  },
  { title: 'concepts' },
  { title: 'guides' },
  { title: 'misc' }
]

groups.forEach(group => {
  group.collapsable = false

  group.children = group.children
    ? group.children.map(page => `docs/${group.title}/${page}`)
    : sync(['*.md'], {
        cwd: join(__dirname, '../../docs', group.title)
      }).map(page => `docs/${group.title}/${page}`)

  group.title = group.title
    .split('-')
    .map(str => `${str.charAt(0).toUpperCase()}${str.substring(1)}`)
    .join(' ')
})

module.exports = groups

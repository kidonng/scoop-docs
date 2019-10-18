const globby = require('globby')

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

groups.forEach(async group => {
  if (group.children)
    group.children = group.children.map(page => `docs/${group.title}/${page}`)
  else {
    const pages = await globby(`docs/docs/${group.title}`)
    group.children = pages.map(page => page.replace('docs/docs', 'docs'))
  }

  group.title = group.title
    .split('-')
    .map(str => `${str.charAt(0).toUpperCase()}${str.substring(1)}`)
    .join(' ')
})

module.exports = groups

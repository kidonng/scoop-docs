const globby = require('globby')

const groups = [
  {
    title: 'overview',
    children: [
      'So-What.md',
      'Chocolatey-Comparison.md',
      'Cygwin-and-MSYS-Comparison.md',
    ],
  },
  {
    title: 'getting-started',
    children: [
      'Quick-Start.md',
      'Commands.md',
      'FAQ.md',
      'Uninstalling-Scoop.md',
    ],
  },
  { title: 'concepts' },
  { title: 'guides' },
  { title: 'misc' },
]

groups.forEach(async (group) => {
  const { children, title } = group

  group.children = children
    ? children.map((page) => `docs/${title}/${page}`)
    : await globby(`docs/${title}`)

  group.title = title
    .split('-')
    .map((str) => `${str.charAt(0).toUpperCase()}${str.substring(1)}`)
    .join(' ')

  group.collapsable = false
})

module.exports = groups

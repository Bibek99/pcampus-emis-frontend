module.exports = {
  arrowParens: 'always',
  singleQuote: true,
  tabWidth: 2,
  semi: true,
  tailwindConfig: './tailwind.config.js',
  importOrder: ['^react$', '^(?!^react$|^@/|^[./].*', '^@/(.*)$', '^[./]'],
  importOrderSeparation: true,
  importOrderSortSpecifier: true,
  importOrderParserPlugins: ['jsx', 'typescript'],
}

/* eslint-env meteor */
Package.describe({
  name: 'dburles:mongo-collection-instances',
  summary: 'Access your Mongo instances',
  version: '1.0.0',
  git: 'https://github.com/dburles/mongo-collection-instances.git'
})

Package.onUse(function (api) {
  api.versionsFrom(['2.3', '2.8.0', '3.0'])
  api.use([
    'ecmascript',
    'mongo',
    'lai:collection-extensions@1.0.0'])
  api.addFiles('mongo-instances.js')
})

Package.onTest(function (api) {
  api.versionsFrom(['2.3', '2.8.0', '3.0'])
  api.use([
    'ecmascript',
    'accounts-base',
    'mongo',
    'typescript',
    'meteortesting:mocha@3.2.0',
    'dburles:mongo-collection-instances@1.0.0'
  ])
  api.addFiles('mongo-instances.tests.js')
})

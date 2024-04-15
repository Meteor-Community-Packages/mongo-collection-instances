/* eslint-env meteor */
Package.describe({
  name: 'dburles:mongo-collection-instances',
  summary: 'Access your Mongo instances',
  version: '1.0.0-beta300.2',
  git: 'https://github.com/dburles/mongo-collection-instances.git'
})

Package.onUse(function (api) {
  api.versionsFrom(['2.3', '3.0-beta.0'])
  api.use([
    'ecmascript',
    'mongo',
    'lai:collection-extensions@1.0.0-beta300.2'])
  api.addFiles('mongo-instances.js')
})

Package.onTest(function (api) {
  api.use([
    'ecmascript',
    'accounts-base',
    'mongo',
    'meteortesting:mocha@3.1.0-beta300.0',
    'dburles:mongo-collection-instances@1.0.0-beta300.2'
  ])
  api.addFiles('mongo-instances.tests.js')
})

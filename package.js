/* eslint-env meteor */
Package.describe({
  name: 'dburles:mongo-collection-instances',
  summary: 'Access your Mongo instances',
  version: '1.0.0',
  git: 'https://github.com/dburles/mongo-collection-instances.git'
})

Package.onUse(function (api) {
  api.versionsFrom(['2.3', '3.0-beta.0'])
  api.use([
    'mongo',
    'ecmascript',
    'lai:collection-extensions@1.0.0'])
  api.addFiles('mongo-instances.js')
})

Package.onTest(function (api) {
  api.use([
    'ecmascript',
    'meteortesting:mocha@2.0.0',
    'accounts-base',
    'mongo@2.0.0-beta300.0',
    'dburles:mongo-collection-instances@1.0.0'
  ])
  api.addFiles('mongo-instances.tests.js')
})

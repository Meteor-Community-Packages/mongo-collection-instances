/* eslint-env meteor */
Package.describe({
  name: 'dburles:mongo-collection-instances',
  summary: 'Access your Mongo instances',
  version: '1.0.0-beta300.0',
  git: 'https://github.com/dburles/mongo-collection-instances.git'
})

Package.onUse(function (api) {
  api.versionsFrom(['3.0-beta.0'])
  api.use([
    'ecmascript@0.16.8-beta300.0',
    'mongo@2.0.0-beta300.0',
    'lai:collection-extensions@1.0.0-beta300.0'])
  api.addFiles('mongo-instances.js')
})

Package.onTest(function (api) {
  api.use([
    'ecmascript@0.16.8-beta300.0',
    'meteortesting:mocha@3.1.0-beta300.0',
    'accounts-base@3.0.0-beta300.0',
    'mongo@2.0.0-beta300.0',
    'dburles:mongo-collection-instances@1.0.0-beta300.0'
  ])
  api.addFiles('mongo-instances.tests.js')
})

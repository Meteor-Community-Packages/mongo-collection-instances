/* eslint-env meteor */
Package.describe({
  name: 'dburles:mongo-collection-instances',
  summary: 'Access your Mongo instances',
  version: '1.0.0-beta300.1',
  git: 'https://github.com/dburles/mongo-collection-instances.git'
})

Package.onUse(function (api) {
  api.versionsFrom(['2.8.0', '3.0-beta.0'])
  api.use([
    'ecmascript@0.16.8 || 0.16.8-beta300.0',
    'mongo@1.16.8 || 2.0.0-beta300.0',
    'lai:collection-extensions@1.0.0-beta300.1'])
  api.addFiles('mongo-instances.js')
})

Package.onTest(function (api) {
  api.use([
    'ecmascript@0.16.8 || 0.16.8-beta300.0',
    'meteortesting:mocha@2.0.0 || 3.1.0-beta300.0',
    'accounts-base@2.0.0 || 3.0.0-beta300.0',
    'mongo@1.16.8 || 2.0.0-beta300.0',
    'dburles:mongo-collection-instances@1.0.0-beta300.1'
  ])
  api.addFiles('mongo-instances.tests.js')
})

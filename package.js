/* eslint-env meteor */
Package.describe({
  name: 'dburles:mongo-collection-instances',
  summary: 'Access your Mongo instances',
  version: '0.4.0',
  git: 'https://github.com/dburles/mongo-collection-instances.git',
  deprecated: true
})

Package.onUse(function (api) {
  api.versionsFrom(['1.0', '2.3', '2.8.0'])
  api.use([
    'mongo',
    'ecmascript',
    'lai:collection-extensions@0.4.0'])
  api.addFiles('mongo-instances.js')
})

Package.onTest(function (api) {
  api.use([
    'ecmascript',
    'meteortesting:mocha@2.0.0',
    'accounts-base',
    'mongo',
    'dburles:mongo-collection-instances'
  ])
  api.addFiles('mongo-instances.tests.js')
})

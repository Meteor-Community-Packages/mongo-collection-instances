Package.describe({
  summary: "Access your Mongo instances",
  version: "0.1.1",
  git: "https://github.com/dburles/mongo-instances.git"
});

Package.onUse(function(api) {
  api.versionsFrom('METEOR@0.9.3.1');
  api.use('mongo');
  api.addFiles('mongo-instances.js');
});

Package.onTest(function(api) {
  api.use('tinytest');
  api.use('dburles:mongo-collection-instances');
  api.addFiles('mongo-instances-tests.js');
});

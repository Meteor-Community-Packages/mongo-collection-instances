Tinytest.add('basic - works Mongo.Collection', function (test) {
  var collectionName = 'test' + test.id;  // random ID, so a new collection every time
  Test = new Mongo.Collection(collectionName);

  Test.insert({ test: true });
  var find = Mongo.Collection.get(collectionName).find({ test: true });
  test.equal(find.count(), 1);

  // get an existing collection again
  var ReGet = Mongo.Collection.get(collectionName);
  test.equal(ReGet.find().count(), 1);
});

Tinytest.add('basic - works Meteor.Collection', function (test) {
  var collectionName = 'test' + test.id;
  var Test = new Meteor.Collection(collectionName);
  Test.insert({ test: true });
  var find = Meteor.Collection.get(collectionName).find({ test: true });
  test.equal(find.count(), 1);
});

Tinytest.add('basic - collection already exists', function (test) {
  var collectionName = 'foo' + test.id;
  function reInstantiate() {
    var Dump = new Mongo.Collection(collectionName);
  }
  var Trash = new Mongo.Collection(collectionName);
  test.throws(reInstantiate, 'is already');
});

Tinytest.add('nonexistent - returns undefined', function (test) {
  var collection = Mongo.Collection.get('truly-non-existent');
  test.equal(collection, undefined);
});

Tinytest.add('instanceof - matches Mongo.Collection', function (test) {
  var collectionName = 'foo' + test.id;
  var Test = new Mongo.Collection(collectionName);
  test.instanceOf(Test, Mongo.Collection);
});

Tinytest.add('use New - keep behavior of Mongo.Collection', function (test) {
  var collectionName = 'foo' + test.id;
  function createWithoutNew() {
    var Test = Mongo.Collection(collectionName);
  }
  test.throws(createWithoutNew, 'use "new" to construct a Mongo.Collection');
});

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
  var collectionName = 'test' + test.id;
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
  var collectionName = 'test' + test.id;
  var Test = new Mongo.Collection(collectionName);
  test.instanceOf(Test, Mongo.Collection);
});

Tinytest.add('instanceof - Meteor.Collection matches Mongo.Collection', function (test) {
  var collectionName = 'test' + test.id;
  var Test = new Meteor.Collection(collectionName);
  test.instanceOf(Test, Mongo.Collection);
});

Tinytest.add('instanceof - Meteor.users matches (Mongo/Meteor).Collection', function (test) {
  test.instanceOf(Meteor.users, Mongo.Collection);
  test.instanceOf(Meteor.users, Meteor.Collection);
});

Tinytest.add('constructor equality - Mongo/Meteor.Collection === Mongo/Meteor.Collection.prototype.constructor', function (test) {
  test.equal(Mongo.Collection, Mongo.Collection.prototype.constructor);
  test.equal(Meteor.Collection, Mongo.Collection.prototype.constructor);
  test.equal(Meteor.Collection, Meteor.Collection.prototype.constructor);
});

Tinytest.add('use New - keep behavior of Mongo.Collection', function (test) {
  var collectionName = 'test' + test.id;
  function createWithoutNew() {
    var Test = Mongo.Collection(collectionName);
  }
  test.throws(createWithoutNew, 'use "new" to construct a Mongo.Collection');
});

Tinytest.add('users - can Mongo.Collection.get Meteor.users instance', function (test) {
  test.instanceOf(Mongo.Collection.get('users'), Mongo.Collection);
  test.instanceOf(Mongo.Collection.get('users'), Meteor.Collection);
});

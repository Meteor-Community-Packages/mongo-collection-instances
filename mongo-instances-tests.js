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

Tinytest.add('nonexistent - throws', function (test) {
  function getNonexistent() {
    return Mongo.Collection.get('truly-non-existent');
  }
  test.throws(getNonexistent, 'not found');
});

Tinytest.add('nonexistent - doesn\'t throws, returns null', function (test) {
  function getNonexistent() {
    return Mongo.Collection.get('truly-non-existent',{}, true);
  }

  test.equal( getNonexistent() , null);
});

Tinytest.add('nonexistent - doesn\'t throws, returns null 2', function (test) {
  function getNonexistent() {
    return Mongo.Collection.get(null,{}, true);
  }

  test.equal( getNonexistent() , null);
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

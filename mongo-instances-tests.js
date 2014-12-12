Tinytest.add('basic - works', function (test) {
  var collectionName = 'test' + test.id;  // random ID, so a new collection every time
  Test = new Mongo.Collection(collectionName);
  Test.insert({ test: true });
  var find = Mongo.Collection.get(collectionName).find({ test: true });
  test.equal(find.count(), 1);

  // get an existing collection again
  ReGet = Mongo.Collection.get(collectionName);
  test.equal(ReGet.find().count(), 1);
});


/*  // uncomment me and the test BELOW will fail
Tinytest.add('basic - collection already exists', function (test) {
  var collectionName = 'foo' + test.id;
  function reInstantiate () {
    Dump = new Mongo.Collection(collectionName);
  }
  Trash = new Mongo.Collection(collectionName);
  test.throws(reInstantiate, 'is already');
});
*/


Tinytest.add('nonexistent - throws', function (test) {
  function getNonexistent() {
    return Mongo.Collection.get('truly-non-existent');
  }
  test.throws(getNonexistent, 'not found');
});

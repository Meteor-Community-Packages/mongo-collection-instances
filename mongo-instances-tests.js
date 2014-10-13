Tinytest.add('works', function (test) {
  Test = new Mongo.Collection('test' + test.id);
  Test.insert({ test: true });
  var find = Mongo.Collection.get('test' + test.id).find({ test: true });
  test.equal(find.count(), 1);
});

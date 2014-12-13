Tinytest.add('basic - works Mongo.Collection', function (test) {
  Test = new Mongo.Collection('test' + test.id);
  Test.insert({ test: true });
  var find = Mongo.Collection.get('test' + test.id).find({ test: true });
  test.equal(find.count(), 1);
});

Tinytest.add('basic - works Meteor.Collection', function (test) {
  Test = new Meteor.Collection('test' + test.id);
  Test.insert({ test: true });
  var find = Meteor.Collection.get('test' + test.id).find({ test: true });
  test.equal(find.count(), 1);
});
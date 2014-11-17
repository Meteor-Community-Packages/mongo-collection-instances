var instances = [];
// the original collection
var MongoCollection = Mongo.Collection;

var InfectedMongoCollection = function(name, options) {
  var instance = new MongoCollection(name, options);
  instances.push({
    name: name,
    instance: instance,
    options: options
  });
  return instance;
};

Mongo.Collection = InfectedMongoCollection;
Meteor.Collection = InfectedMongoCollection;

// make InfectedMongoCollection look more like MongoCollection
for (var property in MongoCollection) {
  if (MongoCollection.hasOwnProperty(property))
    InfectedMongoCollection[property] = MongoCollection[property];
}
InfectedMongoCollection.prototype = MongoCollection.prototype;

InfectedMongoCollection.get = function(name, options) {
  options = options || {};
  var collection = _.find(instances, function(instance) {
    if (options.connection)
      return instance.name === name &&
        instance.options && instance.options.connection._lastSessionId === options.connection._lastSessionId;
    return instance.name === name;
  });

  if (! collection)
    throw new Meteor.Error("Collection not found");

  return collection.instance;
};

InfectedMongoCollection.getAll = function() {
  return instances;
}

// special-case handle users collection, which might have been created earlier.
if (Meteor.users) {
  instances.push({
    name: 'users',
    instance: Meteor.users,
    options: undefined
  });
}

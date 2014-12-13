var instances = [];
var orig = Mongo.Collection;

Mongo.Collection = Meteor.Collection = function spawner(name, options) {
  Mongo.Collection = orig;  // `new` below doesn't work directly with orig
  var instance = new Mongo.Collection(name, options);
  instances.push({
    name: name,
    instance: instance,
    options: options
  });
  Mongo.Collection = spawner;
  return instance;
};

for (var property in orig) {
  if (orig.hasOwnProperty(property))
    Mongo.Collection[property] = orig[property];
}

Mongo.Collection.get = function(name, options) {
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

Mongo.Collection.getAll = function() {
  return instances;
};

if (Meteor.users) {
  instances.push({
    name: 'users',
    instance: Meteor.users,
    options: undefined
  });
}

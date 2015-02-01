var instances = [];
var orig = Mongo.Collection;

Mongo.Collection = function(name, options) {
  orig.call(this, name, options);  // inherit orig
  
  instances.push({
    name: name,
    instance: this,
    options: options
  });
};

Mongo.Collection.prototype = Object.create(orig.prototype);
Mongo.Collection.prototype.constructor = Mongo.Collection;

_.extend(Mongo.Collection, orig);

Mongo.Collection.get = function(name, options) {
  options = options || {};
  var collection = _.find(instances, function(instance) {
    if (options.connection)
      return instance.name === name &&
        instance.options && instance.options.connection._lastSessionId === options.connection._lastSessionId;
    return instance.name === name;
  });

  return collection && collection.instance;
};

Mongo.Collection.getAll = function() {
  return instances;
};

// Meteor.Collection will lack ownProperties that are added back to Mongo.Collection
Meteor.Collection = Mongo.Collection;

if (Meteor.users) {
  instances.push({
    name: 'users',
    instance: Meteor.users,
    options: undefined
  });
}

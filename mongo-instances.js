var namedInstances = {};
var nullInstances = [];

CollectionExtensions.addExtension(function (name, options) {
  if (name) {
    if (!(name in namedInstances)) namedInstances[name] = [];
    namedInstances[name].push({
      name: name,
      instance: this,
      options: options
    });
  } else {
    nullInstances.push({
      instance: this,
      options: options
    });
  }
});

Mongo.Collection.get = function(name, options) {
  options = options || {};
  if (name && name in namedInstances) {
    var collection = _.find(namedInstances[name], function(instance) {
      if (options.connection)
        return instance.name === name &&
          instance.options && instance.options.connection._lastSessionId === options.connection._lastSessionId;
      return instance.name === name;
    });
  } else {
    var collection = _.find(nullInstances, function(instance) {
      if (options.connection)
        return instance.options && instance.options.connection._lastSessionId === options.connection._lastSessionId;
      return true;
    });
  }

  return collection && collection.instance;
};

Mongo.Collection.getAll = function() {
  return instances;
};

// Meteor.Collection will lack ownProperties that are added back to Mongo.Collection
Meteor.Collection = Mongo.Collection;

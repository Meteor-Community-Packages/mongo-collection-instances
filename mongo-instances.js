var namedInstances = {};
var nullInstances = [];

CollectionExtensions.addExtension(function (name, options) {
  if (options && typeof(options.ref) == 'string') var name = options.ref;
  this._ref = name;
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
  var results = [];
  _.each(namedInstances, function(instances) {
    _.each(instances, function(instance) {
      results.push(instance);
    });
  });
  _.each(nullInstances, function(instance) {
    results.push(instance);
  });
  return results;
};

// Meteor.Collection will lack ownProperties that are added back to Mongo.Collection
Meteor.Collection = Mongo.Collection;

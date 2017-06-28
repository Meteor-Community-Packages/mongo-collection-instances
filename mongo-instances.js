var instances = [];

CollectionExtensions.addExtension(function (name, options) {
  instances.push({
    name: name,
    instance: this,
    options: options
  });
});

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

Mongo.Collection.remove = function (name) {
  var index = -1;
  for (var i = 0; i < instances.length; i++) {
    if (name === instances[i].name) {
      index = i;
      break;
    }
  }
  if (index > -1) {
    instances.splice(index, 1);
    return true;
  } else {
    return false;
  }
};

// Meteor.Collection will lack ownProperties that are added back to Mongo.Collection
Meteor.Collection = Mongo.Collection;

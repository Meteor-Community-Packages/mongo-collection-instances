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

Mongo.Collection.remove = function (name, options) {
  var index = -1;
  var connectionId = options && options.connection ? options.connection._lastSessionId : null;
  for (var i = 0; i < instances.length; i++) {
    var instance = instances[i];
    if (connectionId && instance.options.connection._lastSessionId === connectionId && name === instance.name) {
	    index = i;
	    break;
    }
    else if (name === instance.name) {
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

var instances = [];
var orig = Mongo.Collection;

Mongo.Collection = function (name, options) {
  orig.call( this );  //inherit orig
  
  var instance, error;
  try {
    instance = new Mongo.Collection(name, options);
  } catch (err) {
    error = err;
  }

  if (error)
    throw new Meteor.Error(error);

  instances.push({
    name: name,
    instance: instance,
    options: options
  });
  
  return instance;
};

Mongo.Collection.prototype ( Object.create( orig.prototype ) );
Mongo.Collection.prototype.constructor = Mongo.Collection;

_.extend( Mongo.Collection, orig ); // clearer
//for (var property in orig) {
// if (orig.hasOwnProperty(property))
//    Mongo.Collection[property] = orig[property];
//}

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

//This is bug fix as Meteor.Collection will lack ownProperties that are added back to Mongo.Collection
Meteor.Collection = Mongo.Collection;
_.extend( Meteor.Collection, Mongo.Collection );

if (Meteor.users) {
  instances.push({
    name: 'users',
    instance: Meteor.users,
    options: undefined
  });
}

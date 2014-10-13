var instances = {};
var orig = Mongo.Collection;

var spawner = function(name, options) {
  return spawn(name, options);
};

var spawn = function(name, options) {
  Mongo.Collection = orig;
  instances[name] = new Mongo.Collection(name, options);
  Mongo.Collection = spawner;
  return instances[name];
};

Mongo.Collection = spawner;
for (var property in orig) {
  if (orig.hasOwnProperty(property))
    Mongo.Collection[property] = orig[property];
}

Mongo.Collection.get = function(name) {
  return instances[name];
};
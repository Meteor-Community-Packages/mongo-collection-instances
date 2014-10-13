Mongo.Instance = {};

var orig = Mongo.Collection;

var spawner = function(name, options) {
  return spawn(name, options);
};

var spawn = function(name, options) {
  Mongo.Collection = orig;
  Mongo.Instance[name] = new Mongo.Collection(name, options);
  Mongo.Collection = spawner;
  return Mongo.Instance[name];
};

Mongo.Collection = spawner;
for (var property in orig) {
  if (orig.hasOwnProperty(property))
    Mongo.Collection[property] = orig[property];
}

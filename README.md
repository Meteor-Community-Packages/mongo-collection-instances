mongo-collection-instances
===============

Maybe sketchy. Adding this package allows you to lookup a Mongo Collection instance by the collection name.

# Usage Example

```js
Books = new Mongo.Collection('books');

Mongo.Collection.get('books').insert({ name: 'test' });

Mongo.Collection.get('books').findOne({ name: 'test' });
```

# API

#### CollectionWatcher.get('name', [options])

Returns the collection instance.

 - name (String)
 - options (Object) [optional]
   - options.connection (A connection object)

#### CollectionWatcher.getAll()

Returns an array of objects containing:
 - name (The name of the collection)
 - instance (The collection instance)
 - options (Any options that were passed in on instantiation)


## Multiple connections

It's possible to have more than one collection with the same name if they're on a different connection.
In order to lookup the correct collection instance, you can pass in a second argument. An object containing the connection object.

For example:


```js

connection = DDP.connect('http://localhost:3005');

Foo1 = new Mongo.Collection('foo'); // local
Foo2 = new Mongo.Collection('foo', { connection: connection });

Mongo.Collection.get('foo') // returns instance of Foo1

Mongo.Collection.get('foo', { connection: connection }); // returns instance of Foo2
```

### License

MIT

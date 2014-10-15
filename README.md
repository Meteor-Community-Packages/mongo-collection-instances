mongo-collection-instances
===============

Maybe sketchy. Adding this package allows you to lookup a Mongo Collection instance by the collection name.

# Usage Example

```js
Books = new Mongo.Collection('books');

Mongo.Collection.get('books').insert({ name: 'test' });

Mongo.Collection.get('books').findOne({ name: 'test' });
```

## Current limitations

Won't work with collections that share the same name but on a different connection.

e.g:

```js
Foo1 = new Mongo.Collection('foo', { connection: connection1 });
Foo2 = new Mongo.Collection('foo', { connection: connection2 });

Mongo.Collection.get('foo') // returns instance of Foo2
```

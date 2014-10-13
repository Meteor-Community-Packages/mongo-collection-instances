mongo-collection-instances
===============

Maybe sketchy. Adding this package allows you to lookup a Mongo Collection instance by the collection name.

# Usage Example

```js
Books = new Mongo.Collection('books');

Mongo.Collection.get('books').insert({ name: 'test' });

Mongo.Collection.get('books').findOne({ name: 'test' });
```

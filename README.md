# Warning

This package may be no longer needed as Meteor offers a built-in API for this [Mongo.getCollection](https://docs.meteor.com/api/collections.html#Mongo-getCollection).

# Meteor Mongo Collection Instances

[![Meteor Community Package](https://img.shields.io/badge/Meteor-Package-green?logo=meteor&logoColor=white)](https://meteor.com)
[![Test suite](https://github.com/Meteor-Community-Packages/mongo-collection-instances/actions/workflows/testsuite.yml/badge.svg)](https://github.com/Meteor-Community-Packages/mongo-collection-instances/actions/workflows/testsuite.yml)
[![CodeQL](https://github.com/Meteor-Community-Packages/mongo-collection-instances/actions/workflows/github-code-scanning/codeql/badge.svg)](https://github.com/Meteor-Community-Packages/mongo-collection-instances/actions/workflows/github-code-scanning/codeql)
[![Project Status: Active – The project has reached a stable, usable state and is being actively developed.](https://www.repostatus.org/badges/latest/active.svg)](https://www.repostatus.org/#active)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)



This package augments Mongo.Collection (and the deprecated Meteor.Collection) and allows you to later lookup a Mongo Collection instance by the collection name.

## Installation

```sh
$ meteor add dburles:mongo-collection-instances
```

## Usage Example

```js
const Books = new Mongo.Collection('books');

Mongo.Collection.get('books').insert({ name: 'test' });

Mongo.Collection.get('books').findOne({ name: 'test' });
```

## API

#### Mongo.Collection.get('name', [options])

Returns the collection instance.

 - name (String)
 - options (Object) [optional]
   - options.connection (A connection object, see example below)

#### Mongo.Collection.getAll()

Returns an array of objects containing:
 - name (The name of the collection)
 - instance (The collection instance)
 - options (Any options that were passed in on instantiation)


## Multiple connections

It's possible to have more than one collection with the same name if they're on a different connection.
In order to lookup the correct collection instance, you can pass in a second argument. An object containing the connection object.

For example:


```js
const connection = DDP.connect('http://localhost:3005');

const Foo1 = new Mongo.Collection('foo'); // local
const Foo2 = new Mongo.Collection('foo', { connection: connection });

Mongo.Collection.get('foo') // returns instance of Foo1

Mongo.Collection.get('foo', { connection: connection }); // returns instance of Foo2
```

### License

MIT, see [license file](./LICENSE.md)

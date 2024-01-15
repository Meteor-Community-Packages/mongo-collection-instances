import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'
import { CollectionExtensions } from 'meteor/lai:collection-extensions'
const instances = []

CollectionExtensions.addExtension(function mongoCollectionInstances (collection, name, options) {
  instances.push({
    name: name,
    instance: collection,
    options: options
  })
})

Mongo.Collection.get = function (name, options) {
  options = options || {}
  const collection = instances.find(instance => {
    if (options.connection) {
      return (
        instance.name === name &&
        instance.options &&
        instance.options.connection._lastSessionId === options.connection._lastSessionId
      )
    }
    return instance.name === name
  })

  return collection && collection.instance
}

Mongo.Collection.getAll = function () {
  return instances
}

// Meteor.Collection will lack ownProperties that are added back to Mongo.Collection
Meteor.Collection = Mongo.Collection

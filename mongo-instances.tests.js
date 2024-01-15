/* eslint-env mocha */
import { expect } from 'chai'
import { Random } from 'meteor/random'
import { Mongo } from 'meteor/mongo'
import { Meteor } from 'meteor/meteor'

const randomName = () => `test${Random.id(6)}`
const equal = (a, b) => expect(a).to.equal(b)

const insert = (collection, doc) => Meteor.isClient
  ? collection.insert(doc)
  : collection.insertAsync(doc)

describe('unit tests', () => {
  let collectionName

  beforeEach(() => {
    collectionName = randomName() // random ID, so a new collection every time
  })

  it('basic - works Mongo.Collection', async () => {
    const Test = new Mongo.Collection(collectionName)

    await insert(Test, { test: true })
    const find = Mongo.Collection.get(collectionName).find({ test: true })
    equal(await find.countAsync(), 1)

    // get an existing collection again
    const ReGet = Mongo.Collection.get(collectionName)
    equal(await ReGet.find().countAsync(), 1)
  })

  it('basic - works Meteor.Collection', async () => {
    const Test = new Meteor.Collection(collectionName)
    await insert(Test, { test: true })

    const find = Meteor.Collection.get(collectionName).find({ test: true })
    equal(await find.countAsync(), 1)
  })

  it('basic - collection already exists', () => {
    const createInstance = () => new Mongo.Collection(collectionName)
    createInstance()
    expect(createInstance).to.throw('is already')
  })

  it('nonexistent - returns undefined', () => {
    const collection = Mongo.Collection.get('truly-non-existent')
    equal(collection, undefined)
  })

  it('instanceof - matches Mongo.Collection', () => {
    const Test = new Mongo.Collection(collectionName)
    expect(Test).to.be.instanceOf(Mongo.Collection)
  })

  it('instanceof - Meteor.Collection matches Mongo.Collection', () => {
    const Test = new Meteor.Collection(collectionName)
    expect(Test).to.be.instanceOf(Mongo.Collection)
  })

  it('instanceof - Meteor.users matches (Mongo/Meteor).Collection', () => {
    expect(Meteor.users).to.be.instanceOf(Mongo.Collection)
    expect(Meteor.users).to.be.instanceOf(Meteor.Collection)
  })

  it('constructor equality - Mongo/Meteor.Collection === Mongo/Meteor.Collection.prototype.constructor', () => {
    equal(Mongo.Collection, Mongo.Collection.prototype.constructor)
    equal(Meteor.Collection, Mongo.Collection.prototype.constructor)
    equal(Meteor.Collection, Meteor.Collection.prototype.constructor)
  })

  it('use New - keep behavior of Mongo.Collection', () => {
    const createWithoutNew = () => Mongo.Collection(collectionName)
    expect(createWithoutNew).to.throw('this._maybeSetUpReplication is not a function')
  })

  it('users - can Mongo.Collection.get Meteor.users instance', () => {
    const name = 'users'
    expect(Mongo.Collection.get(name)).to.be.instanceOf(Mongo.Collection)
    expect(Mongo.Collection.get(name)).to.be.instanceOf(Meteor.Collection)
  })
})

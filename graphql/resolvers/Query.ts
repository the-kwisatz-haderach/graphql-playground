import { ObjectId } from 'mongodb'
import { ResolverMap } from '../types'

const Query: ResolverMap[keyof ResolverMap] = {
  locations(_, __, context) {
    return context?.db.collection('locations').find({}).toArray()
  },
  location(_, { id }, context) {
    return context?.db.collection('locations').findOne(new ObjectId(id))
  },
  users(_, __, context) {
    return context?.db.collection('users').find({}).toArray()
  },
  user(_, { id }, context) {
    return context?.db.collection('users').findOne(new ObjectId(id))
  },
  review(_, { id }, context) {
    return context?.db.collection('reviews').findOne(new ObjectId(id))
  },
  reviews(_, __, context) {
    return context?.db.collection('reviews').find({}).toArray()
  },
}

export default Query

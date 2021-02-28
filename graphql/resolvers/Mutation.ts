import { ObjectId } from 'mongodb'
import { ResolverMap } from '../types'

const Mutation: ResolverMap[keyof ResolverMap] = {
  async addUser(_, { input }, context) {
    const result = await context?.db.collection('users').insertOne(input)
    return {
      ...input,
      _id: result?.insertedId,
    }
  },
  async addLocation(_, { input }, context) {
    const newLocation = {
      ...input,
      reviews: [],
    }
    const location = await context?.db
      .collection('locations')
      .insertOne(newLocation)

    const user = await context?.db
      .collection('users')
      .findOne(new ObjectId(input.creator))

    return { ...newLocation, _id: location?.insertedId, creator: user }
  },
}

export default Mutation

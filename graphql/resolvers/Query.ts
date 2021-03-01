import { ResolverMap } from '../types'

const Query: ResolverMap[keyof ResolverMap] = {
  locations(_, __, { queries }) {
    return queries.findLocations()
  },
  location(_, { id }, { queries }) {
    return queries.findLocation(id)
  },
  users(_, __, { queries }) {
    return queries.findUsers()
  },
  user(_, { id }, { queries }) {
    return queries.findUser(id)
  },
  review(_, { id }, { queries }) {
    return queries.findReview(id)
  },
  reviews(_, __, { queries }) {
    return queries.findReviews()
  },
}

export default Query

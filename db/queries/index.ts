import { Db, ObjectId } from 'mongodb'
import { Location, Review, User } from '../../types/graphql'

export default function queries(db: Db) {
  return {
    findLocations(): Promise<Location[]> {
      return db.collection<Location>('locations').find({}).toArray()
    },
    findLocation(id: string): Promise<Location | null> {
      return db.collection<Location>('locations').findOne(new ObjectId(id))
    },
    findUsers(): Promise<User[]> {
      return db.collection<User>('users').find({}).toArray()
    },
    findUser(id: string): Promise<User | null> {
      return db.collection<User>('users').findOne(new ObjectId(id))
    },
    findReviews(): Promise<Review[]> {
      return db.collection<Review>('reviews').find({}).toArray()
    },
    findReview(id: string): Promise<Review | null> {
      return db.collection<Review>('reviews').findOne(new ObjectId(id))
    },
  }
}

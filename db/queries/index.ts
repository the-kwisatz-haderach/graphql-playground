import { Db, ObjectId } from 'mongodb'
import { ILocation, IReview, IUser } from '../../types/graphql'

export default function queries(db: Db) {
  return {
    findLocations(): Promise<ILocation[]> {
      return db.collection<ILocation>('locations').find({}).toArray()
    },
    findLocation(id: string): Promise<ILocation | null> {
      return db.collection<ILocation>('locations').findOne(new ObjectId(id))
    },
    findUsers(): Promise<IUser[]> {
      return db.collection<IUser>('users').find({}).toArray()
    },
    findUser(id: string): Promise<IUser | null> {
      return db.collection<IUser>('users').findOne(new ObjectId(id))
    },
    findReviews(): Promise<IReview[]> {
      return db.collection<IReview>('reviews').find({}).toArray()
    },
    findReview(id: string): Promise<IReview | null> {
      return db.collection<IReview>('reviews').findOne(new ObjectId(id))
    },
  }
}

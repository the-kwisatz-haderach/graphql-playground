import { Db, MongoClient } from 'mongodb'
import setupDb from './setupDb'

const { MONGODB_URI, MONGODB_DB } = process.env as any

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

if (!MONGODB_DB) {
  throw new Error(
    'Please define the MONGODB_DB environment variable inside .env.local'
  )
}

let cached = (global as any).mongo

if (!cached) {
  cached = (global as any).mongo || { conn: null, promise: null }
}

export default async function connectToDb(): Promise<{
  dbClient: MongoClient
  db: Db
}> {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    cached.promise = MongoClient.connect(MONGODB_URI, opts).then((dbClient) => {
      const db = dbClient.db(MONGODB_DB)

      setupDb(db)

      return {
        dbClient,
        db,
      }
    })
  }
  cached.conn = await cached.promise
  return cached.conn
}

import { Resolver } from '@apollo/client'
import { Db, MongoClient } from 'mongodb'

export type Context = {
  db: Db
  dbClient: MongoClient
}

export type ResolverFn<R = any, A = any, C = any> = (
  rootValue?: R,
  args?: A,
  context?: C,
  info?: Parameters<Resolver>['3']
) => any

export type ResolverMap = {
  [key: string]: {
    [field: string]: ResolverFn<any, any, Context>
  }
}

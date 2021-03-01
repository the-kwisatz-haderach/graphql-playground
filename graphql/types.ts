import { Resolver } from '@apollo/client'
import { MongoClient } from 'mongodb'
import queries from '../db/queries'

export type Context = {
  queries: ReturnType<typeof queries>
  dbClient: MongoClient
}

export type ResolverFn<R = any, A = any, C = any> = (
  rootValue: R,
  args: A,
  context: C,
  info: Parameters<Resolver>['3']
) => any

export type ResolverMap = {
  [key: string]: {
    [field: string]: ResolverFn<any, any, Context>
  }
}

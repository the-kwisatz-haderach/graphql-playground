import { ResolverMap } from '../types'
import Mutation from './Mutation'
import Query from './Query'

const rootResolvers: ResolverMap = {
  Query,
  Mutation,
}

export default rootResolvers

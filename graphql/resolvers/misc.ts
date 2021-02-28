import { ResolverFn } from '../types'

export const idResolver: ResolverFn = (parent): string => parent._id

import { ApolloServer } from 'apollo-server-micro'
import resolvers from './resolvers'
import loadTypeDefs from './helpers/loadTypeDefs'
import connectToDb from '../db/utils/connectToDb'

const createApolloServer = () => {
  const typeDefs = loadTypeDefs()

  return new ApolloServer({
    typeDefs,
    resolvers,
    context: async () => ({
      ...(await connectToDb()),
    }),
  })
}

export default createApolloServer

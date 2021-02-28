import Cors from 'micro-cors'
import createApolloServer from '../../graphql'

const handler = createApolloServer().createHandler({ path: '/api/graphql' })

export const config = {
  api: {
    bodyParser: false,
  },
}
const cors = Cors({
  allowMethods: ['POST', 'OPTIONS'],
})

export default cors(handler)

import connectToDb from '../db/utils/connectToDb'

type Props = {
  isConnected: boolean
}

function HomePage({ isConnected }: Props) {
  return <div>{isConnected + ''}</div>
}

export async function getStaticProps() {
  const { dbClient } = await connectToDb()

  const isConnected = await dbClient.isConnected()
  return {
    props: { isConnected },
  }
}

export default HomePage

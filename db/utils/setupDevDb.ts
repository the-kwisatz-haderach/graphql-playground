import faker from 'faker'
import { generateEntries } from './generateEntries'
import { DbSetupFn } from './setupDb'

const createUser = () => ({
  _id: faker.random.uuid(),
  username: faker.name.firstName(),
})

const fakeUsers = generateEntries(5, createUser)

const getFakeUser = <T>(fakeUsers: T[]): T =>
  fakeUsers[Math.floor(Math.random() * fakeUsers.length)]

const createReview = () => ({
  _id: faker.random.uuid(),
  rating: Math.floor(Math.random() * 6),
  author: getFakeUser(fakeUsers),
})

const createLocation = () => ({
  _id: faker.random.uuid(),
  coordinates: {
    latitude: faker.address.latitude(),
    longitude: faker.address.longitude(),
  },
  name: faker.address.city(),
  reviews: generateEntries(25, createReview),
  creator: getFakeUser(fakeUsers),
})

const fakeLocations = generateEntries(10, createLocation)

type CollectionName = 'users' | 'locations' | 'reviews'

const fakeCollections: Record<CollectionName, any> = {
  users: fakeUsers,
  locations: fakeLocations,
  reviews: fakeLocations.flatMap((location) => location.reviews),
}

const setupDev: DbSetupFn = async (db) => {
  const collections = await db.collections()

  await Promise.all(collections.map((coll) => coll.drop()))

  return Promise.all(
    Object.keys(fakeCollections).map((collName) => {
      return db.createCollection(collName).then((coll) => {
        coll.insertMany(fakeCollections[collName as CollectionName])
      })
    })
  )
}

export default setupDev

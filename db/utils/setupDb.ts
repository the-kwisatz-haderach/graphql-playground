import { Db } from 'mongodb'
import setupDev from './setupDevDb'

export type DbSetupFn = (db: Db) => void

const setupDb = (
  setupFunctions: Partial<Record<'dev' | 'test' | 'prod', DbSetupFn>>
) => (db: Db) => {
  switch (process.env.NODE_ENV) {
    case 'production': {
      setupFunctions.prod && setupFunctions.prod(db)
      break
    }
    case 'test': {
      setupFunctions.test && setupFunctions.test(db)
      break
    }
    default: {
      setupFunctions.dev && setupFunctions.dev(db)
    }
  }
}

export default setupDb({ dev: setupDev })

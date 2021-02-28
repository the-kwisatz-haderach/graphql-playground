import * as path from 'path'
import { readFileSync } from 'fs'
import { sync } from 'glob'

const FILE_EXTENSIONS = ['gql', 'graphql']
const ENCODING = 'utf-8'

const loadTypeDefs = (): string =>
  sync(`**/*/*.{${FILE_EXTENSIONS.join(',')}}`).reduce<string>(
    (typesStr, filePath) =>
      typesStr + readFileSync(path.join(process.cwd(), filePath), ENCODING),
    ''
  )

export default loadTypeDefs

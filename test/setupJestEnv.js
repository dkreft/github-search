import path from 'path'

import dotenv from 'dotenv'


dotenv.config({
  path: path.resolve(path.join(__dirname, '.env.test')),
})

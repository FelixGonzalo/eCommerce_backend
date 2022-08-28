import mongoose from 'mongoose'
import config from '../../../config'
import logger from '../../logger'

const password = config.MONGODB_PASSWORD
const user = config.MONGODB_USER
const connectionString = `mongodb+srv://${user}:${password}@cluster0.mcbzk.mongodb.net/?retryWrites=true&w=majority`

mongoose
  .connect(connectionString)
  .then(() => logger.info('Connection to mongoDB successful'))
  .catch((error) => console.error(error))

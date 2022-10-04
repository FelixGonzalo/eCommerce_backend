require('dotenv').config({
  path: `.env.${process.argv[2].split('=')[1] || 'development'}`,
})
import config from '../config'
if (config.PERSISTENCE_SYSTEM === 'mongo') import('./store/mongoDb/connection')
import express from 'express'
import { handleUnknownRoutes } from './middleware/routes/handleUnknownRoutes'
import { errorHandler } from './middleware/errors/errorHandler'
import swaggerUI from 'swagger-ui-express'
import { swaggerSpecs } from '../swaggerSpecs'
import cluster from 'cluster'
import os from 'os'
import cors from 'cors'
import logger from './logger'
import morgan from 'morgan'
import routes from './routes/index'

if (config.API_CLUSTER && cluster.isPrimary) {
  const numCpus = os.cpus().length

  logger.info('SERVIDOR MAESTRO DEL CLUSTER: ')
  logger.info('Número de procesadores: ' + numCpus)
  logger.info('PID:' + process.pid)

  for (let i = 0; i < numCpus; i++) {
    cluster.fork()
  }

  cluster.on('exit', (worker) => {
    logger.info('Worker ' + process.pid + ' exit')
    cluster.fork()
  })
} else {
  const app = express()
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(
    morgan('combined', {
      stream: { write: (message) => logger.info(message.trim()) },
    })
  )
  app.use('/public', express.static('storage'))
  app.use('/api', routes)
  app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerSpecs))
  app.use(errorHandler)
  app.use('*', handleUnknownRoutes)

  app.listen(config.API_PORT, () => {
    logger.info(
      `Server open on PORT: ${config.API_PORT} - PID(${
        process.pid
      }) - (${new Date().toLocaleString()})`
    )
  })
}

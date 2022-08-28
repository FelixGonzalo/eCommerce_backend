require('dotenv').config()
import './store/mongoDb/connection' // connect to MongoDB
// import './store/firebase/connection' // connect to Firebase

import express from 'express'
import config from '../config'
import authRouter from './api/auth/routes'
import productsRouter from './api/products/routes'
import shoppingCartsRouter from './api/shoppingCarts/routes'
import { handleUnknownRoutes } from './network/errors'
import { errorHandler } from './network/errors'
import swaggerUI from 'swagger-ui-express'
const swaggerDoc = require('./swagger.json')
import cluster from 'cluster'
import os from 'os'
import cors from 'cors'
import logger from './logger'
import morgan from 'morgan'

if (config.API_CLUSTER && cluster.isPrimary) {
  const numCpus = os.cpus().length

  logger.info('SERVIDOR MAESTRO DEL CLUSTER: ')
  logger.info('Número de procesadores: ' + numCpus)
  logger.info('PID:' + process.pid)

  for (let i = 0; i < numCpus; i++) {
    cluster.fork()
  }

  cluster.on('exit', worker => {
    logger.info('Worker ' + process.pid + ' exit')
    cluster.fork()
  })
} else {
  const app = express()
  app.use(cors())
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use(morgan("combined", { stream: { write: message => logger.info(message.trim()) }}));
  app.use('/public', express.static('storage'))
  app.use('/api/auth', authRouter)
  app.use('/api/products', productsRouter)
  app.use('/api/shoppingCarts', shoppingCartsRouter)
  app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc))
  app.use(errorHandler)
  app.use('*', handleUnknownRoutes)

  app.listen(config.API_PORT, () => {
    logger.info(`Server open on PORT: ${config.API_PORT} - PID(${process.pid}) - (${new Date().toLocaleString()})`)
  })
}
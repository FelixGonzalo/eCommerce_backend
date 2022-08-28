require('dotenv').config()
import './store/mongoDb/connection' // connect to MongoDB
// import './store/firebase/connection' // connect to Firebase

import express from 'express'
import config from '../config'
import authRouter from './api/auth/controller'
import productsRouter from './api/products/controller'
import shoppingCartsRouter from './api/shoppingCarts/controller'
import { handleUnknownRoutes } from './network/errors'
import { errorHandler } from './network/errors'
import swaggerUI from 'swagger-ui-express'
const swaggerDoc = require('./api/swagger.json')
import cluster from 'cluster'
import os from 'os'

if (config.API_CLUSTER && cluster.isPrimary) {
  const numCpus = os.cpus().length

  console.log('SERVIDOR MAESTRO DEL CLUSTER: ')
  console.log('Número de procesadores: ' + numCpus)
  console.log('PID:' + process.pid)

  for (let i = 0; i < numCpus; i++) {
    cluster.fork()
  }

  cluster.on('exit', worker => {
    console.log('Worker ' + process.pid + ' exit')
    cluster.fork()
  })
} else {
  const app = express()
  app.use(express.json())
  app.use(express.urlencoded({ extended: true }))
  app.use('/public', express.static(__dirname + '/storage'))
  app.use('/api/auth', authRouter)
  app.use('/api/products', productsRouter)
  app.use('/api/shoppingCarts', shoppingCartsRouter)
  app.use('/api/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDoc))
  app.use(errorHandler)
  app.use('*', handleUnknownRoutes)

  app.listen(config.API_PORT, () => {
    console.log(`Server open on PORT: ${config.API_PORT} - PID(${process.pid}) - (${new Date().toLocaleString()})`)
  })
}
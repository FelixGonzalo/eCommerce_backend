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

const app = express()
app.use(express.json())
app.use('/api/auth', authRouter)
app.use('/api/products', productsRouter)
app.use('/api/shoppingCarts', shoppingCartsRouter)
app.use('/api/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDoc))
app.use(errorHandler)
app.use('*', handleUnknownRoutes)

app.listen(config.API_PORT, () => {
  console.log(`Server open on PORT: ${config.API_PORT}`)
})

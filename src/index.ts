require('dotenv').config()
import express from 'express'
import config from '../config'
import productsRouter from './api/products/controller'
import shoppingCartsRouter from './api/shoppingCarts/controller'
import { handleUnknownRoutes } from './network/errors'
import { errorHandler } from './network/errors'
import swaggerUI from 'swagger-ui-express'
const swaggerDoc = require('./api/swagger.json')

const app = express()
app.use(express.json())
app.use('/api/products', productsRouter)
app.use('/api/shoppingCarts', shoppingCartsRouter)
app.use('/api/documentation', swaggerUI.serve, swaggerUI.setup(swaggerDoc))
app.use(errorHandler)
app.use('*', handleUnknownRoutes)

app.listen(config.API_PORT, () => {
  console.log(`Server open on PORT: ${config.API_PORT}`)
})

require('dotenv').config()
import express from 'express'
import config from '../config'
import productsRouter from './api/products/controller'
import shoppingCartsRouter from './api/shoppingCarts/controller'
import { handleUnknownRoutes } from './network/errors'
import { errorHandler } from './network/errors'

const app = express()
app.use(express.json())
app.use('/api/products', productsRouter)
app.use('/api/shoppingCarts', shoppingCartsRouter)
app.use('*', handleUnknownRoutes)
app.use(errorHandler)

app.listen(config.API_PORT, () => {
  console.log(`Server open on PORT: ${config.API_PORT}`)
})

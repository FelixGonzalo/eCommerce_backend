require('dotenv').config()
import express from 'express'
import config from '../config'
import productsRouter from './api/products/controller'

const app = express()
app.use('/api/products', productsRouter)

app.get('/', (req, res) => {
  res.send({
    message: 'Hello API',
  })
})

app.listen(config.API_PORT, () => {
  console.log(`Server open on PORT: ${config.API_PORT}`)
})

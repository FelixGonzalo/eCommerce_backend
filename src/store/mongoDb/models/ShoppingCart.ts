import { Schema, model } from 'mongoose'
import { productSchema } from './Product'

const ShoppingCartSchema = new Schema({
  products: [productSchema],
})

export const ShoppingCart = model('ShoppingCart', ShoppingCartSchema)

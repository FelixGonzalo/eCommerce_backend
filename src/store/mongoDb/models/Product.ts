import { Schema, model } from 'mongoose'

export const productSchema = new Schema({
  title: String,
  price: Number,
  thumbnail: String,
  description: String,
  code: String,
  stock: Number,
  timestamp: { type: Date, default: Date.now },
})

export const Product = model('Product', productSchema)

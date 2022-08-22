import { Schema, model } from 'mongoose'
import { TProduct } from '../../types/TProduct'

export const productSchema = new Schema<TProduct>({
  title: String,
  price: Number,
  thumbnail: String,
  description: String,
  code: String,
  stock: Number,
  timestamp: { type: Date, default: Date.now },
})

export const Product = model<TProduct>('Product', productSchema)

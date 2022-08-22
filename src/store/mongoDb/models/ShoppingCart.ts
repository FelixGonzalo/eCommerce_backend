import { Schema, model } from 'mongoose'
import { TShoppingCart } from '../../types/TShoppingCart'
import { productSchema } from './Product'
import { userSchema } from './User'

const ShoppingCartSchema = new Schema<TShoppingCart>({
  status: String,
  products: [productSchema],
  user: userSchema,
})

export const ShoppingCart = model<TShoppingCart>(
  'ShoppingCart',
  ShoppingCartSchema
)

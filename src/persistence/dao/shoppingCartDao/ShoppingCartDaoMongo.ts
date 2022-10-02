import mongoose, { Schema, model } from 'mongoose'
import { productSchema } from '../productDao/ProductDaoMongo'
import { userSchema } from '../userDao/UserDaoMongo'
import {
  ShoppingCartDataType,
  ShoppingCartType,
} from '../../../types/ShoppingCartType'
import {
  shoppingCartDtoForMongo,
  shoppingCartsDtoForMongo,
} from '../../dto/shoppingCartDto'

const ShoppingCartSchema = new Schema<ShoppingCartType>({
  status: String,
  products: [productSchema],
  user: userSchema,
})

export default class ShoppingCartDaoMongo {
  ShoppingCartModel: mongoose.Model<ShoppingCartType, {}, {}, {}>

  constructor() {
    this.ShoppingCartModel =
      mongoose.models.ShoppingCart ||
      model<ShoppingCartType>('ShoppingCart', ShoppingCartSchema)
  }

  init() {
    console.log('Shopping cart dao in Mongo -> ready!')
  }

  disconnect() {
    console.log('Shopping cart dao in Mongo -> closed!')
  }

  async getAll() {
    try {
      const shoppingCarts = await this.ShoppingCartModel.find()
      const formattedShoppingCarts: ShoppingCartType[] =
        shoppingCartsDtoForMongo(shoppingCarts)
      return formattedShoppingCarts
    } catch (error) {
      throw error
    }
  }

  async getById(id: string) {
    try {
      const shoppingCart = await this.ShoppingCartModel.findOne({ _id: id })
      if (!shoppingCart) return null
      const formattedShoppingCart: ShoppingCartType =
        shoppingCartDtoForMongo(shoppingCart)
      return formattedShoppingCart
    } catch (error) {
      throw error
    }
  }

  async save(obj: ShoppingCartDataType) {
    try {
      const shoppingCart = new this.ShoppingCartModel<ShoppingCartDataType>(obj)
      const cart = await shoppingCart.save()
      return shoppingCartDtoForMongo(cart)
    } catch (error) {
      throw error
    }
  }

  async updateById(id: string, newObj: ShoppingCartDataType) {
    try {
      const shoppingCart = await this.ShoppingCartModel.findByIdAndUpdate(
        id,
        newObj
      )
      if (!shoppingCart) return null
      return { id, ...newObj }
    } catch (error) {
      throw error
    }
  }

  async deleteById(id: string) {
    try {
      const shoppingCart = await this.ShoppingCartModel.findByIdAndDelete(id)
      if (!shoppingCart) return null
      return id
    } catch (error) {
      throw error
    }
  }
}

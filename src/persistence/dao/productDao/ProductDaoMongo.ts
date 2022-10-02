import { ProductDataType, ProductType } from '../../../types/ProductType'
import mongoose, { Schema, model } from 'mongoose'
import { productDtoForMongo, productsDtoForMongo } from '../../dto/productDto'

export const productSchema = new Schema<ProductType>({
  title: String,
  price: Number,
  thumbnail: String,
  description: String,
  code: String,
  stock: Number,
})
export default class ProductDaoMongo {
  ProductModel: mongoose.Model<ProductType, {}, {}, {}>

  constructor() {
    this.ProductModel =
      mongoose.models.Product || model<ProductType>('Product', productSchema)
  }

  init() {
    console.log('Product dao in Mongo -> ready!')
  }

  disconnect() {
    console.log('Product dao in Mongo -> closed!')
  }

  async getAll() {
    try {
      const products = await this.ProductModel.find()
      const formattedProducts: ProductType[] = productsDtoForMongo(products)
      return formattedProducts
    } catch (error) {
      throw error
    }
  }

  async getById(id: string) {
    try {
      const product = await this.ProductModel.findOne({ _id: id })
      if (!product) return null
      const formattedProduct: ProductType = productDtoForMongo(product)
      return formattedProduct
    } catch (error) {
      throw error
    }
  }

  save(obj: ProductDataType) {
    const product = new this.ProductModel<ProductDataType>(obj)
    return product.save()
  }

  async updateById(id: string, newObj: ProductDataType) {
    try {
      const product = await this.ProductModel.findByIdAndUpdate(id, newObj)
      if (!product) return null
      return { id, ...newObj }
    } catch (error) {
      throw error
    }
  }

  async deleteById(id: string) {
    try {
      const product = await this.ProductModel.findByIdAndDelete(id)
      if (!product) return null
      return id
    } catch (error) {
      throw error
    }
  }
}

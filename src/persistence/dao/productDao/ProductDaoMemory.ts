import { ProductDataType, ProductType } from '../../../types/ProductType'

export default class ProductDaoMemory {
  products: ProductType[]
  cont: number

  constructor() {
    this.products = []
    this.cont = 1
  }

  init() {
    console.log('Product dao in memory -> ready!')
  }

  disconnect() {
    console.log('Product dao in memory -> closed!')
  }

  getIndex(id: string) {
    return this.products.findIndex((product) => product.id == id)
  }

  getAll() {
    return this.products
  }

  getById(id: string) {
    try {
      const index = this.getIndex(id)
      if (index === -1) return null
      return this.products[index]
    } catch (error) {
      throw error
    }
  }

  save(obj: ProductDataType) {
    const newProduct: ProductType = { ...obj, id: String(this.cont++) }
    this.products.push(newProduct)
    return newProduct
  }

  updateById(id: string, newObj: ProductDataType) {
    try {
      const index = this.getIndex(id)
      if (index === -1) return null
      const updatedProduct = { ...this.products[index], ...newObj }
      this.products.splice(index, 1, updatedProduct)
      return updatedProduct
    } catch (error) {
      throw error
    }
  }

  deleteById(id: string) {
    try {
      const index = this.getIndex(id)
      if (index === -1) return null
      this.products.splice(index, 1)
      return id
    } catch (error) {
      throw error
    }
  }
}

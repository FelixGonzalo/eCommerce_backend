import {
  ShoppingCartDataType,
  ShoppingCartType,
} from '../../../types/ShoppingCartType'

export default class ShoppingCartDaoMemory {
  shoppingCarts: ShoppingCartType[]
  cont: number

  constructor() {
    this.shoppingCarts = []
    this.cont = 1
  }

  init() {
    console.log('Shopping cart dao in memory -> ready!')
  }

  disconnect() {
    console.log('Shopping cart dao in memory -> closed!')
  }

  getIndex(id: string) {
    return this.shoppingCarts.findIndex((cart) => cart.id == id)
  }

  getAll() {
    return this.shoppingCarts
  }

  getById(id: string) {
    try {
      const index = this.getIndex(id)
      if (index === -1) return null
      return this.shoppingCarts[index]
    } catch (error) {
      throw error
    }
  }

  save(obj: ShoppingCartDataType) {
    const newCart: ShoppingCartType = { ...obj, id: String(this.cont++) }
    this.shoppingCarts.push(newCart)
    return newCart
  }

  updateById(id: string, newObj: ShoppingCartDataType) {
    try {
      const index = this.getIndex(id)
      if (index === -1) return null
      const updatedCart = { ...this.shoppingCarts[index], ...newObj }
      this.shoppingCarts.splice(index, 1, updatedCart)
      return updatedCart
    } catch (error) {
      throw error
    }
  }

  deleteById(id: string) {
    try {
      const index = this.getIndex(id)
      if (index === -1) return null
      this.shoppingCarts.splice(index, 1)
      return id
    } catch (error) {
      throw error
    }
  }
}

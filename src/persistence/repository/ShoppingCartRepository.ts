import {
  ShoppingCartDataType,
  ShoppingCartType,
} from '../../types/ShoppingCartType'
import ShoppingCartDaoFactory from '../dao/shoppingCartDao/ShoppingCartDaoFactory'

export default class ShoppingCartRepository {
  dao: any

  constructor() {
    this.dao = new ShoppingCartDaoFactory().getDao()
  }

  async getAll(): Promise<ShoppingCartType[]> {
    return this.dao.getAll()
  }

  async getById(id: string): Promise<ShoppingCartType | null> {
    return this.dao.getById(id)
  }

  async save(obj: ShoppingCartDataType): Promise<ShoppingCartType> {
    return this.dao.save(obj)
  }

  async updateById(
    id: string,
    newObj: ShoppingCartDataType
  ): Promise<ShoppingCartType | null> {
    return this.dao.updateById(id, newObj)
  }

  async deleteById(id: string): Promise<String | null> {
    return this.dao.deleteById(id)
  }
}

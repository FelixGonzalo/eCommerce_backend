import { ProductDataType, ProductType } from '../../types/ProductType'
import ProductDaoFactory from '../dao/productDao/ProductDaoFactory'

export default class ProductRepository {
  dao: any

  constructor() {
    this.dao = new ProductDaoFactory().getDao()
  }

  async getAll(): Promise<ProductType[]> {
    return this.dao.getAll()
  }

  async getById(id: string): Promise<ProductType | null> {
    return this.dao.getById(id)
  }

  async save(obj: ProductDataType): Promise<ProductType> {
    return this.dao.save(obj)
  }

  async updateById(
    id: string,
    newObj: ProductDataType
  ): Promise<ProductType | null> {
    return this.dao.updateById(id, newObj)
  }

  async deleteById(id: string): Promise<String | null> {
    return this.dao.deleteById(id)
  }
}

import ProductDaoMemory from './ProductDaoMemory'
import ProductDaoMongo from './ProductDaoMongo'

const option = 'Mongo'
let dao: ProductDaoMemory | ProductDaoMongo

switch (option) {
  case 'Mongo':
    dao = new ProductDaoMongo()
    dao.init()
    break
  // case 'Memory':
  //   dao = new ProductDaoMemory()
  //   dao.init()
  //   break
  default:
    dao = new ProductDaoMemory()
    dao.init()
}

export default class ProductDaoFactory {
  static instance: ProductDaoFactory

  constructor() {
    if (!ProductDaoFactory.instance) {
      ProductDaoFactory.instance = this
    } else {
      return ProductDaoFactory.instance
    }
  }

  getDao() {
    return dao
  }
}

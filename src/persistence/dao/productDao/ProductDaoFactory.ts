import config from '../../../../config'
import ProductDaoMemory from './ProductDaoMemory'
import ProductDaoMongo from './ProductDaoMongo'

const option = config.PERSISTENCE_SYSTEM
let dao: ProductDaoMemory | ProductDaoMongo

switch (option) {
  case 'mongo':
    dao = new ProductDaoMongo()
    dao.init()
    break
  case 'memory':
    dao = new ProductDaoMemory()
    dao.init()
    break
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

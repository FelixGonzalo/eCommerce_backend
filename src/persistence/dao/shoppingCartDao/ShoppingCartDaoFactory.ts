import config from '../../../../config'
import ShoppingCartDaoMemory from './ShoppingCartDaoMemory'
import ShoppingCartDaoMongo from './ShoppingCartDaoMongo'

const option = config.PERSISTENCE_SYSTEM
let dao: ShoppingCartDaoMemory | ShoppingCartDaoMongo

switch (option) {
  case 'mongo':
    dao = new ShoppingCartDaoMongo()
    dao.init()
    break
  case 'memory':
    dao = new ShoppingCartDaoMemory()
    dao.init()
    break
  default:
    dao = new ShoppingCartDaoMemory()
    dao.init()
}

export default class ShoppingCartDaoFactory {
  static instance: ShoppingCartDaoFactory

  constructor() {
    if (!ShoppingCartDaoFactory.instance) {
      ShoppingCartDaoFactory.instance = this
    } else {
      return ShoppingCartDaoFactory.instance
    }
  }

  getDao() {
    return dao
  }
}

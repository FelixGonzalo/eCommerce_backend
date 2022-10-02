import ShoppingCartDaoMemory from './ShoppingCartDaoMemory'
import ShoppingCartDaoMongo from './ShoppingCartDaoMongo'

const option = 'Mongo'
let dao: ShoppingCartDaoMemory | ShoppingCartDaoMongo

switch (option) {
  case 'Mongo':
    dao = new ShoppingCartDaoMongo()
    dao.init()
    break
  // case 'Memory':
  //   dao = new ShoppingCartDaoMemory()
  //   dao.init()
  //   break
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

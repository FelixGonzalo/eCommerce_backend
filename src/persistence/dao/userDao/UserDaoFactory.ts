import config from '../../../../config'
import UserDaoMemory from './UserDaoMemory'
import UserDaoMongo from './UserDaoMongo'

const option = config.PERSISTENCE_SYSTEM
let dao: UserDaoMemory | UserDaoMongo

switch (option) {
  case 'mongo':
    dao = new UserDaoMongo()
    dao.init()
    break
  case 'memory':
    dao = new UserDaoMemory()
    dao.init()
    break
  default:
    dao = new UserDaoMemory()
    dao.init()
}

export default class UserDaoFactory {
  static instance: UserDaoFactory

  constructor() {
    if (!UserDaoFactory.instance) {
      UserDaoFactory.instance = this
    } else {
      return UserDaoFactory.instance
    }
  }

  getDao() {
    return dao
  }
}

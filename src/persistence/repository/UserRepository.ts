import {
  UserDataType,
  UserEditType,
  UserProfileType,
  UserType,
} from '../../types/UserType'
import UserDaoFactory from '../dao/userDao/UserDaoFactory'

export default class UserRepository {
  dao: any

  constructor() {
    this.dao = new UserDaoFactory().getDao()
  }

  async getAll(): Promise<UserProfileType[]> {
    return this.dao.getAll()
  }

  async getById(id: string): Promise<UserProfileType> {
    return this.dao.getById(id)
  }

  async getByEmailForAuth(email: string): Promise<UserType | undefined> {
    return this.dao.getByEmailForAuth(email)
  }

  async save(obj: UserDataType): Promise<UserProfileType> {
    return this.dao.save(obj)
  }

  async deleteById(id: string): Promise<String> {
    return this.dao.deleteById(id)
  }

  async updateById(id: string, newObj: UserEditType): Promise<UserProfileType> {
    return this.dao.updateById(id, newObj)
  }
}

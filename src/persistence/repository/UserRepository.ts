import { UserDataType, UserEditType, UserType } from '../../types/UserType'
import UserDaoFactory from '../dao/userDao/UserDaoFactory'

export default class UserRepository {
  dao: any

  constructor() {
    this.dao = new UserDaoFactory().getDao()
  }

  async getAll(): Promise<UserType[]> {
    return this.dao.getAll()
  }

  async getById(id: string): Promise<UserType> {
    return this.dao.getById(id)
  }

  async save(obj: UserDataType): Promise<UserType> {
    return this.dao.save(obj)
  }

  async deleteById(id: string): Promise<String> {
    return this.dao.deleteById(id)
  }

  async updateById(id: string, newObj: UserEditType): Promise<UserType> {
    return this.dao.updateById(id, newObj)
  }
}

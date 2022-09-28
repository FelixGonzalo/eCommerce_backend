import { UserDataType, UserType } from '../../../types/UserType'
import { userProfileDto, userProfilesDto } from '../../dto/userDto'

export default class UserDaoMemory {
  users: UserType[]
  cont: number

  constructor() {
    this.users = []
    this.cont = 1
  }

  init() {
    console.log('User dao in memory -> ready!')
  }

  disconnect() {
    console.log('User dao in memory -> closed!')
  }

  getIndex(id: string) {
    return this.users.findIndex((user) => user.id == id)
  }

  getAll() {
    return userProfilesDto(this.users)
  }

  getById(id: string) {
    try {
      const user = this.users[this.getIndex(id)]
      if (!user) throw new Error('The user does not exist')
      return userProfileDto(user)
    } catch (error) {
      throw error
    }
  }

  getByEmailForAuth(email: string) {
    try {
      const user = this.users.find((user) => user.email === email)
      return user
    } catch (error) {
      throw error
    }
  }

  save(obj: UserDataType) {
    const newUser: UserType = { ...obj, id: String(this.cont++) }
    this.users.push(newUser)
    return userProfileDto(newUser)
  }

  updateById(id: string, newObj: UserDataType) {
    try {
      const index = this.getIndex(id)
      if (index === -1) throw new Error('The user does not exist')
      const updatedUser = { ...this.users[index], ...newObj }
      this.users.splice(index, 1, updatedUser)
      return userProfileDto(updatedUser)
    } catch (error) {
      throw error
    }
  }

  deleteById(id: string) {
    try {
      const index = this.getIndex(id)
      if (index === -1) throw new Error('The user does not exist')
      this.users.splice(this.getIndex(id), 1)
      return id
    } catch (error) {
      throw error
    }
  }
}

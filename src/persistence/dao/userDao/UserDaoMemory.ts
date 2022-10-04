import { UserDataType, UserType } from '../../../types/UserType'
import { userProfileDto, userProfilesDto } from '../../dto/userDto'
import bcrypt from 'bcrypt'

export default class UserDaoMemory {
  users: UserType[]
  cont: number

  constructor() {
    this.users = [
      {
        id: '1',
        email: 'felixcastro@demo.com',
        password: bcrypt.hashSync('123456', 2),
        name: 'Felix Castro',
        address: '',
        phone: '',
        photo: '',
        type: 'admin',
      },
    ]
    this.cont = 2
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
      const index = this.getIndex(id)
      if (index === -1) return null
      const user = this.users[index]
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
      if (index === -1) return null
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
      if (index === -1) return null
      this.users.splice(index, 1)
      return id
    } catch (error) {
      throw error
    }
  }
}

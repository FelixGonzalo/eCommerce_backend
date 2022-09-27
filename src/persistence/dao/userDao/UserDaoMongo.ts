import mongoose, { Schema, model } from 'mongoose'
import { UserDataType, UserEditType, UserType } from '../../../types/UserType'
import { userDtoForMongo, usersDtoForMongo } from '../../dto/userDto'

export default class UserDaoMongo {
  UserModel: mongoose.Model<UserType, {}, {}, {}>

  constructor() {
    const userSchema = new Schema<UserType>({
      email: String,
      password: String,
      name: String,
      address: String,
      phone: String,
      photo: String,
      type: String,
    })

    this.UserModel = mongoose.models.User || model<UserType>('User', userSchema)
  }

  init() {
    console.log('User dao in Mongo -> ready!')
  }

  disconnect() {
    console.log('User dao in Mongo -> closed!')
  }

  async getAll() {
    try {
      const users = await this.UserModel.find()
      return usersDtoForMongo(users)
    } catch (error) {
      throw error
    }
  }

  async getById(id: string) {
    try {
      const user = await this.UserModel.findOne({ _id: id })
      if (!user) throw new Error('The user does not exist')
      return userDtoForMongo(user)
    } catch (error) {
      throw error
    }
  }

  async save(obj: UserDataType) {
    try {
      const User = new this.UserModel<UserDataType>(obj)
      const user = await User.save()
      return userDtoForMongo(user)
    } catch (error) {
      throw error
    }
  }

  async updateById(id: string, newObj: UserEditType) {
    try {
      const user = await this.UserModel.findByIdAndUpdate(id, newObj)
      if (!user) throw new Error('The user does not exist')
      return userDtoForMongo({
        id,
        email: user.email,
        ...newObj,
        type: user.type,
      })
    } catch (error) {
      throw error
    }
  }

  async deleteById(id: string) {
    try {
      const User = await this.UserModel.findByIdAndDelete(id)
      if (!User) throw new Error('The User does not exist')
      return id
    } catch (error) {
      throw error
    }
  }
}

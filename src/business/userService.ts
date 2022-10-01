import UserRepository from '../persistence/repository/UserRepository'
import { UserDataType, UserEditType } from '../types/UserType'
import bcrypt from 'bcrypt'
import { errorCodes } from '../middleware/errors/errorDictionary'

const userRepository = new UserRepository()

const createUser = async (user: UserDataType) => {
  try {
    const passwordHash = await bcrypt.hash(user.password, 2)
    return userRepository.save({ ...user, password: passwordHash })
  } catch (error) {
    throw error
  }
}

const getUsers = async () => userRepository.getAll()

const getUserById = async (id: string) => {
  try {
    const user = await userRepository.getById(id)
    if (!user) throw new Error(errorCodes.USER_NOT_FOUND)
    return user
  } catch (error) {
    throw error
  }
}

const updateUserById = async (id: string, user: UserEditType) => {
  try {
    const updatedUser = await userRepository.updateById(id, user)
    if (!updatedUser) throw new Error(errorCodes.USER_NOT_FOUND)
    return updatedUser
  } catch (error) {
    throw error
  }
}

export default {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
}

import { UserDataType, UserEditType } from '../types/UserType'
import UserRepository from '../persistence/repository/UserRepository'
import bcrypt from 'bcrypt'

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

const getUserById = async (id: string) => userRepository.getById(id)

const updateUserById = async (id: string, user: UserEditType) =>
  userRepository.updateById(id, user)

export default {
  createUser,
  getUsers,
  getUserById,
  updateUserById,
}

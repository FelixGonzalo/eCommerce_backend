import UserRepository from '../persistence/repository/UserRepository'
import { UserDataType, UserEditType } from '../types/UserType'
import bcrypt from 'bcrypt'
import { errorCodes } from '../middleware/errors/errorDictionary'
import { UserTokenType } from '../types/UserTokenType'

const userRepository = new UserRepository()

const createUser = async (user: UserDataType) => {
  try {
    const foundUser = await userRepository.getByEmailForAuth(user.email)
    if (foundUser) throw new Error(errorCodes.USER_ALREADY_EXISTS)
    const passwordHash = await bcrypt.hash(user.password, 2)
    return userRepository.save({ ...user, password: passwordHash })
  } catch (error) {
    throw error
  }
}

const getUsers = async () => userRepository.getAll()

const getUserById = async (id: string, userToken: UserTokenType) => {
  try {
    // -- If the user is not an administrator, you cannot see the data of another user
    if (userToken.id != id && userToken.type !== 'admin')
      throw new Error(errorCodes.UNAUTHORIZED)
    const user = await userRepository.getById(id)
    if (!user) throw new Error(errorCodes.USER_NOT_FOUND)
    return user
  } catch (error) {
    throw error
  }
}

const updateUserById = async (
  id: string,
  user: UserEditType,
  userToken: UserTokenType
) => {
  try {
    // -- If the user is not an administrator, you cannot edit the data of another user
    if (userToken.id != id && userToken.type !== 'admin')
      throw new Error(errorCodes.UNAUTHORIZED)
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

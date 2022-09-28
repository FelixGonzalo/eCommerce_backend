import UserRepository from '../persistence/repository/UserRepository'
import { UserAuthType, UserType } from '../types/UserType'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../config'

const userRepository = new UserRepository()

const login = async (user: UserAuthType) => {
  try {
    const foundUser = await userRepository.getByEmailForAuth(user.email)

    if (!foundUser)
      return { error: 'Wrong credentials', code: 'wrong_credentials' }

    const isCorrectPassword = await bcrypt.compare(
      user.password,
      foundUser.password
    )
    if (!isCorrectPassword)
      return { error: 'Wrong credentials', code: 'wrong_credentials' }

    return { token: createUserToken(foundUser) }
  } catch (error) {
    throw error
  }
}

function createUserToken(user: UserType) {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      name: user.name,
      type: user.type,
    },
    config.SECRET_KEYWORD,
    {
      expiresIn: 60 * 60 * 24 * 7,
    }
  )
  return token
}

export default {
  login,
}

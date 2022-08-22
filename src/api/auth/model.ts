import { userDao } from '../../store/daos'
import { TUser } from '../../store/types/TUser'

function addUser({
  email,
  password,
  name,
  address,
  age,
  phone,
  photo,
  type,
}: TUser) {
  return userDao.add({
    email,
    password,
    name,
    address,
    age,
    phone,
    photo,
    type,
  })
}

function getUserByEmail(email: string) {
  return userDao.getByEmail(email)
}

export default {
  addUser,
  getUserByEmail,
}

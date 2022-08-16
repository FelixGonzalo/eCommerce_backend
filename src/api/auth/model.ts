import { userDao } from '../../store/daos'

function addUser({ email, password, name, address, age, phone, photo }) {
  return userDao.add({ email, password, name, address, age, phone, photo })
}

function getUserByEmail(email) {
  return userDao.getByEmail(email)
}

export default {
  addUser,
  getUserByEmail,
}

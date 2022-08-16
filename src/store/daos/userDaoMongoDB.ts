import { User } from '../mongoDb/models/User'

const add = (obj) => {
  const product = new User(obj)
  return product.save()
}

const getAll = () => User.find()
const getById = (id) => User.findOne({ _id: id })
const updateById = (obj) => User.findByIdAndUpdate(obj.id, obj)
const getByEmail = (email) => User.findOne({ email: email })

export default {
  add,
  getAll,
  getById,
  updateById,
  getByEmail,
}

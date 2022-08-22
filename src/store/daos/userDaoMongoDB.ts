import { User } from '../mongoDb/models/User'
import { TUser } from '../types/TUser'

const add = (obj: TUser) => {
  const user = new User<TUser>(obj)
  return user.save()
}

const getAll = () => User.find()
const getById = (id: string) => User.findOne({ _id: id })
const updateById = (obj: TUser) => User.findByIdAndUpdate(obj.id, obj)
const getByEmail = (email: string) => User.findOne({ email: email })

export default {
  add,
  getAll,
  getById,
  updateById,
  getByEmail,
}

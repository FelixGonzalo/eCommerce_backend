import FirebaseContainer from '../firebase/FirebaseContainer'

const firebaseContainer = new FirebaseContainer('products')

const add = (obj) => firebaseContainer.add(obj)
const getAll = () => firebaseContainer.getAll()
const getById = (id) => firebaseContainer.getById(id)
const updateById = (obj) => firebaseContainer.updateById(obj)
const deleteById = (id) => firebaseContainer.deleteById(id)

export default {
  add,
  getAll,
  getById,
  updateById,
  deleteById,
}

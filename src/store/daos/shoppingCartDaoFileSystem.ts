import FileSystemContainer from '../FileSystem/FileSystemContainer'
const shoppingCartDaoFileSystem = new FileSystemContainer('shoppingCarts')

const add = (obj) => shoppingCartDaoFileSystem.save(obj)
const getAll = () => shoppingCartDaoFileSystem.getAll()
const getById = (id) => shoppingCartDaoFileSystem.getById(id)
const updateById = (obj) => shoppingCartDaoFileSystem.updateById(obj)
const deleteById = (id) => shoppingCartDaoFileSystem.deleteById(id)

export default {
  add,
  getAll,
  getById,
  updateById,
  deleteById,
}

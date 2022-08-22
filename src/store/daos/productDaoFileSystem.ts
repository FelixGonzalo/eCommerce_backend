import FileSystemContainer from '../FileSystem/FileSystemContainer'
const productDaoFileSystem = new FileSystemContainer('products')

const add = (obj) => productDaoFileSystem.save(obj)
const getAll = () => productDaoFileSystem.getAll()
const getById = (id) => productDaoFileSystem.getById(id)
const updateById = (obj) => productDaoFileSystem.updateById(obj)
const deleteById = (id) => productDaoFileSystem.deleteById(id)

export default {
  add,
  getAll,
  getById,
  updateById,
  deleteById,
}

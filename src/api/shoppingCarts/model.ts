const Contenedor = require('../../store/containers/FileContainer')
const shoppingCartDB = new Contenedor('shoppingCarts')

function addShoppingCartById() {
  return shoppingCartDB.save({})
}

function updateShoppingCart({ id, products }) {
  return shoppingCartDB.updateById({ id, products })
}

function getShoppingCartById(id) {
  return shoppingCartDB.getById(id)
}

function deleteShoppingCartById(id) {
  return shoppingCartDB.deleteById(id)
}

export default {
  getShoppingCartById,
  updateShoppingCart,
  addShoppingCartById,
  deleteShoppingCartById,
}

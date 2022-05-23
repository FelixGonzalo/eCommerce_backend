import express from 'express'
const router = express.Router()

router.get('/', getProducts)

function getProducts(req, res) {
  res.send({ message: 'API productos' })
}
export default router

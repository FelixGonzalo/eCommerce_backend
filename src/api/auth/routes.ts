import express from 'express'
import { validateLogin, validateRegister } from './validation'
import { uploadImage } from '../../services/storage/storage'
import { login, register } from './controller'

const router = express.Router()

router.post('/register', uploadImage.single('photo'), validateRegister, register)
router.post('/login', validateLogin, login)

export default router
import { Router } from 'express'
import authController from '../controllers/auth.controller'
import authMiddleware from '../middlewares/auth.middleware'

const route = Router()

route.post('/register', authMiddleware.register, authController.register)
route.post('/login', authMiddleware.login, authController.login)

export default route

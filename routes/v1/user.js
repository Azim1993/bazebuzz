import {Router} from 'express'
import authMiddleware from '@middlewares/authMiddleware'
import userController from '@controllers/userController'
const router = new Router()

router.post('/users', authMiddleware, userController.getUsers)

export default router
import {Router} from 'express'
import authMiddleware from '@middlewares/authMiddleware'
import categoryController from '@controllers/categoryController'

const router = new Router()

router.get('/categories', authMiddleware, categoryController.index)
router.post('/categories', authMiddleware, categoryController.store)
router.get('/categories/:slug', authMiddleware, categoryController.show)

export default router

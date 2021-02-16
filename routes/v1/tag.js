import {Router} from 'express'
import authMiddleware from '@middlewares/authMiddleware'
import tagController from '@controllers/tagController'

const router = new Router()

router.get('/tags', tagController.index)
router.post('/tags', authMiddleware, tagController.store)

export default router
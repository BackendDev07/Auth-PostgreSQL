import { Router } from 'express'
import noteMiddleware from '../middlewares/note.middleware'
import noteController from '../controllers/note.controller'

const router = Router()

router.post('/', noteMiddleware.noteMiddleware, noteController.create)
router.get('/', noteController.getAll)
router.get('/:noteId', noteController.getById)
router.delete('/:noteId', noteController.remove)
router.put('/:noteId', noteMiddleware.noteMiddleware, noteController.update)

export default router

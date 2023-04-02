import express from 'express'
import { isAuthenticatedUser } from '../middlewares/auth.js'
import { getComment, getComments, newComment } from '../Controllers/commentController.js'

const router = express.Router()

router.post('/new', isAuthenticatedUser, newComment)
router.get('/:id', getComment)
router.get('/:id/all', getComments)

export default router

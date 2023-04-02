import express from 'express'
import { getPosts } from '../Controllers/PostController.js'
import { deleteUser, followUser, getUser, getUsers, loadUser, unFollowUser, updateUser } from '../Controllers/UserController.js'
import { isAuthenticatedUser } from '../middlewares/auth.js'

const router = express.Router()
router.get('/:id', getUser)
router.get('/', getUsers)
router.get('/:id/posts', getPosts)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.put('/:id/follow', isAuthenticatedUser, followUser)
router.put('/:id/unfollow', isAuthenticatedUser, unFollowUser)
export default router

import express from 'express'
import { getPosts } from '../Controllers/PostController.js'
import { deleteUser, followUser, getUser, getUsers, loadUser, unFollowUser, updateUser } from '../Controllers/UserController.js'
import { isAuthenticatedUser } from '../middlewares/auth.js'

const router = express.Router()
router.get('/:id', getUser)
router.get('/me', isAuthenticatedUser, loadUser)
router.get('/:id/users', getUsers)
router.get('/:id/posts', getPosts)
router.put('/:id', updateUser)
router.delete('/:id', deleteUser)
router.put('/:id/follow', followUser)
router.put('/:id/unfollow', unFollowUser)
export default router

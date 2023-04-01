import exress from 'express'
import { loginUser, registerUser } from '../Controllers/AuthContoroller.js'
import { loadUser } from '../Controllers/UserController.js'
import { isAuthenticatedUser } from '../middlewares/auth.js'

const router = exress.Router()

router.get('/', (req, res) => {
  res.send('Auth Routes')
})

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/me', isAuthenticatedUser, loadUser)
export default router

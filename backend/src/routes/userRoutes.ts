import { Router }                    from 'express'
import { authenticate, requireRole } from '../middleware/authenticate'
import { getAllUsers, updateUserRole } from '../controllers/UserController'

export const userRouter = Router()

userRouter.use(authenticate)
userRouter.use(requireRole('ADMIN'))

userRouter.get('/', getAllUsers)
userRouter.patch('/:id/role', updateUserRole)
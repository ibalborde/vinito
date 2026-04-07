import { Router } from 'express'
import { register, login } from '../controllers/AuthController'
import { validateBody } from '../middleware/validateBody'
import { RegisterSchema, LoginSchema } from '../validators/authValidators'

export const authRouter = Router()

authRouter.post('/register', validateBody(RegisterSchema), register)
authRouter.post('/login',    validateBody(LoginSchema),    login)
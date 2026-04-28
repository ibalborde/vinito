import { Router }       from 'express'
import { authenticate, requireRole } from '../middleware/authenticate'
import { validateBody } from '../middleware/validateBody'
import {
  CreateQuestionSchema,
  UpdateQuestionSchema,
} from '../validators/questionValidators'
import {
  getAllQuestions,
  getQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} from '../controllers/QuestionController'

export const questionRouter = Router()

questionRouter.use(authenticate)

questionRouter.get('/',    getAllQuestions)
questionRouter.get('/:id', getQuestionById)

questionRouter.post(
  '/',
  requireRole('ADMIN'),
  validateBody(CreateQuestionSchema),
  createQuestion
)
questionRouter.patch(
  '/:id',
  requireRole('ADMIN'),
  validateBody(UpdateQuestionSchema),
  updateQuestion
)
questionRouter.delete('/:id', requireRole('ADMIN'), deleteQuestion)

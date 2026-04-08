import { Router }       from 'express'
import { authenticate, requireRole } from '../middleware/authenticate'
import { validateBody } from '../middleware/validateBody'
import {
  CreateStudyTopicSchema,
  UpdateStudyTopicSchema,
} from '../validators/studyTopicValidators'
import {
  getAllTopics,
  getTopicById,
  createTopic,
  updateTopic,
  deleteTopic,
} from '../controllers/StudyTopicController'

export const studyTopicRouter = Router()

studyTopicRouter.use(authenticate)

studyTopicRouter.get('/',    getAllTopics)
studyTopicRouter.get('/:id', getTopicById)

studyTopicRouter.post(
  '/',
  requireRole('ADMIN'),
  validateBody(CreateStudyTopicSchema),
  createTopic
)
studyTopicRouter.patch(
  '/:id',
  requireRole('ADMIN'),
  validateBody(UpdateStudyTopicSchema),
  updateTopic
)
studyTopicRouter.delete('/:id', requireRole('ADMIN'), deleteTopic)
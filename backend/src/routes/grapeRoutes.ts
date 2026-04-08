import { Router }       from 'express'
import { authenticate, requireRole } from '../middleware/authenticate'
import { validateBody } from '../middleware/validateBody'
import {
  CreateGrapeSchema,
  UpdateGrapeSchema,
} from '../validators/grapeValidators'
import {
  getAllGrapes,
  getGrapeById,
  createGrape,
  updateGrape,
  deleteGrape,
} from '../controllers/GrapeController'

export const grapeRouter = Router()

grapeRouter.use(authenticate)

grapeRouter.get('/',    getAllGrapes)
grapeRouter.get('/:id', getGrapeById)

grapeRouter.post(
  '/',
  requireRole('ADMIN'),
  validateBody(CreateGrapeSchema),
  createGrape
)
grapeRouter.patch(
  '/:id',
  requireRole('ADMIN'),
  validateBody(UpdateGrapeSchema),
  updateGrape
)
grapeRouter.delete('/:id', requireRole('ADMIN'), deleteGrape)
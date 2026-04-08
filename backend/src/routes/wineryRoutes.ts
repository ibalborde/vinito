import { Router }       from 'express'
import { authenticate } from '../middleware/authenticate'
import { requireRole }  from '../middleware/authenticate'
import { validateBody } from '../middleware/validateBody'
import {
  CreateWinerySchema,
  UpdateWinerySchema,
} from '../validators/wineryValidators'
import {
  getAllWineries,
  getWineryById,
  createWinery,
  updateWinery,
  deleteWinery,
} from '../controllers/WineryController'

export const wineryRouter = Router()

wineryRouter.use(authenticate)

wineryRouter.get('/',    getAllWineries)
wineryRouter.get('/:id', getWineryById)

wineryRouter.post(
  '/',
  requireRole('ADMIN'),
  validateBody(CreateWinerySchema),
  createWinery
)
wineryRouter.patch(
  '/:id',
  requireRole('ADMIN'),
  validateBody(UpdateWinerySchema),
  updateWinery
)
wineryRouter.delete('/:id', requireRole('ADMIN'), deleteWinery)
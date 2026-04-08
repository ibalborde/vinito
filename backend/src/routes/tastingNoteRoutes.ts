import { Router }       from 'express'
import { authenticate } from '../middleware/authenticate'
import { validateBody } from '../middleware/validateBody'
import {
  CreateTastingNoteSchema,
  UpdateTastingNoteSchema,
} from '../validators/tastingNoteValidators'
import {
  getMyNotes,
  getSharedNotes,
  getNoteById,
  createNote,
  updateNote,
  deleteNote,
} from '../controllers/TastingNoteController'

export const tastingNoteRouter = Router()

tastingNoteRouter.use(authenticate)

tastingNoteRouter.get('/mine',  getMyNotes)
tastingNoteRouter.get('/group', getSharedNotes)
tastingNoteRouter.get('/:id',   getNoteById)
tastingNoteRouter.post('/',     validateBody(CreateTastingNoteSchema), createNote)
tastingNoteRouter.patch('/:id', validateBody(UpdateTastingNoteSchema), updateNote)
tastingNoteRouter.delete('/:id', deleteNote)
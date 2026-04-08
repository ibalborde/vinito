import { Request, Response, NextFunction } from 'express'
import { TastingNoteService }    from '../services/TastingNoteService'
import { TastingNoteRepository } from '../repositories/TastingNoteRepository'
import { TastingNoteFiltersSchema } from '../validators/tastingNoteValidators'

const service = new TastingNoteService(new TastingNoteRepository())

export async function getMyNotes(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const filters = TastingNoteFiltersSchema.parse(req.query)
    const result  = await service.getMyNotes(req.user!.userId, filters)
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

export async function getSharedNotes(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const filters = TastingNoteFiltersSchema.parse(req.query)
    const result  = await service.getSharedNotes(filters)
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}

export async function getNoteById(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id   = String(req.params.id)
    const note = await service.getNoteById(req.user!.userId, id)
    res.status(200).json(note)
  } catch (error) {
    next(error)
  }
}

export async function createNote(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const note = await service.createNote(req.user!.userId, req.body)
    res.status(201).json(note)
  } catch (error) {
    next(error)
  }
}

export async function updateNote(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id   = String(req.params.id)
    const note = await service.updateNote(req.user!.userId, id, req.body)
    res.status(200).json(note)
  } catch (error) {
    next(error)
  }
}

export async function deleteNote(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const id = String(req.params.id)
    await service.deleteNote(req.user!.userId, id)
    res.status(204).send()
  } catch (error) {
    next(error)
  }
}
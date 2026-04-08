import { Request, Response, NextFunction } from 'express'
import { GrapeService }    from '../services/GrapeService'
import { GrapeRepository } from '../repositories/GrapeRepository'
import { GrapeFiltersSchema } from '../validators/grapeValidators'

const service = new GrapeService(new GrapeRepository())

export async function getAllGrapes(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const filters = GrapeFiltersSchema.parse(req.query)
    res.status(200).json(await service.getAllGrapes(filters))
  } catch (error) { next(error) }
}

export async function getGrapeById(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    res.status(200).json(await service.getGrapeById(String(req.params.id)))
  } catch (error) { next(error) }
}

export async function createGrape(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    res.status(201).json(await service.createGrape(req.body))
  } catch (error) { next(error) }
}

export async function updateGrape(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    res.status(200).json(
      await service.updateGrape(String(req.params.id), req.body)
    )
  } catch (error) { next(error) }
}

export async function deleteGrape(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    await service.deleteGrape(String(req.params.id))
    res.status(204).send()
  } catch (error) { next(error) }
}
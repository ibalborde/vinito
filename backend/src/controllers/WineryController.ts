import { Request, Response, NextFunction } from 'express'
import { WineryService }    from '../services/WineryService'
import { WineryRepository } from '../repositories/WineryRepository'
import { WineryFiltersSchema } from '../validators/wineryValidators'

const service = new WineryService(new WineryRepository())

export async function getAllWineries(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const filters = WineryFiltersSchema.parse(req.query)
    res.status(200).json(await service.getAllWineries(filters))
  } catch (error) { next(error) }
}

export async function getWineryById(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    res.status(200).json(await service.getWineryById(String(req.params.id)))
  } catch (error) { next(error) }
}

export async function createWinery(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    res.status(201).json(await service.createWinery(req.body))
  } catch (error) { next(error) }
}

export async function updateWinery(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    res.status(200).json(
      await service.updateWinery(String(req.params.id), req.body)
    )
  } catch (error) { next(error) }
}

export async function deleteWinery(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    await service.deleteWinery(String(req.params.id))
    res.status(204).send()
  } catch (error) { next(error) }
}
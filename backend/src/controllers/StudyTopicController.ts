import { Request, Response, NextFunction } from 'express'
import { StudyTopicService }    from '../services/StudyTopicService'
import { StudyTopicRepository } from '../repositories/StudyTopicRepository'

const service = new StudyTopicService(new StudyTopicRepository())

export async function getAllTopics(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const category = req.query.category as string | undefined
    res.status(200).json(await service.getAllTopics(category))
  } catch (error) { next(error) }
}

export async function getTopicById(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    res.status(200).json(await service.getTopicById(String(req.params.id)))
  } catch (error) { next(error) }
}

export async function createTopic(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    res.status(201).json(await service.createTopic(req.body))
  } catch (error) { next(error) }
}

export async function updateTopic(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    res.status(200).json(
      await service.updateTopic(String(req.params.id), req.body)
    )
  } catch (error) { next(error) }
}

export async function deleteTopic(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    await service.deleteTopic(String(req.params.id))
    res.status(204).send()
  } catch (error) { next(error) }
}
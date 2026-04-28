import { Request, Response, NextFunction } from 'express'
import { QuestionService }    from '../services/QuestionService'
import { QuestionRepository } from '../repositories/QuestionRepository'

const service = new QuestionService(new QuestionRepository())

export async function getAllQuestions(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    const category = req.query.category as string | undefined
    const limit    = req.query.limit ? Number(req.query.limit) : undefined
    res.status(200).json(await service.getAllQuestions(category, limit))
  } catch (error) { next(error) }
}

export async function getQuestionById(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    res.status(200).json(await service.getQuestionById(String(req.params.id)))
  } catch (error) { next(error) }
}

export async function createQuestion(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    res.status(201).json(await service.createQuestion(req.body))
  } catch (error) { next(error) }
}

export async function updateQuestion(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    res.status(200).json(
      await service.updateQuestion(String(req.params.id), req.body)
    )
  } catch (error) { next(error) }
}

export async function deleteQuestion(
  req: Request, res: Response, next: NextFunction
): Promise<void> {
  try {
    await service.deleteQuestion(String(req.params.id))
    res.status(204).send()
  } catch (error) { next(error) }
}

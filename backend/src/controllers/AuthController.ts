import { Request, Response, NextFunction } from 'express'
import { AuthService } from '../services/AuthService'
import { UserRepository } from '../repositories/UserRepository'

const authService = new AuthService(new UserRepository())

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await authService.register(req.body)
    res.status(201).json(result)
  } catch (error) {
    next(error)
  }
}

export async function login(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const result = await authService.login(req.body)
    res.status(200).json(result)
  } catch (error) {
    next(error)
  }
}
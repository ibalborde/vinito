import { Request, Response, NextFunction } from 'express'
import { UserService }    from '../services/UserService'
import { UserRepository } from '../repositories/UserRepository'

const service = new UserService(new UserRepository())

export async function getAllUsers(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const users = await service.getAllUsers()
    res.status(200).json(users)
  } catch (error) {
    next(error)
  }
}

export async function updateUserRole(
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> {
  try {
    const { role } = req.body
    const user = await service.updateUserRole(
      String(req.params.id),
      role
    )
    res.status(200).json(user)
  } catch (error) {
    next(error)
  }
}
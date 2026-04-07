import { Request, Response, NextFunction } from 'express'
import { verifyToken } from '../config/jwt'
import { UnauthorizedError } from '../errors/AppError'
import { Role } from '@prisma/client'

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string
        email: string
        role: Role
      }
    }
  }
}

export function authenticate(
  req: Request,
  _res: Response,
  next: NextFunction
): void {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    next(new UnauthorizedError('Token no proporcionado'))
    return
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = verifyToken(token)
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role as Role,
    }
    next()
  } catch {
    next(new UnauthorizedError('Token inválido o expirado'))
  }
}

export function requireRole(role: Role) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    if (!req.user || req.user.role !== role) {
      import('../errors/AppError').then(({ ForbiddenError }) => {
        next(new ForbiddenError())
      })
      return
    }
    next()
  }
}
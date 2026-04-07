import { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/AppError'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function errorHandler(
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      status: 'error',
      message: error.message,
    })
    return
  }

  console.error('Error no controlado:', error)

  res.status(500).json({
    status: 'error',
    message: 'Error interno del servidor',
  })
}
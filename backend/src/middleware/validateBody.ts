import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'
import { ValidationError } from '../errors/AppError'

export function validateBody(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      const message = result.error.issues.length > 0
        ? result.error.issues.map((i) => i.message).join(', ')
        : 'Datos inválidos'
      next(new ValidationError(message))
      return
    }

    req.body = result.data
    next()
  }
}
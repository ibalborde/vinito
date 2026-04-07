import { Request, Response, NextFunction } from 'express'
import { ZodSchema } from 'zod'
import { ValidationError } from '../errors/AppError'

export function validateBody(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req.body)

    if (!result.success) {
      const issues = result.error?.issues ?? result.error?.errors ?? []
      const message = issues.length > 0
        ? issues.map((e: { message: string }) => e.message).join(', ')
        : 'Datos inválidos'
      next(new ValidationError(message))
      return
    }

    req.body = result.data
    next()
  }
}
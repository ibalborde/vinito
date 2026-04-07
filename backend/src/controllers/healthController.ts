import { Request, Response } from 'express'
import { getHealthStatus } from '../services/healthService'

export function getHealth(_req: Request, res: Response): void {
  const status = getHealthStatus()
  res.status(200).json(status)
}
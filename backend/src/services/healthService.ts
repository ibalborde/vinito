import { env } from '../config/env'

interface HealthStatus {
  status: 'ok'
  version: string
  environment: string
  timestamp: string
}

export function getHealthStatus(): HealthStatus {
  return {
    status: 'ok',
    version: '1.0.0',
    environment: env.nodeEnv,
    timestamp: new Date().toISOString(),
  }
}
import { describe, it, expect } from 'vitest'
import { getHealthStatus } from '../../src/services/healthService'

describe('getHealthStatus', () => {
  it('devuelve status ok', () => {
    const result = getHealthStatus()
    expect(result.status).toBe('ok')
  })

  it('devuelve un timestamp válido', () => {
    const result = getHealthStatus()
    expect(new Date(result.timestamp).toISOString()).toBe(result.timestamp)
  })

  it('devuelve version como string no vacío', () => {
    const result = getHealthStatus()
    expect(result.version).toBeTruthy()
  })

  it('la forma del objeto es correcta', () => {
    const result = getHealthStatus()
    expect(result).toMatchObject({
      status: 'ok',
      version: expect.any(String),
      environment: expect.any(String),
      timestamp: expect.any(String),
    })
  })
})
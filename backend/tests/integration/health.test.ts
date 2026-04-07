import { describe, it, expect } from 'vitest'
import supertest from 'supertest'
import app from '../../src/app'

const request = supertest(app)

describe('GET /api/health', () => {
  it('devuelve status 200', async () => {
    const response = await request.get('/api/health')
    expect(response.status).toBe(200)
  })

  it('devuelve status ok en el body', async () => {
    const response = await request.get('/api/health')
    expect(response.body.status).toBe('ok')
  })

  it('devuelve version en el body', async () => {
    const response = await request.get('/api/health')
    expect(response.body.version).toBeDefined()
  })

  it('devuelve timestamp en formato ISO', async () => {
    const response = await request.get('/api/health')
    expect(new Date(response.body.timestamp).toISOString())
      .toBe(response.body.timestamp)
  })

  it('devuelve environment en el body', async () => {
    const response = await request.get('/api/health')
    expect(response.body.environment).toBeDefined()
  })
})
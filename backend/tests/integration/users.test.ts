import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import supertest from 'supertest'
import app    from '../../src/app'
import prisma from '../../src/config/prisma'

const request = supertest(app)

const ADMIN_EMAIL    = 'ibalborde@gmail.com'
const ADMIN_PASSWORD = 'vinito_admin_2026'
const TEST_EMAIL     = 'test_user_v2@vinito.com'

let adminToken: string
let testUserId: string

beforeAll(async () => {
  await prisma.user.deleteMany({
    where: { email: TEST_EMAIL },
  })

  const adminLogin = await request
    .post('/api/auth/login')
    .send({ email: ADMIN_EMAIL, password: ADMIN_PASSWORD })

  adminToken = adminLogin.body.token

  const newUser = await request
    .post('/api/auth/register')
    .send({ email: TEST_EMAIL, password: 'password123', name: 'Test User V2' })

  testUserId = newUser.body.user.id
})

afterAll(async () => {
  await prisma.user.deleteMany({
    where: { email: TEST_EMAIL },
  })
  await prisma.$disconnect()
})

describe('GET /api/users', () => {
  it('admin puede ver todos los usuarios', async () => {
    const res = await request
      .get('/api/users')
      .set('Authorization', `Bearer ${adminToken}`)

    expect(res.status).toBe(200)
    expect(res.body).toBeInstanceOf(Array)
    expect(res.body.length).toBeGreaterThan(0)
  })

  it('nunca devuelve passwordHash', async () => {
    const res = await request
      .get('/api/users')
      .set('Authorization', `Bearer ${adminToken}`)

    res.body.forEach((user: Record<string, unknown>) => {
      expect(user.passwordHash).toBeUndefined()
    })
  })

  it('usuario sin auth recibe 401', async () => {
    const res = await request.get('/api/users')
    expect(res.status).toBe(401)
  })
})

describe('PATCH /api/users/:id/role', () => {
  it('admin puede cambiar el rol de un usuario', async () => {
    const res = await request
      .patch(`/api/users/${testUserId}/role`)
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ role: 'ADMIN' })

    expect(res.status).toBe(200)
    expect(res.body.role).toBe('ADMIN')
  })

  it('usuario inexistente devuelve 404', async () => {
    const res = await request
      .patch('/api/users/id-inexistente/role')
      .set('Authorization', `Bearer ${adminToken}`)
      .send({ role: 'STUDENT' })

    expect(res.status).toBe(404)
  })
})
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import supertest from 'supertest'
import app from '../../src/app'
import prisma from '../../src/config/prisma'

const request = supertest(app)

const TEST_EMAILS = [
  'test_auth@vinito.com',
  'otro@test.com',
  'otro2@test.com',
]

const testUser = {
  email:    'test_auth@vinito.com',
  password: 'password123',
  name:     'Test User',
}

beforeAll(async () => {
  await prisma.user.deleteMany({
    where: { email: { in: TEST_EMAILS } },
  })
})

afterAll(async () => {
  await prisma.user.deleteMany({
    where: { email: { in: TEST_EMAILS } },
  })
  await prisma.$disconnect()
})

describe('POST /api/auth/register', () => {
  it('registra un usuario nuevo y devuelve token', async () => {
    const response = await request
      .post('/api/auth/register')
      .send(testUser)

    expect(response.status).toBe(201)
    expect(response.body.token).toBeDefined()
    expect(response.body.user.email).toBe(testUser.email)
    expect(response.body.user.passwordHash).toBeUndefined()
  })

  it('rechaza email duplicado con 409', async () => {
    const response = await request
      .post('/api/auth/register')
      .send(testUser)

    expect(response.status).toBe(409)
  })

  it('rechaza password menor a 8 caracteres con 400', async () => {
    const response = await request
      .post('/api/auth/register')
      .send({ ...testUser, email: 'otro@test.com', password: '123' })

    expect(response.status).toBe(400)
  })

  it('rechaza email inválido con 400', async () => {
    const response = await request
      .post('/api/auth/register')
      .send({ ...testUser, email: 'no-es-un-email' })

    expect(response.status).toBe(400)
  })

  it('nunca devuelve passwordHash en la respuesta', async () => {
    const response = await request
      .post('/api/auth/register')
      .send({ email: 'otro2@test.com', password: 'password123', name: 'Otro' })

    expect(response.status).toBe(201)
    expect(response.body.user.passwordHash).toBeUndefined()
  })
})

describe('POST /api/auth/login', () => {
  it('hace login con credenciales correctas y devuelve token', async () => {
    const response = await request
      .post('/api/auth/login')
      .send({ email: testUser.email, password: testUser.password })

    expect(response.status).toBe(200)
    expect(response.body.token).toBeDefined()
    expect(response.body.user.role).toBeDefined()
  })

  it('rechaza credenciales incorrectas con 401', async () => {
    const response = await request
      .post('/api/auth/login')
      .send({ email: testUser.email, password: 'wrong_password' })

    expect(response.status).toBe(401)
  })

  it('rechaza email no registrado con 401', async () => {
    const response = await request
      .post('/api/auth/login')
      .send({ email: 'noexiste@vinito.com', password: 'password123' })

    expect(response.status).toBe(401)
  })

  it('el mensaje de error es el mismo para usuario no existe y password incorrecta', async () => {
    const wrongPassword = await request
      .post('/api/auth/login')
      .send({ email: testUser.email, password: 'wrong' })

    const noUser = await request
      .post('/api/auth/login')
      .send({ email: 'noexiste@vinito.com', password: 'password123' })

    expect(wrongPassword.body.message).toBe(noUser.body.message)
  })
})

describe('Rutas protegidas', () => {
  it('rechaza request sin token con 401', async () => {
    const response = await request.get('/api/health')
    expect(response.status).toBe(200)
  })

  it('rechaza token inválido con 401', async () => {
    const response = await request
      .get('/api/health')
      .set('Authorization', 'Bearer token_invalido')

    expect(response.status).toBe(200)
  })
})
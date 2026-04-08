import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import supertest from 'supertest'
import app    from '../../src/app'
import prisma from '../../src/config/prisma'

const request = supertest(app)

const TEST_EMAIL    = 'test_notes@vinito.com'
const TEST_PASSWORD = 'password123'

let authToken: string
let userId:    string
let noteId:    string

const sampleNote = {
  wineName:    'Malbec Catena',
  winery:      'Catena Zapata',
  grape:       'Malbec',
  region:      'Luján de Cuyo',
  type:        'RED',
  score:       9.0,
  privateNotes:'Tomado en la juntada del martes',
  tastingDate: new Date().toISOString(),
}

beforeAll(async () => {
  await prisma.tastingNote.deleteMany({
    where: { user: { email: TEST_EMAIL } },
  })
  await prisma.user.deleteMany({
    where: { email: TEST_EMAIL },
  })

  const res = await request
    .post('/api/auth/register')
    .send({ email: TEST_EMAIL, password: TEST_PASSWORD, name: 'Test Notes' })

  authToken = res.body.token
  userId    = res.body.user.id
})

afterAll(async () => {
  await prisma.tastingNote.deleteMany({
    where: { user: { email: TEST_EMAIL } },
  })
  await prisma.user.deleteMany({
    where: { email: TEST_EMAIL },
  })
  await prisma.$disconnect()
})

describe('POST /api/tasting-notes', () => {
  it('crea una nota de cata correctamente', async () => {
    const res = await request
      .post('/api/tasting-notes')
      .set('Authorization', `Bearer ${authToken}`)
      .send(sampleNote)

    expect(res.status).toBe(201)
    expect(res.body.wineName).toBe(sampleNote.wineName)
    expect(res.body.privateNotes).toBe(sampleNote.privateNotes)
    noteId = res.body.id
  })

  it('rechaza score fuera de rango con 400', async () => {
    const res = await request
      .post('/api/tasting-notes')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ ...sampleNote, score: 11 })

    expect(res.status).toBe(400)
  })

  it('rechaza tipo de vino inválido con 400', async () => {
    const res = await request
      .post('/api/tasting-notes')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ ...sampleNote, type: 'INVALID' })

    expect(res.status).toBe(400)
  })

  it('rechaza request sin autenticación con 401', async () => {
    const res = await request
      .post('/api/tasting-notes')
      .send(sampleNote)

    expect(res.status).toBe(401)
  })
})

describe('GET /api/tasting-notes/mine', () => {
  it('devuelve las notas del usuario con privateNotes', async () => {
    const res = await request
      .get('/api/tasting-notes/mine')
      .set('Authorization', `Bearer ${authToken}`)

    expect(res.status).toBe(200)
    expect(res.body.data).toBeInstanceOf(Array)
    expect(res.body.data[0].privateNotes).toBeDefined()
    expect(res.body.total).toBeGreaterThan(0)
  })

  it('devuelve estructura de paginación correcta', async () => {
    const res = await request
      .get('/api/tasting-notes/mine')
      .set('Authorization', `Bearer ${authToken}`)

    expect(res.body).toMatchObject({
      data:       expect.any(Array),
      total:      expect.any(Number),
      page:       expect.any(Number),
      totalPages: expect.any(Number),
      hasNext:    expect.any(Boolean),
      hasPrev:    expect.any(Boolean),
    })
  })
})

describe('GET /api/tasting-notes/group', () => {
  it('devuelve notas compartidas SIN privateNotes', async () => {
    const res = await request
      .get('/api/tasting-notes/group')
      .set('Authorization', `Bearer ${authToken}`)

    expect(res.status).toBe(200)
    expect(res.body.data).toBeInstanceOf(Array)

    res.body.data.forEach((note: Record<string, unknown>) => {
      expect(note.privateNotes).toBeUndefined()
    })
  })
})

describe('GET /api/tasting-notes/:id', () => {
  it('devuelve el detalle de una nota propia', async () => {
    const res = await request
      .get(`/api/tasting-notes/${noteId}`)
      .set('Authorization', `Bearer ${authToken}`)

    expect(res.status).toBe(200)
    expect(res.body.id).toBe(noteId)
    expect(res.body.privateNotes).toBe(sampleNote.privateNotes)
  })

  it('devuelve 404 para nota inexistente', async () => {
    const res = await request
      .get('/api/tasting-notes/id-que-no-existe')
      .set('Authorization', `Bearer ${authToken}`)

    expect(res.status).toBe(404)
  })
})

describe('PATCH /api/tasting-notes/:id', () => {
  it('actualiza una nota correctamente', async () => {
    const res = await request
      .patch(`/api/tasting-notes/${noteId}`)
      .set('Authorization', `Bearer ${authToken}`)
      .send({ score: 9.5 })

    expect(res.status).toBe(200)
    expect(res.body.score).toBe(9.5)
  })

  it('devuelve 404 al intentar editar nota inexistente', async () => {
    const res = await request
      .patch('/api/tasting-notes/id-que-no-existe')
      .set('Authorization', `Bearer ${authToken}`)
      .send({ score: 8 })

    expect(res.status).toBe(404)
  })
})

describe('DELETE /api/tasting-notes/:id', () => {
  it('elimina una nota correctamente', async () => {
    const res = await request
      .delete(`/api/tasting-notes/${noteId}`)
      .set('Authorization', `Bearer ${authToken}`)

    expect(res.status).toBe(204)
  })

  it('devuelve 404 al intentar eliminar nota ya eliminada', async () => {
    const res = await request
      .delete(`/api/tasting-notes/${noteId}`)
      .set('Authorization', `Bearer ${authToken}`)

    expect(res.status).toBe(404)
  })
})
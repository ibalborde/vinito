import { config } from 'dotenv'
import { resolve } from 'path'

// Forzar carga del .env.test ANTES de que Prisma se inicialice
process.env.DATABASE_URL = 'postgresql://vinito:vinito_test@localhost:5433/vinito_test'
process.env.JWT_SECRET = 'test_jwt_secret_vinito_2026'
process.env.NODE_ENV = 'test'
process.env.PORT = '3001'
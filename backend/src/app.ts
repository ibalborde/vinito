import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { errorHandler } from './middleware/errorHandler'
import { healthRouter } from './routes/healthRoutes'
import { NotFoundError } from './errors/AppError'
import { authRouter } from './routes/authRoutes'
import { tastingNoteRouter } from './routes/tastingNoteRoutes'

const app = express()

// ─── Middlewares globales ─────────────────────────────────────────────────────
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// ─── Rutas ────────────────────────────────────────────────────────────────────
app.use('/api/health', healthRouter)
app.use('/api/auth', authRouter)
app.use('/api/tasting-notes', tastingNoteRouter)

// ─── Rutas no encontradas ─────────────────────────────────────────────────────
app.use((_req, _res, next) => {
  next(new NotFoundError('Ruta'))
})

// ─── Manejo centralizado de errores ──────────────────────────────────────────
// Siempre al final, después de todas las rutas
app.use(errorHandler)

export default app
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { errorHandler } from './middleware/errorHandler'
import { healthRouter } from './routes/healthRoutes'
import { NotFoundError } from './errors/AppError'
import { authRouter } from './routes/authRoutes'
import { tastingNoteRouter } from './routes/tastingNoteRoutes'
import { wineryRouter }     from './routes/wineryRoutes'
import { grapeRouter }      from './routes/grapeRoutes'
import { studyTopicRouter } from './routes/studyTopicRoutes'
import { userRouter } from './routes/userRoutes'

const app = express()

// ─── Middlewares globales ─────────────────────────────────────────────────────
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// ─── Rutas ────────────────────────────────────────────────────────────────────
app.use('/api/health', healthRouter)
app.use('/api/auth', authRouter)
app.use('/api/tasting-notes', tastingNoteRouter)
app.use('/api/wineries',     wineryRouter)
app.use('/api/grapes',       grapeRouter)
app.use('/api/study-topics', studyTopicRouter)
app.use('/api/users', userRouter)

// ─── Rutas no encontradas ─────────────────────────────────────────────────────
app.use((_req, _res, next) => {
  next(new NotFoundError('Ruta'))
})

// ─── Manejo centralizado de errores ──────────────────────────────────────────
// Siempre al final, después de todas las rutas
app.use(errorHandler)

export default app
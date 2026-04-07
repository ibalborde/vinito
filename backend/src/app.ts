import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import { errorHandler } from './middleware/errorHandler'
import { healthRouter } from './routes/healthRoutes'

const app = express()

// ─── Middlewares globales ─────────────────────────────────────────────────────
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))

// ─── Rutas ────────────────────────────────────────────────────────────────────
app.use('/api/health', healthRouter)

// ─── Manejo centralizado de errores ──────────────────────────────────────────
// Siempre al final, después de todas las rutas
app.use(errorHandler)

export default app
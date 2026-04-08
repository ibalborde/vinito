import app from './app'
import { env } from './config/env'

console.log('Starting server...')
console.log('PORT:', env.port)
console.log('NODE_ENV:', env.nodeEnv)

app.listen(env.port, () => {
  console.log(`Server running on http://localhost:${env.port}`)
  console.log(`Environment: ${env.nodeEnv}`)
})
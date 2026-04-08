process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error)
  process.exit(1)
})

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason)
  process.exit(1)
})

import app from './app'
import { env } from './config/env'

console.log('Starting server...')
console.log('PORT:', env.port)

console.log('--- DEBUG DE ENTORNO ---');
console.log('process.env.PORT:', process.env.PORT);
console.log('Valor final en env.port:', env.port);

app.listen(env.port, '0.0.0.0', () => {
  console.log(`Server running on port ${env.port}`)
})
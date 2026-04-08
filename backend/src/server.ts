console.log('>>> EL CONTENEDOR ESTÁ VIVO Y EJECUTANDO SERVER.TS <<<');

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
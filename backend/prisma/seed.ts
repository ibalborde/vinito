import 'dotenv/config'
import { PrismaClient, Role } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('Ejecutando seed...')

  const passwordHash = await bcrypt.hash('vinito_admin_2026', 12)

  await prisma.user.upsert({
    where:  { email: 'ibalborde@gmail.com' },
    update: {},
    create: {
      email:        'ibalborde@gmail.com',
      passwordHash,
      name:         'Admin Vinito',
      role:         Role.ADMIN,
      isApproved:   true,
    },
  })

  console.log('Admin creado correctamente')
  console.log('Seed completado')
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
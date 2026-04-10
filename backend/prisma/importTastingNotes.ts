import * as XLSX from 'xlsx'
import { PrismaClient, WineType } from '@prisma/client'

const prisma = new PrismaClient()

function parseWineType(tipo: string): WineType {
  const t = (tipo || '').toLowerCase().trim()
  if (t.includes('tinto'))     return WineType.RED
  if (t.includes('blanco'))    return WineType.WHITE
  if (t.includes('rosado'))    return WineType.ROSE
  if (t.includes('espumante')) return WineType.SPARKLING
  if (t.includes('naranjo') || t.includes('orange')) return WineType.ORANGE
  return WineType.RED
}

function parseDate(val: any): Date {
  if (!val) return new Date()
  if (typeof val === 'number') {
    return XLSX.SSF.parse_date_code(val) 
      ? new Date(Date.UTC(
          XLSX.SSF.parse_date_code(val).y,
          XLSX.SSF.parse_date_code(val).m - 1,
          XLSX.SSF.parse_date_code(val).d
        ))
      : new Date()
  }
  const d = new Date(val)
  return isNaN(d.getTime()) ? new Date() : d
}

async function main() {
  const workbook = XLSX.readFile('./Notas_de_Cata_Vinos_Simple.xlsx')
  const sheet    = workbook.Sheets[workbook.SheetNames[0]]
  const rows     = XLSX.utils.sheet_to_json(sheet, { defval: '' }) as any[]

  const user = await prisma.user.findUnique({
    where: { email: 'ibalborde@gmail.com' },
  })

if (!user) {
    console.error('Usuario no encontrado. Asegurate de haber ejecutado el seed.')
    throw new Error('Usuario no encontrado')
  }

  const userId = user.id
  console.log(`Importando ${rows.length} notas de cata para ${user.email}...`)

  let imported = 0
  let skipped  = 0

  for (const row of rows) {
    const wineName = String(row['Vino'] || row['vino'] || '').trim()
    const winery   = String(row['Bodega'] || row['bodega'] || '').trim()

    if (!wineName || !winery) {
      skipped++
      continue
    }

    const existing = await prisma.tastingNote.findFirst({
      where: { userId, wineName, winery },
    })

    if (existing) {
      skipped++
      continue
    }

    await prisma.tastingNote.create({
      data: {
        userId,
        wineName,
        winery,
        grape:        String(row['Cepa'] || row['cepa'] || '').trim() || 'Sin especificar',
        region:       String(row['Región'] || row['Region'] || row['región'] || '').trim() || null,
        type:         parseWineType(String(row['Tipo'] || row['tipo'] || '')),
        visualNotes:  String(row['Vista'] || row['vista'] || '').trim() || null,
        firstNose:    String(row['Primera Nariz (sin agitar)'] || row['primera nariz'] || '').trim() || null,
        secondNose:   String(row['Segunda Nariz (agitado)'] || row['segunda nariz'] || '').trim() || null,
        palateNotes:  String(row['Boca'] || row['boca'] || '').trim() || null,
        score:        parseFloat(String(row['Puntaje Personal (1-10)'] || row['Puntaje'] || row['puntaje'] || '7')) || 7,
        privateNotes: String(row['Notas Adicionales'] || row['notas adicionales'] || '').trim() || null,
        tastingDate:  parseDate(row['Fecha'] || row['fecha']),
        isShared:     true,
      },
    })

    imported++
    console.log(`✓ ${wineName} — ${winery}`)
  }

  console.log(`\nCompletado: ${imported} importadas, ${skipped} omitidas`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
import { z } from 'zod'

export const CreateTastingNoteSchema = z.object({
  wineName:     z.string().min(1, 'El nombre del vino es requerido').max(200),
  winery:       z.string().min(1, 'La bodega es requerida').max(200),
  grape:        z.string().min(1, 'La cepa es requerida').max(200),
  region:       z.string().max(200).optional(),
  type: z.enum(['RED', 'WHITE', 'ROSE', 'SPARKLING', 'ORANGE'] as const, {
    error: 'Tipo de vino inválido',
  }),
  visualNotes:  z.string().max(2000).optional(),
  firstNose:    z.string().max(2000).optional(),
  secondNose:   z.string().max(2000).optional(),
  palateNotes:  z.string().max(2000).optional(),
  score:        z.number()
    .min(1,  'El puntaje mínimo es 1')
    .max(10, 'El puntaje máximo es 10'),
  privateNotes: z.string().max(2000).optional(),
  tastingDate: z.string().refine((val) => {
  return !isNaN(new Date(val).getTime())
}, { message: 'Fecha inválida' }),
  isShared:     z.boolean().optional().default(true),
})

export const UpdateTastingNoteSchema = CreateTastingNoteSchema.partial()

export const TastingNoteFiltersSchema = z.object({
  type:     z.enum(['RED', 'WHITE', 'ROSE', 'SPARKLING', 'ORANGE']).optional(),
  minScore: z.coerce.number().min(1).max(10).optional(),
  search:   z.string().max(100).optional(),
  page:     z.coerce.number().min(1).optional().default(1),
  limit:    z.coerce.number().min(1).max(100).optional().default(20),
})

export type CreateTastingNoteInput = z.infer<typeof CreateTastingNoteSchema>
export type UpdateTastingNoteInput = z.infer<typeof UpdateTastingNoteSchema>
export type TastingNoteFiltersInput = z.infer<typeof TastingNoteFiltersSchema>
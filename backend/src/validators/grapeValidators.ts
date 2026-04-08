import { z } from 'zod'

export const CreateGrapeSchema = z.object({
  name:         z.string().min(1).max(200),
  type:         z.enum(['RED', 'WHITE'] as const),
  origin:       z.string().min(1).max(200),
  country:      z.string().min(1).max(200).optional().default('Argentina'),
  servingTemp:  z.string().min(1).max(100),
  flavorProfile:z.string().min(1).max(1000),
  notes:        z.string().max(2000).optional(),
})

export const UpdateGrapeSchema = CreateGrapeSchema.partial()

export const GrapeFiltersSchema = z.object({
  type:   z.enum(['RED', 'WHITE'] as const).optional(),
  search: z.string().max(100).optional(),
  page:   z.coerce.number().min(1).optional().default(1),
  limit:  z.coerce.number().min(1).max(100).optional().default(20),
})

export type CreateGrapeInput  = z.infer<typeof CreateGrapeSchema>
export type UpdateGrapeInput  = z.infer<typeof UpdateGrapeSchema>
export type GrapeFiltersInput = z.infer<typeof GrapeFiltersSchema>
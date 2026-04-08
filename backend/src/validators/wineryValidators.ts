import { z } from 'zod'

export const CreateWinerySchema = z.object({
  name:        z.string().min(1).max(200),
  region:      z.string().min(1).max(200),
  province:    z.string().min(1).max(200),
  country:     z.string().min(1).max(200).optional().default('Argentina'),
  foundedYear: z.number().int().min(1800).max(2100).optional(),
  owners:      z.string().max(500).optional(),
  winemakers:  z.string().max(500).optional(),
  history:     z.string().max(5000).optional(),
  mainGrapes:  z.string().min(1).max(500),
  tier:        z.string().max(100).optional(),
})

export const UpdateWinerySchema = CreateWinerySchema.partial()

export const WineryFiltersSchema = z.object({
  province: z.string().optional(),
  search:   z.string().max(100).optional(),
  page:     z.coerce.number().min(1).optional().default(1),
  limit:    z.coerce.number().min(1).max(100).optional().default(20),
})

export type CreateWineryInput  = z.infer<typeof CreateWinerySchema>
export type UpdateWineryInput  = z.infer<typeof UpdateWinerySchema>
export type WineryFiltersInput = z.infer<typeof WineryFiltersSchema>
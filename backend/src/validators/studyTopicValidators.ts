import { z } from 'zod'

export const CreateStudyTopicSchema = z.object({
  title:    z.string().min(1).max(200),
  content:  z.string().min(1),
  category: z.enum([
    'elaboracion',
    'cata',
    'historia',
    'cepas',
    'regiones',
  ] as const),
  order:   z.number().int().min(0),
  version: z.string().max(20).optional().default('1.0'),
})

export const UpdateStudyTopicSchema = CreateStudyTopicSchema.partial()

export type CreateStudyTopicInput = z.infer<typeof CreateStudyTopicSchema>
export type UpdateStudyTopicInput = z.infer<typeof UpdateStudyTopicSchema>
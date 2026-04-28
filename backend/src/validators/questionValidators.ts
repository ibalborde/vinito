import { z } from 'zod'

const CATEGORIES = [
  'elaboracion',
  'cata',
  'historia',
  'cepas',
  'regiones',
] as const

const DIFFICULTIES = ['easy', 'medium', 'hard'] as const

const OptionSchema = z.object({
  text:      z.string().min(1).max(500),
  isCorrect: z.boolean(),
})

export const CreateQuestionSchema = z.object({
  text:         z.string().min(1).max(1000),
  explanation:  z.string().max(1000).optional(),
  category:     z.enum(CATEGORIES),
  difficulty:   z.enum(DIFFICULTIES).optional().default('medium'),
  studyTopicId: z.string().uuid().optional(),
  options:      z.array(OptionSchema).min(2).max(6).refine(
    (opts) => opts.filter((o) => o.isCorrect).length === 1,
    { message: 'Exactly one option must be correct' }
  ),
})

export const UpdateQuestionSchema = CreateQuestionSchema.partial()

export type CreateQuestionInput = z.infer<typeof CreateQuestionSchema>
export type UpdateQuestionInput = z.infer<typeof UpdateQuestionSchema>

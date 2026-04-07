import { z } from 'zod'

export const RegisterSchema = z.object({
  email: z
    .string()
    .email('El email no es válido')
    .max(255, 'El email es demasiado largo'),
  password: z
    .string()
    .min(8, 'La contraseña debe tener al menos 8 caracteres')
    .max(100, 'La contraseña es demasiado larga'),
  name: z
    .string()
    .min(2, 'El nombre debe tener al menos 2 caracteres')
    .max(100, 'El nombre es demasiado largo')
    .trim(),
})

export const LoginSchema = z.object({
  email: z.string().email('El email no es válido'),
  password: z.string().min(1, 'La contraseña es requerida'),
})

export type RegisterInput = z.infer<typeof RegisterSchema>
export type LoginInput = z.infer<typeof LoginSchema>
import jwt from 'jsonwebtoken'
import { env } from './env'

interface TokenPayload {
  userId: string
  email: string
  role: string
}

export function generateToken(payload: TokenPayload): string {
  return jwt.sign(payload, env.jwt.secret, {
    expiresIn: env.jwt.expiresIn,
  })
}

export function verifyToken(token: string): TokenPayload {
  const decoded = jwt.verify(token, env.jwt.secret)
  return decoded as TokenPayload
}
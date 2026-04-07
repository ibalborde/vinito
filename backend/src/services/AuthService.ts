import bcrypt from 'bcryptjs'
import { User } from '@prisma/client'
import { UserRepository } from '../repositories/UserRepository'
import { generateToken } from '../config/jwt'
import { ConflictError, UnauthorizedError } from '../errors/AppError'
import { RegisterInput, LoginInput } from '../validators/authValidators'

interface AuthResponse {
  user: Omit<User, 'passwordHash'>
  token: string
}

const BCRYPT_SALT_ROUNDS = 12

export class AuthService {
  constructor(private readonly userRepository: UserRepository) {}

  async register(data: RegisterInput): Promise<AuthResponse> {
    const existingUser = await this.userRepository.findByEmail(data.email)

    if (existingUser) {
      throw new ConflictError('Ya existe una cuenta con ese email')
    }

    const passwordHash = await bcrypt.hash(data.password, BCRYPT_SALT_ROUNDS)

    const user = await this.userRepository.create({
      email: data.email,
      passwordHash,
      name: data.name,
      isApproved: true,
    })

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    const { passwordHash: _, ...userWithoutPassword } = user

    return { user: userWithoutPassword, token }
  }

  async login(data: LoginInput): Promise<AuthResponse> {
    const user = await this.userRepository.findByEmail(data.email)

    if (!user) {
      throw new UnauthorizedError('Credenciales incorrectas')
    }

    const passwordMatches = await bcrypt.compare(data.password, user.passwordHash)

    if (!passwordMatches) {
      throw new UnauthorizedError('Credenciales incorrectas')
    }

    const token = generateToken({
      userId: user.id,
      email: user.email,
      role: user.role,
    })

    const { passwordHash: _, ...userWithoutPassword } = user

    return { user: userWithoutPassword, token }
  }
}
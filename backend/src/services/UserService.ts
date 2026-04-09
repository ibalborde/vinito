import { UserRepository } from '../repositories/UserRepository'
import { User }           from '@prisma/client'
import { NotFoundError }  from '../errors/AppError'
import { Role }           from '@prisma/client'

export class UserService {
  constructor(private readonly repository: UserRepository) {}

  async getAllUsers(): Promise<Omit<User, 'passwordHash'>[]> {
    return this.repository.findAll()
  }

  async updateUserRole(id: string, role: Role): Promise<User> {
    const user = await this.repository.findById(id)
    if (!user) throw new NotFoundError('Usuario')
    return this.repository.updateRole(id, role)
  }
}
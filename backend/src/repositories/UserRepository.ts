import prisma from '../config/prisma'
import { User, Role } from '@prisma/client'

interface CreateUserData {
  email: string
  passwordHash: string
  name: string
  role?: Role
  isApproved?: boolean
}

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { email },
    })
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({
      where: { id },
    })
  }

  async create(data: CreateUserData): Promise<User> {
    return prisma.user.create({
      data,
    })
  }

  async updateRole(id: string, role: Role): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: { role },
    })
  }

  async approve(id: string): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: { isApproved: true },
    })
  }
}
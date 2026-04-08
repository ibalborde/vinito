import prisma from '../config/prisma'
import { Grape, GrapeType, Prisma } from '@prisma/client'

export interface GrapeFilters {
  type?:   GrapeType
  search?: string
}

export class GrapeRepository {
  async findAll(
    filters:    GrapeFilters,
    pagination: { page: number; limit: number }
  ): Promise<{ grapes: Grape[]; total: number }> {
    const where = this.buildWhereClause(filters)

    const [grapes, total] = await prisma.$transaction([
      prisma.grape.findMany({
        where,
        orderBy: { name: 'asc' },
        skip: (pagination.page - 1) * pagination.limit,
        take: pagination.limit,
      }),
      prisma.grape.count({ where }),
    ])

    return { grapes, total }
  }

  async findById(id: string): Promise<Grape | null> {
    return prisma.grape.findUnique({
      where: { id },
      include: { foodPairings: true },
    })
  }

  async create(data: Prisma.GrapeCreateInput): Promise<Grape> {
    return prisma.grape.create({ data })
  }

  async update(id: string, data: Prisma.GrapeUpdateInput): Promise<Grape> {
    return prisma.grape.update({ where: { id }, data })
  }

  async delete(id: string): Promise<void> {
    await prisma.grape.delete({ where: { id } })
  }

  private buildWhereClause(filters: GrapeFilters): Prisma.GrapeWhereInput {
    const where: Prisma.GrapeWhereInput = {}

    if (filters.type) where.type = filters.type

    if (filters.search) {
      where.OR = [
        { name:          { contains: filters.search, mode: 'insensitive' } },
        { flavorProfile: { contains: filters.search, mode: 'insensitive' } },
        { origin:        { contains: filters.search, mode: 'insensitive' } },
      ]
    }

    return where
  }
}
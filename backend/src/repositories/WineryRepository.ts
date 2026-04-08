import prisma from '../config/prisma'
import { Winery, Prisma } from '@prisma/client'

export interface WineryFilters {
  province?: string
  search?:   string
}

export interface PaginationParams {
  page:  number
  limit: number
}

export class WineryRepository {
  async findAll(
    filters:    WineryFilters,
    pagination: PaginationParams
  ): Promise<{ wineries: Winery[]; total: number }> {
    const where = this.buildWhereClause(filters)

    const [wineries, total] = await prisma.$transaction([
      prisma.winery.findMany({
        where,
        orderBy: { name: 'asc' },
        skip: (pagination.page - 1) * pagination.limit,
        take: pagination.limit,
      }),
      prisma.winery.count({ where }),
    ])

    return { wineries, total }
  }

  async findById(id: string): Promise<Winery | null> {
    return prisma.winery.findUnique({
      where: { id },
      include: { foodPairings: true },
    })
  }

  async create(data: Prisma.WineryCreateInput): Promise<Winery> {
    return prisma.winery.create({ data })
  }

  async update(id: string, data: Prisma.WineryUpdateInput): Promise<Winery> {
    return prisma.winery.update({ where: { id }, data })
  }

  async delete(id: string): Promise<void> {
    await prisma.winery.delete({ where: { id } })
  }

  private buildWhereClause(filters: WineryFilters): Prisma.WineryWhereInput {
    const where: Prisma.WineryWhereInput = {}

    if (filters.province) where.province = filters.province

    if (filters.search) {
      where.OR = [
        { name:    { contains: filters.search, mode: 'insensitive' } },
        { region:  { contains: filters.search, mode: 'insensitive' } },
        { history: { contains: filters.search, mode: 'insensitive' } },
      ]
    }

    return where
  }
}
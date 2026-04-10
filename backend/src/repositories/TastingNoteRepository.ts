import prisma from '../config/prisma'
import { TastingNote, Prisma } from '@prisma/client'

export type TastingNotePublic = Omit<TastingNote, 'privateNotes'>

export interface TastingNoteFilters {
  type?:     string
  minScore?: number
  search?:   string
}

export interface PaginationParams {
  page:  number
  limit: number
}

export interface CreateTastingNoteData {
  wineName:     string
  winery:       string
  grape:        string
  region?:      string
  type:         TastingNote['type']
  visualNotes?: string
  firstNose?:   string
  secondNose?:  string
  palateNotes?: string
  score:        number
  privateNotes?: string
  tastingDate:  Date
  isShared?:    boolean
}

export class TastingNoteRepository {

  async findAllByUser(
    userId:     string,
    filters:    TastingNoteFilters,
    pagination: PaginationParams
  ): Promise<{ notes: TastingNote[]; total: number }> {
    const where = this.buildWhereClause({ ...filters, userId })

    const [notes, total] = await prisma.$transaction([
      prisma.tastingNote.findMany({
        where,
        orderBy: { tastingDate: 'desc' },
        skip:  (pagination.page - 1) * pagination.limit,
        take:  pagination.limit,
      }),
      prisma.tastingNote.count({ where }),
    ])

    return { notes, total }
  }

async findAllShared(params: PaginationParams) {
  const { page, limit } = params
  const skip = (page - 1) * limit

  const [data, total] = await Promise.all([
    prisma.tastingNote.findMany({
      where:   { isShared: true },
      skip,
      take:    limit,
      orderBy: { tastingDate: 'desc' },
     select: {
        id:            true,
        userId:        true,
        wineName:      true,
        winery:        true,
        grape:         true,
        region:        true,
        type:          true,
        visualNotes:   true,
        firstNose:     true,
        secondNose:    true,
        palateNotes:   true,
        score:         true,
        tastingDate:   true,
        isShared:      true,
        labelPhotoUrl: true,
        createdAt:     true,
        updatedAt:     true,
        user: {
          select: { name: true }
        }
        },
    }),
    prisma.tastingNote.count({ where: { isShared: true } }),
  ])

  const mapped = data.map((note: any) => ({
    ...note,
    userName: note.user?.name ?? null,
    user:     undefined,
  }))

  return { data: mapped, total }
}

  async findByUserAndId(
    userId: string,
    id:     string
  ): Promise<TastingNote | null> {
    return prisma.tastingNote.findFirst({
      where: { id, userId },
    })
  }

async create(
  userId: string,
  data:   CreateTastingNoteData
): Promise<TastingNote> {
  return prisma.tastingNote.create({
    data: {
      ...data,
      user: { connect: { id: userId } },
    },
  })
}

  async update(
    id:   string,
    data: Prisma.TastingNoteUpdateInput
  ): Promise<TastingNote> {
    return prisma.tastingNote.update({
      where: { id },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.tastingNote.delete({
      where: { id },
    })
  }

  private buildWhereClause(
    params: TastingNoteFilters & { userId?: string; isShared?: boolean }
  ): Prisma.TastingNoteWhereInput {
    const where: Prisma.TastingNoteWhereInput = {}

    if (params.userId)   where.userId   = params.userId
    if (params.isShared) where.isShared = params.isShared
    if (params.type)     where.type     = params.type as TastingNote['type']
    if (params.minScore) where.score    = { gte: params.minScore }

    if (params.search) {
      where.OR = [
        { wineName: { contains: params.search, mode: 'insensitive' } },
        { winery:   { contains: params.search, mode: 'insensitive' } },
        { grape:    { contains: params.search, mode: 'insensitive' } },
      ]
    }

    return where
  }

  private publicSelect(): Prisma.TastingNoteSelect {
    return {
      id:            true,
      userId:        true,
      wineName:      true,
      winery:        true,
      grape:         true,
      region:        true,
      type:          true,
      visualNotes:   true,
      firstNose:     true,
      secondNose:    true,
      palateNotes:   true,
      score:         true,
      privateNotes:  false,
      labelPhotoUrl: true,
      tastingDate:   true,
      isShared:      true,
      createdAt:     true,
      updatedAt:     true,
    }
  }
}
import { TastingNote } from '@prisma/client'
import {
  TastingNoteRepository,
  TastingNotePublic,
  CreateTastingNoteData,
} from '../repositories/TastingNoteRepository'
import { NotFoundError } from '../errors/AppError'
import {
  CreateTastingNoteInput,
  UpdateTastingNoteInput,
  TastingNoteFiltersInput,
} from '../validators/tastingNoteValidators'

interface PaginatedResult<T> {
  data:       T[]
  total:      number
  page:       number
  totalPages: number
  hasNext:    boolean
  hasPrev:    boolean
}

export class TastingNoteService {
  constructor(
    private readonly repository: TastingNoteRepository
  ) {}

  async getMyNotes(
    userId:  string,
    filters: TastingNoteFiltersInput
  ): Promise<PaginatedResult<TastingNote>> {
    const { page, limit, ...noteFilters } = filters
    const { notes, total } = await this.repository.findAllByUser(
      userId,
      noteFilters,
      { page, limit }
    )

    return this.buildPaginatedResult(notes, total, page, limit)
  }

  async getSharedNotes(
    filters: TastingNoteFiltersInput
  ): Promise<PaginatedResult<TastingNotePublic>> {
    const { page, limit, ...noteFilters } = filters
    const { notes, total } = await this.repository.findAllShared(
      noteFilters,
      { page, limit }
    )

    return this.buildPaginatedResult(notes, total, page, limit)
  }

  async getNoteById(
    userId: string,
    noteId: string
  ): Promise<TastingNote> {
    const note = await this.repository.findByUserAndId(userId, noteId)

    if (!note) {
      throw new NotFoundError('Nota de cata')
    }

    return note
  }

async createNote(
  userId: string,
  data:   CreateTastingNoteInput
): Promise<TastingNote> {
  const noteData: CreateTastingNoteData = {
    wineName:     data.wineName,
    winery:       data.winery,
    grape:        data.grape,
    region:       data.region,
    type:         data.type,
    visualNotes:  data.visualNotes,
    firstNose:    data.firstNose,
    secondNose:   data.secondNose,
    palateNotes:  data.palateNotes,
    score:        data.score,
    privateNotes: data.privateNotes,
    tastingDate:  new Date(data.tastingDate),
    isShared:     data.isShared,
  }
  return this.repository.create(userId, noteData)
}

  async updateNote(
    userId: string,
    noteId: string,
    data:   UpdateTastingNoteInput
  ): Promise<TastingNote> {
    const note = await this.repository.findByUserAndId(userId, noteId)

    if (!note) {
      throw new NotFoundError('Nota de cata')
    }

    return this.repository.update(noteId, {
      ...data,
      tastingDate: data.tastingDate
        ? new Date(data.tastingDate)
        : undefined,
    })
  }

  async deleteNote(
    userId: string,
    noteId: string
  ): Promise<void> {
    const note = await this.repository.findByUserAndId(userId, noteId)

    if (!note) {
      throw new NotFoundError('Nota de cata')
    }

    await this.repository.delete(noteId)
  }

  private buildPaginatedResult<T>(
    data:  T[],
    total: number,
    page:  number,
    limit: number
  ): PaginatedResult<T> {
    const totalPages = Math.ceil(total / limit)

    return {
      data,
      total,
      page,
      totalPages,
      hasNext: page < totalPages,
      hasPrev: page > 1,
    }
  }
}
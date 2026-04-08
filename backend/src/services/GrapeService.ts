import { Grape }            from '@prisma/client'
import { GrapeRepository }  from '../repositories/GrapeRepository'
import { NotFoundError }    from '../errors/AppError'
import {
  CreateGrapeInput,
  UpdateGrapeInput,
  GrapeFiltersInput,
} from '../validators/grapeValidators'

interface PaginatedResult<T> {
  data:       T[]
  total:      number
  page:       number
  totalPages: number
  hasNext:    boolean
  hasPrev:    boolean
}

export class GrapeService {
  constructor(private readonly repository: GrapeRepository) {}

  async getAllGrapes(
    filters: GrapeFiltersInput
  ): Promise<PaginatedResult<Grape>> {
    const { page, limit, ...grapeFilters } = filters
    const { grapes, total } = await this.repository.findAll(
      grapeFilters,
      { page, limit }
    )

    return this.buildPaginatedResult(grapes, total, page, limit)
  }

  async getGrapeById(id: string): Promise<Grape> {
    const grape = await this.repository.findById(id)

    if (!grape) throw new NotFoundError('Cepa')

    return grape
  }

  async createGrape(data: CreateGrapeInput): Promise<Grape> {
    return this.repository.create(data)
  }

  async updateGrape(id: string, data: UpdateGrapeInput): Promise<Grape> {
    await this.getGrapeById(id)
    return this.repository.update(id, data)
  }

  async deleteGrape(id: string): Promise<void> {
    await this.getGrapeById(id)
    await this.repository.delete(id)
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
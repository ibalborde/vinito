import { Winery }            from '@prisma/client'
import { WineryRepository }  from '../repositories/WineryRepository'
import { NotFoundError }     from '../errors/AppError'
import {
  CreateWineryInput,
  UpdateWineryInput,
  WineryFiltersInput,
} from '../validators/wineryValidators'

interface PaginatedResult<T> {
  data:       T[]
  total:      number
  page:       number
  totalPages: number
  hasNext:    boolean
  hasPrev:    boolean
}

export class WineryService {
  constructor(private readonly repository: WineryRepository) {}

  async getAllWineries(
    filters: WineryFiltersInput
  ): Promise<PaginatedResult<Winery>> {
    const { page, limit, ...wineryFilters } = filters
    const { wineries, total } = await this.repository.findAll(
      wineryFilters,
      { page, limit }
    )

    return this.buildPaginatedResult(wineries, total, page, limit)
  }

  async getWineryById(id: string): Promise<Winery> {
    const winery = await this.repository.findById(id)

    if (!winery) throw new NotFoundError('Bodega')

    return winery
  }

  async createWinery(data: CreateWineryInput): Promise<Winery> {
    return this.repository.create(data)
  }

  async updateWinery(id: string, data: UpdateWineryInput): Promise<Winery> {
    await this.getWineryById(id)
    return this.repository.update(id, data)
  }

  async deleteWinery(id: string): Promise<void> {
    await this.getWineryById(id)
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
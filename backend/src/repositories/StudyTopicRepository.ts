import prisma from '../config/prisma'
import { StudyTopic, Prisma } from '@prisma/client'

export class StudyTopicRepository {
  async findAll(category?: string): Promise<StudyTopic[]> {
    const where: Prisma.StudyTopicWhereInput = {}
    if (category) where.category = category

    return prisma.studyTopic.findMany({
      where,
      orderBy: { order: 'asc' },
    })
  }

  async findById(id: string): Promise<StudyTopic | null> {
    return prisma.studyTopic.findUnique({ where: { id } })
  }

  async create(data: Prisma.StudyTopicCreateInput): Promise<StudyTopic> {
    return prisma.studyTopic.create({ data })
  }

  async update(
    id:   string,
    data: Prisma.StudyTopicUpdateInput
  ): Promise<StudyTopic> {
    return prisma.studyTopic.update({ where: { id }, data })
  }

  async delete(id: string): Promise<void> {
    await prisma.studyTopic.delete({ where: { id } })
  }
}
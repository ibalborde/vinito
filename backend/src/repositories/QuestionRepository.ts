import prisma from '../config/prisma'
import { Question, Prisma } from '@prisma/client'

export type QuestionWithOptions = Question & {
  options: { id: string; text: string; isCorrect: boolean }[]
}

export class QuestionRepository {
  async findAll(category?: string, limit?: number): Promise<QuestionWithOptions[]> {
    const where: Prisma.QuestionWhereInput = {}
    if (category) where.category = category

    const questions = await prisma.question.findMany({
      where,
      include: { options: true },
      orderBy: { createdAt: 'desc' },
    })

    if (limit && limit < questions.length) {
      const shuffled = questions.sort(() => Math.random() - 0.5)
      return shuffled.slice(0, limit)
    }

    return questions
  }

  async findById(id: string): Promise<QuestionWithOptions | null> {
    return prisma.question.findUnique({
      where: { id },
      include: { options: true },
    })
  }

  async create(
    data: Prisma.QuestionCreateInput
  ): Promise<QuestionWithOptions> {
    return prisma.question.create({
      data,
      include: { options: true },
    })
  }

  async update(
    id:   string,
    data: Prisma.QuestionUpdateInput
  ): Promise<QuestionWithOptions> {
    return prisma.question.update({
      where: { id },
      data,
      include: { options: true },
    })
  }

  async delete(id: string): Promise<void> {
    await prisma.question.delete({ where: { id } })
  }
}

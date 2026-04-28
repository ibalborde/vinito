import { QuestionRepository, QuestionWithOptions } from '../repositories/QuestionRepository'
import { NotFoundError } from '../errors/AppError'
import { CreateQuestionInput, UpdateQuestionInput } from '../validators/questionValidators'

export class QuestionService {
  constructor(private readonly repository: QuestionRepository) {}

  async getAllQuestions(
    category?: string,
    limit?:    number
  ): Promise<QuestionWithOptions[]> {
    return this.repository.findAll(category, limit)
  }

  async getQuestionById(id: string): Promise<QuestionWithOptions> {
    const question = await this.repository.findById(id)
    if (!question) throw new NotFoundError('Pregunta')
    return question
  }

  async createQuestion(data: CreateQuestionInput): Promise<QuestionWithOptions> {
    const { options, studyTopicId, ...rest } = data
    return this.repository.create({
      ...rest,
      ...(studyTopicId ? { studyTopic: { connect: { id: studyTopicId } } } : {}),
      options: {
        create: options,
      },
    })
  }

  async updateQuestion(
    id:   string,
    data: UpdateQuestionInput
  ): Promise<QuestionWithOptions> {
    await this.getQuestionById(id)
    const { options, studyTopicId, ...rest } = data

    return this.repository.update(id, {
      ...rest,
      ...(studyTopicId !== undefined
        ? studyTopicId
          ? { studyTopic: { connect: { id: studyTopicId } } }
          : { studyTopic: { disconnect: true } }
        : {}),
      ...(options
        ? {
            options: {
              deleteMany: {},
              create: options,
            },
          }
        : {}),
    })
  }

  async deleteQuestion(id: string): Promise<void> {
    await this.getQuestionById(id)
    await this.repository.delete(id)
  }
}

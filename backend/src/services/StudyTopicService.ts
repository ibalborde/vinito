import { StudyTopic }           from '@prisma/client'
import { StudyTopicRepository } from '../repositories/StudyTopicRepository'
import { NotFoundError }        from '../errors/AppError'
import {
  CreateStudyTopicInput,
  UpdateStudyTopicInput,
} from '../validators/studyTopicValidators'

export class StudyTopicService {
  constructor(private readonly repository: StudyTopicRepository) {}

  async getAllTopics(category?: string): Promise<StudyTopic[]> {
    return this.repository.findAll(category)
  }

  async getTopicById(id: string): Promise<StudyTopic> {
    const topic = await this.repository.findById(id)

    if (!topic) throw new NotFoundError('Tema de estudio')

    return topic
  }

  async createTopic(data: CreateStudyTopicInput): Promise<StudyTopic> {
    return this.repository.create(data)
  }

  async updateTopic(
    id:   string,
    data: UpdateStudyTopicInput
  ): Promise<StudyTopic> {
    await this.getTopicById(id)
    return this.repository.update(id, data)
  }

  async deleteTopic(id: string): Promise<void> {
    await this.getTopicById(id)
    await this.repository.delete(id)
  }
}
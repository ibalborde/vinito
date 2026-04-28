//
//  QuestionRepository.swift
//  Vinito
//

import Foundation

protocol QuestionRepositoryProtocol {
    func getQuestions(category: String?, limit: Int?) async throws -> [Question]
}

final class QuestionRepository: QuestionRepositoryProtocol {
    private let service: QuestionServiceProtocol

    init(service: QuestionServiceProtocol = QuestionService()) {
        self.service = service
    }

    func getQuestions(category: String?, limit: Int?) async throws -> [Question] {
        return try await service.getQuestions(category: category, limit: limit)
    }
}

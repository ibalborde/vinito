//
//  StudyTopicRepository.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import Foundation

protocol StudyTopicRepositoryProtocol {
    func getTopics(category: String?) async throws -> [StudyTopic]
    func getTopicById(id: String) async throws -> StudyTopic
}

final class StudyTopicRepository: StudyTopicRepositoryProtocol {
    private let service: StudyTopicServiceProtocol

    init(service: StudyTopicServiceProtocol = StudyTopicService()) {
        self.service = service
    }

    func getTopics(category: String?) async throws -> [StudyTopic] {
        return try await service.getTopics(category: category)
    }

    func getTopicById(id: String) async throws -> StudyTopic {
        return try await service.getTopicById(id: id)
    }
}

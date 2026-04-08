//
//  StudyTopicService.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import Foundation

protocol StudyTopicServiceProtocol {
    func getTopics(category: String?) async throws -> [StudyTopic]
    func getTopicById(id: String) async throws -> StudyTopic
}

final class StudyTopicService: StudyTopicServiceProtocol {
    private let network: NetworkServiceProtocol

    init(network: NetworkServiceProtocol = NetworkService.shared) {
        self.network = network
    }

    func getTopics(category: String? = nil) async throws -> [StudyTopic] {
        var endpoint = APIConstants.Endpoints.studyTopics

        if let category {
            endpoint += "?category=\(category)"
        }

        return try await network.request(
            endpoint: endpoint,
            method:   "GET",
            body:     nil as String?
        )
    }

    func getTopicById(id: String) async throws -> StudyTopic {
        return try await network.request(
            endpoint: "\(APIConstants.Endpoints.studyTopics)/\(id)",
            method:   "GET",
            body:     nil as String?
        )
    }
}

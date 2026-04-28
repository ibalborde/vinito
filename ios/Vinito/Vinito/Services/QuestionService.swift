//
//  QuestionService.swift
//  Vinito
//

import Foundation

protocol QuestionServiceProtocol {
    func getQuestions(category: String?, limit: Int?) async throws -> [Question]
}

final class QuestionService: QuestionServiceProtocol {
    private let network: NetworkServiceProtocol

    init(network: NetworkServiceProtocol = NetworkService.shared) {
        self.network = network
    }

    func getQuestions(category: String? = nil, limit: Int? = nil) async throws -> [Question] {
        var parts: [String] = []
        if let category { parts.append("category=\(category)") }
        if let limit     { parts.append("limit=\(limit)") }

        var endpoint = APIConstants.Endpoints.questions
        if !parts.isEmpty { endpoint += "?" + parts.joined(separator: "&") }

        return try await network.request(
            endpoint: endpoint,
            method:   "GET",
            body:     nil as String?
        )
    }
}

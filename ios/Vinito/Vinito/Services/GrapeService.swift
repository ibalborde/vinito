//
//  GrapeService.swift
//  Vinito
//
//  Created by Maximiliano Ibalborde on 08/04/2026.
//

import Foundation

protocol GrapeServiceProtocol {
    func getGrapes(page: Int, search: String?, type: String?) async throws -> PaginatedGrapes
    func getGrapeById(id: String) async throws -> Grape
}

final class GrapeService: GrapeServiceProtocol {
    private let network: NetworkServiceProtocol

    init(network: NetworkServiceProtocol = NetworkService.shared) {
        self.network = network
    }

    func getGrapes(
        page:   Int = 1,
        search: String? = nil,
        type:   String? = nil
    ) async throws -> PaginatedGrapes {
        var endpoint = "\(APIConstants.Endpoints.grapes)?page=\(page)&limit=20"

        if let search, !search.isEmpty {
            let encoded = search.addingPercentEncoding(
                withAllowedCharacters: .urlQueryAllowed
            ) ?? search
            endpoint += "&search=\(encoded)"
        }

        if let type {
            endpoint += "&type=\(type)"
        }

        return try await network.request(
            endpoint: endpoint,
            method:   "GET",
            body:     nil as String?
        )
    }

    func getGrapeById(id: String) async throws -> Grape {
        return try await network.request(
            endpoint: "\(APIConstants.Endpoints.grapes)/\(id)",
            method:   "GET",
            body:     nil as String?
        )
    }
}
